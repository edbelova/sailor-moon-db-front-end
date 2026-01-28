import { apiFetch } from '../../../shared/api'

// Response shape returned by GET /api/items/filters.
export type ItemFilterOptions = {
    characters: string[]
    manufacturers: string[]
    series: string[]
    materials: string[]
    countries: string[]
}

// Fetches autosuggest values for filter fields.
export async function fetchItemFilterOptions(): Promise<ItemFilterOptions> {
    return apiFetch<ItemFilterOptions>('/api/items/filters')
}