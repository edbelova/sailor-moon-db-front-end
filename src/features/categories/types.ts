export type Category = {
  id: string
  name: string
  parent: Category | null
  children: Category[] | null
}
