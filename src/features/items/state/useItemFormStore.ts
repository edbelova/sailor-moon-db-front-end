import { create } from 'zustand'
import { getDefaultItemFormValues } from '../components/ItemForm/validation'
import type { ItemFormValues } from '../components/ItemForm/types'

type ItemFormState = {
  values: ItemFormValues
  setField: <Key extends keyof ItemFormValues>(
    key: Key,
    value: ItemFormValues[Key]
  ) => void
  setValues: (values: Partial<ItemFormValues>) => void
  reset: () => void
}

export const useItemFormStore = create<ItemFormState>((set) => ({
  values: getDefaultItemFormValues(),
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
  reset: () => set({ values: getDefaultItemFormValues() }),
}))
