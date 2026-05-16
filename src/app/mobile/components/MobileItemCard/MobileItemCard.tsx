import { useState } from 'react'
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
  const [isFavorite, setIsFavorite] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
    onFavorite?.()
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    onBookmark?.()
  }

  return (
    <div className={styles.card} onClick={onClick}>
      <CardImage imageUrl={imageUrl} alt={name}>
        <CardActions 
          onFavorite={handleFavorite} 
          onBookmark={handleBookmark}
          isFavorite={isFavorite}
          isBookmarked={isBookmarked}
        />
      </CardImage>
      <div className={styles.content}>
        <CardTitle title={name} />
        <CardTags tags={tags} />
      </div>
    </div>
  )
}
