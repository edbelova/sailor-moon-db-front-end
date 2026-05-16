import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../../features/auth/useAuth'
import { PillButton } from '../../../components/base/PillButton/PillButton'
import styles from '../MobileHeader.module.css'

export function AuthButton() {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()

  if (isAuthenticated) {
    return (
      <PillButton variant="magical">
        <span className="material-symbols-outlined">account_circle</span>
        <span className={styles.username}>{user?.username}</span>
      </PillButton>
    )
  }

  return (
    <PillButton variant="magical" onClick={() => navigate('/login')}>
      <span className="material-symbols-outlined">account_circle</span>
      <span>Login</span>
    </PillButton>
  )
}
