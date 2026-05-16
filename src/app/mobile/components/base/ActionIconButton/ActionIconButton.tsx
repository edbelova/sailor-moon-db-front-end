import type { ButtonHTMLAttributes } from 'react'
import styles from './ActionIconButton.module.css'
import { IconButton } from '../IconButton/IconButton'

export const ActionVariant = {
  HEART: 'heart',
  BOOKMARK: 'bookmark',
} as const

export type ActionVariant = typeof ActionVariant[keyof typeof ActionVariant]

interface ActionIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string
  active?: boolean
  variant: ActionVariant
  iconSize?: number
}

export function ActionIconButton({ 
  icon, 
  active = false, 
  variant,
  iconSize = 18,
  className = '',
  onClick,
  ...props 
}: ActionIconButtonProps) {
  const activeClass = active 
    ? (variant === ActionVariant.HEART ? styles.heartActive : styles.bookmarkActive) 
    : ''
    
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onClick?.(e)
  }

  return (
    <IconButton
      icon={icon}
      iconSize={iconSize}
      className={`${styles.button} ${activeClass} ${className}`.trim()}
      onClick={handleClick}
      {...props}
    />
  )
}
