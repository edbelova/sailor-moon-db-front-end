import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/useAuth'
import { useDeleteItem } from '@/features/items/queries/useDeleteItem'
import { Button } from '@/shared/components/base/Button/Button'
import styles from './ItemViewActions.module.css'

type ItemViewActionsProps = {
  itemId: string
}

export function ItemViewActions({ itemId }: ItemViewActionsProps) {
  const { isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const deleteMutation = useDeleteItem()

  if (!isAdmin) return null

  const handleEdit = () => {
    navigate({ pathname: `/items/${itemId}/edit`, search: location.search })
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to remove this item from the museum archives?')) {
      try {
        await deleteMutation.mutateAsync(itemId)
        navigate({ pathname: '/', search: location.search }, { replace: true })
      } catch (err) {
        console.error('Failed to delete item', err)
        alert('Failed to delete item. Please try again.')
      }
    }
  }

  return (
    <div className={styles.container}>
      <Button 
        variant="ghost"
        shape="circle"
        size="sm"
        iconLeft="delete" 
        onClick={handleDelete} 
      />
      <Button 
        variant="ghost"
        shape="circle"
        size="sm"
        iconLeft="edit" 
        onClick={handleEdit} 
      />
    </div>
  )
}
