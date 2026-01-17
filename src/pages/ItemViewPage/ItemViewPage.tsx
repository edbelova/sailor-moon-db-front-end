import { Link, useParams } from 'react-router-dom'
import styles from './ItemViewPage.module.css'
import { useAuth } from '../../features/auth/useAuth'
import { ItemImages } from '../../features/items/components/ItemImages/ItemImages'
import { ItemDetails } from '../../features/items/components/ItemDetails/ItemDetails'
import { ItemDescription } from '../../features/items/components/ItemDescription/ItemDescription'
import type { Item as ItemType } from '../../features/items/types'

export function ItemViewPage() {
  const { itemId } = useParams<{ itemId: string}>()
  const { isAdmin } = useAuth()
  const item: ItemType = { 
    id: '1', 
    name: 'Item One', 
    images: [
      'https://img.mandarake.co.jp/webshopimg/01/00/576/0100436576/0100436576104.jpg', 
      'https://img.mandarake.co.jp/webshopimg/01/00/576/0100436576/0100436576105.jpg', 
      'https://img.mandarake.co.jp/webshopimg/01/00/576/0100436576/0100436576106.jpg', 
      'https://img.mandarake.co.jp/webshopimg/01/00/576/0100436576/0100436576107.jpg'
    ] ,
    releaseDate: '2023-01-01', 
    manufacturer: 'Bandai', 
    materials: ['PVC', 'ABS'],
    series: 'Wonder Statue Work Of Art', 
    price: 12000, 
    dimaensions: '15x10x8 cm', 
    countryOfOrigin: 'Japan', 
    characters: ['Sailor Moon', 'Sailor Mars'],
    description: 'Sailor Moon fantasy notebook, a promotional insert (furoku) from the May 1993 issue (Heisei Year 5) of Kodansha\'s Nakayoshi shojo manga magazine, featuring artwork by Naoko Takeuchi. These collectible notebooks, often called "Fantasy Notebooks," were popular Sailor Moon merchandise from that era, and you can find them listed on collector sites like Mandarake or marketplaces like Etsy, often described by their year and issue number.'
  }

  return (
    <div className={styles.page}>
      <div className={styles.directory}>
        <h1 className={styles.title}>Figures / Wonder Statue Work of Art eternal Sailor Moon</h1>
      </div>
      <div className={styles.pageLinks}>
        {itemId && isAdmin ? <Link to={`/items/${itemId}/edit`}>Edit this item</Link> : null}
      </div>
      <div className={styles.itemLayout}>
        <div className={styles.itemImage}>
          <ItemImages images={item.images} />
        </div>
        <div className={styles.itemDetails}>
          <ItemDetails 
            name={item.name} 
            characters={item.characters} 
            releaseDate={item.releaseDate} 
            manufacturer={item.manufacturer}
            materials={item.materials}
            series={item.series} 
            price={item.price}
            dimentions={item.dimaensions}
            country={item.countryOfOrigin}
            />
        </div>
        <div className={styles.itemDescription}>
          <ItemDescription description={item.description} />
        </div>
      </div>
    </div>
  )
}
