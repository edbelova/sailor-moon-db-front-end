import styles from './ItemImagesForm.module.css'
import UploadIcon from './Upload.svg'

export function ItemImagesForm() {
    return (
        <div className={styles.itemImages}>

            <div className={styles.gallery}>
                {/* {galleryImages.map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt={`Gallery image ${index + 1}`}
                    className={styles.thumb}
                />
                ))} */}
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