import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { Button } from '@/shared/components/base/Button/Button'
import styles from '@/app/mobile/components/base/Drawer/Drawer.module.css'

type DrawerProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}

export function Drawer({ isOpen, onClose, children, title }: DrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('bodyLocked')
    } else {
      document.body.classList.remove('bodyLocked')
    }
    return () => {
      document.body.classList.remove('bodyLocked')
    }
  }, [isOpen])

  return (
    <>
      {/* Dimmed Overlay */}
      <div 
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`} 
        onClick={onClose}
      />
      
      {/* Sliding Panel */}
      <aside className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <Button 
            variant="ghost" 
            shape="circle" 
            size="md" 
            iconLeft="close" 
            onClick={onClose} 
          />
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </aside>
    </>
  )
}
