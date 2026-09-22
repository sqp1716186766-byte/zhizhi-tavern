const MIX_HISTORY_STORAGE_KEY = 'zhizhi-tavern:mix-history'
const SAVED_CREATIONS_STORAGE_KEY = 'zhizhi-tavern:saved-creations'

function readList(storageKey) {
  if (typeof window === 'undefined') return []

  try {
    const value = JSON.parse(window.localStorage.getItem(storageKey) || '[]')
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

function saveList(storageKey, value) {
  window.localStorage.setItem(storageKey, JSON.stringify(value))
}

export function recordMixSession(recommendation, durationSeconds) {
  const history = readList(MIX_HISTORY_STORAGE_KEY)
  const session = {
    id: `${recommendation.id}-${Date.now()}`,
    cocktailId: recommendation.id,
    name: recommendation.name,
    englishName: recommendation.englishName,
    flavors: recommendation.flavors,
    ingredients: recommendation.ingredients,
    durationSeconds,
    completedAt: new Date().toISOString(),
  }

  saveList(MIX_HISTORY_STORAGE_KEY, [session, ...history].slice(0, 30))
  return session
}

export function isCreationSaved(cocktailId) {
  return readList(SAVED_CREATIONS_STORAGE_KEY).some((item) => item.id === cocktailId)
}

export function toggleSavedCreation(recommendation) {
  const savedCreations = readList(SAVED_CREATIONS_STORAGE_KEY)
  const alreadySaved = savedCreations.some((item) => item.id === recommendation.id)
  const nextCreations = alreadySaved
    ? savedCreations.filter((item) => item.id !== recommendation.id)
    : [
        ...savedCreations,
        {
          id: recommendation.id,
          name: recommendation.name,
          englishName: recommendation.englishName,
          flavors: recommendation.flavors,
          ingredients: recommendation.ingredients,
          savedAt: new Date().toISOString(),
        },
      ]

  saveList(SAVED_CREATIONS_STORAGE_KEY, nextCreations)
  window.dispatchEvent(new Event('zhizhi:favorites-changed'))
  return !alreadySaved
}

export function getSavedCreationCount() {
  return readList(SAVED_CREATIONS_STORAGE_KEY).length
}
