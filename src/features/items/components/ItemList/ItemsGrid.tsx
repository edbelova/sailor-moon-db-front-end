import { useLocation } from 'react-router-dom'
import styles from './ItemsGrid.module.css'
import { ItemPreview } from '../ItemPreview/Item'
import { useCategoryUiStore } from '../../../categories/state/useCategoryUiStore'
import { useItemsByCategory } from '../../queries/useItemsByCategory'
import { parseFiltersFromSearch } from '../../filters/queryParams'

export function ItemsGrid() {
  // Active category scopes results when browsing a category page.
  const activeCategory = useCategoryUiStore((state) => state.activeCategory)

  // URL query params provide current filter state.
  const location = useLocation()
  const filters = parseFiltersFromSearch(location.search)

  // Query hook receives filters so it refetches when they change.
  const { data: items = [] } = useItemsByCategory(activeCategory?.id ?? null, filters)

  return (
    <div className={styles.itemsContainer}>
      {items.map((item) => (<ItemPreview key={item.id} item={item} />))}
    </div>
  )
}
