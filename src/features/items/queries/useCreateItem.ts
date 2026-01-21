import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createItem } from '../api/createItem'
import { itemQueryKeys } from './useItemsByCategory'
import type { CreateItemRequest, Item } from '../types'

export const useCreateItem = () => {
  const queryClient = useQueryClient()

  return useMutation<Item, Error, CreateItemRequest>({
    mutationFn: createItem,
    onSuccess: (_item, variables) => {
      queryClient.invalidateQueries({ queryKey: itemQueryKeys.all })

      if (variables.categoryId) {
        queryClient.invalidateQueries({
          queryKey: [...itemQueryKeys.all, variables.categoryId],
        })
      }
    },
  })
}
