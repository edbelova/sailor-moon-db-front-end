import { IconButton } from '../base/IconButton/IconButton'
import styles from './MobileAdminHeader.module.css'

type MobileAdminHeaderProps = {
  onCancel: () => void
  onSave: () => void
  isSaving?: boolean
}

export function MobileAdminHeader({ 
  onCancel, 
  onSave, 
  isSaving = false 
}: MobileAdminHeaderProps) {
  return (
    <header className={`${styles.header} glassHeader`}>
      <button className={styles.cancelBtn} onClick={onCancel} disabled={isSaving}>
        Cancel
      </button>
      
      <IconButton 
        icon={isSaving ? 'sync' : 'save'} 
        onClick={onSave}
        disabled={isSaving}
        className={styles.saveBtn}
        iconSize={24}
      />
    </header>
  )
}
