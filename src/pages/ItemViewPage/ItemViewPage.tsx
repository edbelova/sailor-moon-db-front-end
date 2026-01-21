import { Link, useParams } from 'react-router-dom'
import styles from './ItemViewPage.module.css'
import { useAuth } from '../../features/auth/useAuth'
import { ItemImages } from '../../features/items/components/ItemImages/ItemImages'
import { ItemDetails } from '../../features/items/components/ItemDetails/ItemDetails'
import { ItemDescription } from '../../features/items/components/ItemDescription/ItemDescription'
import { useItemById } from '../../features/items/queries/useItemById'

export function ItemViewPage() {
  const { itemId } = useParams<{ itemId: string}>()
  const { isAdmin } = useAuth()
  const { data: item, isLoading, isError } = useItemById(itemId)

  return (
    <div className={styles.page}>
      {isLoading ? <div>Loading item...</div> : null}
      {isError ? <div>Failed to load item.</div> : null}
      {!item ? null : (
        <>
          <div className={styles.directory}>
            <h1 className={styles.title}>Figures / Wonder Statue Work of Art eternal Sailor Moon</h1>
          </div>
          <div className={styles.pageLinks}>
            {itemId && isAdmin ? <Link to={`/items/${itemId}/edit`}>Edit this item</Link> : null}
          </div>
          <div className={styles.itemLayout}>
            <div className={styles.itemImage}>
              <ItemImages images={item.images} />
            </div>
            <div className={styles.itemDetails}>
              <ItemDetails 
                name={item.name} 
                characters={item.characters} 
                releaseDate={item.releaseDate} 
                manufacturer={item.manufacturer}
                materials={item.materials}
                series={item.series} 
                price={item.price}
                dimensions={item.dimensions}
                country={item.countryOfOrigin}
                />
            </div>
            <div className={styles.itemDescription}>
              <ItemDescription description={item.description} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
