import styles from './ItemDescriptionForm.module.css'
import { useItemFormStore } from '../../state/useItemFormStore'

export function ItemDescriptionForm() {
    const description = useItemFormStore((state) => state.values.description)
    const setField = useItemFormStore((state) => state.setField)

    return (
        <div className={styles.descriptionBlock}>
            <div className={styles.descriptionHeader}>
                <h1 className={styles.title}>Item Description</h1>
            </div>
            <div className={styles.description}>
                <textarea 
                    className={styles.placeholder}
                    value={description}
                    onChange={(e) => setField('description', e.target.value)}
                    placeholder="Enter item description..."
                    rows={6}
                />
            </div>
        </div>
    )
}
