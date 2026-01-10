import { NavLink } from 'react-router-dom'

const exampleItemId = '1'

export function SideNav() {
  return (
    <aside className="app-sidenav">
      <nav aria-label="Sidebar">
        <ul>
          <li>
            <NavLink to="/" end>
              Main
            </NavLink>
          </li>
          <li>
            <NavLink to="/items/new">Add item</NavLink>
          </li>
          <li>
            <NavLink to={`/items/${exampleItemId}`} end>
              View item #{exampleItemId}
            </NavLink>
          </li>
          <li>
            <NavLink to={`/items/${exampleItemId}/edit`}>
              Edit item #{exampleItemId}
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
