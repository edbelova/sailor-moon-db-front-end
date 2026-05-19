import styles from '@/app/mobile/components/MobileItemCard/MobileItemCard.module.css'
import { Tag } from '@/app/mobile/components/base/Tag/Tag'

type CardTagsProps = {
  tags: string[]
}

export function CardTags({ tags }: CardTagsProps) {
  if (tags.length === 0) return <div className={styles.tags} />

  return (
    <div className={styles.tags}>
      {tags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </div>
  )
}
