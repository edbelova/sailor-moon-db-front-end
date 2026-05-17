import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateItem } from '../../../../features/items/queries/useCreateItem'
import { useCategories } from '../../../../features/categories/queries/useCategories'
import { useItemFormStore } from '../../../../features/items/state/useItemFormStore'
import { uploadItemImages } from '../../../../features/items/api/uploadItemImage'
import { MobileAppLayout } from '../../layout/MobileAppLayout/MobileAppLayout'
import { Header } from '../../../../shared/components/Header/Header'
import { IconButton } from '../../components/base/IconButton/IconButton'
import { MobileMediaManager } from '../../components/MobileMediaManager/MobileMediaManager'
import { MobileFormField } from '../../components/MobileFormField/MobileFormField'
import { PillInput } from '../../components/base/PillInput/PillInput'
import { TagInput } from '../../components/base/TagInput/TagInput'
import { MobileCategorySelector } from '../../components/MobileCategorySelector/MobileCategorySelector'
import { validateItemForm, buildCreateItemRequest } from '../../../../features/items/components/ItemForm/validation'
import styles from './ItemCreatePage.module.css'

export function MobileItemCreatePage() {
  const navigate = useNavigate()
  const { data: categories = [] } = useCategories()
  const createMutation = useCreateItem()

  const { values, imageItems, formErrors, setField, setImageItems, setFormErrors, reset } = useItemFormStore()
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    return () => reset()
  }, [reset])

  const handleSave = async () => {
    const imageKeys = imageItems.map((img) => img.key)
    const errors = validateItemForm({ ...values, images: imageKeys }, values.categoryId)
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      // Provide immediate feedback for common mistakes
      if (errors.categoryId) alert(errors.categoryId)
      else if (errors.images) alert(errors.images)
      return
    }

    const imageKeysActual = imageItems.map((img) => img.key)
    try {
      const newItem = await createMutation.mutateAsync(
        buildCreateItemRequest({ ...values, images: imageKeysActual }, values.categoryId)
      )
      navigate(`/items/${newItem.id}`, { replace: true })
    } catch (err) {
      console.error('Create failed', err)
      alert('Failed to create item. Please check your connection and try again.')
    }
  }

  const handleAddImages = async (files: File[]) => {
    setIsUploading(true)
    try {
      const uploads = await uploadItemImages(files)
      const next = [...imageItems, ...uploads.map((u, idx) => ({
        key: u.key,
        url: u.url,
        isMain: imageItems.length === 0 && idx === 0,
      }))]
      setImageItems(next)
    } catch (err) {
      console.error('Upload failed', err)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDeleteImage = (key: string) => {
    const next = imageItems
      .filter((img) => img.key !== key)
      .map((img, idx) => ({ ...img, isMain: idx === 0 }))
    setImageItems(next)
  }

  return (
    <MobileAppLayout
      header={
        <Header>
          <Header.StandardRow
            left={
              <button 
                className={styles.cancelBtn} 
                onClick={() => navigate('/')} 
                disabled={createMutation.isPending || isUploading}
              >
                Cancel
              </button>
            }
            right={
              <div className={styles.rightActions}>
                <IconButton 
                  icon={createMutation.isPending || isUploading ? 'sync' : 'save'} 
                  onClick={handleSave}
                  disabled={createMutation.isPending || isUploading}
                  className={styles.saveBtn}
                  iconSize={24}
                />
              </div>
            }
          />
        </Header>
      }
    >
      <main className={styles.main}>
        <MobileMediaManager 
          images={imageItems}
          onAddImages={handleAddImages}
          onDeleteImage={handleDeleteImage}
          onReorderImages={setImageItems}
        />

        <section className={styles.fields}>
          <MobileFormField label="Name" error={formErrors.name}>
            <PillInput 
              value={values.name} 
              onChange={(e) => setField('name', e.target.value)}
              placeholder="Item name"
            />
          </MobileFormField>

          <MobileFormField label="Category" error={formErrors.categoryId}>
            <MobileCategorySelector 
              value={values.categoryId} 
              categories={categories}
              onChange={(id) => setField('categoryId', id)}
            />
          </MobileFormField>
          
          <MobileFormField label="Price (¥)" error={formErrors.price}>
            <PillInput 
              type="text"
              value={values.price} 
              onChange={(e) => setField('price', e.target.value)}
            />
          </MobileFormField>

          <MobileFormField label="Release Date">
            <PillInput 
              value={values.releaseDate} 
              onChange={(e) => setField('releaseDate', e.target.value)}
              placeholder="YYYY or YYYY-MM"
            />
          </MobileFormField>

          <MobileFormField label="Manufacturer">
            <PillInput 
              value={values.manufacturer} 
              onChange={(e) => setField('manufacturer', e.target.value)}
            />
          </MobileFormField>

          <MobileFormField label="Series">
            <PillInput 
              value={values.series} 
              onChange={(e) => setField('series', e.target.value)}
            />
          </MobileFormField>

          <MobileFormField label="Season">
            <PillInput 
              value={values.season} 
              onChange={(e) => setField('season', e.target.value)}
            />
          </MobileFormField>

          <MobileFormField label="Materials">
            <TagInput 
              value={values.materials} 
              onChange={(val) => setField('materials', val)}
            />
          </MobileFormField>

          <MobileFormField label="Characters">
            <TagInput 
              value={values.characters} 
              onChange={(val) => setField('characters', val)}
            />
          </MobileFormField>

          <MobileFormField label="Country of Origin">
            <PillInput 
              value={values.countryOfOrigin} 
              onChange={(e) => setField('countryOfOrigin', e.target.value)}
            />
          </MobileFormField>

          <MobileFormField label="Dimensions">
            <PillInput 
              value={values.dimensions} 
              onChange={(e) => setField('dimensions', e.target.value)}
            />
          </MobileFormField>

          <MobileFormField label="Description">
            <textarea 
              className={styles.textarea}
              rows={6}
              value={values.description}
              onChange={(e) => setField('description', e.target.value)}
            />
          </MobileFormField>
        </section>
      </main>
    </MobileAppLayout>
  )
}
