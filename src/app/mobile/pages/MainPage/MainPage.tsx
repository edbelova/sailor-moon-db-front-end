import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCategoryUiStore } from '../../../../features/categories/state/useCategoryUiStore'
import { useCategories } from '../../../../features/categories/queries/useCategories'
import { useItemsByCategory } from '../../../../features/items/queries/useItemsByCategory'
import { defaultFilters } from '../../../../features/items/filters/types'
import { MobileItemCard } from '../../components/MobileItemCard/MobileItemCard'
import { MobileHeader } from '../../layout/MobileHeader/MobileHeader'
import { MobileAppLayout } from '../../layout/MobileAppLayout/MobileAppLayout'
import { Drawer } from '../../components/base/Drawer/Drawer'
import { MobileCategoryMenu } from '../../features/categories/components/MobileCategoryMenu/MobileCategoryMenu'
import { AddFab } from '../../components/AddFab/AddFab'
import { findCategoryById } from '../../../../features/categories/utils'
import styles from './MainPage.module.css'

export function MobileMainPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const { data: categories = [], isLoading: categoriesLoading, isError: categoriesError } = useCategories()
  const activeCategory = useCategoryUiStore((state) => state.activeCategory)
  const setActiveCategory = useCategoryUiStore((state) => state.setActiveCategory)

  const { data: items = [], isLoading } = useItemsByCategory(
    activeCategory?.id ?? null,
    defaultFilters
  )

  const activeCategoryId = activeCategory?.id ?? null

  useEffect(() => {
    if (categoryId === undefined) {
      if (activeCategoryId !== null) {
        setActiveCategory(null)
      }
      return
    }

    if (categoriesLoading || categoriesError || !categoryId) {
      return
    }

    const category = findCategoryById(categories, categoryId)

    if (!category) {
      if (activeCategoryId !== null) {
        setActiveCategory(null)
      }
      navigate('/', { replace: true })
      return
    }

    if (categoryId !== activeCategoryId) {
      setActiveCategory(category)
    }
  }, [
    activeCategoryId,
    categories,
    categoryId,
    categoriesError,
    categoriesLoading,
    navigate,
    setActiveCategory,
  ])

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
                <MobileItemCard
                  key={item.id}
                  id={item.id}
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

      <Drawer 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
      >
        <MobileCategoryMenu onCategorySelect={handleCategorySelect} />
      </Drawer>

      <AddFab />
    </>
  )
}
