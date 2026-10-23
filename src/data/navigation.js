// 相容原 Jacobs AI LAB 的分類網址；同時支援目前小島各區域的網址。
export const legacyRoutes = {
  home: { zone: null }, profile: { zone: 'welcome' }, bio: { zone: 'welcome' },
  career: { zone: 'ai', category: 'career' }, work: { zone: 'ai', category: 'work' },
  leisure: { zone: 'games', category: 'leisure' },
  'tech-studio': { zone: 'engineering', category: 'rf' },
  'basic-science': { zone: 'engineering', category: 'basic-science' },
  electromagnetics: { zone: 'engineering', category: 'electromagnetics' },
  'comm-systems': { zone: 'engineering', category: 'communications' },
  'electronic-circuits': { zone: 'engineering', category: 'circuits' },
  'natural-science': { zone: 'engineering', category: 'nature' },
  'ai-algorithms': { zone: 'engineering', category: 'algorithms' },
  'web-games': { zone: 'games', category: 'web-games' },
  'interactive-novel': { zone: 'games', category: 'fiction' },
  'urban-love': { zone: 'games', category: 'romance' },
  'power-game': { zone: 'games', category: 'history' },
  'literary-creation': { zone: 'games', category: 'literature' },
};
export function resolveRoute(hash) {
  const name = hash.replace(/^#/, '');
  if (legacyRoutes[name]) return legacyRoutes[name];
  if (['welcome', 'engineering', 'ai', 'games', 'life', 'secret'].includes(name)) return { zone: name };
  return { zone: null };
}
