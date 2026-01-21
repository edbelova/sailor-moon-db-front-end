import { useState } from 'react'
import styles from './ItemDescriptionForm.module.css'

export function ItemDescriptionForm() {
    const [description, setDescription] = useState('')

    return (
        <div className={styles.descriptionBlock}>
            <div className={styles.descriptionHeader}>
                <h1 className={styles.title}>Item Description</h1>
            </div>
            <div className={styles.description}>
                <textarea 
                    className={styles.placeholder}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter item description..."
                    rows={6}
                />
            </div>
        </div>
    )
}