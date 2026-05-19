import type { ReactNode } from 'react'
import styles from '@/app/mobile/components/MobileFormField/MobileFormField.module.css'

type MobileFormFieldProps = {
  label: string
  children: ReactNode
  error?: string
}

export function MobileFormField({ label, children, error }: MobileFormFieldProps) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        {children}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
