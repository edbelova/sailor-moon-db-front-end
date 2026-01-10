import { useCategories } from '../queries/categories'
import { useUiStore } from '../state/useUiStore'
import type { Category } from '../types/category'

export function CategoryList() {
  const { data: categories = [], isLoading, isError } = useCategories()
  const activeCategoryId = useUiStore((state) => state.activeCategoryId)
  const setActiveCategoryId = useUiStore((state) => state.setActiveCategoryId)

  const renderCategory = (category: Category, level = 0) => {
    const isActive = category.id === activeCategoryId
    const isChild = level > 0
    const hasChildren = Boolean(category.children?.length)

    return (
      <li key={category.id}>
        <button
          type="button"
          className={`category-button${isChild ? ' is-child' : ''}${
            hasChildren ? ' has-children' : ''
          }${isActive ? ' is-active' : ''}`}
          aria-pressed={isActive}
          onClick={() => setActiveCategoryId(category.id)}
        >
          {category.name}
        </button>
        {category.children?.length ? (
          <ul className="category-children">
            {category.children.map((child) => renderCategory(child, level + 1))}
          </ul>
        ) : null}
      </li>
    )
  }

  return (
    <aside className="app-sidenav">
      <div className="sidenav-section">
        <h2 className="sidenav-heading">Category</h2>
        {isLoading ? (
          <div className="sidenav-placeholder">Loading categories...</div>
        ) : null}
        {isError ? (
          <div className="sidenav-placeholder">Failed to load categories.</div>
        ) : null}
        {!isLoading && !isError ? (
          <ul className="category-tree">
            {categories.map((category) => renderCategory(category))}
          </ul>
        ) : null}
      </div>
    </aside>
  )
}
