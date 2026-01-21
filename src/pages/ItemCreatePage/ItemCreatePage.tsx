import styles from './ItemCreatePage.module.css'
import { ItemForm } from '../../features/items/components/ItemForm/ItemForm'
import { useCategories } from '../../features/categories/queries/useCategories'
import { useCategoryUiStore } from '../../features/categories/state/useCategoryUiStore'


export function ItemCreatePage() {
  const { data: categories = [], isLoading, isError } = useCategories()
  const activeCategoryId = useCategoryUiStore((state) => state.activeCategoryId)
  
  return (
    <div className={styles.createItemPage}>
      <ItemForm />
    </div>
  )
}
