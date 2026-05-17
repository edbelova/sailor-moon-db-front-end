import { Tag } from '../base/Tag/Tag'
import styles from './ItemMetadataPanel.module.css'

type MetadataItemProps = {
  label: string
  value?: string | number
  isPrice?: boolean
}

function MetadataItem({ label, value, isPrice }: MetadataItemProps) {
  if (!value) return null
  return (
    <div className={styles.item}>
      <p className={styles.label}>{label}</p>
      <p className={`${styles.value} ${isPrice ? styles.price : ''}`}>
        {isPrice ? `¥${value.toLocaleString()}` : value}
      </p>
    </div>
  )
}

type ItemMetadataPanelProps = {
  releaseDate?: string
  manufacturer?: string
  materials?: string[]
  series?: string
  season?: string
  price?: number
  dimensions?: string
  country?: string
  characters?: string[]
}

export function ItemMetadataPanel({
  releaseDate,
  manufacturer,
  materials,
  series,
  season,
  price,
  dimensions,
  country,
  characters = [],
}: ItemMetadataPanelProps) {
  return (
    <section className={styles.container}>
      <div className={styles.panel}>
        <div className={styles.grid}>
          <MetadataItem label="Release Date" value={releaseDate} />
          <MetadataItem label="Manufacturer" value={manufacturer} />
          <MetadataItem label="Materials" value={materials?.join(', ')} />
          <MetadataItem label="Series" value={series} />
          <MetadataItem label="Season" value={season} />
          <MetadataItem label="Price" value={price} isPrice />
          <MetadataItem label="Dimensions" value={dimensions} />
          <MetadataItem label="Country" value={country} />
        </div>

        {characters.length > 0 && (
          <div className={styles.charactersSection}>
            <p className={styles.label}>Characters</p>
            <div className={styles.tagsRow}>
              {characters.map((char) => (
                <Tag key={char}>{char}</Tag>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
