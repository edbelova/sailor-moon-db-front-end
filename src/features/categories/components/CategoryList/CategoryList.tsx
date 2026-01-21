import { useState } from 'react'
import { useCategories } from '../../queries/useCategories'
import { useCategoryUiStore } from '../../state/useCategoryUiStore'
import type { Category } from '../../types'
import styles from './CategoryList.module.css'
import { useNavigate } from 'react-router-dom'

export function CategoryList() {
  const { data: categories = [], isLoading, isError } = useCategories()
  const activeCategoryId = useCategoryUiStore((state) => state.activeCategoryId)
  const setActiveCategoryId = useCategoryUiStore(
    (state) => state.setActiveCategoryId,
  )
  const navigate = useNavigate()
  const [expandedParentId, setExpandedParentId] = useState<string | null>(null)
  const firstParentId = categories[0]?.id ?? null
  const resolvedExpandedParentId = expandedParentId
    ? categories.some((category) => category.id === expandedParentId)
      ? expandedParentId
      : firstParentId
    : firstParentId

  const renderCategory = (category: Category, level = 0) => {
    const isActive = category.id === activeCategoryId
    const isChild = level > 0
    const hasChildren = Boolean(category.children?.length)
    const isExpanded = !isChild && resolvedExpandedParentId === category.id

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
          aria-expanded={hasChildren && !isChild ? isExpanded : undefined}
          onClick={() => {
            setActiveCategoryId(category.id)
            navigate(`/${encodeURIComponent(category.id)}`)
            if (!isChild && hasChildren) {
              if (resolvedExpandedParentId !== category.id) {
                setExpandedParentId(category.id)
              }
            }
          }}
        >
          {category.name}
        </button>
        {!isChild && isExpanded && category.children?.length ? (
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
