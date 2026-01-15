import { Link, useParams } from 'react-router-dom'
import styles from './ItemViewPage.module.css'
import { useAuth } from '../../features/auth/useAuth'

export function ItemViewPage() {
  const { itemId } = useParams<{ itemId: string }>()
  const { isAdmin } = useAuth()

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>View single item</h1>
      <div>
        Item id: <strong>{itemId}</strong>
      </div>
      <div className={styles.pageLinks}>
        {itemId && isAdmin ? <Link to={`/items/${itemId}/edit`}>Edit this item</Link> : null}
        <Link to="/">Back to main</Link>
      </div>
    </div>
  )
}
