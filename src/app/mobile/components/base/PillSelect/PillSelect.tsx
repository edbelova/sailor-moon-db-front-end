import type { SelectHTMLAttributes } from 'react'
import styles from './PillSelect.module.css'

interface PillSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  containerClassName?: string
}

export function PillSelect({ 
  containerClassName = '', 
  className = '', 
  children,
  ...props 
}: PillSelectProps) {
  return (
    <div className={`${styles.container} ${containerClassName}`.trim()}>
      <select className={`${styles.select} ${className}`.trim()} {...props}>
        {children}
      </select>
      <span className={`material-symbols-outlined ${styles.arrow}`}>expand_more</span>
    </div>
  )
}
