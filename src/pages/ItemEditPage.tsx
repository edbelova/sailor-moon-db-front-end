import { Link, useParams } from 'react-router-dom'

export function ItemEditPage() {
  const { itemId } = useParams<{ itemId: string }>()

  return (
    <div className="page">
      <h1>Edit single item</h1>
      <div>
        Item id: <strong>{itemId}</strong>
      </div>
      <div>Placeholder for edit form.</div>
      <div className="page-links">
        {itemId ? <Link to={`/items/${itemId}`}>View this item</Link> : null}
        <Link to="/">Back to main</Link>
      </div>
    </div>
  )
}
