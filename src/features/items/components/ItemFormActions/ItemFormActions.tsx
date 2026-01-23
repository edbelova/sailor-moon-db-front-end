import styles from './ItemFormActions.module.css'
import SaveIcon from './Save.svg'
import DeleteIcon from './TrashBin.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCategoryUiStore } from '../../../categories/state/useCategoryUiStore'
import { useItemFormStore } from '../../state/useItemFormStore'
import { buildCreateItemRequest, buildUpdateItemRequest, validateItemForm } from '../ItemForm/validation'
import type { ItemFormErrors } from '../ItemForm/types'
import { useCreateItem } from '../../queries/useCreateItem'
import { useUpdateItem } from '../../queries/useUpdateItem'

type ItemFormActionsProps = {
    mode?: 'create' | 'edit'
    itemId?: string
}

export function ItemFormActions({ mode = 'create', itemId }: ItemFormActionsProps) {
    const [errors, setErrors] = useState<ItemFormErrors>({})
    const activeCategory = useCategoryUiStore((state) => state.activeCategory)
    const activeCategoryId = activeCategory?.id ?? null
    const values = useItemFormStore((state) => state.values)
    const reset = useItemFormStore((state) => state.reset)
    const createItemMutation = useCreateItem()
    const updateItemMutation = useUpdateItem()
    const navigate = useNavigate()
    const errorMessage =
        errors.name ?? errors.categoryId ?? errors.price ?? undefined

    const isEditing = mode === 'edit'
    const isSaving = createItemMutation.isPending || updateItemMutation.isPending

    const handleSave = () => {
        const validationErrors = validateItemForm(values, activeCategoryId)
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length > 0 || !activeCategoryId) {
            return
        }

        if (isEditing) {
            if (!itemId) {
                return
            }

            const payload = buildUpdateItemRequest(values, activeCategoryId, itemId)

            updateItemMutation.mutate(
                { itemId, payload },
                {
                    onSuccess: (updatedItem) => {
                        setErrors({})
                        navigate(`/items/${updatedItem.id}`)
                    },
                }
            )
        } else {
            const payload = buildCreateItemRequest(values, activeCategoryId)

            createItemMutation.mutate(payload, {
                onSuccess: (createdItem) => {
                    reset()
                    setErrors({})
                    navigate(`/items/${createdItem.id}`)
                },
            })
        }
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
            <button className={styles.deleteButton}>
                <img src={DeleteIcon} alt="Delete" className={styles.icon} />
            </button>
            {(errorMessage || createItemMutation.isError || updateItemMutation.isError) && (
                <div className={styles.errorText}>
                    {errorMessage ?? 'Unable to save item.'}
                </div>
            )}
        </div>
    )
}
