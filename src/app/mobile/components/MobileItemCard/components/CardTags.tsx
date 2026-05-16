import styles from '../MobileItemCard.module.css'
import { Chip } from '../../base/Chip/Chip'

type CardTagsProps = {
  tags: string[]
}

export function CardTags({ tags }: CardTagsProps) {
  if (tags.length === 0) return <div className={styles.tags} />

  return (
    <div className={styles.tags}>
      {tags.map((tag) => (
        <Chip key={tag} variant="neutral">
          {tag}
        </Chip>
      ))}
    </div>
  )
}
