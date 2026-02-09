import { useEffect, useState, type FormEvent } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../features/auth/useAuth'
import styles from './Header.module.css'
import moonIcon from './Moon.svg'
import Logo from './Logo.png'
import searchIcon from './Search.svg'

export function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [search, setSearch] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const searchFromUrl = (params.get('search') ?? '').trim()
    setSearch(searchFromUrl)
  }, [location.search])

  const handleLogout = async () => {
    try {
      await logout()
    } finally {
      navigate('/', { replace: true })
    }
  }

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault()
    const term = search.trim()
    const query = term ? `?search=${encodeURIComponent(term)}` : ''
    navigate({ pathname: '/', search: query })
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>

        <NavLink to="/" end className={styles.brand} aria-label="Home">
          {/* <div className={styles.brandTop}>Pretty Guardian</div>
          <div className={styles.brandMain}>SAILOR MOON</div>
          <div className={styles.brandSub}>MUSEUM DB</div> */}
          <img src={Logo} alt="Sailor Moon" className={styles.brandIcon} />
        </NavLink>

        <div className={styles.controls}>
          <form className={styles.search} role="search" onSubmit={handleSearchSubmit}>
            <img
              src={searchIcon}
              alt=""
              className={styles.searchIcon}
              aria-hidden="true"
            />
            <input
              className={styles.searchInput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search all items"
              aria-label="Search all items"
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

      </div>
    </header>
  )
}
