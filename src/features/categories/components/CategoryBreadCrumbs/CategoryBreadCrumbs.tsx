import { useCategoryUiStore } from "../../state/useCategoryUiStore"

import styles from './CategoryBreadCrumbs.module.css'

export function CategoryBreadCrumbs() {
    const activeCategory = useCategoryUiStore((state) => state.activeCategory)

    if (!activeCategory) {
        return null;
    }

    return (
        <div className={styles.directory}>
            {activeCategory.parent && (
                <>
                    <h1 className={styles.breadCrumbs}>{activeCategory.parent.name}</h1>
                    <h1 className={styles.breadCrumbs}> / </h1>
                </>
            )}
            <h1 className={styles.breadCrumbs}>{activeCategory.name}</h1>
        </div>
    )
}
