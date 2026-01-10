import { mockCategories } from '../data/mockCategories'
import type { Category } from '../types/category'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const fetchCategories = async (): Promise<Category[]> => {
  await delay(250)
  return mockCategories
}
