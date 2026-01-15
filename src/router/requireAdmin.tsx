import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../features/auth/useAuth'

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth()
  if (isLoading) {
    return null
  }
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />
  }
  return children
}