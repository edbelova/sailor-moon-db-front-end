import { useCallback, useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { User } from './types'
import { apiFetch } from '../../shared/api'

export function useAuth() {
  const queryClient = useQueryClient()

  const meQuery = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => apiFetch<User>('/api/auth/me'),
    retry: false,
  })
  const user = meQuery.data ?? null

  const loginMutation = useMutation({
    mutationFn: ({
      username,
      password,
      rememberMe,
    }: {
      username: string
      password: string
      rememberMe: boolean
    }) =>
      apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password, rememberMe }),
      }),
    onSuccess: async () => {
      // Force a real fetch so a fresh CSRF cookie is minted after login.
      // Spring rotates/clears the token on authentication, so the first POST can fail
      // unless we trigger a GET that goes through the CSRF filter.
      // invalidateQueries alone may not fire without active observers.
      await queryClient.fetchQuery({
        queryKey: ['auth', 'me'],
        queryFn: () => apiFetch<User>('/api/auth/me'),
      })
    },
  })

  const logoutMutation = useMutation({
    mutationFn: () => apiFetch('/api/auth/logout', { method: 'POST' }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['auth', 'me'] })
      queryClient.setQueryData(['auth', 'me'], null)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['auth', 'me'] })
    },
  })

  const login = useCallback(
    async (username: string, password: string, rememberMe: boolean) => {
      await loginMutation.mutateAsync({ username, password, rememberMe })
    },
    [loginMutation],
  )

  const logout = useCallback(async () => {
    await logoutMutation.mutateAsync()
  }, [logoutMutation])

  const refresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['auth', 'me'] })
  }, [queryClient])

  return useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAdmin: Boolean(user?.roles.includes('ADMIN')),
      isCustomer: Boolean(user?.roles.includes('CUSTOMER')),
      isLoading: meQuery.isLoading || meQuery.isFetching,
      login,
      logout,
      refresh,
    }),
    [user, meQuery.isLoading, meQuery.isFetching, login, logout, refresh],
  )
}
