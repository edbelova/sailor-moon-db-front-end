import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button } from '@/shared/components/base/Button/Button'
import type { ItemImage } from '@/features/items/components/ItemForm/types'
import styles from '@/app/mobile/components/MobileMediaManager/MobileMediaManager.module.css'

type SortableThumbRowProps = {
  img: ItemImage
  onDelete: (key: string) => void
  onSelect: (key: string) => void
}

export function SortableThumbRow({ img, onDelete, onSelect }: SortableThumbRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: img.key })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : undefined,
    opacity: isDragging ? 0.5 : undefined,
  }

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={styles.thumbRow}
      {...attributes}
    >
      <span 
        className={`material-symbols-outlined ${styles.dragHandle}`}
        {...listeners}
      >
        drag_indicator
      </span>
      <img 
        src={img.url} 
        alt="Item" 
        className={styles.thumbImg} 
        onClick={() => onSelect(img.key)} 
      />
      <div className={styles.thumbInfo} onClick={() => onSelect(img.key)}>
        <p className={styles.fileName}>{img.key.split('/').pop()}</p>
      </div>
      <Button 
        variant="ghost"
        shape="circle"
        size="sm"
        iconLeft="delete" 
        onClick={() => onDelete(img.key)} 
        className={styles.deleteBtn}
      />
    </div>
  )
}
