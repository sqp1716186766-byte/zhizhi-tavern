import { createDefaultUser, growthRules, USER_DATA_VERSION } from '../data/user.js'
import { getSavedCreationCount } from './mixingService.js'

const USER_STORAGE_KEY = 'zhizhi-tavern:user-profile'
const FAVORITES_STORAGE_KEY = 'zhizhi-tavern:favorite-cocktails'

function mergeWithDefaults(savedUser) {
  const fallback = createDefaultUser()
  if (!savedUser || typeof savedUser !== 'object') return fallback

  return {
    ...fallback,
    ...savedUser,
    version: USER_DATA_VERSION,
    avatar: { ...fallback.avatar, ...savedUser.avatar },
    stats: { ...fallback.stats, ...savedUser.stats },
    growthSources: { ...fallback.growthSources, ...savedUser.growthSources },
    tavern: { ...fallback.tavern, ...savedUser.tavern },
  }
}

function readFavoriteCount() {
  try {
    const favorites = JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]')
    const classicFavoriteCount = Array.isArray(favorites) ? favorites.length : 0
    return classicFavoriteCount + getSavedCreationCount()
  } catch {
    return getSavedCreationCount()
  }
}

const localUserRepository = {
  load() {
    if (typeof window === 'undefined') return createDefaultUser()

    try {
      const savedUser = JSON.parse(window.localStorage.getItem(USER_STORAGE_KEY) || 'null')
      return mergeWithDefaults(savedUser)
    } catch {
      return createDefaultUser()
    }
  },

  save(user) {
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
    window.dispatchEvent(new Event('zhizhi:user-changed'))
    return user
  },
}

// 未来云端用户系统只需实现 load() / save(user)，页面组件无需修改。
let activeUserRepository = localUserRepository

export function configureUserRepository(repository) {
  if (!repository || typeof repository.load !== 'function' || typeof repository.save !== 'function') {
    throw new TypeError('用户数据仓库必须实现 load() 与 save(user)')
  }
  activeUserRepository = repository
}

export function loadUserProfile() {
  const user = activeUserRepository.load()
  if (typeof window === 'undefined') return user

  const favoriteRecipes = readFavoriteCount()
  const favoritesXp = favoriteRecipes * growthRules.favoriteRecipeXp
  const mixesXp = user.stats.completedMixes * growthRules.completedMixXp
  const totalExperience = favoritesXp + mixesXp

  const syncedUser = {
    ...user,
    stats: {
      ...user.stats,
      favoriteRecipes,
      mixologyXp: totalExperience,
    },
    growthSources: { favoritesXp, mixesXp },
    tavern: { ...user.tavern, experience: totalExperience },
  }

  if (
    syncedUser.stats.favoriteRecipes !== user.stats.favoriteRecipes
    || syncedUser.stats.mixologyXp !== user.stats.mixologyXp
  ) {
    activeUserRepository.save(syncedUser)
  }

  return syncedUser
}

export function updateMouseAvatar(nextAvatar) {
  const user = loadUserProfile()
  return activeUserRepository.save({
    ...user,
    avatar: { ...user.avatar, ...nextAvatar },
  })
}

export function recordCompletedMix() {
  const user = loadUserProfile()
  const completedMixes = user.stats.completedMixes + 1
  const mixesXp = completedMixes * growthRules.completedMixXp
  const totalExperience = user.growthSources.favoritesXp + mixesXp

  return activeUserRepository.save({
    ...user,
    stats: { ...user.stats, completedMixes, mixologyXp: totalExperience },
    growthSources: { ...user.growthSources, mixesXp },
    tavern: { ...user.tavern, experience: totalExperience },
  })
}
