import styles from '@/app/mobile/components/MobileItemCard/MobileItemCard.module.css'
import { ActionIconButton, ActionVariant } from '@/app/mobile/components/base/ActionIconButton/ActionIconButton'

type CardActionsProps = {
  onFavorite?: () => void
  onBookmark?: () => void
  isFavorite?: boolean
  isBookmarked?: boolean
}

export function CardActions({ 
  onFavorite, 
  onBookmark, 
  isFavorite = false, 
  isBookmarked = false 
}: CardActionsProps) {
  return (
    <div className={styles.actions}>
      <ActionIconButton 
        icon="favorite" 
        variant={ActionVariant.HEART}
        active={isFavorite}
        onClick={onFavorite}
      />
      <ActionIconButton 
        icon="bookmark" 
        variant={ActionVariant.BOOKMARK}
        active={isBookmarked}
        onClick={onBookmark}
      />
    </div>
  )
}
