import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useItemById } from '../../../../features/items/queries/useItemById'
import { useUpdateItem } from '../../../../features/items/queries/useUpdateItem'
import { useDeleteItem } from '../../../../features/items/queries/useDeleteItem'
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
import { validateItemForm, buildUpdateItemRequest } from '../../../../features/items/components/ItemForm/validation'
import styles from './ItemEditPage.module.css'

export function MobileItemEditPage() {
  const { itemId } = useParams<{ itemId: string }>()
  const navigate = useNavigate()
  const { data: item, isLoading } = useItemById(itemId)
  const { data: categories = [] } = useCategories()
  const updateMutation = useUpdateItem()
  const deleteMutation = useDeleteItem()

  const { values, imageItems, formErrors, setField, setValues, setImageItems, setFormErrors, reset } = useItemFormStore()
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (item) {
      setValues({
        name: item.name,
        categoryId: item.categoryId,
        releaseDate: item.releaseDate ?? '',
        manufacturer: item.manufacturer ?? '',
        materials: item.materials?.join(', ') ?? '',
        series: item.series ?? '',
        season: item.season ?? '',
        price: item.price?.toString() ?? '',
        dimensions: item.dimensions ?? '',
        countryOfOrigin: item.countryOfOrigin ?? '',
        characters: item.characters?.join(', ') ?? '',
        description: item.description ?? '',
      })

      const images = (item.images ?? []).map((key, index) => ({
        key,
        url: item.imageUrls?.[index] ?? '',
        isMain: index === 0,
      }))
      setImageItems(images)
    }
    return () => reset()
  }, [item, setValues, setImageItems, reset])

  const handleSave = async () => {
    const imageKeys = imageItems.map((img) => img.key)
    const errors = validateItemForm({ ...values, images: imageKeys }, values.categoryId)

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      if (errors.categoryId) alert(errors.categoryId)
      else if (errors.images) alert(errors.images)
      return
    }

    try {
      const payload = buildUpdateItemRequest(
        { ...values, images: imageKeys }, 
        values.categoryId, 
        itemId!
      )
      
      await updateMutation.mutateAsync({
        itemId: itemId!,
        payload
      })
      navigate(`/items/${itemId}`, { replace: true })
    } catch (err) {
      console.error('Update failed', err)
      alert('Failed to update item. Please try again.')
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

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to remove this item from the museum archives?')) {
      try {
        await deleteMutation.mutateAsync(itemId!)
        navigate('/', { replace: true })
      } catch (err) {
        console.error('Delete failed', err)
        alert('Failed to delete item. Please try again.')
      }
    }
  }

  if (isLoading) return <div className={styles.loading}>Loading item...</div>

  return (
    <MobileAppLayout
      header={
        <Header>
          <Header.StandardRow
            left={
              <button 
                className={styles.cancelBtn} 
                onClick={() => navigate(`/items/${itemId}`)} 
                disabled={updateMutation.isPending || deleteMutation.isPending || isUploading}
              >
                Cancel
              </button>
            }
            right={
              <div className={styles.rightActions}>
                <IconButton 
                  icon="delete" 
                  onClick={handleDelete} 
                  disabled={updateMutation.isPending || deleteMutation.isPending || isUploading}
                  className={styles.deleteBtn}
                  iconSize={24}
                />
                <IconButton 
                  icon={updateMutation.isPending || deleteMutation.isPending || isUploading ? 'sync' : 'save'} 
                  onClick={handleSave}
                  disabled={updateMutation.isPending || deleteMutation.isPending || isUploading}
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
