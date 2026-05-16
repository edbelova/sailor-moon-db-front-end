import styles from './MobileItemCard.module.css'

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
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        <div className={styles.footer}>
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className={styles.actions}>
            <button
              className={styles.actionBtn}
              onClick={(e) => {
                e.stopPropagation()
                onFavorite?.()
              }}
            >
              <span className="material-symbols-outlined">favorite</span>
            </button>
            <button
              className={styles.actionBtn}
              onClick={(e) => {
                e.stopPropagation()
                onBookmark?.()
              }}
            >
              <span className="material-symbols-outlined">bookmark</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
