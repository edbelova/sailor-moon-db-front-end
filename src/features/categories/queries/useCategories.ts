import { useQuery } from '@tanstack/react-query'
import { fetchCategories } from '../api/fetchCategories'
import type { Category } from '../types'

export const categoryQueryKeys = {
  all: ['categories'] as const,
}

export const useCategories = () =>
  useQuery<Category[]>({
    queryKey: categoryQueryKeys.all,
    queryFn: fetchCategories,
  })
