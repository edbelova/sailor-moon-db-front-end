import styles from './ItemFormActions.module.css'
import SaveIcon from './Save.svg'
import DeleteIcon from './TrashBin.svg'

export function ItemFormActions() {

    return (
        <div className={styles.actionsBlock}>
            <button className={styles.saveButton}>
                <img src={SaveIcon} alt="Save" className={styles.icon} />
            </button>
            <button className={styles.deleteButton}>
                <img src={DeleteIcon} alt="Delete" className={styles.icon} />
            </button>
        </div>
    )
}