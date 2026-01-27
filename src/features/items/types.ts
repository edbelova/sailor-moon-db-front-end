export type Item = {
  id: string
  name: string
  categoryId: string
  images: string[]
  imageUrls?: string[]
  releaseDate?: string
  manufacturer?: string
  materials?: string[]
  series?: string
  price?: number
  dimensions?: string
  countryOfOrigin?: string
  characters?: string[]
  description?: string
}

export type CreateItemRequest = Omit<Item, 'id'>

export type UpdateItemRequest = Item
