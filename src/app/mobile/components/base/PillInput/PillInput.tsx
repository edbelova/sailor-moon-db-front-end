import type { InputHTMLAttributes } from 'react'
import styles from '@/app/mobile/components/base/PillInput/PillInput.module.css'

export type PillInputSize = 'sm' | 'md' | 'lg'
export type PillInputShape = 'pill' | 'rounded'

interface PillInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  icon?: string
  size?: PillInputSize
  shape?: PillInputShape
  containerClassName?: string
}

export function PillInput({ 
  icon, 
  size = 'md',
  shape = 'pill',
  containerClassName = '', 
  className = '', 
  ...props 
}: PillInputProps) {
  const containerClass = [
    styles.container,
    styles[`size-${size}`],
    styles[`shape-${shape}`],
    containerClassName
  ].filter(Boolean).join(' ')

  return (
    <div className={containerClass}>
      {icon && (
        <span className={`material-symbols-outlined ${styles.icon}`}>{icon}</span>
      )}
      <input className={`${styles.input} ${className}`.trim()} {...props} />
    </div>
  )
}
