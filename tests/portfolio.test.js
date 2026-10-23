import test from 'node:test';
import assert from 'node:assert/strict';
import { portfolio } from '../src/data/portfolio.js';
import { creations } from '../src/data/creations.js';
import { profile } from '../src/data/profile.js';
import { buildCatalogTree, categoryExpansionPath, catalogNodeIds } from '../src/data/catalogSections.js';
import { legacyRoutes, resolveRoute } from '../src/data/navigation.js';

test('35 個匯入連結具有唯一 ID、有效公開網址與完整分類', () => {
  assert.equal(portfolio.length, 35);
  assert.equal(new Set(portfolio.map(item => item.id)).size, 35);
  assert.equal(new Set(portfolio.map(item => item.url)).size, 35);
  for (const item of portfolio) {
    assert(item.title && item.description && item.category && item.categoryLabel);
    assert.equal(new URL(item.url).origin, 'https://jacobs-ting.github.io');
    assert.equal(item.status, 'published');
    assert(['engineering', 'ai', 'games', 'life'].includes(item.zone));
  }
});

test('分類路由指向有作品的對應區域與分類', () => {
  for (const [name, route] of Object.entries(legacyRoutes)) {
    assert.deepEqual(resolveRoute(`#${name}`), route);
    if (route.category) assert(categoryExpansionPath(route.category, buildCatalogTree(portfolio.filter(item => item.zone === route.zone))).length > 0);
  }
  assert.deepEqual(resolveRoute('#unrecognized'), { zone: null });
  assert.deepEqual(resolveRoute('#engineering'), { zone: 'engineering' });
});

test('保留個人介紹、小說去重與獨立構想狀態', () => {
  assert.equal(profile.biography.length, 6);
  assert.equal(profile.badges.length, 5);
  assert.equal(creations.filter(item => item.url === 'https://jacobs-ting.github.io/Online_dating_Story/').length, 1);
  assert.equal(creations.find(item => item.id === 'online_dating_story').title, '九點，等你');
  assert(creations.filter(item => item.status === 'concept').every(item => !item.url));
  assert.equal(portfolio.find(item => item.id === 'business_trip_diary').zone, 'games');
});


test('原站五大作品分類層級完整，35 個作品各出現一次', () => {
  const tree = buildCatalogTree(portfolio);
  assert.deepEqual(tree.map(node => [node.title, node.count]), [
    ['求職轉職', 2], ['工作專用', 4], ['休閒娛樂', 16], ['技術研究工作室', 12], ['新聞推播', 1],
  ]);
  const collect = nodes => nodes.flatMap(node => [...node.items.map(item => item.id), ...collect(node.children)]);
  const ids = collect(tree);
  assert.equal(ids.length, 35);
  assert.equal(new Set(ids).size, 35);
  assert.deepEqual(categoryExpansionPath('romance', tree), ['leisure', 'interactive-novel', 'urban-love']);
  assert.deepEqual(categoryExpansionPath('algorithms', tree), ['tech-studio', 'basic-science', 'ai-algorithms']);
});

test('搜尋會保留祖先分類，且支援原分類名稱與無結果', () => {
  const matches = buildCatalogTree(portfolio, '九點');
  assert.deepEqual(catalogNodeIds(matches), ['leisure', 'interactive-novel', 'urban-love']);
  assert.equal(matches[0].count, 1);
  assert.equal(buildCatalogTree(portfolio, '互動式小說')[0].count, 6);
  assert.deepEqual(buildCatalogTree(portfolio, '找不到的任意作品名稱'), []);
  assert.equal(buildCatalogTree(portfolio)[0].count, 2);
});
