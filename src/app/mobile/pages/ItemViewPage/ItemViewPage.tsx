import { useNavigate, useParams } from 'react-router-dom'
import { useItemById } from '../../../../features/items/queries/useItemById'
import { useCategories } from '../../../../features/categories/queries/useCategories'
import { useCategoryUiStore } from '../../../../features/categories/state/useCategoryUiStore'
import { MobileAppLayout } from '../../layout/MobileAppLayout/MobileAppLayout'
import { IconButton } from '../../components/base/IconButton/IconButton'
import { MobileImageGallery } from '../../components/MobileImageGallery/MobileImageGallery'
import { ItemDetailTitle } from '../../components/ItemDetailTitle/ItemDetailTitle'
import { ItemMetadataPanel } from '../../components/ItemMetadataPanel/ItemMetadataPanel'
import { MobileItemDescription } from '../../components/MobileItemDescription/MobileItemDescription'
import { ItemViewActions } from '../../components/ItemViewActions/ItemViewActions'
import styles from './ItemViewPage.module.css'
import { buildSearchFromFilters } from '../../../../features/items/filters/queryParams'
import { defaultFilters } from '../../../../features/items/filters/types'
import { Breadcrumbs } from '../../layout/MobileHeader/components/Breadcrumbs'
import { findCategoryById } from '../../../../features/categories/utils'

export function MobileItemViewPage() {
  const { itemId } = useParams<{ itemId: string }>()
  const navigate = useNavigate()
  const { data: item, isLoading, isError } = useItemById(itemId)
  const { data: categories = [] } = useCategories()
  const activeCategory = useCategoryUiStore((state) => state.activeCategory)

  if (isLoading) return <div className={styles.loading}>Opening Museum Archive...</div>
  if (isError || !item) return <div className={styles.error}>Item not found in the archives.</div>

  const handleBack = () => {
    // Navigate to the current filter state in the store
    const path = activeCategory ? `/${activeCategory.id}` : '/'
    navigate(path)
  }

  // Find the specific category object for the breadcrumbs without setting it globally
  const itemCategory = item.categoryId ? findCategoryById(categories, item.categoryId) : null

  const handleAttributeClick = (field: string, value: string) => {
    const search = buildSearchFromFilters({
      ...defaultFilters,
      [field as keyof typeof defaultFilters]: value,
    })
    navigate({ pathname: '/', search })
  }

  return (
    <MobileAppLayout
      header={
        <header className={`${styles.header} glassHeader`}>
          <IconButton 
            icon="arrow_back" 
            onClick={handleBack} 
            className={styles.backBtn}
          />
          <ItemViewActions itemId={item.id} />
        </header>
      }
    >
      <div className={styles.content}>
        <MobileImageGallery imageUrls={item.imageUrls ?? []} />
        
        <div className={styles.breadcrumbWrapper}>
          <Breadcrumbs category={itemCategory} />
        </div>

        <ItemDetailTitle 
          name={item.name} 
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
          onAttributeClick={handleAttributeClick}
        />

        <MobileItemDescription description={item.description} />
      </div>
    </MobileAppLayout>
  )
}
