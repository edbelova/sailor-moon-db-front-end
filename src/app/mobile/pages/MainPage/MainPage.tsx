import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCategoryUiStore } from '../../../../features/categories/state/useCategoryUiStore'
import { useItemsByCategory } from '../../../../features/items/queries/useItemsByCategory'
import { defaultFilters } from '../../../../features/items/filters/types'
import { MobileItemCard } from '../../components/MobileItemCard/MobileItemCard'
import { MobileHeader } from '../../layout/MobileHeader/MobileHeader'
import { MobileAppLayout } from '../../layout/MobileAppLayout/MobileAppLayout'
import { Drawer } from '../../components/base/Drawer/Drawer'
import { MobileCategoryMenu } from '../../features/categories/components/MobileCategoryMenu/MobileCategoryMenu'
import styles from './MainPage.module.css'

export function MobileMainPage() {
  const activeCategory = useCategoryUiStore((state) => state.activeCategory)
  const { data: items = [], isLoading } = useItemsByCategory(
    activeCategory?.id ?? null,
    defaultFilters
  )

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setIsMenuOpen(true)
  }

  const handleFilterClick = () => {
    console.log('Filter clicked')
    // TODO: Implement Mobile Filter Modal
  }

  const handleCategorySelect = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
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
                <Link key={item.id} to={`/items/${item.id}`} className={styles.cardLink}>
                  <MobileItemCard
                    name={item.name}
                    imageUrl={item.imageUrls?.[0] ?? ''}
                    tags={[item.season, item.series].filter(Boolean) as string[]}
                    onFavorite={() => console.log('Favorite', item.id)}
                    onBookmark={() => console.log('Bookmark', item.id)}
                  />
                </Link>
              ))}
            </div>
          )}
        </section>
      </MobileAppLayout>

      <Drawer 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
      >
        <MobileCategoryMenu onCategorySelect={handleCategorySelect} />
      </Drawer>
    </>
  )
}
