import { create } from 'zustand'

type UiState = {
  activeCategoryId: string | null
  searchTerm: string
  setActiveCategoryId: (id: string | null) => void
  setSearchTerm: (term: string) => void
}

export const useUiStore = create<UiState>((set) => ({
  activeCategoryId: null,
  searchTerm: '',
  setActiveCategoryId: (id) => set({ activeCategoryId: id }),
  setSearchTerm: (term) => set({ searchTerm: term }),
}))
