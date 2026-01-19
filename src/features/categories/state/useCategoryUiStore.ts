import { create } from 'zustand'

type CategoryUiState = {
  activeCategoryId: string | null
  setActiveCategoryId: (id: string | null) => void
}

export const useCategoryUiStore = create<CategoryUiState>((set) => ({
  activeCategoryId: null,
  setActiveCategoryId: (id) => set({ activeCategoryId: id }),
}))
