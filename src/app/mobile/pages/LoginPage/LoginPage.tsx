import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../features/auth/useAuth'
import Logo from '../../../desktop/layout/Header/Logo.png'
import styles from './LoginPage.module.css'

export function MobileLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await login(username, password, rememberMe)
      navigate('/', { replace: true })
    } catch {
      setError('Invalid collector ID or password')
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.glassCard}>
          <div className={styles.logoSection}>
            <img
              alt="Sailor Moon Museum Logo"
              className={styles.logo}
              src={Logo}
            />
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="username">
                Username
              </label>
              <input
                className={styles.input}
                id="username"
                name="username"
                placeholder="Enter your collector ID"
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <input
                className={styles.input}
                id="password"
                name="password"
                placeholder="••••••••"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.rememberMeGroup}>
              <input
                className={styles.checkbox}
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className={styles.checkboxLabel} htmlFor="remember-me">
                Remember me
              </label>
            </div>

            <button className={styles.magicalBtn} type="submit">
              Log In
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
