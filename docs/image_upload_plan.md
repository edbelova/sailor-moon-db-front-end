# Image Upload Plan (Frontend)

This document defines the frontend plan for admin image upload and management for items. It aligns with the backend image storage plan (S3 + LocalStack) and the current frontend structure.

## Scope / Requirements
- Admin can upload images from computer or via drag-and-drop.
- Admin can delete images from the gallery.
- Admin can set the **main image** by dragging a thumbnail into the main image area.
- The **Add** button must always appear **last** in the gallery list.
- Works for both create and edit flows.
- Item cannot be saved unless at least one image is attached.

---

## Current Frontend Context
- Image UI lives in: `src/features/items/components/ItemImagesForm/ItemImagesForm.tsx`
- Styles in: `src/features/items/components/ItemImagesForm/ItemImagesForm.module.css`
- Item form is rendered by `ItemForm` and used in:
  - `src/pages/ItemCreatePage`
  - `src/pages/ItemEditPage`
- API base helper: `src/shared/api.ts`
- React Query used for data fetching/caching.

---

## Data Model (Frontend State)
Maintain a local image list for the form:

```ts
type ItemImage = {
  key: string;      // S3 key returned by /api/images
  url: string;      // public URL for display
  isMain: boolean;  // derived from position (index 0) or explicit flag
};
```

**Recommended approach:**
- Keep `images` as an **ordered list of keys** (first element is main).
- `imageUrls` are only used for display; they do not need to be posted back.
- When rendering, map keys → URLs from upload responses (or existing item data).

---

## API Integration

### Upload
- Endpoint: `POST /api/images`
- Request: `multipart/form-data` with `file`
- Response: `{ key, url }`

Frontend should:
1) POST file to `/api/images`.
2) Append returned `{ key, url }` to gallery list.
3) If gallery is empty, set as main (index 0).

### Save Item
- `POST /api/items` or `PUT /api/items/{id}`
- Send `images: string[]` using the ordered list of **keys**.

---

## UX / Interaction Plan

### Upload (Click)
- Add button opens file picker (accept `image/*`).
- On selection, upload files sequentially or in parallel.

### Upload (Drag & Drop)
- Allow dropping files on:
  - gallery area (append to list)
  - main image area (upload + set as main)

### Empty State (no images)
- Show a large drag-and-drop area with dashed border and an **Upload from computer** button (matches current design).

### Set Main Image (Drag)
- Drag a thumbnail onto the main image area to make it main.
- This reorders the list (dragged image becomes index 0).

### Delete
- Each thumbnail has a delete icon/button.
- Remove from list immediately.
- If deleting the main image, the next image (index 1) becomes main.
 - On hover, show a trash bin icon on the **left side** of the thumbnail for quick delete.

### Add Button Placement
- Render thumbnails first, then render the **Add** tile last in the gallery list.

---

## Component Plan

### 1) ItemImagesForm
Update `ItemImagesForm` to accept and update image list via props:

```ts
type ItemImagesFormProps = {
  images: ItemImage[];
  onAddImages: (files: File[]) => void;
  onDeleteImage: (key: string) => void;
  onSetMain: (key: string) => void;
};
```

### 2) Form State Integration
- Store images in a form state container (likely inside item form state or a new images slice).
- On edit: preload existing `images` (keys) + `imageUrls` from API.

### 3) Drag and Drop
Use a small library for predictable DnD:
- Recommended: `@dnd-kit/core` + `@dnd-kit/sortable`
- Alternative: `react-beautiful-dnd` (legacy)

Implementation concept:
- Gallery is a sortable list.
- Main image area is a drop zone that moves dragged item to index 0.

---

## UI Layout (Matching Design)
- Left column: vertical gallery thumbnails.
- Right: main image display.
- Add tile appears last in gallery list.
- Use existing layout in `ItemImagesForm.module.css`.

New UI elements to add:
- Delete button overlay on thumbnails.
- Drag state styles (dragging, drop target highlight).

---

## Error Handling / Validation
- Limit upload to image types (`image/*`).
- Max file size (match backend limit).
- Show upload progress + error message if failed.

---

## Implementation Steps

1) **Add upload API helper**
   - Create `src/features/items/api/uploadItemImage.ts` (singular name).
   - Use `FormData` + `POST /api/images`.
   - Return `{ key, url }`.
   - Note: uploads are not linked to an item yet; the association happens on item save by sending `images: [key1, key2, ...]`.
   - Example implementation:

```ts
import { api } from '../../../shared/api'

export type UploadItemImageResponse = {
  key: string
  url: string
}

export async function uploadItemImage(file: File): Promise<UploadItemImageResponse> {
  const formData = new FormData()
  formData.append('file', file)

  return api<UploadItemImageResponse>('/api/images', {
    method: 'POST',
    body: formData,
  })
}
```

   - Notes:
     - `FormData` must use the field name `file` to match the backend.
     - `api`/`apiFetch` must not force `Content-Type: application/json` for `FormData` requests.
     - `api`/`apiFetch` should already handle credentials (cookies/CSRF) if needed.
     - Response is `{ key, url }` as defined by your backend DTO.
   - Optional multi-file helper (keep in the same file):

```ts
export async function uploadItemImages(files: File[]): Promise<UploadItemImageResponse[]> {
  const uploads = files.map(uploadItemImage)
  return Promise.all(uploads)
}
```

   - Place the helper in `src/features/items/api/uploadItemImage.ts` and import it into the form state handler (typically a hook or reducer action in `src/features/items/state`), not directly inside the presentational component.

2) **Update `apiFetch` to support `FormData`**
   - The current `apiFetch` always sets `Content-Type: application/json`, which breaks file uploads.
   - Update it so `Content-Type` is only set for JSON bodies, and let the browser set it for `FormData`.

