const recommendationRules = [
  {
    id: 'moonlit-colada',
    name: '月光椰林',
    englishName: 'Moonlit Colada',
    keywords: ['白朗姆', '朗姆', '椰子酒', '椰浆', '菠萝', '凤梨'],
    flavors: ['椰香绵密', '热带果甜', '朗姆余韵'],
    description: '像把月光、椰林和一点海风搅进杯中，柔软甜香里藏着明亮果酸。',
    ingredients: [
      { name: '白朗姆酒', amount: '45 ml' },
      { name: '椰子酒或椰浆', amount: '25 ml' },
      { name: '菠萝汁', amount: '60 ml' },
      { name: '新鲜青柠汁', amount: '15 ml' },
    ],
    steps: ['所有材料加入装有冰块的摇酒壶。', '用力摇和约 12 秒，让椰香变得轻盈。', '滤入装满碎冰的杯中，以青柠片装饰。'],
    ownerNote: '椰子负责做梦，青柠负责叫醒你。两位都在场，这杯酒才不会甜得迷路。',
    palette: ['#f0d77f', '#6e9b72', '#fff1b8'],
  },
  {
    id: 'squeaky-daiquiri',
    name: '吱吱青柠代基里',
    englishName: 'Squeaky Lime Daiquiri',
    keywords: ['白朗姆', '朗姆', '青柠', '柠檬', '君度'],
    flavors: ['清冽酸甜', '青柠明亮', '甘蔗清香'],
    description: '利落的青柠酸度托住白朗姆的甘蔗香，是一杯干净又精神的夜间开场。',
    ingredients: [
      { name: '白朗姆酒', amount: '50 ml' },
      { name: '新鲜青柠汁', amount: '25 ml' },
      { name: '君度橙酒', amount: '10 ml' },
      { name: '糖浆', amount: '10 ml' },
    ],
    steps: ['将所有材料倒入摇酒壶。', '加入冰块，快速摇和至壶身结霜。', '双重滤入冰镇杯，挤一片青柠皮喷香。'],
    ownerNote: '青柠要现切，朗姆要大方。好喝的代基里从不靠复杂，只靠每一样都认真。',
    palette: ['#c9d56d', '#4f7e52', '#eff5af'],
  },
  {
    id: 'starlight-gin-sour',
    name: '星尘白花',
    englishName: 'Starlight Blossom',
    keywords: ['金酒', '琴酒', '君度', '柠檬', '青柠', '蛋清'],
    flavors: ['柑橘花香', '杜松子', '绵密酸甜'],
    description: '金酒的草本香气穿过柔软泡沫，像星光落在白色小花上，清雅但不单薄。',
    ingredients: [
      { name: '金酒', amount: '45 ml' },
      { name: '君度橙酒', amount: '20 ml' },
      { name: '柠檬汁', amount: '20 ml' },
      { name: '蛋清', amount: '15 ml（可选）' },
    ],
    steps: ['材料不加冰干摇，让蛋清充分起泡。', '加入冰块再次摇和至冰冷。', '细滤入杯，在泡沫上点两滴苦精。'],
    ownerNote: '先干摇再冰摇，是让云朵住进酒杯的小咒语。念错顺序，云就没那么蓬松啦。',
    palette: ['#e9dcc1', '#8e9d75', '#fff6dd'],
  },
  {
    id: 'fireside-whiskey-sour',
    name: '壁炉边的酸',
    englishName: 'Fireside Sour',
    keywords: ['威士忌', '波本', '柠檬', '蜂蜜', '肉桂'],
    flavors: ['谷物暖香', '柠檬酸甜', '蜂蜜圆润'],
    description: '暖烘烘的威士忌被柠檬照亮，再用蜂蜜收住棱角，像在壁炉边听完一个好故事。',
    ingredients: [
      { name: '威士忌', amount: '50 ml' },
      { name: '新鲜柠檬汁', amount: '25 ml' },
      { name: '蜂蜜糖浆', amount: '15 ml' },
      { name: '肉桂粉', amount: '一小撮' },
    ],
    steps: ['威士忌、柠檬汁和蜂蜜糖浆加冰摇和。', '滤入装有大冰块的古典杯。', '在杯面轻撒肉桂，放上柠檬皮。'],
    ownerNote: '蜂蜜别放得太心软，留一点威士忌的脾气，故事才讲得有劲。',
    palette: ['#dc8b36', '#7d3b23', '#f3b95f'],
  },
  {
    id: 'crimson-nocturne',
    name: '绯红夜曲',
    englishName: 'Crimson Nocturne',
    keywords: ['伏特加', '蔓越莓', '红石榴', '君度', '青柠'],
    flavors: ['红果酸甜', '柑橘清香', '干净酒体'],
    description: '一杯透亮的绯红色夜曲，红果酸味与柑橘香层层展开，收尾干净轻快。',
    ingredients: [
      { name: '伏特加', amount: '40 ml' },
      { name: '君度橙酒', amount: '15 ml' },
      { name: '蔓越莓汁', amount: '35 ml' },
      { name: '青柠汁', amount: '15 ml' },
    ],
    steps: ['全部材料加入摇酒壶并加满冰块。', '摇和至酒液充分冰镇。', '双重滤入冰镇杯，以橙皮喷香。'],
    ownerNote: '颜色越漂亮，越不能忘了酸甜平衡。鼠鼠看脸，但调酒从来不只看脸。',
    palette: ['#e55672', '#8d2845', '#ff9c9e'],
  },
  {
    id: 'midnight-mocha',
    name: '午夜榛果',
    englishName: 'Midnight Hazelnut',
    keywords: ['咖啡', '咖啡酒', '奶油', '牛奶', '榛果', '伏特加'],
    flavors: ['烘焙咖啡', '坚果', '丝滑微甜'],
    description: '深夜咖啡的烘焙香裹着柔和坚果甜味，适合把最后一段故事慢慢喝完。',
    ingredients: [
      { name: '伏特加', amount: '35 ml' },
      { name: '咖啡利口酒', amount: '25 ml' },
      { name: '冷萃咖啡', amount: '30 ml' },
      { name: '牛奶或淡奶油', amount: '20 ml' },
    ],
    steps: ['将全部材料加入装冰的摇酒壶。', '充分摇和，打出细腻泡沫。', '滤入杯中，以少量咖啡粉装饰。'],
    ownerNote: '它负责陪你熬夜，不负责保证你睡得着。老板只管好喝，不管明早起床。',
    palette: ['#9a603b', '#40231d', '#d5a475'],
  },
]

