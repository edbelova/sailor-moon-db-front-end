import type { ButtonHTMLAttributes } from 'react'
import { Button } from '@/shared/components/base/Button/Button'
import styles from '@/app/mobile/components/base/FilterButton/FilterButton.module.css'

interface FilterButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children?: string
  active?: boolean
  hasArrow?: boolean
}

export function FilterButton({ 
  children, 
  active = false, 
  hasArrow = false, 
  className = '',
  ...props 
}: FilterButtonProps) {
  const buttonClass = `${styles.filterButton} ${active ? styles.active : ''} ${className}`.trim()
  
  return (
    <Button 
      variant={active ? "surface" : "neutral"} 
      shape="pill" 
      size="sm" 
      caption={children}
      iconRight={hasArrow ? 'arrow_drop_down' : undefined}
      className={buttonClass} 
      {...props} 
    />
  )
}
