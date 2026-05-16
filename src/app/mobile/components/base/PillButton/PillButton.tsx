import type { ReactNode, ButtonHTMLAttributes } from 'react'
import styles from './PillButton.module.css'

type PillButtonVariant = 'magical' | 'outline' | 'neutral'

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: PillButtonVariant
  className?: string
}

export function PillButton({ 
  children, 
  variant = 'neutral', 
  className = '', 
  ...props 
}: PillButtonProps) {
  const buttonClass = `${styles.button} ${styles[variant]} ${className}`.trim()
  
  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  )
}
