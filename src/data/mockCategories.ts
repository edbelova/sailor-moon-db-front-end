import type { Category } from '../types/category'

export const mockCategories: Category[] = [
  { id: 'figures', name: 'Figures' },
  { id: 'dolls', name: 'Dolls' },
  { id: 'keychains', name: 'Keychains' },
  {
    id: 'stationarity',
    name: 'Stationarity',
    children: [
      { id: 'stationarity-pens-pencils', name: 'Pens & Pencils' },
      { id: 'stationarity-notebooks', name: 'Notebooks' },
      { id: 'stationarity-stickers-seals', name: 'Stickers & Seals' },
      {
        id: 'stationarity-letter-sets-postcards',
        name: 'Letter Sets & Postcards',
      },
      { id: 'stationarity-folders-clear-files', name: 'Folders & Clear Files' },
      {
        id: 'stationarity-pencil-cases-storage',
        name: 'Pencil Cases & Storage',
      },
      { id: 'stationarity-art-craft-supplies', name: 'Art & Craft Supplies' },
      { id: 'stationarity-calendars-planners', name: 'Calendars & Planners' },
      { id: 'stationarity-school-accessories', name: 'School Accessories' },
    ],
  },
  { id: 'home-goods', name: 'Home Goods' },
  { id: 'plush-toys', name: 'Plush Toys' },
  { id: 'role-play-toys', name: 'Role-Play Toys' },
  { id: 'trading-cards', name: 'Trading Cards' },
  { id: 'media', name: 'Media' },
  { id: 'books-manga', name: 'Books & Manga' },
  { id: 'apparel', name: 'Apparel' },
  { id: 'food', name: 'Food' },
  { id: 'cosmetics-beauty', name: 'Cosmetics & Beauty' },
  { id: 'miscellaneous', name: 'Miscellaneous' },
]
