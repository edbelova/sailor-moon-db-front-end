import type { ReactNode, HTMLAttributes } from 'react'
import styles from './Chip.module.css'

export const ChipVariant = {
  ACTIVE: 'active',
  ACCENT: 'accent',
  NEUTRAL: 'neutral',
} as const

export type ChipVariant = typeof ChipVariant[keyof typeof ChipVariant]

interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: ChipVariant
  className?: string
  hasArrow?: boolean
}


export function Chip({ 
  children, 
  variant = ChipVariant.NEUTRAL, 
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
