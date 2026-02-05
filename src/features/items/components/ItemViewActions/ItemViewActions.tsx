import { useNavigate } from 'react-router-dom'
import { useDeleteItem } from '../../queries/useDeleteItem'
import { useCategoryUiStore } from '../../../categories/state/useCategoryUiStore'
import styles from './ItemViewActions.module.css'
import EditIcon from './edit.svg'
import DeleteIcon from './trash-bin.svg'

type ItemViewActionsProps = {
    itemId: string
}

export function ItemViewActions({ itemId }: ItemViewActionsProps) {
    const navigate = useNavigate()
    const deleteItemMutation = useDeleteItem()
    const activeCategoryId = useCategoryUiStore((s) => s.activeCategory?.id ?? null)

    const handleEdit = () => {
        navigate(`/items/${itemId}/edit`)
}

const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this item?')) {
        return
    }
    deleteItemMutation.mutate(itemId, {
    onSuccess: () => {
        navigate(activeCategoryId ? `/${activeCategoryId}` : '/')
    },
    })
}

return (
    <div className={styles.actionsBlock}>
        <button 
            type="button" 
            className={styles.editButton} 
            onClick={handleEdit}
        >
            <img src={EditIcon} alt="Edit" className={styles.icon} />
        </button>
        <button
            type="button"
            className={styles.deleteButton}
            onClick={handleDelete}
            disabled={deleteItemMutation.isPending}
        >
            <img src={DeleteIcon} alt="Delete" className={styles.icon} />
        </button>
        {deleteItemMutation.isError && (
            <div className={styles.errorText}>Unable to delete item.</div>
        )}
    </div>
)
}