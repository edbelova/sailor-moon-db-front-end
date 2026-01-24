import { apiFetch } from '../../../shared/api'

export const deleteItem = async (itemId: string): Promise<void> => {
    return apiFetch<void>(`/api/items/${encodeURIComponent(itemId)}`, {
        method: 'DELETE',
    })
}