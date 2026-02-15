import { create } from 'zustand'
import { getDefaultItemFormValues } from '../components/ItemForm/validation'
import type { ItemFormValues } from '../components/ItemForm/types'
import type { ItemImage } from '../components/ItemForm/types'
import type { ItemFormErrors } from '../components/ItemForm/types'

type ItemFormState = {
  values: ItemFormValues
  imageItems: ItemImage[]
  formErrors: ItemFormErrors
  isUploading: boolean
  uploadErrors: string[]
  setImageItems: (items: ItemImage[]) => void
  setFormErrors: (errors: ItemFormErrors) => void
  setField: <Key extends keyof ItemFormValues>(
    key: Key,
    value: ItemFormValues[Key]
  ) => void
  setValues: (values: Partial<ItemFormValues>) => void
  reset: () => void
}

export const useItemFormStore = create<ItemFormState>((set) => ({
  values: getDefaultItemFormValues(),
  imageItems: [],
  formErrors: {},
  isUploading: false,
  uploadErrors: [],
  setImageItems: (items) => set({ imageItems: items }),
  setFormErrors: (errors) => set({ formErrors: errors }),
  setField: (key, value) =>
    set((state) => ({
      values: {
        ...state.values,
        [key]: value,
      },
    })),
  setValues: (values) =>
    set((state) => ({
      values: {
        ...state.values,
        ...values,
      },
    })),
  reset: () => set({ 
    values: getDefaultItemFormValues(), 
    imageItems: [], 
    formErrors: {},
    isUploading: false, 
    uploadErrors: [] 
  }),
}))
