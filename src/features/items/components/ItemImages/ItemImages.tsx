import styles from './ItemImages.module.css'

type ItemImagesProps = {
    images: string[];
};

export function ItemImages({ images }: ItemImagesProps) {
	const [mainImage, ...galleryImages] = images;

    return (
        <div className={styles.itemImages}>
        {/* Gallery */}
        <div className={styles.gallery}>
            {galleryImages.map((img, index) => (
            <img
                key={index}
                src={img}
                alt={`Gallery image ${index + 1}`}
                className={styles.thumb}
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
