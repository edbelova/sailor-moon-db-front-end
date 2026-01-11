import { Link } from 'react-router-dom'
import styles from './ItemCreatePage.module.css'

export function ItemCreatePage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Add single item</h1>
      <div>Placeholder for new item form.</div>
      <div className={styles.pageLinks}>
        <Link to="/">Back to main</Link>
      </div>
    </div>
  )
}
