import type { CreateItemRequest, ItemFormErrors, ItemFormValues } from './types'

const listSeparator = /[,\n]+/g

export const getDefaultItemFormValues = (): ItemFormValues => ({
  name: '',
  characters: '',
  releaseDate: '',
  manufacturer: '',
  materials: '',
  series: '',
  price: '',
  dimensions: '',
  countryOfOrigin: '',
  description: '',
  images: [],
})

const toTrimmedList = (value: string): string[] =>
  value
    .split(listSeparator)
    .map((entry) => entry.trim())
    .filter(Boolean)

export const buildCreateItemRequest = (
  values: ItemFormValues,
  categoryId: string
): CreateItemRequest => {
  const priceNumber = values.price.trim() ? Number(values.price) : undefined

  return {
    name: values.name.trim(),
    categoryId,
    images: values.images.length ? values.images : undefined,
    releaseDate: values.releaseDate.trim() || undefined,
    manufacturer: values.manufacturer.trim() || undefined,
    materials: values.materials.trim() ? toTrimmedList(values.materials) : undefined,
    series: values.series.trim() || undefined,
    price: Number.isFinite(priceNumber) ? priceNumber : undefined,
    dimensions: values.dimensions.trim() || undefined,
    countryOfOrigin: values.countryOfOrigin.trim() || undefined,
    characters: values.characters.trim() ? toTrimmedList(values.characters) : undefined,
    description: values.description.trim() || undefined,
  }
}

export const validateItemForm = (
  values: ItemFormValues,
  categoryId: string | null
): ItemFormErrors => {
  const errors: ItemFormErrors = {}

  if (!values.name.trim()) {
    errors.name = 'Name is required.'
  }

  if (!categoryId) {
    errors.categoryId = 'Select a category before saving.'
  }

  if (values.price.trim() && Number.isNaN(Number(values.price))) {
    errors.price = 'Price must be a number.'
  }

  return errors
}
