import type { ReactNode } from 'react'
import styles from './Tag.module.css'

interface TagProps {
  children: ReactNode
  className?: string
}

export function Tag({ children, className = '' }: TagProps) {
  return (
    <div className={`${styles.tag} ${className}`.trim()}>
      <span className={styles.label}>{children}</span>
    </div>
  )
}
