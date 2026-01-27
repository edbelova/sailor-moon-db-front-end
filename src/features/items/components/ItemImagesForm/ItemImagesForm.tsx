import { DndContext } from '@dnd-kit/core'
import { useDroppable } from '@dnd-kit/core'
import { closestCenter, MeasuringStrategy, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import type { DragEndEvent, DragMoveEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { DragOverlay } from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useCallback, useRef, useState } from 'react';
import type { ItemImage } from '../ItemForm/types';
import styles from './ItemImagesForm.module.css'
import UploadIcon from './Upload.svg'
import { useItemFormStore } from '../../state/useItemFormStore';
import { SortableThumbnail } from './SortableThumbnail';

type ItemImagesFormProps = {
    images: ItemImage[]
    onAddImages: (files: File[]) => void
    onDeleteImage: (key: string) => void
    onSetMainImage: (key: string) => void
}

export function ItemImagesForm(props: ItemImagesFormProps) {

    const [isDragging, setIsDragging] = useState(false);
    const [activeId, setActiveId] = useState<string | null>(null);
    const setImageItems = useItemFormStore(state => state.setImageItems);
    const sensors = useSensors(useSensor(PointerSensor));
    const inputRef = useRef<HTMLInputElement | null>(null);
    const lastOverId = useRef<string | null>(null);
    const dragInitialRect = useRef<DOMRect | null>(null);
    const dragTranslatedRect = useRef<DOMRect | null>(null);
    const lastDelta = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const mainImageRef = useRef<HTMLDivElement | null>(null);
    const { setNodeRef: setMainDroppableRef } = useDroppable({ id: 'main-drop-zone' })
    const setMainRef = useCallback((node: HTMLDivElement | null) => {
        mainImageRef.current = node;
        setMainDroppableRef(node);
    }, [setMainDroppableRef]);
    const mainImage = props.images.find((img) => img.isMain) ?? props.images[0]
    const galleryImages = props.images

    const handlePickClick = () => {
        inputRef.current?.click();
    }

    const handleFiles = (files: FileList | null) => {
        if (!files || files.length === 0) return;
        props.onAddImages(Array.from(files));
    }

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
        const initial = event.active.rect.current.initial;
        dragInitialRect.current = initial ? new DOMRect(initial.left, initial.top, initial.width, initial.height) : null;
        dragTranslatedRect.current = null;
        lastDelta.current = { x: 0, y: 0 };
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDnDKitDragOver = (event: DragOverEvent) => {
        if (event.over?.id) {
            lastOverId.current = event.over.id as string;
        }
    }

    const handleDnDKitDragMove = (event: DragMoveEvent) => {
        lastDelta.current = event.delta;
        const translated = event.active.rect.current.translated;
        if (translated) {
            dragTranslatedRect.current = new DOMRect(translated.left, translated.top, translated.width, translated.height);
        }
    }

    const handleDragLeave = () => setIsDragging(false)

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)

        const files = Array.from(e.dataTransfer.files ?? []).filter(file => file.type.startsWith('image/'))
        if (files.length === 0) return
        props.onAddImages(files)
    }

    const collisionDetection = useCallback(
        (args: Parameters<typeof closestCenter>[0]) => {
            const mainRect = mainImageRef.current?.getBoundingClientRect();
            const pointer = args.pointerCoordinates;
            if (pointer && mainRect) {
                const isOverMain = pointer.x >= mainRect.left
                    && pointer.x <= mainRect.right
                    && pointer.y >= mainRect.top
                    && pointer.y <= mainRect.bottom;
                if (isOverMain) {
                    const mainContainer = args.droppableContainers.find(
                        (container) => container.id === 'main-drop-zone'
                    );
                    if (mainContainer) {
                        return [{ id: mainContainer.id, data: { droppableContainer: mainContainer } }];
                    }
                }
            }
            return closestCenter(args);
        },
        []
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        const overId = (over?.id as string | undefined) ?? lastOverId.current;
        lastOverId.current = null;

        setActiveId(null);

        const isOverActive = overId === active.id;
        if (!overId || isOverActive) {
            const initial = dragInitialRect.current ?? dragTranslatedRect.current;
            const mainRect = mainImageRef.current?.getBoundingClientRect();
            if (initial && mainRect) {
                const centerX = initial.left + initial.width / 2 + (dragInitialRect.current ? lastDelta.current.x : 0);
                const centerY = initial.top + initial.height / 2 + (dragInitialRect.current ? lastDelta.current.y : 0);
                const isOverMain = centerX >= mainRect.left
                    && centerX <= mainRect.right
                    && centerY >= mainRect.top
                    && centerY <= mainRect.bottom;
                if (isOverMain) {
                    props.onSetMainImage(active.id as string);
                }
            }
            if (!overId || isOverActive) {
                return;
            }
        }

        if (overId === 'main-drop-zone') {
            props.onSetMainImage(active.id as string);
            return;
        }
        
        const oldIndex = props.images.findIndex(img => img.key === active.id);
        const newIndex = props.images.findIndex(img => img.key === overId);
        if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
            const next = arrayMove(props.images, oldIndex, newIndex).map((img, index) => ({
                ...img,
                isMain: index === 0,
            }));
            setImageItems(next);
        }
    };

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

            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragMove={handleDnDKitDragMove}
                onDragOver={handleDnDKitDragOver}
                onDragEnd={handleDragEnd}
                collisionDetection={collisionDetection}
                measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
            >
                <SortableContext
                    items={galleryImages.map(img => img.key)}
                    strategy={verticalListSortingStrategy}
                >
                    {/* Gallery thumbnails */}
                    {props.images.length > 0 && (
                        <div
                            className={`${styles.gallery} ${
                                isDragging && props.images.length === 0 ? styles.dragActive : ''
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            {galleryImages.map((img) => (
                                <SortableThumbnail
                                    key={img.key}
                                    img={img}
                                    onDelete={props.onDeleteImage}
                                    onSelect={props.onSetMainImage}
                                />
                            ))}

                            <button
                                type="button"
                                className={styles.addTile}
                                onClick={handlePickClick}
                                aria-label='Add more images'
                            >
                                <img src={UploadIcon} alt="" className={styles.icon} />
                                <div className={styles.uploadText}>Add</div>
                            </button>
                        </div>
                    )}
                </SortableContext>

                {/* Main image */}
                <div
                    className={`${styles.mainImage} ${isDragging ? styles.dragActive : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    ref={setMainRef}
                    id="main-drop-zone"
                >
                    {mainImage ? (
                        <img src={mainImage.url} alt="Main" className={styles.mainImagePreview} />
                    ) : (
                        <div className={styles.uploadContainer} onClick={handlePickClick}>
                            <img src={UploadIcon} alt="Upload images" className={styles.icon} />
                            <div className={styles.uploadText}>Drag and drop files</div>
                            <button type="button" className={styles.uploadButton}>Upload from computer</button>
                        </div>
                        )}
                </div>
                <DragOverlay>
                    {activeId ? (() => {
                        const activeImg = props.images.find(img => img.key === activeId);
                        if (!activeImg) return null;
                        return (
                            <div className={styles.thumbWrap}>
                                <img
                                    src={activeImg.url}
                                    alt="Dragging"
                                    className={styles.thumb}
                                    draggable={false}
                                />
                            </div>
                        );
                    })() : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}
