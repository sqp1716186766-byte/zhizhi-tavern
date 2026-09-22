const characterAssets = import.meta.glob('../assets/MouseCharacter/*.{png,webp}', {
  eager: true,
  import: 'default',
  query: '?url',
})

const getAsset = (filename) => characterAssets[`../assets/MouseCharacter/${filename}`]
const happyFallbackImage = getAsset('happy.png')
const happyImage = getAsset('happy.webp')
const idleFallbackImage = getAsset('idle.png')
const idleImage = getAsset('idle.webp')
const mixingFallbackImage = getAsset('mixing.png')
const mixingImage = getAsset('mixing.webp')
const thinkingFallbackImage = getAsset('thinking.png')
const thinkingImage = getAsset('thinking.webp')
const welcomeFallbackImage = getAsset('welcome.png')
const welcomeImage = getAsset('welcome.webp')

export const CHARACTER_RENDER_MODES = Object.freeze({
  SCENE: 'scene',
  TRANSPARENT: 'transparent',
})

// Change this one setting when transparent character assets are ready.
export const CHARACTER_RENDER_CONFIG = Object.freeze({
  defaultMode: CHARACTER_RENDER_MODES.SCENE,
})

export const CHARACTER_STATES = Object.freeze({
  IDLE: 'idle',
  WELCOME: 'welcome',
  THINKING: 'thinking',
  MIXING: 'mixing',
  HAPPY: 'happy',
  POURING: 'pouring',
  ADDING_ICE: 'addingIce',
  SHAKING: 'shaking',
  GARNISHING: 'garnishing',
  CELEBRATE: 'celebrate',
})

export const CHARACTER_PROFILE = Object.freeze({
  name: '吱吱老板',
  role: '吱吱酒馆的固定老板与首席调酒师，也是每位客人的主要互动对象。',
  personality: '温柔、专业、成熟而亲切；善于倾听，重视每一杯酒的平衡与故事。',
  speechStyle: '语气温和笃定，像一位可靠的酒馆主人；简洁、有画面感，偶尔带一点鼠鼠式幽默。',
  favoriteCocktail: '月光曼哈顿',
  greeting: '欢迎来到吱吱酒馆，今晚想让吱吱老板为你调一杯什么味道？',
})

const stateDefinitions = Object.freeze({
  idle: {
    asset: idleImage,
    fallbackAsset: idleFallbackImage,
    visualState: 'idle',
    speech: '老板在吧台等你，慢慢挑选今晚的味道。',
    status: `${CHARACTER_PROFILE.name}等待你的材料`,
    label: '花枝鼠老板正在吧台擦拭酒杯',
  },
  welcome: {
    asset: welcomeImage,
    fallbackAsset: welcomeFallbackImage,
    visualState: 'welcome',
    speech: '欢迎来到吱吱酒馆，今晚想尝试什么味道？',
    status: `${CHARACTER_PROFILE.name}正在欢迎客人`,
    label: '花枝鼠老板微笑着欢迎客人',
  },
  thinking: {
    asset: thinkingImage,
    fallbackAsset: thinkingFallbackImage,
    visualState: 'thinking',
    speech: '让我看看你的酒柜……',
    status: '老板正在翻阅酒谱...',
    label: '花枝鼠老板正在思考新的配方',
  },
  mixing: {
    asset: mixingImage,
    fallbackAsset: mixingFallbackImage,
    visualState: 'mixing',
    speech: '比例和平衡，是一杯好酒的关键。',
    status: '老板正在调酒...',
    label: '花枝鼠老板正在调制鸡尾酒',
  },
  happy: {
    asset: happyImage,
    fallbackAsset: happyFallbackImage,
    visualState: 'happy',
    speech: '完成！这是属于你的特调。',
    status: '调酒完成',
    label: '花枝鼠老板举起新酒谱开心庆祝',
  },
  pouring: {
    asset: mixingImage,
    fallbackAsset: mixingFallbackImage,
    visualState: 'mixing',
    speechState: 'mixing',
    status: '正在加入酒液',
    label: '花枝鼠老板正在加入酒液',
  },
  addingIce: {
    asset: mixingImage,
    fallbackAsset: mixingFallbackImage,
    visualState: 'mixing',
    speechState: 'mixing',
    status: '正在加入冰块',
    label: '花枝鼠老板正在加入冰块',
  },
  shaking: {
    asset: mixingImage,
    fallbackAsset: mixingFallbackImage,
    visualState: 'mixing',
    speechState: 'mixing',
    status: '正在摇晃雪克杯',
    label: '花枝鼠老板正在摇晃雪克杯',
  },
  garnishing: {
    asset: mixingImage,
    fallbackAsset: mixingFallbackImage,
    visualState: 'mixing',
    speechState: 'mixing',
    status: '正在完成最后装饰',
    label: '花枝鼠老板正在装饰鸡尾酒',
  },
  celebrate: {
    asset: happyImage,
    fallbackAsset: happyFallbackImage,
    visualState: 'happy',
    speechState: 'happy',
    status: '新酒谱解锁',
    label: '花枝鼠老板正在庆祝新酒谱解锁',
  },
})

