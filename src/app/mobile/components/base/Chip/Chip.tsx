import type { ReactNode, HTMLAttributes } from 'react'
import styles from './Chip.module.css'

type ChipVariant = 'active' | 'accent' | 'neutral'

interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: ChipVariant
  className?: string
  hasArrow?: boolean
}

export function Chip({ 
  children, 
  variant = 'neutral', 
  className = '', 
  hasArrow = false,
  ...props 
}: ChipProps) {
  const chipClass = `${styles.chip} ${styles[variant]} ${className}`.trim()
  
  return (
    <div className={chipClass} {...props}>
      {children}
      {hasArrow && <span className={styles.arrow}>▼</span>}
    </div>
  )
}
