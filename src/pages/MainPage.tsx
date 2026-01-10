import { Link } from 'react-router-dom'

const exampleItemId = '1'

export function MainPage() {
  return (
    <div className="page">
      <h1>Main screen</h1>
      <div>Placeholder for browse/search/filter UI.</div>
      <div className="page-links">
        <Link to="/items/new">Add item</Link>
        <Link to={`/items/${exampleItemId}`}>View item #{exampleItemId}</Link>
      </div>
    </div>
  )
}
