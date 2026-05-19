import { Tag } from '@/app/mobile/components/base/Tag/Tag'
import styles from '@/app/mobile/components/ItemMetadataPanel/ItemMetadataPanel.module.css'

type MetadataItemProps = {
  label: string
  value?: string | number | string[]
  isPrice?: boolean
  onClick?: (value: string) => void
}

function MetadataItem({ label, value, isPrice, onClick }: MetadataItemProps) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null
  
  const displayValue = Array.isArray(value) ? value.join(', ') : value
  const finalValue = isPrice && typeof value === 'number' ? `${value}Y` : displayValue

  return (
    <div className={styles.item}>
      <p className={styles.label}>{label}</p>
      <p 
        className={`${styles.value} ${isPrice ? styles.price : ''} ${onClick ? styles.clickable : ''}`}
        onClick={() => onClick && typeof finalValue === 'string' && onClick(String(displayValue))}
      >
        {finalValue}
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
  country?: string[] | string
  characters?: string[]
  onAttributeClick?: (field: string, value: string) => void
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
  onAttributeClick,
}: ItemMetadataPanelProps) {
  // Check if we have ANY data to show
  const hasMetadata = !!(
    releaseDate || 
    manufacturer || 
    (materials && materials.length > 0) || 
    series || 
    season || 
    price || 
    dimensions || 
    country || 
    characters.length > 0
  )

  if (!hasMetadata) return null

  return (
    <section className={styles.container}>
      <div className={styles.panel}>
        <div className={styles.grid}>
          <MetadataItem 
            label="Season" 
            value={season} 
          />
          
          <MetadataItem 
            label="Release Date" 
            value={releaseDate} 
          />
          
          <MetadataItem 
            label="Manufacturer" 
            value={manufacturer} 
            onClick={(val) => onAttributeClick?.('manufacturer', val)}
          />
          
          <MetadataItem 
            label="Materials" 
            value={materials} 
          />
          
          <MetadataItem 
            label="Series" 
            value={series} 
            onClick={(val) => onAttributeClick?.('series', val)}
          />
          
          <MetadataItem 
            label="Manufacturer price" 
            value={price} 
            isPrice 
          />
          
          <MetadataItem 
            label="Dimensions" 
            value={dimensions} 
          />
          
          <MetadataItem 
            label="Country" 
            value={country} 
            onClick={(val) => onAttributeClick?.('country', val)}
          />
        </div>

        {characters.length > 0 && (
          <div className={styles.charactersSection}>
            <p className={styles.label}>Characters</p>
            <div className={styles.tagsRow}>
              {characters.map((char) => (
                <Tag 
                  key={char} 
                  className={styles.clickableTag}
                  onClick={() => onAttributeClick?.('characters', char)}
                >
                  {char}
                </Tag>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