const aliases = {
  rum: '朗姆',
  gin: '金酒',
  vodka: '伏特加',
  whisky: '威士忌',
  whiskey: '威士忌',
  lime: '青柠',
  lemon: '柠檬',
  coconut: '椰子',
  pineapple: '菠萝',
  cointreau: '君度',
}

function normalizeIngredients(ingredients) {
  const values = Array.isArray(ingredients)
    ? ingredients
    : String(ingredients || '').split(/[，,、\s\n]+/)

  return values
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
    .map((item) => aliases[item] || item)
}

function selectByIngredients(ingredients) {
  if (ingredients.length === 0) {
    return recommendationRules[Math.floor(Math.random() * recommendationRules.length)]
  }

  const rankedRules = recommendationRules.map((rule) => {
    const matched = ingredients.filter((ingredient) =>
      rule.keywords.some((keyword) => ingredient.includes(keyword) || keyword.includes(ingredient)),
    )

    return { rule, matched, score: matched.length }
  })

  rankedRules.sort((left, right) => right.score - left.score)
  return rankedRules[0]
}

function buildRecommendation(ingredients) {
  const selected = selectByIngredients(ingredients)
  const rule = selected.rule || selected
  const matched = selected.matched || []
  const availableText = matched.length > 0 ? matched.join('、') : ingredients.slice(0, 3).join('、')

  return {
    ...rule,
    suppliedIngredients: ingredients,
    reason: ingredients.length === 0
      ? '今晚就交给鼠鼠的直觉吧！这杯层次清楚、材料也容易准备，很适合作为你的随机惊喜。'
      : `你的酒柜里有${availableText || '一些很有趣的材料'}，它们能撑起这杯酒的主要风味；其余材料只需简单补齐。`,
  }
}

const mockProvider = {
  async recommend(ingredients) {
    const normalizedIngredients = normalizeIngredients(ingredients)
    await new Promise((resolve) => setTimeout(resolve, 1100 + Math.random() * 500))
    return buildRecommendation(normalizedIngredients)
  },
}

// 未来接入远程模型时，只需实现相同的 provider.recommend() 接口并在此处替换。
// 页面与展示组件无需感知 GPT、通义千问、DeepSeek 或其他模型的差异。
let activeProvider = mockProvider

export function configureAiProvider(provider) {
  if (!provider || typeof provider.recommend !== 'function') {
    throw new TypeError('AI provider 必须实现 recommend(ingredients) 方法')
  }
  activeProvider = provider
}

export function recommendCocktail(ingredients) {
  return activeProvider.recommend(ingredients)
}
