import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { apiFetch } from '../../shared/api'

export type User = {
  username: string
  roles: string[]
}

type AuthContextValue = {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  isCustomer: boolean
  isLoading: boolean
  login: (username: string, password: string, rememberMe: boolean) => Promise<void>
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refresh = useCallback(async () => {
    setIsLoading(true)
    try {
      const me = await apiFetch<User>('/api/auth/me')
      setUser(me)
    } catch {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const login = useCallback(
    async (username: string, password: string, rememberMe: boolean) => {
      await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password, rememberMe }),
      })
      await refresh()
    },
    [refresh],
  )

  const logout = useCallback(async () => {
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' })
    } finally {
      setUser(null)
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAdmin: Boolean(user?.roles.includes('ADMIN')),
      isCustomer: Boolean(user?.roles.includes('CUSTOMER')),
      isLoading,
      login,
      logout,
      refresh,
    }),
    [user, isLoading, login, logout, refresh],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
