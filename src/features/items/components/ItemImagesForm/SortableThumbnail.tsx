import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import styles from './SortableThumbnail.module.css'
import type { ItemImage } from '../ItemForm/types'
import TrashBin from './trash-bin.svg'

export function SortableThumbnail({
    img,
    onDelete,
    onSelect,
}: {
    img: ItemImage;
    onDelete: (key: string) => void;
    onSelect: (key: string) => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: img.key })
    const style = { transform: CSS.Transform.toString(transform), transition }
    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className={styles.thumbWrap}
            onClick={() => onSelect(img.key)}
        >
            <img src={img.url} alt="" className={styles.thumb} draggable={false} {...listeners} />
            <button
                type='button'
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                    event.stopPropagation();
                    onDelete(img.key);
                }}
                className={styles.deleteBtn}
                aria-label="Delete image"
            >
                <img src={TrashBin} alt="Delete"/>
            </button>
        </div>
    )
}
