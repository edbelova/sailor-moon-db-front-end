import styles from './ItemFormActions.module.css'
import SaveIcon from './Save.svg'
import DeleteIcon from './TrashBin.svg'
import { useState } from 'react'
import { useCategoryUiStore } from '../../../categories/state/useCategoryUiStore'
import { useItemFormStore } from '../../state/useItemFormStore'
import { buildCreateItemInput, validateItemForm } from '../ItemForm/validation'
import type { ItemFormErrors } from '../ItemForm/types'
import { useCreateItem } from '../../queries/useCreateItem'

export function ItemFormActions() {
    const [errors, setErrors] = useState<ItemFormErrors>({})
    const activeCategoryId = useCategoryUiStore((state) => state.activeCategoryId)
    const values = useItemFormStore((state) => state.values)
    const reset = useItemFormStore((state) => state.reset)
    const createItemMutation = useCreateItem()
    const errorMessage =
        errors.name ?? errors.categoryId ?? errors.price ?? undefined

    const handleSave = () => {
        const validationErrors = validateItemForm(values, activeCategoryId)
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length > 0 || !activeCategoryId) {
            return
        }

        const payload = buildCreateItemInput(values, activeCategoryId)

        createItemMutation.mutate(payload, {
            onSuccess: () => {
                reset()
                setErrors({})
            },
        })
    }

    return (
        <div className={styles.actionsBlock}>
            <button
                className={styles.saveButton}
                onClick={handleSave}
                disabled={createItemMutation.isPending}
                title={errorMessage}
            >
                <img src={SaveIcon} alt="Save" className={styles.icon} />
            </button>
            <button className={styles.deleteButton}>
                <img src={DeleteIcon} alt="Delete" className={styles.icon} />
            </button>
            {(errorMessage || createItemMutation.isError) && (
                <div className={styles.errorText}>
                    {errorMessage ?? 'Unable to save item.'}
                </div>
            )}
        </div>
    )
}
