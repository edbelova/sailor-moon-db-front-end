import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateItem } from '@/features/items/api/updateItem'
import type { Item, UpdateItemRequest } from '@/features/items/types'
import { itemQueryKeys } from '@/features/items/queries/useItemsByCategory'

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
