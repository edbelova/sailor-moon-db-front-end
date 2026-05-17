import { IconButton } from '../base/IconButton/IconButton'
import styles from './MobileAdminHeader.module.css'

type MobileAdminHeaderProps = {
  onCancel: () => void
  onSave: () => void
  onDelete?: () => void
  isSaving?: boolean
}

export function MobileAdminHeader({ 
  onCancel, 
  onSave, 
  onDelete,
  isSaving = false 
}: MobileAdminHeaderProps) {
  return (
    <header className={`${styles.header} glassHeader`}>
      <button className={styles.cancelBtn} onClick={onCancel} disabled={isSaving}>
        Cancel
      </button>
      
      <div className={styles.rightActions}>
        {onDelete && (
          <IconButton 
            icon="delete" 
            onClick={onDelete} 
            disabled={isSaving}
            className={styles.deleteBtn}
            iconSize={24}
          />
        )}
        <IconButton 
          icon={isSaving ? 'sync' : 'save'} 
          onClick={onSave}
          disabled={isSaving}
          className={styles.saveBtn}
          iconSize={24}
        />
      </div>
    </header>
  )
}
