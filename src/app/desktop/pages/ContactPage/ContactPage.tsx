import { Link, useParams } from 'react-router-dom'
import styles from './ContactPage.module.css'

export function ContactPage() {
  const { itemId } = useParams<{ itemId: string }>()

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Contact us page</h1>
      <div>
        Item id: <strong>{itemId}</strong>
      </div>
      <div className={styles.pageLinks}>
        {itemId ? <Link to={`/items/${itemId}/edit`}>Edit this item</Link> : null}
        <Link to="/">Back to main</Link>
      </div>
    </div>
  )
}