import { useCategoryUiStore } from '../../../../../features/categories/state/useCategoryUiStore'
import type { Category } from '../../../../../features/categories/types'
import styles from '../MobileHeader.module.css'

export function Breadcrumbs() {
  const { activeCategory, setActiveCategory } = useCategoryUiStore()

  const handleReset = () => {
    setActiveCategory(null)
  }

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category)
  }

  // Build the trail of categories
  const trail: Category[] = []
  let current = activeCategory
  while (current) {
    trail.unshift(current)
    current = current.parent
  }

  return (
    <nav className={styles.breadcrumbs}>
      {/* Root Breadcrumb */}
      <span 
        className={`${styles.crumb} ${!activeCategory ? styles.activeCrumb : ''}`} 
        onClick={handleReset}
      >
        All categories
      </span>

      {/* Dynamic Trail */}
      {trail.map((cat, index) => {
        const isLast = index === trail.length - 1
        return (
          <div key={cat.id} className={styles.crumbGroup}>
            <span className="material-symbols-outlined">chevron_right</span>
            <span 
              className={`${styles.crumb} ${isLast ? styles.activeCrumb : ''}`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat.name}
            </span>
          </div>
        )
      })}
    </nav>
  )
}
