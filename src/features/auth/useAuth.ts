import { useCallback, useEffect, useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { type User, useAuthStore } from './useAuthStore'
import { apiFetch } from '../../shared/api'

export function useAuth() {
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)
  const queryClient = useQueryClient()

  const meQuery = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => apiFetch<User>('/api/auth/me'),
    retry: false,
  })

  useEffect(() => {
    if (meQuery.isSuccess) {
      setUser(meQuery.data ?? null)
      return
    }
    if (meQuery.isError) {
      setUser(null)
    }
  }, [meQuery.data, meQuery.isError, meQuery.isSuccess, setUser])

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
      await queryClient.invalidateQueries({ queryKey: ['auth', 'me'] })
    },
  })

  const logoutMutation = useMutation({
    mutationFn: () => apiFetch('/api/auth/logout', { method: 'POST' }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['auth', 'me'] })
      queryClient.setQueryData(['auth', 'me'], null)
      setUser(null)
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
