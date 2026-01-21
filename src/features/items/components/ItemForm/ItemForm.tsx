import styles from './ItemForm.module.css'
import { ItemImagesForm } from '../ItemImagesForm/ItemImagesForm'
import { ItemDetailsForm } from '../ItemDetailsForm/ItemDetailsForm'
import { ItemDescriptionForm } from '../ItemDescriptionForm/ItemDescriptionForm'
import { ItemFormActions } from '../ItemFormActions/ItemFormActions'
import { useCategoryUiStore } from '../../../categories/state/useCategoryUiStore'


export function ItemForm() {
  const activeCategory = useCategoryUiStore((state) => state.activeCategory)
  const parentCategory = activeCategory?.parent ?? null

  return (
    <div className={styles.itemForm}>
      <div className={styles.directory}>
        <h1 className={styles.title}>
          {parentCategory && activeCategory?.name
            ? `${parentCategory.name} / ${activeCategory.name}`
            : activeCategory?.name ?? ''}
        </h1>
      </div>
      <div className={styles.itemLayout}>
        <div className={styles.itemImage}>
          <ItemImagesForm />
        </div>
        <div className={styles.itemDetailsActions}>
          <div className={styles.itemDetails}>
            <ItemDetailsForm />
          </div>
          <div className={styles.itemActions}>
            <ItemFormActions />
          </div>
        </div>
        <div className={styles.itemDescription}>
          <ItemDescriptionForm />
        </div>
      </div>
    </div>
  )
}
