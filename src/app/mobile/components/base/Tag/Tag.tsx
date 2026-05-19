import type { ReactNode } from 'react'
import styles from '@/app/mobile/components/base/Tag/Tag.module.css'

interface TagProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function Tag({ children, className = '', onClick }: TagProps) {
  return (
    <div 
      className={`${styles.tag} ${className}`.trim()}
      onClick={onClick}
    >
      <span className={styles.label}>{children}</span>
    </div>
  )
}
