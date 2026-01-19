import styles from './ItemList.module.css'
import { ItemPreview } from '../ItemPreview/Item'
import { useCategoryUiStore } from '../../../categories/state/useCategoryUiStore'
import { useItemsByCategory } from '../../queries/useItemsByCategory'

export function ItemList() {
  const activeCategoryId = useCategoryUiStore((state) => state.activeCategoryId)

  const { data: items = [] } = useItemsByCategory(activeCategoryId)

  return (
    <div className={styles.itemsContainer}>
      {items.map((item) => (<ItemPreview key={item.id} item={item} />))}
    </div>
  )
}
