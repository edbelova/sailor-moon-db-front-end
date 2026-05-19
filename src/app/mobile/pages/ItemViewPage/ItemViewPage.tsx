import { useNavigate, useParams } from 'react-router-dom'
import { useItemById } from '@/features/items/queries/useItemById'
import { useCategories } from '@/features/categories/queries/useCategories'
import { useCategoryUiStore } from '@/features/categories/state/useCategoryUiStore'
import { MobileAppLayout } from '@/app/mobile/layout/MobileAppLayout/MobileAppLayout'
import { Button } from '@/shared/components/base/Button/Button'
import { MobileImageGallery } from '@/app/mobile/components/MobileImageGallery/MobileImageGallery'
import { ItemDetailTitle } from '@/app/mobile/components/ItemDetailTitle/ItemDetailTitle'
import { ItemMetadataPanel } from '@/app/mobile/components/ItemMetadataPanel/ItemMetadataPanel'
import { MobileItemDescription } from '@/app/mobile/components/MobileItemDescription/MobileItemDescription'
import { ItemViewActions } from '@/app/mobile/components/ItemViewActions/ItemViewActions'
import styles from '@/app/mobile/pages/ItemViewPage/ItemViewPage.module.css'
import { buildSearchFromFilters } from '@/features/items/filters/queryParams'
import { defaultFilters } from '@/features/items/filters/types'
import { MobileBreadcrumbs } from '@/app/mobile/components/MobileBreadcrumbs/MobileBreadcrumbs'
import { findCategoryById } from '@/features/categories/utils'
import { Header } from '@/app/mobile/components/base/Header/Header'

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
        <Header>
          <Header.StandardRow
            left={
              <Button 
                variant="ghost"
                shape="circle"
                size="sm"
                iconLeft="arrow_back" 
                onClick={handleBack} 
                className={styles.backBtn}
              />
            }
            right={<ItemViewActions itemId={item.id} />}
          />
        </Header>
      }
    >
      <div className={styles.content}>
        <MobileImageGallery imageUrls={item.imageUrls ?? []} />
        
        <div className={styles.breadcrumbWrapper}>
          <MobileBreadcrumbs category={itemCategory} />
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
