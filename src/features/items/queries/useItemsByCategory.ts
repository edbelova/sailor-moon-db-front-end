import { useQuery } from '@tanstack/react-query'
import { fetchItemsByCategory } from '../api/fetchItemsByCategory'
import type { Item } from '../types'
import type { ItemFiltersState } from '../filters/types'

export const itemQueryKeys = {
  all: ['items'] as const,
  byCategory: (categoryId: string | null, filters: ItemFiltersState) =>
    ['items', categoryId, filters] as const,
}

export function useItemsByCategory(categoryId: string | null, filters: ItemFiltersState) {
  return useQuery<Item[]>({
    queryKey: itemQueryKeys.byCategory(categoryId, filters),
    queryFn: () => fetchItemsByCategory(categoryId, filters),
  })
}
