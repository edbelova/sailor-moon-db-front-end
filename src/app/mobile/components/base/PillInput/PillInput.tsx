import type { InputHTMLAttributes } from 'react'
import styles from '@/app/mobile/components/base/PillInput/PillInput.module.css'

export type PillInputSize = 'sm' | 'md' | 'lg'
export type PillInputShape = 'pill' | 'rounded'

interface PillInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  icon?: string
  size?: PillInputSize
  shape?: PillInputShape
  containerClassName?: string
  onClear?: () => void
  onEnter?: () => void
}

export function PillInput({ 
  icon, 
  size = 'md',
  shape = 'pill',
  containerClassName = '', 
  className = '', 
  onClear,
  onEnter,
  onKeyDown,
  ...props 
}: PillInputProps) {
  const containerClass = [
    styles.container,
    styles[`size-${size}`],
    styles[`shape-${shape}`],
    containerClassName
  ].filter(Boolean).join(' ')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 1. Let the specialized handler run first (e.g. PillCombobox list navigation)
    onKeyDown?.(e)
    
    // 2. If it was Enter and NOT prevented (e.g. not picking an item from a list), trigger onEnter
    if (e.key === 'Enter' && onEnter && !e.defaultPrevented) {
      onEnter()
    }
  }

  const showClear = onClear && props.value && String(props.value).length > 0

  return (
    <div className={containerClass}>
      {icon && (
        <span className={`material-symbols-outlined ${styles.icon}`}>{icon}</span>
      )}
      <input 
        className={`${styles.input} ${className}`.trim()} 
        onKeyDown={handleKeyDown}
        {...props} 
      />
      {showClear && (
        <button 
          type="button" 
          className={styles.clearBtn} 
          onClick={(e) => {
            e.stopPropagation()
            onClear()
          }}
          aria-label="Clear input"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      )}
    </div>
  )
}
