import { useCallback, useEffect, useState } from 'react'

const FAVORITES_STORAGE_KEY = 'zhizhi-tavern:favorite-cocktails'

function readFavorites() {
  if (typeof window === 'undefined') return []

  try {
    const savedValue = JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]')
    return Array.isArray(savedValue) ? savedValue : []
  } catch {
    return []
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(readFavorites)

  useEffect(() => {
    const syncFavorites = () => setFavorites(readFavorites())
    window.addEventListener('storage', syncFavorites)
    window.addEventListener('zhizhi:favorites-changed', syncFavorites)

    return () => {
      window.removeEventListener('storage', syncFavorites)
      window.removeEventListener('zhizhi:favorites-changed', syncFavorites)
    }
  }, [])

  const toggleFavorite = useCallback((cocktailId) => {
    const currentFavorites = readFavorites()
    const nextFavorites = currentFavorites.includes(cocktailId)
      ? currentFavorites.filter((id) => id !== cocktailId)
      : [...currentFavorites, cocktailId]

    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(nextFavorites))
    setFavorites(nextFavorites)
    window.dispatchEvent(new Event('zhizhi:favorites-changed'))
  }, [])

  return {
    favorites,
    isFavorite: (cocktailId) => favorites.includes(cocktailId),
    toggleFavorite,
  }
}
