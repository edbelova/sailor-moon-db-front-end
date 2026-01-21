import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createItem } from '../api/createItem'
import { itemQueryKeys } from './useItemsByCategory'
import type { CreateItemInput } from '../components/ItemForm/types'
import type { Item } from '../types'

export const useCreateItem = () => {
  const queryClient = useQueryClient()

  return useMutation<Item, Error, CreateItemInput>({
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
