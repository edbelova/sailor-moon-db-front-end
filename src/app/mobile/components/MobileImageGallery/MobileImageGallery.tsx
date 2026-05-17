import { useState } from 'react'
import styles from './MobileImageGallery.module.css'

type MobileImageGalleryProps = {
  imageUrls: string[]
}

export function MobileImageGallery({ imageUrls }: MobileImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (imageUrls.length === 0) return null

  return (
    <section className={styles.container}>
      <div className={styles.heroContainer}>
        <div className={styles.heroWrapper}>
          <img 
            src={imageUrls[activeIndex]} 
            alt="Hero image" 
            className={styles.heroImage} 
          />
        </div>
      </div>
      
      {imageUrls.length > 1 && (
        <div className={styles.thumbnailsRow}>
          {imageUrls.map((url, index) => (
            <div 
              key={url} 
              className={`${styles.thumbnail} ${index === activeIndex ? styles.thumbnailActive : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              <img src={url} alt={`Thumbnail ${index}`} className={styles.thumbImg} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
