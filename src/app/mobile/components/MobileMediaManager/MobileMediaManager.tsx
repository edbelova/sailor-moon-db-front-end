import { IconButton } from '../base/IconButton/IconButton'
import type { ItemImage } from '../../../../features/items/components/ItemForm/types'
import styles from './MobileMediaManager.module.css'

type MobileMediaManagerProps = {
  images: ItemImage[]
  onAddImages: (files: File[]) => void
  onDeleteImage: (key: string) => void
  onSetMainImage: (key: string) => void
}

export function MobileMediaManager({
  images,
  onAddImages,
  onDeleteImage,
  onSetMainImage,
}: MobileMediaManagerProps) {
  const mainImage = images.find((img) => img.isMain) || images[0]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onAddImages(Array.from(e.target.files))
    }
  }

  return (
    <section className={styles.container}>
      {/* Hero Cover */}
      <div className={styles.heroContainer}>
        {mainImage ? (
          <img src={mainImage.url} alt="Main view" className={styles.heroImg} />
        ) : (
          <div className={styles.emptyHero}>
            <span className="material-symbols-outlined">image</span>
          </div>
        )}
      </div>

      {/* Thumbnail List */}
      <div className={styles.thumbnails}>
        {images.map((img) => (
          <div key={img.key} className={styles.thumbRow}>
            <span className={`material-symbols-outlined ${styles.dragHandle}`}>drag_indicator</span>
            <img src={img.url} alt="Item" className={styles.thumbImg} onClick={() => onSetMainImage(img.key)} />
            <div className={styles.thumbInfo} onClick={() => onSetMainImage(img.key)}>
               <p className={styles.fileName}>{img.key.split('/').pop()}</p>
            </div>
            <IconButton 
              icon="delete" 
              onClick={() => onDeleteImage(img.key)} 
              className={styles.deleteBtn}
              iconSize={20}
            />
          </div>
        ))}
      </div>

      {/* Add Button */}
      <label className={styles.addBtn}>
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          className={styles.hiddenInput} 
          onChange={handleFileChange}
        />
        <span className="material-symbols-outlined">add</span>
        Add Images
      </label>
    </section>
  )
}
