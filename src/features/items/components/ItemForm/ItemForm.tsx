import { ItemImagesForm } from '../ItemImagesForm/ItemImagesForm'
import { ItemDetailsForm } from '../ItemDetailsForm/ItemDetailsForm'
import { ItemDescriptionForm } from '../ItemDescriptionForm/ItemDescriptionForm'
import { ItemFormActions } from '../ItemFormActions/ItemFormActions'
import { useItemFormStore } from '../../state/useItemFormStore'
import { uploadItemImages } from '../../api/uploadItemImage'
import { useState } from 'react'


import styles from './ItemForm.module.css'

type ItemFormProps = {
  mode?: 'create' | 'edit'
  itemId?: string
}

export function ItemForm({ mode = 'create', itemId }: ItemFormProps) {

  const imageItems = useItemFormStore((state) => state.imageItems)
  const setImageItems = useItemFormStore((state) => state.setImageItems)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const handleAddImages = async (files: File[]) => {
      setUploadError(null)
      if (files.length === 0) {
        return
      }

    try {
      const uploads = await uploadItemImages(files)
      const next = [...imageItems, ...uploads.map((u, idx) => ({
        key: u.key,
        url: u.url,
        isMain: imageItems.length === 0 && idx === 0,
      }))]
      setImageItems(next)
    } catch (error: unknown) {
      const message =
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof error.message === 'string'
          ? error.message
          : 'Unable to upload image. Please try again.'
      setUploadError(message)
    }
    }

    const handleDeleteImage = (key: string) => {
      const next = imageItems
        .filter((img) => img.key !== key)
        .map((img, index) => ({ ...img, isMain: index === 0 }))
      setImageItems(next)
    }

    const handleSetMainImage = (key: string) => {
      const idx = imageItems.findIndex((img) => img.key === key)
      if (idx === -1) {
        return
      }
      const moved = [...imageItems]
      const [selected] = moved.splice(idx, 1)
      const next = [
        { ...selected, isMain: true },
        ...moved.map((img) => ({ ...img, isMain: false })),
      ]
      setImageItems(next)
    }

  return (
    <div className={styles.itemForm}>
      <div className={styles.itemLayout}>
        <div className={styles.itemImage}>
          <ItemImagesForm 
            images={imageItems}
            onAddImages={handleAddImages}
            onDeleteImage={handleDeleteImage}
            onSetMainImage={handleSetMainImage}
          />
          {uploadError && <div className={styles.uploadError}>{uploadError}</div>}
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
