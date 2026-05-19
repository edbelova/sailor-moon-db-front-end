import type { ButtonHTMLAttributes, CSSProperties } from 'react'
import styles from '@/app/mobile/components/base/IconButton/IconButton.module.css'

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
  // Use a CSS variable for the dynamic size to keep the JSX clean
  const variableStyle = { '--icon-size': `${iconSize}px` } as CSSProperties

  return (
    <button 
      className={`${styles.button} ${className}`.trim()} 
      style={variableStyle}
      {...props}
    >
      <span className="material-symbols-outlined">
        {icon}
      </span>
    </button>
  )
}
