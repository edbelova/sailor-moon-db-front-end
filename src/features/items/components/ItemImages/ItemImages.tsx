import { useState } from 'react'
import styles from './ItemImages.module.css'

type ItemImagesProps = {
    images: string[]
    imageUrls?: string[]
};

export function ItemImages({ images, imageUrls }: ItemImagesProps) {
    const displayImages = imageUrls?.length ? imageUrls : images
    const [activeKey, setActiveKey] = useState<string | null>(null)
    const activeIndex = activeKey ? displayImages.indexOf(activeKey) : -1
    const safeIndex = activeIndex >= 0 ? activeIndex : 0
    const mainImage = displayImages[safeIndex] ?? displayImages[0]

    if (!mainImage) {
        return null
    }

    return (
        <div className={styles.itemImages}>
        {/* Gallery */}
        <div className={styles.gallery}>
            {displayImages.map((img, index) => (
            <img
                key={`${img}-${index}`}
                src={img}
                alt={`Gallery image ${index + 1}`}
                className={`${styles.thumb} ${index === safeIndex ? styles.thumbActive : ''}`}
                onClick={() => setActiveKey(img)}
            />
            ))}
        </div>

        {/* Main image */}
        <div className={styles.mainImage}>
            <img src={mainImage} alt="Main item" />
        </div>
        </div>
    );
}
