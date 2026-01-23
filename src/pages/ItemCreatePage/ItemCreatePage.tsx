import { useCategoryUiStore } from '../../features/categories/state/useCategoryUiStore'
import { ItemForm } from '../../features/items/components/ItemForm/ItemForm'

import styles from './ItemCreatePage.module.css'

export function ItemCreatePage() {
  const activeCategory = useCategoryUiStore((state) => state.activeCategory);
  console.log('Active Category:', activeCategory);

  if (!activeCategory || !activeCategory.parent) {
    return (
      <div className={styles.createItemPage}>
        <p className={styles.message}>
          Please select a category to add an item.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.createItemPage}>
      <ItemForm mode="create" />
    </div>
  )
}
