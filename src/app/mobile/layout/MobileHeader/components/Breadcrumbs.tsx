import { useNavigate } from 'react-router-dom'
import { useCategoryUiStore } from '../../../../../features/categories/state/useCategoryUiStore'
import type { Category } from '../../../../../features/categories/types'
import styles from '../MobileHeader.module.css'

type BreadcrumbsProps = {
  category?: Category | null
}

export function Breadcrumbs({ category }: BreadcrumbsProps) {
  const { activeCategory: storeCategory } = useCategoryUiStore()
  const navigate = useNavigate()

  // Use the passed category if available (detail page), otherwise use the store (gallery)
  const currentCategory = category !== undefined ? category : storeCategory

  const handleReset = () => {
    navigate('/')
  }

  const handleCategoryClick = (cat: Category) => {
    navigate(`/${cat.id}`)
  }

  // Build the trail of categories
  const trail: Category[] = []
  let current = currentCategory
  while (current) {
    trail.unshift(current)
    current = current.parent
  }

  return (
    <nav className={styles.breadcrumbs}>
      {/* Root Breadcrumb */}
      <span 
        className={`${styles.crumb} ${!currentCategory ? styles.activeCrumb : ''}`} 
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
