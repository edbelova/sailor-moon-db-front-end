import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <div className="app-title">Sailor Moon Collection</div>
        <nav className="app-header-nav" aria-label="Header">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/items/new">Add item</NavLink>
        </nav>
      </div>
    </header>
  )
}
