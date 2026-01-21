import styles from './ItemForm.module.css'
import { ItemImagesForm } from '../ItemImagesForm/ItemImagesForm'
import { ItemDetailsForm } from '../ItemDetailsForm/ItemDetailsForm'
import { ItemDescriptionForm } from '../ItemDescriptionForm/ItemDescriptionForm'
import { ItemFormActions } from '../ItemFormActions/ItemFormActions'
import { useCategories } from '../../../categories/queries/useCategories'
import { useCategoryUiStore } from '../../../categories/state/useCategoryUiStore'


export function ItemForm() {
  const { data: categories = [], isLoading, isError } = useCategories()
  const activeCategoryId = useCategoryUiStore((state) => state.activeCategoryId)

  if (isLoading || isError) {
    return null;
  }

  const parentCategory = categories.find((category) =>
      category.children?.some((child) => child.id === activeCategoryId)
    )

  const childCategory = parentCategory?.children?.find((child) => child.id === activeCategoryId)

  return (
    <div className={styles.itemForm}>
      <div className={styles.directory}>
        <h1 className={styles.title}>{parentCategory?.name} / {childCategory?.name}</h1>
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