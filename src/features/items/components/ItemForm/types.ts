export type ItemFormValues = {
  name: string
  characters: string
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

export type ItemFormErrors = Partial<Record<keyof ItemFormValues | 'categoryId', string>>

export type { CreateItemRequest } from '../../types'
