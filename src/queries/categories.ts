import { useQuery } from '@tanstack/react-query'
import { fetchCategories } from '../api/categories'
import type { Category } from '../types/category'

export const categoryQueryKeys = {
  all: ['categories'] as const,
}

export const useCategories = () =>
  useQuery<Category[]>({
    queryKey: categoryQueryKeys.all,
    queryFn: fetchCategories,
  })
