import { useRef } from 'react';
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

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handlePickClick = () => {
        inputRef.current?.click();
    }

    const handleFiles = (files: FileList | null) => {
        if (!files || files.length === 0) return;
        props.onAddImages(Array.from(files));
    }

    return (
        <div className={styles.itemImages}>
            
            {/* Hidden file input for uploads */}
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                className={styles.hiddenInput}
                onChange={(e) => {
                    handleFiles(e.target.files);
                    e.currentTarget.value = ''
                }}
            />

            <button
                type="button"
                className={styles.uploadButton}
                onClick={handlePickClick}
            >
                <img src={UploadIcon} alt="Upload images" className={styles.icon} />
                <div className={styles.uploadText}>Upload from computer</div>
            </button>

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