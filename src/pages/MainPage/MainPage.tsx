import { Link, useParams } from 'react-router-dom'
import styles from './MainPage.module.css'
import { ItemList } from '../../features/items/components/ItemList/ItemList'
import { useAuth } from '../../features/auth/useAuth'

export function MainPage() {

  const { categoryId } = useParams<{ categoryId: string}>()

  const { isAdmin } = useAuth()
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Main screen</h1>
      <div>{categoryId}</div>
      <div>Placeholder for browse/search/filter UI.</div>
      <div className={styles.itemsSection}>
        <div className={styles.pageLinks}>
          {isAdmin ? <Link to="/items/new">Add item</Link> : null}
        </div>
        <div className={styles.itemsContainer}> 
          <ItemList />
        </div>
      </div>
    </div>
  )
}
