import styles from './ItemForm.module.css'
import { ItemImagesForm } from '../ItemImagesForm/ItemImagesForm'
import { ItemDetailsForm } from '../ItemDetailsForm/ItemDetailsForm'
import { ItemDescriptionForm } from '../ItemDescriptionForm/ItemDescriptionForm'
import { ItemFormActions } from '../ItemFormActions/ItemFormActions'


export function ItemForm() {
  return (
    <div className={styles.itemForm}>
      <div className={styles.directory}>
        <h1 className={styles.title}>Figures /</h1>
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