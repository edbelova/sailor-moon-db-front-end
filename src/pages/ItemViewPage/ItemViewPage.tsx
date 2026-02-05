import { Link, useParams } from 'react-router-dom'
import styles from './ItemViewPage.module.css'
import { useAuth } from '../../features/auth/useAuth'
import { ItemImages } from '../../features/items/components/ItemImages/ItemImages'
import { ItemDetails } from '../../features/items/components/ItemDetails/ItemDetails'
import { ItemDescription } from '../../features/items/components/ItemDescription/ItemDescription'
import { useItemById } from '../../features/items/queries/useItemById'
import { CategoryBreadCrumbs } from '../../features/categories/components/CategoryBreadCrumbs/CategoryBreadCrumbs'
import { useCategoryUiStore } from '../../features/categories/state/useCategoryUiStore'
import { useEffect } from 'react'
import { useCategories } from '../../features/categories/queries/useCategories'
import type { Category } from '../../features/categories/types'

export function ItemViewPage() {
  const { itemId } = useParams<{ itemId: string}>()
  const { isAdmin } = useAuth()
  const { data: item, isLoading, isError } = useItemById(itemId)
  const { data: categories = [], isLoading: isCategoriesLoading, isError: isCategoriesError } = useCategories()
  const setActiveCategory = useCategoryUiStore(
      (state) => state.setActiveCategory,
    )
  
  useEffect(() => {
    if (!item?.categoryId || categories.length === 0) {
      return
    }
    const category = findCategoryById(categories, item.categoryId)
    if (category) {
      setActiveCategory(category)
    }
  }, [item?.categoryId, setActiveCategory, categories])

  return (
    <div className={styles.itemPage}>
      {(isLoading || isCategoriesLoading) ? <div>Loading item...</div> : null}
      {(isError || isCategoriesError) ? <div>Failed to load item.</div> : null}
      {!item ? null : (
        <>
          <CategoryBreadCrumbs />
          <div className={styles.pageLinks}>
            {itemId && isAdmin ? <Link to={`/items/${itemId}/edit`}>Edit this item</Link> : null}
          </div>
          <div className={styles.itemLayout}>
            <div className={styles.itemImage}>
              <ItemImages images={item.images} imageUrls={item.imageUrls}/>
            </div>
            <div className={styles.itemDetails}>
              <ItemDetails 
                name={item.name} 
                characters={item.characters}
                season={item.season}
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

function findCategoryById(categories: Category[], id: string): Category | null {
  for (const category of categories) {
    if (category.id === id) {
      return category
    }
    if (category.children?.length) {
      const match = findCategoryById(category.children, id)
      if (match) {
        return match
      }
    }
  }
  return null
}
