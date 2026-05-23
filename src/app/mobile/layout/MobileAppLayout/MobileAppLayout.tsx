import type { ReactNode } from 'react'
import styles from '@/app/mobile/layout/MobileAppLayout/MobileAppLayout.module.css'

type MobileAppLayoutProps = {
  children: ReactNode
  header: ReactNode
}

export function MobileAppLayout({ children, header }: MobileAppLayoutProps) {
  return (
    <>
      <div className={styles.headerContainer}>
        {header}
      </div>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <main className={styles.main}>
            {children}
          </main>
        </div>
      </div>
    </>
  )
}
