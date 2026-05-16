import styles from '../MobileItemCard.module.css'
import { IconButton } from '../../base/IconButton/IconButton'

type CardActionsProps = {
  onFavorite?: () => void
  onBookmark?: () => void
}

export function CardActions({ onFavorite, onBookmark }: CardActionsProps) {
  return (
    <div className={styles.actions}>
      <IconButton 
        icon="favorite" 
        onClick={(e) => {
          e.stopPropagation()
          onFavorite?.()
        }}
        className={styles.actionBtn}
      />
      <IconButton 
        icon="bookmark" 
        onClick={(e) => {
          e.stopPropagation()
          onBookmark?.()
        }}
        className={styles.actionBtn}
      />
    </div>
  )
}
