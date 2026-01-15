import styles from './Item.module.css'
import type { Item as ItemType } from '../../types'
import { Link } from 'react-router-dom'
import Star from './Star.svg'
import Check from './Check.svg'
import Heart from './Heart.svg'
import Cart from './Cart.svg'

export function ItemPreview( { item }: { item: ItemType }) {
  return (
    <div className={styles.block}>
      <div className={styles.picContainer}>
        <div className={styles.pic}>
          <img src={item.imgURL} alt={item.name} />
        </div>
      </div>
      <div className={styles.title}>
        <Link className={styles.titleLink} to={`/items/${item.id}`}>{item.name}</Link>
      </div>
      <div className={styles.actionBlock}>
        <img src={Check} alt="Check" className={styles.icon} />
        <img src={Heart} alt="Heart" className={styles.icon} />
        <img src={Star} alt="Star" className={styles.icon} />
        <img src={Cart} alt="Cart" className={styles.icon} />
      </div>
    </div>
  );
  // return <Link to={`/items/${item.id}`}>View item #{item.name}</Link>
}
