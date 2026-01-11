import { Link, useParams } from 'react-router-dom'
import styles from './ItemEditPage.module.css'

export function ItemEditPage() {
  const { itemId } = useParams<{ itemId: string }>()

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Edit single item</h1>
      <div>
        Item id: <strong>{itemId}</strong>
      </div>
      <div>Placeholder for edit form.</div>
      <div className={styles.pageLinks}>
        {itemId ? <Link to={`/items/${itemId}`}>View this item</Link> : null}
        <Link to="/">Back to main</Link>
      </div>
    </div>
  )
}
