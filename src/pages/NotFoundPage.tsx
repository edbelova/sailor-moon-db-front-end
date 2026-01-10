import { Link, useLocation } from 'react-router-dom'

export function NotFoundPage() {
  const location = useLocation()

  return (
    <div className="page">
      <h1>Not found</h1>
      <div>
        No route matches <code>{location.pathname}</code>
      </div>
      <div className="page-links">
        <Link to="/">Go home</Link>
      </div>
    </div>
  )
}
