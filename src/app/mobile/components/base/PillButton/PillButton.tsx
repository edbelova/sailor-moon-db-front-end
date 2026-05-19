import type { ReactNode, ButtonHTMLAttributes } from 'react'
import styles from '@/app/mobile/components/base/PillButton/PillButton.module.css'

export const PillButtonVariant = {
  MAGICAL: 'magical',
  OUTLINE: 'outline',
  NEUTRAL: 'neutral',
} as const

export type PillButtonVariant = typeof PillButtonVariant[keyof typeof PillButtonVariant]

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: PillButtonVariant
  className?: string
}


export function PillButton({ 
  children, 
  variant = PillButtonVariant.NEUTRAL, 
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
