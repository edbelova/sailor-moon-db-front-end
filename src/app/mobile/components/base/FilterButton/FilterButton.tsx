import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './FilterButton.module.css'

interface FilterButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  active?: boolean
  hasArrow?: boolean
}

export function FilterButton({ 
  children, 
  active = false, 
  hasArrow = false, 
  className = '',
  ...props 
}: FilterButtonProps) {
  const buttonClass = `${styles.button} ${active ? styles.active : styles.neutral} ${className}`.trim()
  
  return (
    <button className={buttonClass} {...props}>
      <span className={styles.label}>{children}</span>
      {hasArrow && <span className={styles.arrow}>▼</span>}
    </button>
  )
}
