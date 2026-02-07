import { useCategoryUiStore } from "../../state/useCategoryUiStore"
import { Link } from 'react-router-dom'
import styles from './CategoryBreadCrumbs.module.css'

export function CategoryBreadCrumbs() {
    const activeCategory = useCategoryUiStore((state) => state.activeCategory)
    const parentCategory = activeCategory?.parent

    return (
        <div className={styles.directory}>
        <Link className={styles.breadCrumbsLink} to="/">
            All items
        </Link>
        {activeCategory && <span className={styles.separator}> &gt; </span>}
        {parentCategory && (
            <>
            <Link className={styles.breadCrumbsLink} to={`/${parentCategory.id}`}>
                {parentCategory.name}
            </Link>
            <span className={styles.separator}> &gt; </span>
            </>
        )}
        {activeCategory && (
            <Link className={styles.breadCrumbsLink} to={`/${activeCategory.id}`}>
                {activeCategory.name}
            </Link>
        )}
        </div>
    )
}
