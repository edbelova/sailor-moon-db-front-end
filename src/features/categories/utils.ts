import type { Category } from '@/features/categories/types'

/**
 * Recursively finds a category by its ID in a tree structure.
 */
export function findCategoryById(categories: Category[], id: string): Category | null {
  for (const category of categories) {
    if (category.id === id) {
      return category
    }
    if (category.children?.length) {
      const match = findCategoryById(category.children, id)
      if (match) {
        return match
      }
    }
  }
  return null
}
