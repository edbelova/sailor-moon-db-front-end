import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../features/auth/useAuth'
import { useDeleteItem } from '../../../../features/items/queries/useDeleteItem'
import { IconButton } from '../base/IconButton/IconButton'
import styles from './ItemViewActions.module.css'

type ItemViewActionsProps = {
  itemId: string
}

export function ItemViewActions({ itemId }: ItemViewActionsProps) {
  const { isAdmin } = useAuth()
  const navigate = useNavigate()
  const deleteMutation = useDeleteItem()

  if (!isAdmin) return null

  const handleEdit = () => {
    navigate(`/items/${itemId}/edit`)
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to remove this item from the museum archives?')) {
      try {
        await deleteMutation.mutateAsync(itemId)
        navigate('/', { replace: true })
      } catch (err) {
        console.error('Failed to delete item', err)
        alert('Failed to delete item. Please try again.')
      }
    }
  }

  return (
    <div className={styles.container}>
      <IconButton 
        icon="edit" 
        onClick={handleEdit} 
        className={styles.actionBtn}
        iconSize={24}
      />
      <IconButton 
        icon="delete" 
        onClick={handleDelete} 
        className={styles.actionBtn}
        iconSize={24}
      />
    </div>
  )
}
