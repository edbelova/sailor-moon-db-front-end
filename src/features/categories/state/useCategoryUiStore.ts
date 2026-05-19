import { create } from 'zustand'
import type { Category } from '@/features/categories/types'

type CategoryUiState = {
  activeCategory: Category | null
  setActiveCategory: (category: Category | null) => void
}

export const useCategoryUiStore = create<CategoryUiState>((set) => ({
  activeCategory: null,
  setActiveCategory: (category) => set({ activeCategory: category }),
}))
