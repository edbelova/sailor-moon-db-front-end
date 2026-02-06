import { useCategoryUiStore } from "../../state/useCategoryUiStore"
import { Link } from 'react-router-dom'
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
            <Link className={styles.breadCrumbsLink} to={`/${activeCategory.parent.id}`}>
                {activeCategory.parent.name}
            </Link>
            <span className={styles.separator}> / </span>
            </>
        )}
        <Link className={styles.breadCrumbsLink} to={`/${activeCategory.id}`}>
            {activeCategory.name}
        </Link>
        </div>
    )
}
