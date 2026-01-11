import { Link } from 'react-router-dom'
import styles from './MainPage.module.css'

const exampleItemId = '1'

export function MainPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Main screen</h1>
      <div>Placeholder for browse/search/filter UI.</div>
      <div className={styles.pageLinks}>
        <Link to="/items/new">Add item</Link>
        <Link to={`/items/${exampleItemId}`}>View item #{exampleItemId}</Link>
      </div>
    </div>
  )
}
