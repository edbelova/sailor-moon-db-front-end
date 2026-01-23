import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateItem } from '../api/updateItem'
import type { Item, UpdateItemRequest } from '../types'
import { itemQueryKeys } from './useItemsByCategory'

type UpdateItemPayload = {
  itemId: string
  payload: UpdateItemRequest
}

export const useUpdateItem = () => {
  const queryClient = useQueryClient()

  return useMutation<Item, Error, UpdateItemPayload>({
    mutationFn: ({ itemId, payload }) => updateItem(itemId, payload),
    onSuccess: (item) => {
      queryClient.invalidateQueries({ queryKey: itemQueryKeys.all })
      queryClient.invalidateQueries({ queryKey: itemQueryKeys.byId(item.id) })
    },
  })
}
