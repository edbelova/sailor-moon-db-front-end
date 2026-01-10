import { Link } from 'react-router-dom'

export function ItemCreatePage() {
  return (
    <div className="page">
      <h1>Add single item</h1>
      <div>Placeholder for new item form.</div>
      <div className="page-links">
        <Link to="/">Back to main</Link>
      </div>
    </div>
  )
}
