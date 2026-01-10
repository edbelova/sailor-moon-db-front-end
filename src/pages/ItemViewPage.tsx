import { Link, useParams } from 'react-router-dom'

export function ItemViewPage() {
  const { itemId } = useParams<{ itemId: string }>()

  return (
    <div className="page">
      <h1>View single item</h1>
      <div>
        Item id: <strong>{itemId}</strong>
      </div>
      <div className="page-links">
        {itemId ? <Link to={`/items/${itemId}/edit`}>Edit this item</Link> : null}
        <Link to="/">Back to main</Link>
      </div>
    </div>
  )
}
