import type { ButtonHTMLAttributes } from 'react'
import styles from './IconButton.module.css'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string
  className?: string
  iconSize?: number
}

export function IconButton({ 
  icon, 
  className = '', 
  iconSize = 20, 
  ...props 
}: IconButtonProps) {
  return (
    <button className={`${styles.button} ${className}`.trim()} {...props}>
      <span 
        className="material-symbols-outlined" 
        style={{ fontSize: `${iconSize}px` }}
      >
        {icon}
      </span>
    </button>
  )
}
