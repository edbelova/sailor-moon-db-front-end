import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './MainPage.module.css'
import { ItemsGrid } from '../../features/items/components/ItemList/ItemsGrid'
import { useAuth } from '../../features/auth/useAuth'
import { useCategories } from '../../features/categories/queries/useCategories'
import { useCategoryUiStore } from '../../features/categories/state/useCategoryUiStore'
import type { Category } from '../../features/categories/types'
import { CategoryBreadCrumbs } from '../../features/categories/components/CategoryBreadCrumbs/CategoryBreadCrumbs'
import { ItemsFilters } from '../../features/items/components/ItemsFilters/ItemsFilters'

function findCategoryById(categories: Category[], categoryId: string): Category | null {
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
  const isLeafCategory = Boolean(activeCategory && !activeCategory.children?.length)

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
      <CategoryBreadCrumbs />
      <div className={styles.itemsSection}>
        {isAdmin && isLeafCategory && (
          <div className={styles.pageLinks}>
            <Link to="/items/new">Add item</Link>
          </div>
        )}
        <ItemsFilters />
        <div className={styles.itemsContainer}>
          <ItemsGrid />
        </div>
      </div>
    </div>
  )
}
