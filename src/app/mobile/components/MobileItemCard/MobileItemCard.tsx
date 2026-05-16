import styles from './MobileItemCard.module.css'
import { CardActions } from './components/CardActions'
import { CardImage } from './components/CardImage'
import { CardTags } from './components/CardTags'
import { CardTitle } from './components/CardTitle'

type MobileItemCardProps = {
  name: string
  imageUrl: string
  tags?: string[]
  onFavorite?: () => void
  onBookmark?: () => void
  onClick?: () => void
}

export function MobileItemCard({
  name,
  imageUrl,
  tags = [],
  onFavorite,
  onBookmark,
  onClick,
}: MobileItemCardProps) {
  return (
    <div className={styles.card} onClick={onClick}>
      <CardImage imageUrl={imageUrl} alt={name} />
      <div className={styles.content}>
        <CardTitle title={name} />
        <div className={styles.footer}>
          <CardTags tags={tags} />
          <CardActions onFavorite={onFavorite} onBookmark={onBookmark} />
        </div>
      </div>
    </div>
  )
}
