import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../features/auth/useAuth'
import styles from './LoginPage.module.css'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ username: '', password: '', rememberMe: false })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange =
    (field: 'username' | 'password' | 'rememberMe') =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value =
        field === 'rememberMe' ? event.target.checked : event.target.value
      setForm((prev) => ({ ...prev, [field]: value }))
    }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await login(form.username, form.password, form.rememberMe)
      navigate('/', { replace: true })
    } catch (err: any) {
      setError(err?.error || 'Login failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Log in</h1>
        <label className={styles.label}>
          Username
          <input
            type="text"
            value={form.username}
            onChange={handleChange('username')}
            className={styles.input}
            required
            autoComplete="username"
          />
        </label>
        <label className={styles.label}>
          Password
          <input
            type="password"
            value={form.password}
            onChange={handleChange('password')}
            className={styles.input}
            required
            autoComplete="current-password"
          />
        </label>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={form.rememberMe}
            onChange={handleChange('rememberMe')}
          />
          <span>Remember me</span>
        </label>
        {error ? <div className={styles.error}>{error}</div> : null}
        <button
          type="submit"
          className={styles.button}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in…' : 'Log in'}
        </button>
        <Link className={styles.link} to="/">
          Back to home
        </Link>
      </form>
    </div>
  )
}
