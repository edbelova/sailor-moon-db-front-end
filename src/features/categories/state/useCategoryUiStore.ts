import { create } from 'zustand'

type CategoryUiState = {
  activeCategoryId: string | null
  searchTerm: string
  setActiveCategoryId: (id: string | null) => void
  setSearchTerm: (term: string) => void
}

export const useCategoryUiStore = create<CategoryUiState>((set) => ({
  activeCategoryId: null,
  searchTerm: '',
  setActiveCategoryId: (id) => set({ activeCategoryId: id }),
  setSearchTerm: (term) => set({ searchTerm: term }),
}))
