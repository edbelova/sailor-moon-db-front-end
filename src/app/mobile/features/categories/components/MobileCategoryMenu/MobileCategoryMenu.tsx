import { useState } from 'react'
import { useCategories } from '../../../../../../features/categories/queries/useCategories'
import { useCategoryUiStore } from '../../../../../../features/categories/state/useCategoryUiStore'
import type { Category } from '../../../../../../features/categories/types'
import styles from './MobileCategoryMenu.module.css'

type MobileCategoryMenuProps = {
  onCategorySelect: () => void
}

export function MobileCategoryMenu({ onCategorySelect }: MobileCategoryMenuProps) {
  const { data: categories = [] } = useCategories()
  const { activeCategory, setActiveCategory } = useCategoryUiStore()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleParentSelect = (category: Category) => {
    setActiveCategory(category)
    onCategorySelect() // Close drawer on selection
  }

  const toggleExpand = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    setExpandedId(expandedId === id ? null : id)
  }

  const handleChildClick = (category: Category) => {
    setActiveCategory(category)
    onCategorySelect()
  }

  return (
    <nav className={styles.nav}>
      {/* All Categories Option */}
      <div 
        className={`${styles.parentItem} ${!activeCategory ? styles.parentActive : ''}`} 
        onClick={() => {
          setActiveCategory(null)
          onCategorySelect()
        }}
      >
        <span className={styles.parentTitle}>All categories</span>
      </div>

      {categories.map((parent: Category) => {
        const isExpanded = expandedId === parent.id
        const isActive = activeCategory?.id === parent.id
        const hasChildren = parent.children && parent.children.length > 0

        return (
          <div key={parent.id} className={styles.parentGroup}>
            <div 
              className={`${styles.parentItem} ${isActive ? styles.parentActive : ''}`} 
            >
              <span 
                className={styles.parentTitle}
                onClick={() => handleParentSelect(parent)}
              >
                {parent.name}
              </span>
              
              {hasChildren && (
                <button 
                  className={styles.expandBtn}
                  onClick={(e) => toggleExpand(e, parent.id)}
                >
                  <span className="material-symbols-outlined">
                    {isExpanded ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
              )}
            </div>

            {isExpanded && hasChildren && (
              <div className={styles.childrenList}>
                {parent.children?.map((child: Category) => {
                  const isActive = activeCategory?.id === child.id
                  return (
                    <div
                      key={child.id}
                      className={`${styles.childItem} ${isActive ? styles.childActive : ''}`}
                      onClick={() => handleChildClick(child)}
                    >
                      {child.name}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
