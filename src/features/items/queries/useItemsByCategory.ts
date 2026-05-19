import { useQuery } from '@tanstack/react-query'
import { fetchItemsByCategory } from '@/features/items/api/fetchItemsByCategory'
import type { Item } from '@/features/items/types'
import type { ItemFiltersState } from '@/features/items/filters/types'

export const itemQueryKeys = {
  all: ['items'] as const,
  byCategory: (categoryId: string | null, filters: ItemFiltersState) =>
    ['items', categoryId, filters] as const,
  byId: (itemId: string) => ['items', 'by-id', itemId] as const,
}

export function useItemsByCategory(categoryId: string | null, filters: ItemFiltersState) {
  return useQuery<Item[]>({
    queryKey: itemQueryKeys.byCategory(categoryId, filters),
    queryFn: () => fetchItemsByCategory(categoryId, filters),
  })
}
