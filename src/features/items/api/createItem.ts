import type { CreateItemInput } from '../components/ItemForm/types'
import type { Item } from '../types'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const createId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `item-${Date.now()}`
}

export const createItem = async (payload: CreateItemInput): Promise<Item> => {
  await delay(350)

  return {
    id: createId(),
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
}
