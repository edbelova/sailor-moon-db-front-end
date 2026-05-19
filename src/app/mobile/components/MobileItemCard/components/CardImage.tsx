import type { ReactNode } from 'react'
import styles from '@/app/mobile/components/MobileItemCard/MobileItemCard.module.css'

type CardImageProps = {
  imageUrl: string
  alt: string
  children?: ReactNode
}

export function CardImage({ imageUrl, alt, children }: CardImageProps) {
  return (
    <div className={styles.imageContainer}>
      <img src={imageUrl} alt={alt} className={styles.image} />
      {children}
    </div>
  )
}
