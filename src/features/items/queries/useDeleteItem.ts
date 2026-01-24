import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteItem } from '../api/deleteItem'
import { itemQueryKeys } from './useItemsByCategory'

export const useDeleteItem = () => {
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>({
        mutationFn: deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: itemQueryKeys.all })
        },
    })
}