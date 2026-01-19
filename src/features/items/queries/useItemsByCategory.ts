import { useQuery } from '@tanstack/react-query'
import { fetchItemsByCategory } from '../api/fetchItemsByCategory'
import type { Item } from '../types'

export const itemQueryKeys = {
  all: ['items'] as const,
}

export function useItemsByCategory(categoryId: string | null) {
  return useQuery<Item[]>({
    queryKey: categoryId
      ? [...itemQueryKeys.all, categoryId]
      : itemQueryKeys.all,
    queryFn: () => fetchItemsByCategory(categoryId),
  })
}
