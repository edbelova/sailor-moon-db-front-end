import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useItemById } from '../../../../features/items/queries/useItemById'
import { useUpdateItem } from '../../../../features/items/queries/useUpdateItem'
import { useCategories } from '../../../../features/categories/queries/useCategories'
import { useItemFormStore } from '../../../../features/items/state/useItemFormStore'
import { uploadItemImages } from '../../../../features/items/api/uploadItemImage'
import { MobileAppLayout } from '../../layout/MobileAppLayout/MobileAppLayout'
import { MobileAdminHeader } from '../../components/MobileAdminHeader/MobileAdminHeader'
import { MobileMediaManager } from '../../components/MobileMediaManager/MobileMediaManager'
import { MobileFormField } from '../../components/MobileFormField/MobileFormField'
import { PillInput } from '../../components/base/PillInput/PillInput'
import { PillSelect } from '../../components/base/PillSelect/PillSelect'
import { TagInput } from '../../components/base/TagInput/TagInput'
import { validateItemForm, buildUpdateItemRequest } from '../../../../features/items/components/ItemForm/validation'
import styles from './ItemEditPage.module.css'

export function MobileItemEditPage() {
  const { itemId } = useParams<{ itemId: string }>()
  const navigate = useNavigate()
  const { data: item, isLoading } = useItemById(itemId)
  const { data: categories = [] } = useCategories()
  const updateMutation = useUpdateItem()

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
    const errors = validateItemForm(values, values.categoryId)
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      if (errors.categoryId) alert(errors.categoryId)
      return
    }

    const imageKeys = imageItems.map((img) => img.key)
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

  if (isLoading) return <div className={styles.loading}>Loading item...</div>

  return (
    <MobileAppLayout
      header={
        <MobileAdminHeader 
          onCancel={() => navigate(`/items/${itemId}`)} 
          onSave={handleSave}
          isSaving={updateMutation.isPending || isUploading}
        />
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

          <div className={styles.row}>
            <MobileFormField label="Category" error={formErrors.categoryId}>
              <PillSelect 
                value={values.categoryId} 
                onChange={(e) => setField('categoryId', e.target.value)}
              >
                {categories.map(parent => (
                  <optgroup key={parent.id} label={parent.name}>
                    <option value={parent.id}>{parent.name} (General)</option>
                    {parent.children?.map(child => (
                      <option key={child.id} value={child.id}>{child.name}</option>
                    ))}
                  </optgroup>
                ))}
              </PillSelect>
            </MobileFormField>
            
            <MobileFormField label="Price (¥)" error={formErrors.price}>
              <PillInput 
                type="text"
                value={values.price} 
                onChange={(e) => setField('price', e.target.value)}
              />
            </MobileFormField>
          </div>

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
