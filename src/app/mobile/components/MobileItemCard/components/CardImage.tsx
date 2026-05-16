import styles from '../MobileItemCard.module.css'

type CardImageProps = {
  imageUrl: string
  alt: string
}

export function CardImage({ imageUrl, alt }: CardImageProps) {
  return (
    <div className={styles.imageContainer}>
      <img src={imageUrl} alt={alt} className={styles.image} />
    </div>
  )
}
