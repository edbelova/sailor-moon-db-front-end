import { Link, useLocation } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  const location = useLocation()

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Not found</h1>
      <div>
        No route matches <code>{location.pathname}</code>
      </div>
      <div className={styles.pageLinks}>
        <Link to="/">Go home</Link>
      </div>
    </div>
  )
}
