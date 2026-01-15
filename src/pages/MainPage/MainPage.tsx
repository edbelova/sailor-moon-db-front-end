import { Link } from 'react-router-dom'
import styles from './MainPage.module.css'
import { ItemList } from '../../features/items/components/ItemList/ItemList'

export function MainPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Main screen</h1>
      <div>Placeholder for browse/search/filter UI.</div>
      <div className={styles.itemsSection}>
        <div className={styles.pageLinks}>
          <Link to="/items/new">Add item</Link>
        </div>
        <div className={styles.itemsContainer}> 
          <ItemList />
        </div>
      </div>
    </div>
  )
}
