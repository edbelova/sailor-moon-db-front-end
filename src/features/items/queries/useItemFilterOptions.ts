import { useQuery } from '@tanstack/react-query'
import { fetchItemFilterOptions } from '../api/fetchItemFilterOptions'

// React Query hook so autosuggest values share cached data and avoid refetching on every render.
export function useItemFilterOptions() {
    return useQuery({
        queryKey: ['item-filter-options'],
        queryFn: fetchItemFilterOptions,
    })
}