import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './MainPage.module.css'
import { ItemList } from '../../features/items/components/ItemList/ItemList'
import { useAuth } from '../../features/auth/useAuth'
import { useCategories } from '../../features/categories/queries/useCategories'
import { useCategoryUiStore } from '../../features/categories/state/useCategoryUiStore'
import type { Category } from '../../features/categories/types'

function findCategoryById(
  categories: Category[],
  categoryId: string,
): Category | null {
  for (const category of categories) {
    if (category.id === categoryId) {
      return category
    }
    const childMatch = category.children?.find(
      (child) => child.id === categoryId,
    )
    if (childMatch) {
      return childMatch
    }
  }
  return null
}

export function MainPage() {
  const { data: categories = [], isLoading, isError } = useCategories()
  const activeCategory = useCategoryUiStore((state) => state.activeCategory)
  const setActiveCategory = useCategoryUiStore(
    (state) => state.setActiveCategory,
  )
  const activeCategoryId = activeCategory?.id ?? null
  const navigate = useNavigate()

  const { categoryId } = useParams<{ categoryId: string }>()

  useEffect(() => {
    if (categoryId === undefined) {
      if (activeCategoryId !== null) {
        setActiveCategory(null)
      }
      return
    }

    if (isLoading || isError || !categoryId) {
      return
    }

    const category = findCategoryById(categories, categoryId)

    if (!category) {
      if (activeCategoryId !== null) {
        setActiveCategory(null)
      }
      navigate('/', { replace: true })
      return
    }

    if (categoryId !== activeCategoryId) {
      setActiveCategory(category)
    }
  }, [
    activeCategoryId,
    categories,
    categoryId,
    isError,
    isLoading,
    navigate,
    setActiveCategory,
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
