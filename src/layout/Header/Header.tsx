import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../features/auth/useAuth'
import styles from './Header.module.css'

export function Header() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
    } finally {
      navigate('/', { replace: true })
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.title}>
          <NavLink to="/" end>
            Sailor Moon Collection
          </NavLink>
        </div>
        <nav className={styles.nav} aria-label="Header">
          {isAdmin ? <NavLink to="/items/new">Add item</NavLink> : null}
          {isAuthenticated ? (
            <div className={styles.authControls}>
              <span className={styles.username}>{user?.username}</span>
              <button
                type="button"
                className={styles.logoutButton}
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          ) : (
            <NavLink to="/login">Log in</NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}
