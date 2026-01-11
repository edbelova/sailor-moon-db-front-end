import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.title}>
          <NavLink to="/" end>
            Sailor Moon Collection
          </NavLink>
        </div>
        <nav className={styles.nav} aria-label="Header">
          <NavLink to="/items/new">Add item</NavLink>
        </nav>
      </div>
    </header>
  )
}
