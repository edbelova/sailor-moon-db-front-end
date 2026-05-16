import { useCategoryUiStore } from '../../../../features/categories/state/useCategoryUiStore'
import { useItemsByCategory } from '../../../../features/items/queries/useItemsByCategory'
import { defaultFilters } from '../../../../features/items/filters/types'
import { MobileItemCard } from '../../components/MobileItemCard/MobileItemCard'
import { MobileHeader } from '../../layout/MobileHeader/MobileHeader'
import { MobileAppLayout } from '../../layout/MobileAppLayout/MobileAppLayout'
import styles from './MainPage.module.css'

export function MobileMainPage() {
  const activeCategory = useCategoryUiStore((state) => state.activeCategory)
  const { data: items = [], isLoading } = useItemsByCategory(
    activeCategory?.id ?? null,
    defaultFilters
  )

  const handleMenuClick = () => {
    console.log('Menu clicked')
    // TODO: Implement Mobile Drawer
  }

  const handleFilterClick = () => {
    console.log('Filter clicked')
    // TODO: Implement Mobile Filter Modal
  }

  return (
    <MobileAppLayout 
      header={
        <MobileHeader 
          onMenuClick={handleMenuClick} 
          onFilterClick={handleFilterClick} 
        />
      }
    >
      <section className={styles.gallerySection}>
        {isLoading ? (
          <div className={styles.loading}>Loading Gallery...</div>
        ) : (
          <div className={styles.grid}>
            {items.map((item) => (
              <MobileItemCard
                key={item.id}
                name={item.name}
                imageUrl={item.imageUrls?.[0] ?? ''}
                tags={[item.season, item.series].filter(Boolean) as string[]}
                onFavorite={() => console.log('Favorite', item.id)}
                onBookmark={() => console.log('Bookmark', item.id)}
              />
            ))}
          </div>
        )}
      </section>
    </MobileAppLayout>
  )
}
