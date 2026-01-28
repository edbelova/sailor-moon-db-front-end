import type { Item } from '../types'
import { apiFetch } from '../../../shared/api'
import type { ItemFiltersState } from '../filters/types'

// Fetches items by category while applying filters and ordering from URL state.
export async function fetchItemsByCategory(
  categoryId: string | null,
  filters: ItemFiltersState,
): Promise<Item[]> {
  const params = new URLSearchParams()

  if (categoryId) {
    params.set('categoryId', categoryId)
  }

  // Add a param only if the user filled it in.
  const add = (key: string, value: string) => {
    if (value.trim()) {
      params.set(key, value)
    }
  }
  add('name', filters.name)
  add('characters', filters.characters)
  add('releaseDateFrom', filters.releaseDateFrom)
  add('releaseDateTo', filters.releaseDateTo)
  add('manufacturer', filters.manufacturer)
  add('materials', filters.materials)
  add('series', filters.series)
  add('priceMin', filters.priceMin)
  add('priceMax', filters.priceMax)
  add('country', filters.country)

  // Always include ordering so the server sorts consistently even when no filters are set.
  params.set('orderBy', filters.orderBy)
  params.set('orderDir', filters.orderDir)

  const query = params.toString()
  const path = query ? `/api/items?${query}` : '/api/items'
  return apiFetch<Item[]>(path)
}
