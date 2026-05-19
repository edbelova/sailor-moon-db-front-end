import type { InputHTMLAttributes } from 'react'
import styles from '@/app/mobile/components/base/PillInput/PillInput.module.css'

interface PillInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: string
  containerClassName?: string
}

export function PillInput({ 
  icon, 
  containerClassName = '', 
  className = '', 
  ...props 
}: PillInputProps) {
  return (
    <div className={`${styles.container} ${containerClassName}`.trim()}>
      {icon && (
        <span className="material-symbols-outlined">{icon}</span>
      )}
      <input className={`${styles.input} ${className}`.trim()} {...props} />
    </div>
  )
}
