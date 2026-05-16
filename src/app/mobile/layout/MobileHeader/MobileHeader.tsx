import { useAuth } from '../../../../features/auth/useAuth'
import Logo from '../../../desktop/layout/Header/Logo.png'
import styles from './MobileHeader.module.css'
import { useNavigate } from 'react-router-dom'

type MobileHeaderProps = {
  onMenuClick?: () => void
  onFilterClick?: () => void
}

export function MobileHeader({ onMenuClick, onFilterClick }: MobileHeaderProps) {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()

  return (
    <header className={styles.header}>
      {/* Row 1: Logo, Search, Profile */}
      <div className={styles.row1}>
        <img src={Logo} alt="Museum Logo" className={styles.logo} onClick={() => navigate('/')} />
        
        <div className={styles.searchContainer}>
          <div className={styles.searchPill}>
            <span className="material-symbols-outlined">search</span>
            <input 
              type="text" 
              placeholder="Search..." 
              className={styles.searchInput} 
            />
          </div>
        </div>

        {isAuthenticated ? (
          <button className={styles.profileBtn}>
            <span className="material-symbols-outlined">account_circle</span>
            <span className={styles.username}>{user?.username}</span>
          </button>
        ) : (
          <button className={styles.loginBtn} onClick={() => navigate('/login')}>
            <span className="material-symbols-outlined">account_circle</span>
            <span>Login</span>
          </button>
        )}
      </div>

      {/* Row 2: Menu & Breadcrumbs */}
      <div className={styles.row2}>
        <button className={styles.iconBtn} onClick={onMenuClick}>
          <span className="material-symbols-outlined">menu</span>
        </button>
        <nav className={styles.breadcrumbs}>
          <span className={styles.crumb}>All items</span>
          <span className="material-symbols-outlined">chevron_right</span>
          <span className={styles.crumb}>Figures</span>
          <span className="material-symbols-outlined">chevron_right</span>
          <span className={`${styles.crumb} ${styles.activeCrumb}`}>Eternal</span>
        </nav>
      </div>

      {/* Row 3: Filter & Sort Chips */}
      <div className={styles.row3}>
        <button className={styles.filterBtn} onClick={onFilterClick}>
          <span className="material-symbols-outlined">tune</span>
          <span>Filter</span>
        </button>
        <div className={styles.chipsContainer}>
          <div className={`${styles.chip} ${styles.activeChip}`}>
            Release date <span className={styles.chipArrow}>▼</span>
          </div>
          <div className={styles.chip}>Manufacturer</div>
          <div className={styles.chip}>Series</div>
          <div className={styles.chip}>Price</div>
          <div className={styles.chip}>Country</div>
          <div className={styles.chip}>Name</div>
        </div>
      </div>
    </header>
  )
}
