export const USER_DATA_VERSION = 1

export const growthRules = {
  favoriteRecipeXp: 10,
  completedMixXp: 25,
}

export const mouseLevels = [
  { level: 1, title: '见习调酒鼠', minXp: 0 },
  { level: 2, title: '摇酒小能手', minXp: 100 },
  { level: 3, title: '酒馆风味师', minXp: 260 },
  { level: 4, title: '月光调酒师', minXp: 500 },
]

export const tavernLevels = [
  { level: 1, title: '小木屋酒馆', minXp: 0, nextXp: 100 },
  { level: 2, title: '暖灯街角店', minXp: 100, nextXp: 260 },
  { level: 3, title: '月光故事馆', minXp: 260, nextXp: 500 },
  { level: 4, title: '传奇吱吱酒馆', minXp: 500, nextXp: 900 },
]

export const avatarOptions = {
  fur: [
    { id: 'cream', label: '奶油花枝', color: '#d9b89d', patch: '#705047' },
    { id: 'silver', label: '月光银', color: '#b9b7b2', patch: '#5f6264' },
    { id: 'cocoa', label: '可可棕', color: '#a6785e', patch: '#55372f' },
  ],
  outfit: [
    { id: 'forest-apron', label: '森林围裙', color: '#315b4e' },
    { id: 'berry-vest', label: '莓果马甲', color: '#753c45' },
    { id: 'navy-coat', label: '深蓝礼服', color: '#344a63' },
  ],
  hat: [
    { id: 'chef-cap', label: '主厨帽', symbol: '厨' },
    { id: 'newsboy-cap', label: '报童帽', symbol: '帽' },
    { id: 'no-hat', label: '不戴帽子', symbol: '无' },
  ],
}

const defaultUser = {
  version: USER_DATA_VERSION,
  id: 'local-guest',
  displayName: '我的调酒鼠',
  avatar: {
    fur: 'cream',
    outfit: 'forest-apron',
    hat: 'chef-cap',
  },
  stats: {
    mixologyXp: 0,
    favoriteRecipes: 0,
    completedMixes: 0,
  },
  growthSources: {
    favoritesXp: 0,
    mixesXp: 0,
  },
  tavern: {
    experience: 0,
  },
}

export function getLevelInfo(experience, levels) {
  return [...levels].reverse().find((item) => experience >= item.minXp) || levels[0]
}

export function createDefaultUser() {
  return JSON.parse(JSON.stringify(defaultUser))
}
