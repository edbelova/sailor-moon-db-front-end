import { useQuery } from '@tanstack/react-query'
import { fetchItemById } from '@/features/items/api/fetchItemById'
import type { Item } from '@/features/items/types'
import { itemQueryKeys } from '@/features/items/queries/useItemsByCategory'

export const useItemById = (itemId: string | undefined) =>
  useQuery<Item>({
    queryKey: itemId ? itemQueryKeys.byId(itemId) : ['items', 'by-id', 'missing'],
    queryFn: () => fetchItemById(itemId ?? ''),
    enabled: Boolean(itemId),
  })
