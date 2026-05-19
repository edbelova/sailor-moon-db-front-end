import type { ButtonHTMLAttributes } from 'react'
import type { MaterialIcon } from '@/shared/types/icons'
import styles from '@/app/mobile/components/base/ActionIconButton/ActionIconButton.module.css'
import { Button } from '@/shared/components/base/Button/Button'

export const ActionVariant = {
  HEART: 'heart',
  BOOKMARK: 'bookmark',
} as const

export type ActionVariant = typeof ActionVariant[keyof typeof ActionVariant]

interface ActionIconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: MaterialIcon
  active?: boolean
  variant: ActionVariant
}

export function ActionIconButton({ 
  icon, 
  active = false, 
  variant,
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
    <Button
      variant="ghost"
      shape="circle"
      size="sm"
      iconLeft={icon}
      iconFilled={active}
      className={`${styles.button} ${activeClass} ${className}`.trim()}
      onClick={handleClick}
      {...props}
    />
  )
}
