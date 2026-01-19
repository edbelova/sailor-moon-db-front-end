import type { Item } from '../types'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchItemsByCategory(categoryId: string | null): Promise<Item[]> {
  await delay(250)

  const items: Item[] = [
    { id: '1', name: 'Item One', categoryId: 'home-goods', images: ['https://img.mandarake.co.jp/webshopimg/03/67/622/0367069622/s_03670696220.jpg'], releaseDate: '2023-01-01', manufacturer: 'Bandai', series: 'Wonder Statue Work Of Art', price: 12000, dimensions: '15x10x8 cm', countryOfOrigin: 'Japan', characters: ['Sailor Moon', 'Sailor Mars'] },
    { id: '2', name: 'Item Two', categoryId: 'home-goods', images: ['https://img.mandarake.co.jp/webshopimg/03/67/624/0367069624/s_03670696241.jpg'], releaseDate: '2022-12-15', manufacturer: 'Good Smile Company', series: 'Nendoroid', price: 8000, dimensions: '10x8x6 cm', countryOfOrigin: 'Japan', characters: ['Naruto Uzumaki'] },
    { id: '3', name: 'Item Three', categoryId: 'stationarity-pens-pencils', images: ['https://img.mandarake.co.jp/webshopimg/03/67/622/0367069622/s_03670696220.jpg'], releaseDate: '2021-11-20', manufacturer: 'Kotobukiya', series: 'ArtFX J', price: 15000, dimensions: '20x15x10 cm', countryOfOrigin: 'Japan', characters: ['Goku', 'Vegeta'] },
    { id: '4', name: 'Item Four', categoryId: 'stationarity-pens-pencils', images: ['https://img.mandarake.co.jp/webshopimg/01/00/660/0100436660/s_010043666072.jpg'], releaseDate: '2020-05-30', manufacturer: 'MegaHouse', series: 'Portrait.Of.Pirates', price: 18000, dimensions: '25x18x12 cm', countryOfOrigin: 'Italy', characters: ['Monkey D. Luffy'] },
    { id: '5', name: 'Item Five', categoryId: 'figures', images: ['https://img.mandarake.co.jp/webshopimg/01/00/637/0100436637/s_01004366376.jpg'], releaseDate: '2019-08-10', manufacturer: 'Alter', series: '1/7 Scale Figure', price: 20000, dimensions: '22x16x11 cm', countryOfOrigin: 'Japan', characters: ['Rem'] },
    { id: '6', name: 'Item Six', categoryId: 'dolls', images: ['https://img.mandarake.co.jp/webshopimg/03/00/637/0300400637/s_03004006372.jpg'], releaseDate: '2018-03-25', manufacturer: 'Aniplex', series: 'Figma', price: 9000, dimensions: '12x9x7 cm', countryOfOrigin: 'Japan', characters: ['Kirito'] },
  ]

  if (!categoryId) {
    return items;
  }

  return items.filter((item) => item.categoryId === categoryId);
}