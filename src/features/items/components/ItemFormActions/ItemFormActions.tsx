import styles from './ItemFormActions.module.css'
import SaveIcon from './Save.svg'
import DeleteIcon from './TrashBin.svg'
import { useNavigate } from 'react-router-dom'
import { useCategoryUiStore } from '../../../categories/state/useCategoryUiStore'
import { useItemFormStore } from '../../state/useItemFormStore'
import { buildCreateItemRequest, buildUpdateItemRequest, validateItemForm } from '../ItemForm/validation'
import { useCreateItem } from '../../queries/useCreateItem'
import { useUpdateItem } from '../../queries/useUpdateItem'
import { useDeleteItem } from '../../queries/useDeleteItem'

type ItemFormActionsProps = {
    mode?: 'create' | 'edit'
    itemId?: string
}

export function ItemFormActions({ mode = 'create', itemId }: ItemFormActionsProps) {
    const activeCategory = useCategoryUiStore((state) => state.activeCategory)
    const activeCategoryId = activeCategory?.id ?? null
    const values = useItemFormStore((state) => state.values)
    const formErrors = useItemFormStore((state) => state.formErrors)
    const setFormErrors = useItemFormStore((state) => state.setFormErrors)
    const reset = useItemFormStore((state) => state.reset)
    const createItemMutation = useCreateItem()
    const updateItemMutation = useUpdateItem()
    const deleteItemMutation = useDeleteItem()
    const navigate = useNavigate()
    const errorMessage =
        formErrors.name ?? formErrors.categoryId ?? formErrors.price ?? undefined

    const isEditing = mode === 'edit'
    const isSaving = createItemMutation.isPending || updateItemMutation.isPending || deleteItemMutation.isPending
    const imageItems = useItemFormStore((state) => state.imageItems)
    const setField = useItemFormStore((state) => state.setField)

    const handleSave = () => {
        const imageKeys = imageItems.map((img) => img.key)
        setField('images', imageKeys)
        const validationErrors = validateItemForm(values, activeCategoryId)
        setFormErrors(validationErrors)

        if (Object.keys(validationErrors).length > 0 || !activeCategoryId) {
            return
        }

        if (imageItems.length === 0) {
            setFormErrors({
                ...validationErrors,
                images: 'At least one image is required.',
            })
            return
        }

        if (isEditing) {
            if (!itemId) {
                return
            }

            const payload = buildUpdateItemRequest(
                { ...values, images: imageKeys }, 
                activeCategoryId, 
                itemId)

            updateItemMutation.mutate(
                { itemId, payload },
                {
                    onSuccess: (updatedItem) => {
                        setFormErrors({})
                        navigate(`/items/${updatedItem.id}`)
                    },
                }
            )
        } else {
            const payload = buildCreateItemRequest(
                { ...values, images: imageKeys }, 
                activeCategoryId
            )

            createItemMutation.mutate(payload, {
                onSuccess: (createdItem) => {
                    reset()
                    setFormErrors({})
                    navigate(`/items/${createdItem.id}`)
                },
            })
        }
    }

    const handleDelete = () => {
        if (!isEditing || !itemId) {
            return
        }
        if (!confirm('Are you sure you want to delete this item?')) {
            return
        }
        deleteItemMutation.mutate(itemId, {
            onSuccess: () => {
                reset()
                setFormErrors({})
                navigate(`/${activeCategoryId}`)
            },
        })
    }

    return (
        <div className={styles.actionsBlock}>
            <button
                className={styles.saveButton}
                onClick={handleSave}
                disabled={isSaving}
                title={errorMessage}
            >
                <img src={SaveIcon} alt="Save" className={styles.icon} />
            </button>
            <button 
                className={styles.deleteButton}
                onClick={handleDelete}
                disabled={!isEditing || deleteItemMutation.isPending}
            >
                <img src={DeleteIcon} alt="Delete" className={styles.icon} />
            </button>
            {(errorMessage || createItemMutation.isError || updateItemMutation.isError) && (
                <div className={styles.errorText}>
                    {errorMessage ?? 'Unable to save item.'}
                </div>
            )}
            {deleteItemMutation.isError && (
                <div className={styles.errorText}>
                    Unable to delete item.
                </div>
            )}
        </div>
    )
}