let currentState = CHARACTER_STATES.IDLE
const listeners = new Set()
const preloadPromises = new Map()

export function resolveCharacterState(state) {
  return stateDefinitions[state] ? state : CHARACTER_STATES.IDLE
}

export function getCharacterDefinition(state = currentState, mode = CHARACTER_RENDER_CONFIG.defaultMode) {
  const resolvedState = resolveCharacterState(state)
  const definition = stateDefinitions[resolvedState]
  const speechDefinition = definition.speechState
    ? stateDefinitions[definition.speechState]
    : definition

  const sceneAsset = definition.asset
  const sceneFallbackAsset = definition.fallbackAsset
  const transparentAsset = getAsset(`${definition.visualState}-transparent.webp`)
  const transparentFallbackAsset = getAsset(`${definition.visualState}-transparent.png`)
  const useTransparent = mode === CHARACTER_RENDER_MODES.TRANSPARENT

  return {
    ...definition,
    asset: useTransparent ? (transparentAsset || sceneAsset) : sceneAsset,
    fallbackAsset: useTransparent
      ? (transparentFallbackAsset || sceneFallbackAsset)
      : sceneFallbackAsset,
    mode: useTransparent ? CHARACTER_RENDER_MODES.TRANSPARENT : CHARACTER_RENDER_MODES.SCENE,
    state: resolvedState,
    speech: speechDefinition.speech,
    speaker: CHARACTER_PROFILE.name,
  }
}

export function getCharacterState() {
  return currentState
}

export function setCharacterState(nextState) {
  const resolvedState = resolveCharacterState(nextState)
  if (resolvedState === currentState) return currentState

  currentState = resolvedState
  listeners.forEach((listener) => listener())
  return currentState
}

export function subscribeCharacterState(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function preloadCharacterAssets(mode = CHARACTER_RENDER_CONFIG.defaultMode) {
  if (preloadPromises.has(mode)) return preloadPromises.get(mode)
  if (typeof window === 'undefined' || typeof window.Image === 'undefined') {
    return Promise.resolve([])
  }

  const assets = [...new Map(
    Object.keys(stateDefinitions).map((state) => {
      const { asset, fallbackAsset } = getCharacterDefinition(state, mode)
      return [asset, fallbackAsset]
    }),
  )]
  const loadImage = (asset) => new Promise((resolve, reject) => {
    const image = new window.Image()
    image.onload = () => resolve(asset)
    image.onerror = () => reject(new Error(`Unable to preload character asset: ${asset}`))
    image.src = asset
  })
  const preloadPromise = Promise.allSettled(
    assets.map(([asset, fallbackAsset]) => loadImage(asset).catch(() => loadImage(fallbackAsset))),
  )
  preloadPromises.set(mode, preloadPromise)

  return preloadPromise
}

export const characterService = Object.freeze({
  getDefinition: getCharacterDefinition,
  getState: getCharacterState,
  preload: preloadCharacterAssets,
  setState: setCharacterState,
  subscribe: subscribeCharacterState,
})
