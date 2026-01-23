import { ItemImagesForm } from '../ItemImagesForm/ItemImagesForm'
import { ItemDetailsForm } from '../ItemDetailsForm/ItemDetailsForm'
import { ItemDescriptionForm } from '../ItemDescriptionForm/ItemDescriptionForm'
import { ItemFormActions } from '../ItemFormActions/ItemFormActions'
import { CategoryBreadCrumbs } from '../../../categories/components/CategoryBreadCrumbs/CategoryBreadCrumbs'

import styles from './ItemForm.module.css'

type ItemFormProps = {
  mode?: 'create' | 'edit'
  itemId?: string
}

export function ItemForm({ mode = 'create', itemId }: ItemFormProps) {
  return (
    <div className={styles.itemForm}>
      <CategoryBreadCrumbs />
      <div className={styles.itemLayout}>
        <div className={styles.itemImage}>
          <ItemImagesForm />
        </div>
        <div className={styles.itemDetailsActions}>
          <div className={styles.itemDetails}>
            <ItemDetailsForm />
          </div>
          <div className={styles.itemActions}>
            <ItemFormActions mode={mode} itemId={itemId} />
          </div>
        </div>
        <div className={styles.itemDescription}>
          <ItemDescriptionForm />
        </div>
      </div>
    </div>
  )
}
