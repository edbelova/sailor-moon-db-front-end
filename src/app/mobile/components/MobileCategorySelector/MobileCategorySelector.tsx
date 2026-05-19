import { useState, useRef, useEffect } from 'react'
import type { Category } from '@/features/categories/types'
import styles from '@/app/mobile/components/MobileCategorySelector/MobileCategorySelector.module.css'

type MobileCategorySelectorProps = {
  value: string
  categories: Category[]
  onChange: (id: string) => void
  placeholder?: string
}

export function MobileCategorySelector({
  value,
  categories,
  onChange,
  placeholder = 'Select category...',
}: MobileCategorySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Find the selected path for display (e.g., "Parent > Child")
  const getDisplayValue = () => {
    if (!value) return null
    for (const parent of categories) {
      if (parent.id === value) return parent.name
      const child = parent.children?.find((c) => c.id === value)
      if (child) return `${parent.name} > ${child.name}`
    }
    return null
  }

  const displayValue = getDisplayValue()

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (id: string) => {
    onChange(id)
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsOpen(!isOpen)
    } else if (e.key === 'Escape' && isOpen) {
      setIsOpen(false)
    }
  }

  return (
    <div className={styles.container} ref={containerRef}>
      {/* Trigger */}
      <div 
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={displayValue ? styles.value : styles.placeholder}>
          {displayValue || placeholder}
        </span>
        <span className="material-symbols-outlined">
          {isOpen ? 'expand_less' : 'expand_more'}
        </span>
      </div>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className={styles.popover}>
          {categories.map((cat) => {
            const hasChildren = cat.children && cat.children.length > 0
            
            if (hasChildren) {
              return (
                <div key={cat.id} className={styles.group}>
                  <div className={styles.groupLabel}>{cat.name}</div>
                  {cat.children!.map((child) => (
                    <div 
                      key={child.id} 
                      className={`${styles.option} ${value === child.id ? styles.optionSelected : ''}`}
                      onClick={() => handleSelect(child.id)}
                    >
                      {child.name}
                      {value === child.id && <span className="material-symbols-outlined">check</span>}
                    </div>
                  ))}
                </div>
              )
            }

            // Single leaf category at top level
            return (
              <div 
                key={cat.id} 
                className={`${styles.option} ${value === cat.id ? styles.optionSelected : ''} ${styles.standaloneOption}`}
                onClick={() => handleSelect(cat.id)}
              >
                {cat.name}
                {value === cat.id && <span className="material-symbols-outlined">check</span>}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
