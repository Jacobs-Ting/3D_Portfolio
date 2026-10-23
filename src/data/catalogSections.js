// 依 Jacobs AI LAB 原站的頁面層級呈現；categories 對應作品資料的分類鍵。
export const catalogSections = [
  { id: 'career', title: '求職轉職', categories: ['career'] },
  { id: 'work', title: '工作專用', categories: ['work'] },
  { id: 'leisure', title: '休閒娛樂', categories: ['leisure'], children: [
    { id: 'web-games', title: '網頁小遊戲', categories: ['web-games'] },
    { id: 'interactive-novel', title: '互動式小說', categories: ['fiction'], children: [
      { id: 'urban-love', title: '都會愛情輕小說', categories: ['romance'] },
      { id: 'power-game', title: '權力遊戲', categories: ['history'] },
    ] },
    { id: 'literary-creation', title: '小品文學創作', categories: ['literature'] },
  ] },
  { id: 'tech-studio', title: '技術研究工作室', categories: ['rf'], children: [
    { id: 'basic-science', title: '基礎科學教室', children: [
      { id: 'electromagnetics', title: '電磁學筆記', categories: ['electromagnetics'] },
      { id: 'comm-systems', title: '通訊系統筆記', categories: ['communications'] },
      { id: 'electronic-circuits', title: '電子電路筆記', categories: ['circuits'] },
      { id: 'ai-algorithms', title: '人工智慧演算法', categories: ['algorithms'] },
      { id: 'natural-science', title: '自然科學', categories: ['nature'] },
    ] },
  ] },
  { id: 'news', title: '新聞推播', categories: ['news'] },
  { id: 'concept', title: '其他創作構想', categories: ['concept'] },
];

export function buildCatalogTree(items, query = '', sections = catalogSections, ancestors = []) {
  const search = query.trim().toLocaleLowerCase();
  return sections.map(section => {
    const path = [...ancestors, section.title];
    const directItems = items.filter(item => (section.categories || []).includes(item.category)).filter(item =>
      [item.title, item.subtitle, item.description, item.categoryLabel, item.englishTitle, ...path, ...(item.technologies || [])]
        .filter(Boolean).join(' ').toLocaleLowerCase().includes(search));
    const children = buildCatalogTree(items, query, section.children || [], path);
    const count = directItems.length + children.reduce((total, child) => total + child.count, 0);
    return { ...section, items: directItems, children, count };
  }).filter(section => section.count > 0);
}

export function catalogNodeIds(tree) {
  return tree.flatMap(node => [node.id, ...catalogNodeIds(node.children || [])]);
}

export function categoryExpansionPath(category, tree) {
  for (const node of tree) {
    if (node.id === category || node.categories?.includes(category)) return [node.id];
    const path = categoryExpansionPath(category, node.children || []);
    if (path.length) return [node.id, ...path];
  }
  return [];
}
