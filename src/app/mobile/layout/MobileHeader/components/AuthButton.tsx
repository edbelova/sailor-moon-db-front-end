import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/useAuth'
import { Button } from '@/shared/components/base/Button/Button'

export function AuthButton() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  if (isAuthenticated) {
    return (
      <Button 
        variant="magical" 
        shape="pill" 
        size="md" 
        onClick={() => logout()} 
        iconLeft="account_circle"
        caption={user?.username}
      />
    )
  }

  return (
    <Button 
      variant="magical" 
      shape="pill" 
      size="md" 
      onClick={() => navigate('/login')} 
      iconLeft="account_circle"
      caption="Login"
    />
  )
}

