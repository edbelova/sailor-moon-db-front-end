import { useQuery } from '@tanstack/react-query'
import { fetchCategories } from '../api/fetchCategories'
import type { Category } from '../types'

export const categoryQueryKeys = {
  all: ['categories'] as const,
}

const attachParents = (
  categories: Category[],
  parent: Category | null = null,
): Category[] =>
  categories.map((category) => {
    const nextCategory: Category = { ...category, parent }
    nextCategory.children = category.children
      ? attachParents(category.children, nextCategory)
      : null
    return nextCategory
  })

export const useCategories = () =>
  useQuery<Category[]>({
    queryKey: categoryQueryKeys.all,
    queryFn: fetchCategories,
    select: attachParents,
  })
