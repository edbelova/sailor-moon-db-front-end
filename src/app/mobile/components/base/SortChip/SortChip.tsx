import type { ButtonHTMLAttributes } from 'react'
import { Button } from '@/shared/components/base/Button/Button'
import styles from '@/app/mobile/components/base/SortChip/SortChip.module.css'

interface SortChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children?: string
  active?: boolean
  direction?: 'asc' | 'desc'
}

export function SortChip({ 
  children, 
  active = false, 
  direction, 
  className = '',
  ...props 
}: SortChipProps) {
  const buttonClass = `${styles.sortChip} ${active ? styles.active : ''} ${className}`.trim()
  
  return (
    <Button 
      variant={active ? "surface" : "neutral"} 
      shape="pill" 
      size="sm" 
      caption={children}
      iconRight={direction === 'asc' ? 'arrow_drop_up' : direction === 'desc' ? 'arrow_drop_down' : undefined}
      className={buttonClass} 
      {...props} 
    />
  )
}
