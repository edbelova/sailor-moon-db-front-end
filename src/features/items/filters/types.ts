// Fields the backend can sort by (used in URL and UI).
export type OrderBy =
    | 'releaseDate'
    | 'manufacturer'
    | 'series'
    | 'name'
    | 'price'
    | 'country'

// Sort direction for ordering results in the UI and API (ascending or descending).
export type OrderDir = 'asc' | 'desc'

// All filter input values stored in component state and mirrored to URL query params.
export type ItemFiltersState = {
    search: string
    name: string
    characters: string
    releaseDateFrom: string
    releaseDateTo: string
    manufacturer: string
    materials: string
    series: string
    priceMin: string
    priceMax: string
    country: string
    orderBy: OrderBy
    orderDir: OrderDir
    hasExplicitOrder: boolean
}

// Default filter values when URL query params are missing.
export const defaultFilters: ItemFiltersState = {
    search: '',
    name: '',
    characters: '',
    releaseDateFrom: '',
    releaseDateTo: '',
    manufacturer: '',
    materials: '',
    series: '',
    priceMin: '',
    priceMax: '',
    country: '',
    orderBy: 'name',
    orderDir: 'asc',
    hasExplicitOrder: false,
}
