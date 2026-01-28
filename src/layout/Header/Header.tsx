import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../features/auth/useAuth'
import styles from './Header.module.css'
import { useState } from 'react'
import moonIcon from './Moon.svg'
import searchIcon from './Search.svg'

export function Header() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const [q, setQ] = useState("");

  const handleLogout = async () => {
    try {
      await logout()
    } finally {
      navigate('/', { replace: true })
    }
  }

    const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: hook into your search page/filters later
    // navigate(`/items?search=${encodeURIComponent(q)}`);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>

        <NavLink to="/" end className={styles.brand} aria-label="Home">
          <div className={styles.brandTop}>Pretty Guardian</div>
          <div className={styles.brandMain}>SAILOR MOON</div>
          <div className={styles.brandSub}>MUSEUM DB</div>
        </NavLink>

        <div className={styles.controls} />
          <form className={styles.search} role="search" onSubmit={handleSearchSubmit}>
            <img
              src={searchIcon}
              alt=""
              className={styles.searchIcon}
              aria-hidden="true"
            />
            <input
              className={styles.searchInput}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="SEARCH"
              aria-label="Search"
            />
          </form>

          <nav className={styles.nav} aria-label="Authorization">
            {isAuthenticated ? (
              <div className={styles.authControls}>
                <span className={styles.username}>{user?.username}</span>
                <button
                  type="button"
                  className={styles.logoutButton}
                  onClick={handleLogout}
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <NavLink to="/login" className={styles.loginLink}>
                LOGIN
                <img src={moonIcon} alt="Login" />
              </NavLink>
            )}
          </nav>

      </div>
    </header>
  )
}
