export type ItemFormValues = {
  name: string
  characters: string
  season: string
  releaseDate: string
  manufacturer: string
  materials: string
  series: string
  price: string
  dimensions: string
  countryOfOrigin: string
  description: string
  images: string[]
}

export type ItemImage = {
  key: string
  url: string
  isMain: boolean
}

export type ItemFormErrors = Partial<Record<keyof ItemFormValues | 'categoryId' | 'images', string>>

export type { CreateItemRequest } from '../../types'
