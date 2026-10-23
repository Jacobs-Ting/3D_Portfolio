import { portfolio } from './portfolio.js';
// 原站已有連結的創作與構想分開；Online Dating Story 以新提供的中文作品名呈現。
export const creations = [
  ...portfolio.filter(item => item.zone === 'games'),
  ...['懸疑偵探互動小說', '校園靈異互動小說', '科幻機甲故事'].map((title, index) => ({
    id: `idea-${index}`, title, category: 'concept', categoryLabel: '創作構想',
    status: 'concept', description: '創作構想，尚未公開可遊玩版本。',
    technologies: [], url: '', thumbnail: '', symbol: '✧',
  })),
];
