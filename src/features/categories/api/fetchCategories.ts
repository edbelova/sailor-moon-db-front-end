import type { Category } from '@/features/categories/types'
import { apiFetch } from '@/shared/api'

export const fetchCategories = async (): Promise<Category[]> => {
  return apiFetch<Category[]>('/api/categories')
}
