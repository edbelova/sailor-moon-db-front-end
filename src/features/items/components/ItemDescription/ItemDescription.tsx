import styles from './ItemDescription.module.css'

export function ItemDescription(description: { description?: string }) {
	return (
        <div className={styles.descriptionBlock}>
            <div className={styles.descriptionHeader}>
                <h1 className={styles.title}>Item Description</h1>
            </div>
            <div className={styles.description}>
                {/* TODO: Show item description; placeholder for now */}
                <p className={styles.placeholder}>{description.description}</p>
            </div>
        </div>
	)
}
