import styles from './Item.module.css'
import type { Item as ItemType } from '../../types'
import { Link } from 'react-router-dom'
// import Star from './Star.svg'
// import Check from './Check.svg'
import Heart from './Heart.svg'
import Bookmark from './Bookmark.svg'
// import Cart from './Cart.svg'

export function ItemPreview( { item }: { item: ItemType }) {

  const previewUrl = item.imageUrls?.[0] ?? item.images[0]
  const year = item.releaseDate?.slice(0, 4)
  const titleParts = [year, item.manufacturer, item.name].filter((part) => part && part.trim())
  const title = titleParts.join(' - ')

  return (
    <div className={styles.block}>
      <div className={styles.picContainer}>
        <div className={styles.pic}>
          <Link to={`/items/${item.id}`} className={styles.picLink}>
            <img src={previewUrl} alt={item.name} />
          </Link>
          <button type="button" className={styles.likeBtn} aria-label="Like">
            <img src={Heart} alt="" />
          </button>
        </div>
      </div>
      <div className={styles.title}>
        <Link className={styles.titleLink} to={`/items/${item.id}`}>{title}</Link>
      </div>
      <div className={styles.tagsRow}>
        <div className={styles.tags}>
          {item.season ? <span className={styles.tag}>{item.season}</span> : null}
          {item.series ? <span className={styles.tag}>{item.series}</span> : null}
        </div>
        <button type="button" className={styles.bookmarkBtn} aria-label="Bookmark">
          <img src={Bookmark} alt="" />
        </button>
      </div>
      {/* //TODO: add to favorites, add to cart, add review, mark as owned
      <div className={styles.actionBlock}>
        <img src={Check} alt="Check" className={styles.icon} />
        <img src={Heart} alt="Heart" className={styles.icon} />
        <img src={Star} alt="Star" className={styles.icon} />
        <img src={Cart} alt="Cart" className={styles.icon} />
      </div> */}
    </div>
  );
}
