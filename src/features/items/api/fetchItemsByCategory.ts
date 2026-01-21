import type { Item } from '../types'
import { apiFetch } from '../../../shared/api'

export async function fetchItemsByCategory(categoryId: string | null): Promise<Item[]> {
  if (!categoryId) {
    return apiFetch<Item[]>('/api/items')
  }

  const query = new URLSearchParams({ categoryId }).toString()
  return apiFetch<Item[]>(`/api/items?${query}`)
}
