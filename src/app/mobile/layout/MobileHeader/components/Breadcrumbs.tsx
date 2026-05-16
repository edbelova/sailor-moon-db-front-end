import styles from '../MobileHeader.module.css'

export function Breadcrumbs() {
  return (
    <nav className={styles.breadcrumbs}>
      <span className={styles.crumb}>All items</span>
      <span className="material-symbols-outlined">chevron_right</span>
      <span className={styles.crumb}>Figures</span>
      <span className="material-symbols-outlined">chevron_right</span>
      <span className={`${styles.crumb} ${styles.activeCrumb}`}>Eternal</span>
    </nav>
  )
}
