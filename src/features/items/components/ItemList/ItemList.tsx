import { useEffect } from 'react'
import styles from './ItemList.module.css'
import { ItemPreview } from '../ItemPreview/Item'
import { useItemsUiStore } from '../../state/useItemsUiStore'
import { useCategoryUiStore } from '../../../categories/state/useCategoryUiStore'
import { useItemsByCategory } from '../../queries/useItemsByCategory'

export function ItemList() {
  const activeCategoryId = useCategoryUiStore((state) => state.activeCategoryId)

  const { data: itemsByCat = [], isLoading, isError } = useItemsByCategory(activeCategoryId)

  const items = useItemsUiStore((state) => state.items)

  const setItems = useItemsUiStore((state) => state.setItems)

  useEffect(() => {
    if (isLoading || isError) {
      return;
    }

    const sameLength = items.length === itemsByCat.length
    const sameIds = sameLength && items.every((it, idx) => it.id === itemsByCat[idx]?.id)

    if (!sameIds) {
      setItems(itemsByCat)
    }
  }, [isLoading, isError, itemsByCat, items, setItems])

  return (
    <div className={styles.itemsContainer}>
      {items.map((item) => (<ItemPreview key={item.id} item={item} />))}
    </div>
  );
}
