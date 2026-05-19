import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteItem } from '@/features/items/api/deleteItem'
import { itemQueryKeys } from '@/features/items/queries/useItemsByCategory'

export const useDeleteItem = () => {
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>({
        mutationFn: deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: itemQueryKeys.all })
        },
    })
}