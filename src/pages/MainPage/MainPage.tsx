import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './MainPage.module.css'
import { ItemList } from '../../features/items/components/ItemList/ItemList'
import { useAuth } from '../../features/auth/useAuth'
import { useCategories } from '../../features/categories/queries/useCategories'
import { useCategoryUiStore } from '../../features/categories/state/useCategoryUiStore'
import type { Category } from '../../features/categories/types'

function categoryIdExists(categories: Category[], categoryId: string): boolean {
  return categories.some((category) => {
    if (category.id === categoryId) {
      return true
    }
    return Boolean(
      category.children?.some((child) => child.id === categoryId),
    )
  })
}

export function MainPage() {
  const { data: categories = [], isLoading, isError } = useCategories()
  const activeCategoryId = useCategoryUiStore((state) => state.activeCategoryId)
  const setActiveCategoryId = useCategoryUiStore(
    (state) => state.setActiveCategoryId,
  )
  const navigate = useNavigate()

  const { categoryId } = useParams<{ categoryId: string }>()

  useEffect(() => {
    if (categoryId === undefined) {
      if (activeCategoryId !== null) {
        setActiveCategoryId(null)
      }
      return
    }

    if (isLoading || isError || !categoryId) {
      return
    }

    const categoryExists = categoryIdExists(categories, categoryId)

    if (!categoryExists) {
      if (activeCategoryId !== null) {
        setActiveCategoryId(null)
      }
      navigate('/', { replace: true })
      return
    }

    if (categoryId !== activeCategoryId) {
      setActiveCategoryId(categoryId)
    }
  }, [
    activeCategoryId,
    categories,
    categoryId,
    isError,
    isLoading,
    navigate,
    setActiveCategoryId,
  ])

  const { isAdmin } = useAuth()
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Main screen</h1>
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
