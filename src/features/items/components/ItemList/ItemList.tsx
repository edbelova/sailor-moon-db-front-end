import styles from './ItemList.module.css'
import type { Item as ItemType } from '../../types'
import { Item } from '../Item/Item'

export function ItemList() {
  const items: ItemType[] = [
    { id: '1', name: 'Item One', imgURL: 'https://img.mandarake.co.jp/webshopimg/03/67/622/0367069622/s_03670696220.jpg' },
    { id: '2', name: 'Item Two', imgURL: 'https://img.mandarake.co.jp/webshopimg/03/67/624/0367069624/s_03670696241.jpg' },
    { id: '3', name: 'Item Three', imgURL: 'https://img.mandarake.co.jp/webshopimg/03/67/622/0367069622/s_03670696220.jpg' },
    { id: '4', name: 'Item Four', imgURL: 'https://img.mandarake.co.jp/webshopimg/01/00/660/0100436660/s_010043666072.jpg' },
    { id: '5', name: 'Item Five', imgURL: 'https://img.mandarake.co.jp/webshopimg/01/00/637/0100436637/s_01004366376.jpg' },
    { id: '6', name: 'Item Six', imgURL: 'https://img.mandarake.co.jp/webshopimg/03/00/637/0300400637/s_03004006372.jpg' }
  ]
  return <div className={styles.itemsContainer}>{items.map((item) => (<Item key={item.id} item={item} />))}</div>
}
