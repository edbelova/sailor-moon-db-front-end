import styles from './ItemsGrid.module.css'
import { ItemPreview } from '../ItemPreview/Item'
import { useCategoryUiStore } from '../../../categories/state/useCategoryUiStore'
import { useItemsByCategory } from '../../queries/useItemsByCategory'

export function ItemsGrid() {
  const activeCategory = useCategoryUiStore((state) => state.activeCategory)
  const { data: items = [] } = useItemsByCategory(activeCategory?.id ?? null)

  return (
    <div className={styles.itemsContainer}>
      {items.map((item) => (<ItemPreview key={item.id} item={item} />))}
    </div>
  )
}
