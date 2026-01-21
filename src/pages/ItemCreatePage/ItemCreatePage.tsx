import { ItemForm } from '../../features/items/components/ItemForm/ItemForm'

import styles from './ItemCreatePage.module.css'

export function ItemCreatePage() {
  return (
    <div className={styles.createItemPage}>
      <ItemForm />
    </div>
  )
}
