import { create } from 'zustand'
import type { Category } from '../types'

type CategoryUiState = {
  activeCategory: Category | null
  setActiveCategory: (category: Category | null) => void
}

export const useCategoryUiStore = create<CategoryUiState>((set) => ({
  activeCategory: null,
  setActiveCategory: (category) => set({ activeCategory: category }),
}))
