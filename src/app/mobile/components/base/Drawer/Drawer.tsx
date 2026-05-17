import type { ReactNode } from 'react'
import { useEffect } from 'react'
import styles from './Drawer.module.css'

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
          <button className={styles.closeBtn} onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </aside>
    </>
  )
}
