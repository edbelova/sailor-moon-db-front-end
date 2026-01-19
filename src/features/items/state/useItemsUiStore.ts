import { create } from 'zustand'
import type { Item } from '../types'

type ItemsUiState = {
  items: Item[]
  setItems: (items: Item[]) => void
}

export const useItemsUiStore = create<ItemsUiState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
}))
