import styles from '../MobileItemCard.module.css'
import { Chip, ChipVariant } from '../../base/Chip/Chip'

type CardTagsProps = {
  tags: string[]
}

export function CardTags({ tags }: CardTagsProps) {
  if (tags.length === 0) return <div className={styles.tags} />

  return (
    <div className={styles.tags}>
      {tags.map((tag) => (
        <Chip key={tag} variant={ChipVariant.NEUTRAL} className={styles.tag}>
          {tag}
        </Chip>
      ))}
    </div>
  )
}
