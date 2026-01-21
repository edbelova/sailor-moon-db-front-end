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

export type ItemFormErrors = Partial<Record<keyof ItemFormValues | 'categoryId', string>>

export type CreateItemInput = {
  name: string
  categoryId: string
  images?: string[]
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
