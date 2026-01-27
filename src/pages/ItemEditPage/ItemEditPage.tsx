import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import styles from './ItemEditPage.module.css'
import { useItemById } from '../../features/items/queries/useItemById'
import { useItemFormStore } from '../../features/items/state/useItemFormStore'
import { buildItemFormValues } from '../../features/items/components/ItemForm/validation'
import { ItemForm } from '../../features/items/components/ItemForm/ItemForm'
import { useCategories } from '../../features/categories/queries/useCategories'
import { useCategoryUiStore } from '../../features/categories/state/useCategoryUiStore'
import type { Category } from '../../features/categories/types'

export function ItemEditPage() {
  const { itemId } = useParams<{ itemId: string }>()
  const { data: item, isLoading, isError } = useItemById(itemId)
  const { data: categories } = useCategories()
  const setImageItems = useItemFormStore((state) => state.setImageItems)
  const setValues = useItemFormStore((state) => state.setValues)
  const reset = useItemFormStore((state) => state.reset)
  const setActiveCategory = useCategoryUiStore((state) => state.setActiveCategory)

  useEffect(() => {
    if (!item) {
      return
    }
    const imageItems = (item.images ?? []).map((key, index) => ({
      key,
      url: item.imageUrls?.[index] ?? '',
      isMain: index === 0,
    }))
    setValues(buildItemFormValues(item))
    setImageItems(imageItems)
  }, [item, setValues, setImageItems])

  useEffect(() => {
    if (!item || !categories) {
      return
    }

    const match = findCategory(categories, item.categoryId)
    setActiveCategory(match ?? null)
  }, [categories, item, setActiveCategory])

  useEffect(() => () => {
    reset()
    setActiveCategory(null)
  }, [reset, setActiveCategory])

  if (!itemId) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Edit item</h1>
        <div>Missing item id.</div>
        <div className={styles.pageLinks}>
          <Link to="/">Back to main</Link>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Edit item</h1>
        <div>Loading item...</div>
      </div>
    )
  }

  if (isError || !item) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Edit item</h1>
        <div>Unable to load item.</div>
        <div className={styles.pageLinks}>
          <Link to="/">Back to main</Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Edit item</h1>
      <ItemForm mode="edit" itemId={itemId} />
      <div className={styles.pageLinks}>
        {itemId ? <Link to={`/items/${itemId}`}>View this item</Link> : null}
        <Link to="/">Back to main</Link>
      </div>
    </div>
  )
}

const findCategory = (categories: Category[], categoryId: string): Category | null => {
  for (const category of categories) {
    if (category.id === categoryId) {
      return category
    }
    if (category.children) {
      const match = findCategory(category.children, categoryId)
      if (match) {
        return match
      }
    }
  }
  return null
}
