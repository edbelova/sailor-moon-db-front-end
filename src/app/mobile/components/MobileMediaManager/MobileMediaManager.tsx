import { useState } from 'react'
import { 
  DndContext, 
  closestCenter, 
  MouseSensor,
  TouchSensor,
  useSensor, 
  useSensors
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { 
  SortableContext, 
  verticalListSortingStrategy, 
  arrayMove 
} from '@dnd-kit/sortable'
import type { ItemImage } from '../../../../features/items/components/ItemForm/types'
import { SortableThumbRow } from './components/SortableThumbRow'
import styles from './MobileMediaManager.module.css'

type MobileMediaManagerProps = {
  images: ItemImage[]
  onAddImages: (files: File[]) => void
  onDeleteImage: (key: string) => void
  onReorderImages?: (images: ItemImage[]) => void
}

export function MobileMediaManager({
  images,
  onAddImages,
  onDeleteImage,
  onReorderImages,
}: MobileMediaManagerProps) {
  const [previewKey, setPreviewKey] = useState<string | null>(null)

  // Use specialized sensors for better cross-platform reliability
  const mouseSensor = useSensor(MouseSensor)
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250, // Require 250ms hold to distinguish drag from tap
      tolerance: 5,
    },
  })
  
  const sensors = useSensors(mouseSensor, touchSensor)

  // The hero image should show the selected preview, otherwise the first image (the cover)
  const mainImage = images.find((img) => img.key === previewKey) || images[0]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onAddImages(Array.from(e.target.files))
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img.key === active.id)
      const newIndex = images.findIndex((img) => img.key === over.id)
      
      const next = arrayMove(images, oldIndex, newIndex).map((img, index) => ({
        ...img,
        isMain: index === 0,
      }))
      
      onReorderImages?.(next)
      setPreviewKey(null) // Reset preview to the new cover after reorder
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

      {/* Thumbnail List with DndKit */}
      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCenter} 
        onDragEnd={handleDragEnd}
      >
        <div className={styles.thumbnails}>
          <SortableContext 
            items={images.map(img => img.key)} 
            strategy={verticalListSortingStrategy}
          >
            {images.map((img) => (
              <SortableThumbRow
                key={img.key}
                img={img}
                onDelete={onDeleteImage}
                onSelect={setPreviewKey}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>

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
