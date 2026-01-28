import { useQuery } from '@tanstack/react-query'
import { fetchItemsByCategory } from '../api/fetchItemsByCategory'
import type { Item } from '../types'
import type { ItemFiltersState } from '../filters/types'


export function useItemsByCategory(categoryId: string | null, filters: ItemFiltersState) {
  return useQuery<Item[]>({
    queryKey: ['items', categoryId, filters],
    queryFn: () => fetchItemsByCategory(categoryId, filters),
  })
}
