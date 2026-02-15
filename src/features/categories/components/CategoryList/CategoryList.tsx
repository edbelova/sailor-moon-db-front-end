import { useState } from 'react'
import { useCategories } from '../../queries/useCategories'
import { useCategoryUiStore } from '../../state/useCategoryUiStore'
import type { Category } from '../../types'
import styles from './CategoryList.module.css'
import { useNavigate } from 'react-router-dom'

export function CategoryList() {
  const { data: categories = [], isLoading, isError } = useCategories()
  const activeCategory = useCategoryUiStore((state) => state.activeCategory)
  const isAllActive = activeCategory === null
  const setActiveCategory = useCategoryUiStore(
    (state) => state.setActiveCategory,
  )
  const navigate = useNavigate()
  const [collapsedParentId, setCollapsedParentId] = useState<string | null>(null)
  let expandedParentId: string | null = null
  if (activeCategory !== null) {
    if (activeCategory.parent) {
      expandedParentId = activeCategory.parent.id
    } else if (activeCategory.children?.length) {
      expandedParentId = activeCategory.id
    }
  }

  let resolvedExpandedParentId = expandedParentId
  if (resolvedExpandedParentId === collapsedParentId) {
    resolvedExpandedParentId = null
  }

  const validatedExpandedParentId =
    resolvedExpandedParentId !== null &&
    categories.some((category) => category.id === resolvedExpandedParentId)
      ? resolvedExpandedParentId
      : null

  const renderCategory = (category: Category, level = 0) => {
    const isActive = category.id === (activeCategory?.id ?? null)
    const isChild = level > 0
    const hasChildren = Boolean(category.children?.length)
    const isExpanded =
      !isChild &&
      activeCategory !== null &&
      validatedExpandedParentId === category.id

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
            setActiveCategory(category)
            navigate(`/${encodeURIComponent(category.id)}`)
            if (!isChild && hasChildren) {
              setCollapsedParentId(
                validatedExpandedParentId === category.id ? category.id : null,
              )
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
              <li>
                <button
                  type="button"
                  className={`${styles.categoryButton} ${styles.headingButton} ${isAllActive ? styles.isActive : ''}  `}
                  onClick={() => {
                    setActiveCategory(null)
                    navigate('/')
                  }}
                >
                  All categories
                </button>
              </li>
              {categories.map((category) => renderCategory(category))}
            </ul>
        ) : null}
      </div>
    </aside>
  )
}
