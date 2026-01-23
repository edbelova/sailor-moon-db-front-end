import type { Item, UpdateItemRequest } from '../types'
import { apiFetch } from '../../../shared/api'

export const updateItem = async (
  itemId: string,
  payload: UpdateItemRequest
): Promise<Item> => {
  const item: UpdateItemRequest = {
    ...payload,
    id: itemId,
    images: payload.images ?? [],
  }

  return apiFetch<Item>(`/api/items/${encodeURIComponent(itemId)}`, {
    method: 'PUT',
    body: JSON.stringify(item),
  })
}
