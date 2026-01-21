import { apiFetch } from '../../../shared/api'
import type { Item } from '../types'

export const fetchItemById = async (itemId: string): Promise<Item> => {
  return apiFetch<Item>(`/api/items/${encodeURIComponent(itemId)}`)
}
