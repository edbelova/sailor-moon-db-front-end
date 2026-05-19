import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '@/app/mobile/components/MobileItemCard/MobileItemCard.module.css'
import { CardActions } from '@/app/mobile/components/MobileItemCard/components/CardActions'
import { CardImage } from '@/app/mobile/components/MobileItemCard/components/CardImage'
import { CardTags } from '@/app/mobile/components/MobileItemCard/components/CardTags'
import { CardTitle } from '@/app/mobile/components/MobileItemCard/components/CardTitle'

type MobileItemCardProps = {
  id: string
  name: string
  imageUrl: string
  tags?: string[]
  onFavorite?: () => void
  onBookmark?: () => void
}

export function MobileItemCard({
  id,
  name,
  imageUrl,
  tags = [],
  onFavorite,
  onBookmark,
}: MobileItemCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/items/${id}`)
  }

  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
    onFavorite?.()
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    onBookmark?.()
  }

  return (
    <div className={styles.card} onClick={handleCardClick}>
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
        <div className={styles.footer}>
          <CardTags tags={tags} />
        </div>
      </div>
    </div>
  )
}
