import type { ItemImage } from '../ItemForm/types';
import styles from './ItemImagesForm.module.css'
import UploadIcon from './Upload.svg'

type ItemImagesFormProps = {
    images: ItemImage[]
    onAddImages: (files: File[]) => void
    onDeleteImage: (key: string) => void
    onSetMainImage: (key: string) => void
}

export function ItemImagesForm(props: ItemImagesFormProps) {
    return (
        <div className={styles.itemImages}>

            {/* Gallery thumbnails */}
            <div className={styles.gallery}>
                {props.images.map((img, index) => (
                <img
                    key={index}
                    src={img.url}
                    alt={`Gallery image ${index + 1}`}
                    className={styles.thumb}
                />
                ))}
            </div>

            {/* Main image */}
            <div className={styles.mainImage}>
                <div className={styles.uploadContainer}>
                    <img src={UploadIcon} alt="Upload images" className={styles.icon} />
                    <div className={styles.uploadText}>Click to upload images</div>
                </div>
            </div>
        </div>
    );
}