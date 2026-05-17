import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../../features/auth/useAuth'
import { PillButton, PillButtonVariant } from '../../../components/base/PillButton/PillButton'
import styles from '../MobileHeader.module.css'

export function AuthButton() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  if (isAuthenticated) {
    return (
      <PillButton variant={PillButtonVariant.MAGICAL} onClick={() => logout()}>
        <span className="material-symbols-outlined">account_circle</span>
        <span className={styles.username}>{user?.username}</span>
      </PillButton>
    )
  }

  return (
    <PillButton variant={PillButtonVariant.MAGICAL} onClick={() => navigate('/login')}>
      <span className="material-symbols-outlined">account_circle</span>
      <span>Login</span>
    </PillButton>
  )
}

