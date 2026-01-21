import type { CreateItemRequest, Item } from '../types'
import { apiFetch } from '../../../shared/api'

export const createItem = async (payload: CreateItemRequest): Promise<Item> => {
  const item: CreateItemRequest = {
    name: payload.name,
    categoryId: payload.categoryId,
    images: payload.images ?? [],
    releaseDate: payload.releaseDate,
    manufacturer: payload.manufacturer,
    materials: payload.materials,
    series: payload.series,
    price: payload.price,
    dimensions: payload.dimensions,
    countryOfOrigin: payload.countryOfOrigin,
    characters: payload.characters,
    description: payload.description,
  }

  return apiFetch<Item>('/api/items', {
    method: 'POST',
    body: JSON.stringify(item),
  })
}
