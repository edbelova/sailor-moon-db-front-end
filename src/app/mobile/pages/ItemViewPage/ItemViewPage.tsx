import { useNavigate, useParams } from 'react-router-dom'
import { useItemById } from '../../../../features/items/queries/useItemById'
import { useCategories } from '../../../../features/categories/queries/useCategories'
import { MobileAppLayout } from '../../layout/MobileAppLayout/MobileAppLayout'
import { IconButton } from '../../components/base/IconButton/IconButton'
import { MobileImageGallery } from '../../components/MobileImageGallery/MobileImageGallery'
import { ItemDetailTitle } from '../../components/ItemDetailTitle/ItemDetailTitle'
import { ItemMetadataPanel } from '../../components/ItemMetadataPanel/ItemMetadataPanel'
import { MobileItemDescription } from '../../components/MobileItemDescription/MobileItemDescription'
import styles from './ItemViewPage.module.css'
import type { Category } from '../../../../features/categories/types'

export function MobileItemViewPage() {
  const { itemId } = useParams<{ itemId: string }>()
  const navigate = useNavigate()
  const { data: item, isLoading, isError } = useItemById(itemId)
  const { data: categories = [] } = useCategories()

  if (isLoading) return <div className={styles.loading}>Opening Museum Archive...</div>
  if (isError || !item) return <div className={styles.error}>Item not found in the archives.</div>

  // Find category path for breadcrumbs
  const categoryPath = buildCategoryPath(categories, item.categoryId)

  return (
    <MobileAppLayout
      header={
        <header className={styles.header}>
          <IconButton 
            icon="arrow_back" 
            onClick={() => navigate(-1)} 
            className={styles.backBtn}
          />
        </header>
      }
    >
      <div className={styles.content}>
        <MobileImageGallery imageUrls={item.imageUrls ?? []} />
        
        <ItemDetailTitle 
          name={item.name} 
          categoryPath={categoryPath} 
        />

        <ItemMetadataPanel
          releaseDate={item.releaseDate}
          manufacturer={item.manufacturer}
          materials={item.materials}
          series={item.series}
          season={item.season}
          price={item.price}
          dimensions={item.dimensions}
          country={item.countryOfOrigin}
          characters={item.characters}
        />

        <MobileItemDescription description={item.description} />
      </div>
    </MobileAppLayout>
  )
}

function buildCategoryPath(categories: Category[], id: string): string {
  const findPath = (cats: Category[], targetId: string, path: string[] = []): string[] | null => {
    for (const cat of cats) {
      if (cat.id === targetId) return [...path, cat.name]
      if (cat.children) {
        const found = findPath(cat.children, targetId, [...path, cat.name])
        if (found) return found
      }
    }
    return null
  }

  const pathArray = findPath(categories, id)
  return pathArray ? pathArray.join(' > ') : 'General Collection'
}
