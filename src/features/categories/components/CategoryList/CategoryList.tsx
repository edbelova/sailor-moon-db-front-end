import { useCategories } from '../../queries/useCategories'
import { useCategoryUiStore } from '../../state/useCategoryUiStore'
import type { Category } from '../../types'
import styles from './CategoryList.module.css'

export function CategoryList() {
  const { data: categories = [], isLoading, isError } = useCategories()
  const activeCategoryId = useCategoryUiStore((state) => state.activeCategoryId)
  const setActiveCategoryId = useCategoryUiStore(
    (state) => state.setActiveCategoryId,
  )

  const renderCategory = (category: Category, level = 0) => {
    const isActive = category.id === activeCategoryId
    const isChild = level > 0
    const hasChildren = Boolean(category.children?.length)

    const buttonClassName = [
      styles.categoryButton,
      isChild ? styles.isChild : null,
      hasChildren ? styles.hasChildren : null,
      isActive ? styles.isActive : null,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <li key={category.id}>
        <button
          type="button"
          className={buttonClassName}
          aria-pressed={isActive}
          onClick={() => setActiveCategoryId(category.id)}
        >
          {category.name}
        </button>
        {category.children?.length ? (
          <ul className={styles.categoryChildren}>
            {category.children.map((child) => renderCategory(child, level + 1))}
          </ul>
        ) : null}
      </li>
    )
  }

  return (
    <aside className={styles.sidenav}>
      <div className={styles.sidenavSection}>
        <h2 className={styles.sidenavHeading}>Category</h2>
        {isLoading ? (
          <div className={styles.sidenavPlaceholder}>
            Loading categories...
          </div>
        ) : null}
        {isError ? (
          <div className={styles.sidenavPlaceholder}>
            Failed to load categories.
          </div>
        ) : null}
        {!isLoading && !isError ? (
          <ul className={styles.categoryTree}>
            {categories.map((category) => renderCategory(category))}
          </ul>
        ) : null}
      </div>
    </aside>
  )
}
