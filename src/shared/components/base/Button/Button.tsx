import type { ButtonHTMLAttributes } from 'react'
import type { MaterialIcon } from '@/shared/types/icons'
import styles from './Button.module.css'

export type ButtonVariant = 'magical' | 'surface' | 'neutral' | 'ghost'
export type ButtonShape = 'pill' | 'circle'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant: ButtonVariant
  shape: ButtonShape
  size: ButtonSize
  caption?: string
  iconLeft?: MaterialIcon
  iconRight?: MaterialIcon
  iconFilled?: boolean
  active?: boolean
}

export function Button({ 
  variant, 
  shape, 
  size, 
  caption, 
  iconLeft, 
  iconRight,
  iconFilled = false,
  active = false,
  className = '', 
  ...props 
}: ButtonProps) {
  const buttonClass = [
    styles.button,
    styles[`variant-${variant}`],
    styles[`shape-${shape}`],
    styles[`size-${size}`],
    iconFilled ? styles.iconFilled : '',
    active ? styles.active : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <button className={buttonClass} {...props}>
      {iconLeft && (
        <span className={`material-symbols-outlined ${styles.icon}`}>{iconLeft}</span>
      )}
      {caption && <span>{caption}</span>}
      {iconRight && (
        <span className={`material-symbols-outlined ${styles.icon}`}>{iconRight}</span>
      )}
    </button>
  )
}
