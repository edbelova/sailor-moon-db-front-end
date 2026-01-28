import { defaultFilters, type ItemFiltersState } from './types'

// Convert null params to empty strings and trim whitespace so filters are consistent.
const normalize = (value: string | null) => (value ?? '').trim()

// Parses location.search into a complete ItemFiltersState with defaults.
export function parseFiltersFromSearch(search: string): ItemFiltersState {
    const params = new URLSearchParams(search)
    return {
        name: normalize(params.get('name')),
        characters: normalize(params.get('characters')),
        releaseDateFrom: normalize(params.get('releaseDateFrom')),
        releaseDateTo: normalize(params.get('releaseDateTo')),
        manufacturer: normalize(params.get('manufacturer')),
        materials: normalize(params.get('materials')),
        series: normalize(params.get('series')),
        priceMin: normalize(params.get('priceMin')),
        priceMax: normalize(params.get('priceMax')),
        country: normalize(params.get('country')),
        orderBy:
            (params.get('orderBy') as ItemFiltersState['orderBy']) ??
            defaultFilters.orderBy,
        orderDir:
            (params.get('orderDir') as ItemFiltersState['orderDir']) ??
            defaultFilters.orderDir,
    }
}

// Builds a URL query string from filter state, omitting empty fields.
export function buildSearchFromFilters(filters: ItemFiltersState): string {
  const params = new URLSearchParams()

  // Only add non-empty values so the URL stays short and readable.
  const add = (key: string, value: string) => {
    if (value.trim()) {
      params.set(key, value.trim())
    }
  }

  add('name', filters.name)
  add('characters', filters.characters)
  add('releaseDateFrom', filters.releaseDateFrom)
  add('releaseDateTo', filters.releaseDateTo)
  add('manufacturer', filters.manufacturer)
  add('materials', filters.materials)
  add('series', filters.series)
  add('priceMin', filters.priceMin)
  add('priceMax', filters.priceMax)
  add('country', filters.country)

  // Only persist ordering if it's not the default ordering.
  if (filters.orderBy !== defaultFilters.orderBy) {
    params.set('orderBy', filters.orderBy)
  }
  if (filters.orderDir !== defaultFilters.orderDir) {
    params.set('orderDir', filters.orderDir)
  }

  const query = params.toString()
  return query ? `?${query}` : ''
}