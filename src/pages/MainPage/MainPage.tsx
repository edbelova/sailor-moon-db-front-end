import { Link, useParams } from 'react-router-dom'
import styles from './MainPage.module.css'
import { ItemList } from '../../features/items/components/ItemList/ItemList'
import { useAuth } from '../../features/auth/useAuth'
import { useCategories } from '../../features/categories/queries/useCategories'
import { useCategoryUiStore } from '../../features/categories/state/useCategoryUiStore'

export function MainPage() {
  const { data: categories = [], isLoading, isError } = useCategories()
  const activeCategoryId = useCategoryUiStore((state) => state.activeCategoryId)
  const setActiveCategoryId = useCategoryUiStore(
    (state) => state.setActiveCategoryId,
  )

  const { categoryId } = useParams<{ categoryId: string }>()

  if (categoryId === undefined) {
    setActiveCategoryId(null)
  } else if (categoryId
    && !isLoading
    && !isError
    && categoryId !== activeCategoryId
    && (
      categories.some(cat => cat.id === categoryId))
      || categories.some(cat => cat.children?.some(child => child.id === categoryId))
    ) {
    setActiveCategoryId(categoryId ?? null)
  }

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
