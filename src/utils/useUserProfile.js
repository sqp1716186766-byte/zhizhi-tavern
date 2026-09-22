import { useCallback, useEffect, useState } from 'react'

import { loadUserProfile, updateMouseAvatar } from '../services/userService.js'

export function useUserProfile() {
  const [user, setUser] = useState(loadUserProfile)

  useEffect(() => {
    const syncUser = () => setUser(loadUserProfile())
    window.addEventListener('storage', syncUser)
    window.addEventListener('zhizhi:user-changed', syncUser)
    window.addEventListener('zhizhi:favorites-changed', syncUser)

    return () => {
      window.removeEventListener('storage', syncUser)
      window.removeEventListener('zhizhi:user-changed', syncUser)
      window.removeEventListener('zhizhi:favorites-changed', syncUser)
    }
  }, [])

  const changeAvatar = useCallback((nextAvatar) => {
    setUser(updateMouseAvatar(nextAvatar))
  }, [])

  return { user, changeAvatar }
}
