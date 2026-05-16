import type { ReactNode, HTMLAttributes } from 'react'
import styles from './GlassCard.module.css'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

export function GlassCard({ children, className = '', ...props }: GlassCardProps) {
  return (
    <div className={`${styles.card} ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}
