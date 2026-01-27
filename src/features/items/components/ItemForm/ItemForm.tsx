import { ItemImagesForm } from '../ItemImagesForm/ItemImagesForm'
import { ItemDetailsForm } from '../ItemDetailsForm/ItemDetailsForm'
import { ItemDescriptionForm } from '../ItemDescriptionForm/ItemDescriptionForm'
import { ItemFormActions } from '../ItemFormActions/ItemFormActions'
import { CategoryBreadCrumbs } from '../../../categories/components/CategoryBreadCrumbs/CategoryBreadCrumbs'
import { useItemFormStore } from '../../state/useItemFormStore'
import { uploadItemImages } from '../../api/uploadItemImage'


import styles from './ItemForm.module.css'

type ItemFormProps = {
  mode?: 'create' | 'edit'
  itemId?: string
}

export function ItemForm({ mode = 'create', itemId }: ItemFormProps) {

  const imageItems = useItemFormStore((state) => state.imageItems)
  const setImageItems = useItemFormStore((state) => state.setImageItems)

  const handleAddImages = async (files: File[]) => {
      const uploads = await uploadItemImages(files)
      const next = [...imageItems, ...uploads.map((u, idx) => ({
        key: u.key,
        url: u.url,
        isMain: imageItems.length === 0 && idx === 0,
      }))]
      setImageItems(next)
    }

    const handleDeleteImage = (key: string) => {
      const next = imageItems.filter((img) => img.key !== key)
      // if main deleted, promote first item
      if (next.length > 0) {
        next[0] = { ...next[0], isMain: true }
      }
      setImageItems(next)
    }

    const handleSetMainImage = (key: string) => {
      const next = imageItems.map((img) => ({
        ...img,
        isMain: img.key === key,
      }))
      // move main to index 0 if you want ordering
      next.sort((a, b) => (b.isMain ? 1 : 0) - (a.isMain ? 1 : 0))
      setImageItems(next)
    }

  return (
    <div className={styles.itemForm}>
      <CategoryBreadCrumbs />
      <div className={styles.itemLayout}>
        <div className={styles.itemImage}>
          <ItemImagesForm 
            images={imageItems}
            onAddImages={handleAddImages}
            onDeleteImage={handleDeleteImage}
            onSetMainImage={handleSetMainImage}
          />
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
