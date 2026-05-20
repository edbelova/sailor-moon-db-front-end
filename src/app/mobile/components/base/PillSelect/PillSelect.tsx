import type { SelectHTMLAttributes } from 'react'
import styles from '@/app/mobile/components/base/PillSelect/PillSelect.module.css'

export type PillSelectSize = 'sm' | 'md' | 'lg'
export type PillSelectShape = 'pill' | 'rounded'

interface PillSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: PillSelectSize
  shape?: PillSelectShape
  containerClassName?: string
}

export function PillSelect({ 
  size = 'md',
  shape = 'pill',
  containerClassName = '', 
  className = '', 
  children,
  ...props 
}: PillSelectProps) {
  const containerClass = [
    styles.container,
    styles[`size-${size}`],
    styles[`shape-${shape}`],
    containerClassName
  ].filter(Boolean).join(' ')

  return (
    <div className={containerClass}>
      <select className={`${styles.select} ${className}`.trim()} {...props}>
        {children}
      </select>
      <span className={`material-symbols-outlined ${styles.arrow}`}>expand_more</span>
    </div>
  )
}
