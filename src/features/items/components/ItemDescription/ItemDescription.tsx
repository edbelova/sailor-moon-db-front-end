import styles from './ItemDescription.module.css'
import type { ItemDescriptionProps } from './types'

export function ItemDescription({ description }: ItemDescriptionProps) {
	return (
        <div className={styles.descriptionBlock}>
            <div className={styles.descriptionHeader}>
                <h1 className={styles.title}>Item Description</h1>
            </div>
            <div className={styles.description}>
                <p className={styles.placeholder}>{description}</p>
            </div>
        </div>
	)
}