Example change in `src/shared/api.ts`:

```ts
function buildHeaders(options?: RequestInit['headers'], body?: RequestInit['body']) {
  const base: Record<string, string> = {}

  if (!(body instanceof FormData)) {
    base['Content-Type'] = 'application/json'
  }

  // merge existing headers from options (same as today)
  if (options instanceof Headers) {
    options.forEach((value, key) => {
      base[key] = value
    })
  } else if (Array.isArray(options)) {
    options.forEach(([key, value]) => {
      base[key] = value
    })
  } else if (options) {
    Object.assign(base, options)
  }

  const csrfToken = getCsrfToken()
  if (csrfToken) {
    base['X-XSRF-TOKEN'] = decodeURIComponent(csrfToken)
  }

  return base
}

export async function apiFetch<T = unknown>(path: string, options: RequestInit = {}) {
  const headers = buildHeaders(options.headers, options.body)
  // rest unchanged
}
```

3) **Add image state to item form**
   - Create or extend item form state in `src/features/items/state` to include:
     - `images: ItemImage[]`
     - `isUploading: boolean`
     - `uploadErrors: string[]`
   - When editing an item, hydrate state from API:
     - `images` = zip `images` + `imageUrls` into `{ key, url }` objects.
   - Recommended placement:
     - Keep form values in `src/features/items/state/useItemFormStore.ts` (Zustand).
     - Store UI images separately from `values.images` (keys-only) to avoid mixing keys and URLs.
   - Suggested store shape (example):

```ts
type ItemFormState = {
  values: ItemFormValues
  imageItems: ItemImage[]
  isUploading: boolean
  uploadErrors: string[]
  setImageItems: (images: ItemImage[]) => void
  // existing setters...
}
```

   - Define `ItemImage` alongside form types (e.g., `src/features/items/components/ItemForm/types.ts`):

```ts
export type ItemImage = {
  key: string
  url: string
  isMain: boolean
}
```

   - Initialize the new fields in `useItemFormStore`:

```ts
export const useItemFormStore = create<ItemFormState>((set) => ({
  values: getDefaultItemFormValues(),
  imageItems: [],
  isUploading: false,
  uploadErrors: [],
  setImageItems: (items) => set({ imageItems: items }),
  // existing setters...
}))
```

   - Hydrate on edit (in `ItemEditPage` after item fetch):

```ts
const setImageItems = useItemFormStore((state) => state.setImageItems)
  const setValues = useItemFormStore((state) => state.setValues)

  useEffect(() => {
    if (!item) return

    const imageItems = (item.images ?? []).map((key, index) => ({
      key,
      url: item.imageUrls?.[index] ?? '',
      isMain: index === 0,
    }))

    setValues(buildItemFormValues(item))
    setImageItems(imageItems)
  }, [item, setValues, setImageItems])
```

   - When saving, keep using `values.images` (keys-only), derived from `imageItems.map(i => i.key)`.
   - Update the frontend `Item` type to include `imageUrls?: string[]` so TypeScript recognizes the new field.

4) **Wire state to `ItemImagesForm`**
   - Update `ItemImagesForm` to accept props for:
     - `images`
     - `onAddImages(files)`
     - `onDeleteImage(key)`
     - `onSetMain(key)`
   - In `ItemForm`, pass handlers from state to `ItemImagesForm`.
   - `onAddImages` is where you call the upload helper(s):
     - use `uploadItemImage(file)` for single-file selection
     - use `uploadItemImages(files)` for multi-file selection/drag-drop

5) **Implement file picker upload**
   - Add a hidden `<input type="file" accept="image/*" multiple />`.
   - Add “Upload from computer” button that triggers the input.
   - On file selection:
     - validate files (type, size)
     - upload files (sequential or parallel)
     - append new `{ key, url }` to gallery
     - if gallery was empty, set first upload as main

6) **Implement drag-and-drop upload**
   - Add drop handlers to:
     - gallery container (append)
     - main image container (append + set as main)
   - Prevent default browser behavior on drag-over.
   - Add visual drop-target highlight.

7) **Implement drag-to-main behavior**
   - Use `@dnd-kit` sortable list for thumbnails.
   - Add a drop zone over main image:
     - when a thumbnail is dropped there, move it to index 0.
   - Optional: allow full reordering in the gallery list.

8) **Implement delete**
   - Add a trash icon overlay (left side) shown on hover.
   - On delete:
     - remove from list
     - if deleted image was main, promote next image (index 0)
     - (optional) call backend delete to avoid orphan images (future enhancement)

9) **Enforce “at least one image” rule**
   - Disable the Save button in `ItemFormActions` when `images.length === 0`.
   - Show inline error message under the image section if user tries to save with no images.

10)  **Persist on save**
   - In create/update payloads, send:
     - `images: images.map(i => i.key)`
   - Do not send `imageUrls` in requests.

11)  **Test flows**
   - Create: upload 1–3 images → set main → save item → verify `imageUrls`.
   - Edit: reorder main image → delete → save → verify backend updates.

---

## Wireframe Notes (based on screenshot)
- Main image panel shows current main image.
- Gallery shows thumbnails + Add tile.
- Dragging a thumbnail onto main replaces the main image.
- Delete removes thumbnail immediately.

---

## Future Enhancements (Optional)
- Multi-select upload with progress indicator.
- Reorder gallery via drag within the list (not only main).
- Image captions or alt text.
- Preview before upload.
 - Orphan cleanup: uploads happen before item save, so deleting a not-yet-saved image can leave an orphan in storage. Add a cleanup flow later (e.g., delete the image immediately on removal, or run a periodic cleanup job that deletes unreferenced images after a TTL).
