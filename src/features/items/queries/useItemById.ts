import { useQuery } from '@tanstack/react-query'
import { fetchItemById } from '../api/fetchItemById'
import type { Item } from '../types'
import { itemQueryKeys } from './useItemsByCategory'

export const useItemById = (itemId: string | undefined) =>
  useQuery<Item>({
    queryKey: itemId ? itemQueryKeys.byId(itemId) : ['items', 'by-id', 'missing'],
    queryFn: () => fetchItemById(itemId ?? ''),
    enabled: Boolean(itemId),
  })
