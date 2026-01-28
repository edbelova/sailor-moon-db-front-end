# Filter & Ordering Plan - Frontend (Detailed)

## Goals
- Implement filter + ordering UI on main items list and category/subcategory pages.
- Filters collapse/expand on click and apply via explicit Apply button.
- Persist filters + ordering in URL query params.
- Use free-text inputs with autosuggestions for Characters, Manufacturer, Series, Materials, Country.
- Autosuggestions are populated from values stored on existing items (global across all items).
- Country autosuggestions come from a predefined list, but users can still type any value.

## UI/UX structure
1) Filters bar (collapsed/expanded)
   - Collapsed shows row with:
     - “Filters” toggle (chevron)
     - Ordering dropdown
   - Expanded area contains inputs for:
     - Name (text)
     - Characters (text with autosuggest, multi-value)
     - Release date from/to (two inputs)
     - Manufacturer (text with autosuggest, multi-value)
     - Materials (text with autosuggest, multi-value)
     - Series (text with autosuggest, multi-value)
     - Price min/max (number inputs)
     - Country (text with autosuggest, multi-value)
   - Apply button triggers query param update.
   - Clicking Filters again collapses panel.
   - Autosuggest behavior (for Characters/Manufacturer/Series/Materials/Country):
     - Case-insensitive matching.
     - Show suggestions after 2 characters.
     - Show up to 8 suggestions.
     - Multi-value inputs are comma-separated.
     - Users can type values not present in the suggestions.

2) Ordering
   - Dropdown values: Release date, Manufacturer, Series, Name, Price, Country.
   - “Recently added” omitted for now.
   - Separate direction toggle (asc/desc) or include direction in dropdown.

## State + URL behavior
- Query params reflect filters + order:
  - `name`, `characters`, `releaseDateFrom`, `releaseDateTo`, `manufacturer`, `materials`, `series`, `priceMin`, `priceMax`, `country`, `orderBy`, `orderDir`.
- On page load, parse query params and initialize filter UI state.
- On Apply, update query params (push/replace) and refetch items.
- Category routes keep their path; query params append to `/categories/:id?…`.

## Data fetching
1) Items list
   - Update `fetchItemsByCategory` to accept query params for filters/sort.
   - Build query string from category + filter params.
   - Use React Query `queryKey` that includes filters to refetch when they change.

2) Autosuggest sources
   - Add endpoint call: `/api/items/filters`.
   - Store values in a new query hook (e.g., `useItemFiltersMetadata`).
   - Populate autosuggestions for Characters, Manufacturer, Series, Materials from metadata.
   - Country autosuggestions come from a predefined list (could be served by the same endpoint or bundled client-side).
   - Suggestions are global (not category-scoped).

## Component plan
1) New components
   - `FiltersBar` (or `ItemsFilters`) component
     - Manages expand/collapse UI
     - Owns input state for filters
     - Reads/writes query params
     - Calls `onApply` or directly updates URL

2) Integration points
   - `MainPage` renders `FiltersBar` above `ItemsGrid`.
   - Category/subcategory pages are the same `MainPage` route, so filters appear there too.
   - `ItemsGrid` uses hook reading current filters (via URL or store) to fetch items.

## Query param parsing
- Create helper in `frontend/src/features/items/filters` (new module) to:
  - Parse current URLSearchParams into typed filter state.
  - Serialize state to URLSearchParams.
- Validate numeric inputs (price min/max), ignore invalid values.
- Release date inputs accept YYYY, YYYY-MM, YYYY-MM-DD.

## Styling
- Match provided layout screenshot:
  - Filters row top with labels and input fields aligned.
  - Expand/collapse area animates height and padding.
  - Apply button on right/left per design.

## Implementation steps (detailed, in order)

### Step 1 — Define filter types (foundation for everything else)
Create `frontend/src/features/items/filters/types.ts`.

Why first: every other file depends on the filter shape. Putting this up front avoids circular updates later.

```ts
// Fields the backend can sort by (used in URL and UI).
export type OrderBy =
  | 'releaseDate'
  | 'manufacturer'
  | 'series'
  | 'name'
  | 'price'
  | 'country'

// Sort direction for ordering results in the UI and API (ascending or descending).
export type OrderDir = 'asc' | 'desc'

// All filter input values stored in component state and mirrored to URL query params.
export type ItemFiltersState = {
  name: string
  characters: string
  releaseDateFrom: string
  releaseDateTo: string
  manufacturer: string
  materials: string
  series: string
  priceMin: string
  priceMax: string
  country: string
  orderBy: OrderBy
  orderDir: OrderDir
}

// Default filter values when URL query params are missing.
export const defaultFilters: ItemFiltersState = {
  name: '',
  characters: '',
  releaseDateFrom: '',
  releaseDateTo: '',
  manufacturer: '',
  materials: '',
  series: '',
  priceMin: '',
  priceMax: '',
  country: '',
  orderBy: 'name',
  orderDir: 'asc',
}
```

Explanation:
- Use strings for inputs so they bind directly to `<input>` values.
- Multi-value fields use comma-separated strings in state and URL (e.g., `Sailor Moon, Sailor Mars`).
- `defaultFilters` provides consistent defaults when parsing URLs or initializing UI.
- `orderBy`/`orderDir` defaults reflect the normal “Name A–Z” list.

### Step 2 — Add URL query helpers (parse + serialize)
Create `frontend/src/features/items/filters/queryParams.ts`.

Why now: filters must persist in URL; this is the single source of truth for converting between URL and UI state.

```ts
import { defaultFilters, type ItemFiltersState } from './types'

// Convert null params to empty strings and trim whitespace so filters are consistent.
const normalize = (value: string | null) => (value ?? '').trim()

// Parses location.search into a complete ItemFiltersState with defaults.
export function parseFiltersFromSearch(search: string): ItemFiltersState {
  const params = new URLSearchParams(search)
  return {
    name: normalize(params.get('name')),
    characters: normalize(params.get('characters')),
    releaseDateFrom: normalize(params.get('releaseDateFrom')),
    releaseDateTo: normalize(params.get('releaseDateTo')),
    manufacturer: normalize(params.get('manufacturer')),
    materials: normalize(params.get('materials')),
    series: normalize(params.get('series')),
    priceMin: normalize(params.get('priceMin')),
    priceMax: normalize(params.get('priceMax')),
    country: normalize(params.get('country')),
    orderBy:
      (params.get('orderBy') as ItemFiltersState['orderBy']) ??
      defaultFilters.orderBy,
    orderDir:
      (params.get('orderDir') as ItemFiltersState['orderDir']) ??
      defaultFilters.orderDir,
  }
}

// Builds a URL query string from filter state, omitting empty fields.
export function buildSearchFromFilters(filters: ItemFiltersState): string {
  const params = new URLSearchParams()

  // Only add non-empty values so the URL stays short and readable.
  const add = (key: string, value: string) => {
    if (value.trim()) {
      params.set(key, value.trim())
    }
  }

  add('name', filters.name)
  add('characters', filters.characters)
  add('releaseDateFrom', filters.releaseDateFrom)
  add('releaseDateTo', filters.releaseDateTo)
  add('manufacturer', filters.manufacturer)
  add('materials', filters.materials)
  add('series', filters.series)
  add('priceMin', filters.priceMin)
  add('priceMax', filters.priceMax)
  add('country', filters.country)

  // Only persist ordering if it's not the default ordering.
  if (filters.orderBy !== defaultFilters.orderBy) {
    params.set('orderBy', filters.orderBy)
  }
  if (filters.orderDir !== defaultFilters.orderDir) {
    params.set('orderDir', filters.orderDir)
  }

  const query = params.toString()
  return query ? `?${query}` : ''
}
```

Explanation:
- `normalize` trims values and avoids `null`.
- Only non-empty values are included in URL to keep it clean.
- `orderBy`/`orderDir` only written if different from defaults.

### Step 3 — Add filter autosuggest metadata API
Create `frontend/src/features/items/api/fetchItemFilterOptions.ts`.

Why: Autosuggestions must show all system values (global), not just current category.

```ts
import { apiFetch } from '../../../shared/api'

// Response shape returned by GET /api/items/filters.
export type ItemFilterOptions = {
  characters: string[]
  manufacturers: string[]
  series: string[]
  materials: string[]
  countries: string[]
}

// Fetches autosuggest values for filter fields.
export async function fetchItemFilterOptions(): Promise<ItemFilterOptions> {
  return apiFetch<ItemFilterOptions>('/api/items/filters')
}
```

### Step 4 — Add metadata query hook
Create `frontend/src/features/items/queries/useItemFilterOptions.ts`.

Why: avoid refetching on every render; leverage React Query cache.

```ts
import { useQuery } from '@tanstack/react-query'
import { fetchItemFilterOptions } from '../api/fetchItemFilterOptions'

// React Query hook so autosuggest values share cached data and avoid refetching on every render.
export function useItemFilterOptions() {
  return useQuery({
    queryKey: ['item-filter-options'],
    queryFn: fetchItemFilterOptions,
  })
}
```

### Step 5 — Build filters UI component (TSX + CSS together)
Create:
- `frontend/src/features/items/components/ItemsFilters/ItemsFilters.tsx`
- `frontend/src/features/items/components/ItemsFilters/ItemsFilters.module.css`

Why: encapsulates expand/collapse UI, controlled inputs (including autosuggest), and Apply button in one place. Creating the CSS and filling it now avoids the “create now, fill later” gap.

TSX (key logic, avoids setState-in-effect by remounting on URL changes):
```tsx
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './ItemsFilters.module.css'
import { defaultFilters, type ItemFiltersState } from '../../filters/types'
import { buildSearchFromFilters, parseFiltersFromSearch } from '../../filters/queryParams'
import { useItemFilterOptions } from '../../queries/useItemFilterOptions'
import Filter from './Filter.svg'

// Filter panel used on both main and category pages.
export function ItemsFilters() {
  const location = useLocation()
  return <ItemsFiltersInner key={location.search} locationSearch={location.search} />
}

type ItemsFiltersInnerProps = {
  locationSearch: string
}

function ItemsFiltersInner({ locationSearch }: ItemsFiltersInnerProps) {
  // Autosuggest data for Characters/Manufacturer/Series/Materials/Country.
  const { data } = useItemFilterOptions()
  const characters = data?.characters ?? []
  const manufacturers = data?.manufacturers ?? []
  const series = data?.series ?? []
  const materials = data?.materials ?? []
  const countries = data?.countries ?? []

  // URL access for writing updated query params.
  const navigate = useNavigate()

  // Local UI state: panel open/closed and current input values.
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<ItemFiltersState>(
    () => parseFiltersFromSearch(locationSearch)
  )

  // Update one field while keeping inputs controlled.
  const updateField = (key: keyof ItemFiltersState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  // Apply button updates the URL, which triggers refetch via query key.
  const handleApply = () => {
    const search = buildSearchFromFilters(filters)
    navigate({ search }, { replace: true })
  }

  const handleReset = () => {
    setFilters(defaultFilters)
    navigate({ search: '' }, { replace: true })
  }

  const renderOptions = (values: string[]) =>
    values.map((value) => <option key={value} value={value} />)

  const orderingOptions = [
    { label: 'Recently added', orderBy: 'releaseDate', orderDir: 'desc' },
    { label: 'Release date', orderBy: 'releaseDate' },
    { label: 'Manufacturer', orderBy: 'manufacturer' },
    { label: 'Series', orderBy: 'series' },
    { label: 'Name', orderBy: 'name' },
    { label: 'Price', orderBy: 'price' },
    { label: 'Country', orderBy: 'country' },
  ] as const

  const handleOrderClick = (
    orderBy: ItemFiltersState['orderBy'],
    orderDir?: ItemFiltersState['orderDir']
  ) => {
    if (filters.orderBy === orderBy) {
      updateField('orderDir', filters.orderDir === 'asc' ? 'desc' : 'asc')
      return
    }
    updateField('orderBy', orderBy)
    updateField('orderDir', orderDir ?? 'asc')
  }

  return (
    <section className={styles.filtersSection}>
      <div className={styles.toolbar}>
        <div className={styles.ordering}>
          {orderingOptions.map((option) => {
            const isActive = filters.orderBy === option.orderBy
            return (
              <button
                key={`${option.label}-${option.orderBy}`}
                type="button"
                className={isActive ? styles.orderingActive : styles.orderingButton}
                onClick={() => handleOrderClick(option.orderBy, option.orderDir)}
              >
                {option.label}
                {isActive && (
                  <span className={styles.orderingCaret} aria-hidden="true">
                    <span
                      className={
                        filters.orderDir === 'asc'
                          ? styles.orderingIconAsc
                          : styles.orderingIconDesc
                      }
                    />
                  </span>
                )}
              </button>
            )
          })}
        </div>
        <button type="button" onClick={() => setIsOpen((open) => !open)} className={styles.filterToggle}>
          Filter
          <img src={Filter} alt="" aria-hidden="true" className={styles.filterIcon} />
        </button>
      </div>

      {isOpen && (
        <div className={styles.panel}>
          <div className={styles.row}>
            <label>Name</label>
            <input
              type="text"
              value={filters.name}
              onChange={(e) => updateField('name', e.target.value)}
            />
          </div>

          <div className={styles.row}>
            <label>Materials</label>
            <input
              type="text"
              value={filters.materials}
              onChange={(e) => updateField('materials', e.target.value)}
              placeholder="Type values, separated by commas"
              list="materials-options"
            />
            <datalist id="materials-options">{renderOptions(materials)}</datalist>
          </div>

          <div className={styles.row}>
            <label>Characters</label>
            <input
              type="text"
              value={filters.characters}
              onChange={(e) => updateField('characters', e.target.value)}
              placeholder="Type values, separated by commas"
              list="characters-options"
            />
            <datalist id="characters-options">{renderOptions(characters)}</datalist>
          </div>

          <div className={styles.row}>
            <label>Series</label>
            <input
              type="text"
              value={filters.series}
              onChange={(e) => updateField('series', e.target.value)}
              placeholder="Type values, separated by commas"
              list="series-options"
            />
            <datalist id="series-options">{renderOptions(series)}</datalist>
          </div>

          <div className={styles.row}>
            <label>Release date</label>
            <div className={styles.rangeRow}>
              <input
                type="text"
                value={filters.releaseDateFrom}
                onChange={(e) => updateField('releaseDateFrom', e.target.value)}
                placeholder="From (YYYY-MM-DD)"
                className={styles.rangeInput}
              />
              <span className={styles.rangeDivider}>-</span>
              <input
                type="text"
                value={filters.releaseDateTo}
                onChange={(e) => updateField('releaseDateTo', e.target.value)}
                placeholder="To (YYYY-MM-DD)"
                className={styles.rangeInput}
              />
            </div>
          </div>

          <div className={styles.row}>
            <label>Price</label>
            <div className={styles.rangeRow}>
              <input
                type="number"
                value={filters.priceMin}
                onChange={(e) => updateField('priceMin', e.target.value)}
                placeholder="Min"
                className={styles.rangeInput}
              />
              <span className={styles.rangeDivider}>-</span>
              <input
                type="number"
                value={filters.priceMax}
                onChange={(e) => updateField('priceMax', e.target.value)}
                placeholder="Max"
                className={styles.rangeInput}
              />
            </div>
          </div>

          <div className={styles.row}>
            <label>Manufacturer</label>
            <input
              type="text"
              value={filters.manufacturer}
              onChange={(e) => updateField('manufacturer', e.target.value)}
              placeholder="Type values, separated by commas"
              list="manufacturer-options"
            />
            <datalist id="manufacturer-options">{renderOptions(manufacturers)}</datalist>
          </div>

          <div className={styles.row}>
            <label>Country</label>
            <input
              type="text"
              value={filters.country}
              onChange={(e) => updateField('country', e.target.value)}
              placeholder="Type values, separated by commas"
              list="country-options"
            />
            <datalist id="country-options">{renderOptions(countries)}</datalist>
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={handleReset} className={styles.resetButton}>
              Reset
            </button>
            <button type="button" onClick={handleApply} className={styles.applyButton}>
              Apply
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
```

CSS (same step):
```css
.filtersSection {
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fff6ef;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
}

.ordering {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.orderingButton,
.orderingActive {
  border: 0;
  background: transparent;
  padding: 0;
  font-size: 13px;
  color: #2b2b2b;
  cursor: pointer;
}

.orderingActive {
  font-weight: 600;
  color: #0b3b63;
}

.orderingCaret {
  margin-left: 4px;
  display: inline-flex;
  align-items: center;
  color: currentColor;
}

.orderingIconAsc,
.orderingIconDesc {
  width: 10px;
  height: 10px;
  display: block;
  background-color: currentColor;
  mask: url('./order.svg') no-repeat center / contain;
  -webkit-mask: url('./order.svg') no-repeat center / contain;
}

.orderingIconDesc {
  transform: rotate(180deg);
}

.filterToggle {
  border: 0;
  background: transparent;
  font-size: 13px;
  color: #0b3b63;
  cursor: pointer;
  padding: 0 0 0 10px;
}

.filterIcon {
  margin-left: 4px;
}

.panel {
  display: grid;
  grid-template-columns: repeat(2, minmax(220px, 1fr));
  gap: 12px 16px;
  padding: 12px;
}

.row {
  display: flex;
  align-items: center;
}

.row label {
  min-width: 87px;
  font-size: 13px;
}

.row input,
.row select {
  flex: 1;
  min-width: 0;
}

.row .rangeInput {
  flex: 0 0 70px;
}

.rangeRow {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
}

.rangeInput {
  flex: 0 0 120px;
}

.rangeDivider {
  color: #6b6b6b;
}

.actions {
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.resetButton {
  border: 1px solid #b5b5b5;
  background: transparent;
  color: #2b2b2b;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.applyButton {
  border: 1px solid #b5b5b5;
  background: transparent;
  color: #2b2b2b;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}
```

Explanation:
- URL sync is handled by remounting on `location.search` changes (the keyed inner component), so back/forward navigation re-initializes filters without an effect.
- `handleApply` updates URL only when the user clicks Apply.
- CSS is defined at the same time to avoid an unfinished file.

### Step 6 — Update items fetch API to accept filters
Modify `frontend/src/features/items/api/fetchItemsByCategory.ts`.

Why: filters + ordering must be sent to backend via query params.

```ts
import type { Item } from '../types'
import { apiFetch } from '../../../shared/api'
import type { ItemFiltersState } from '../filters/types'

// Fetches items by category while applying filters and ordering from URL state.
export async function fetchItemsByCategory(
  categoryId: string | null,
  filters: ItemFiltersState
): Promise<Item[]> {
  const params = new URLSearchParams()
  if (categoryId) {
    params.set('categoryId', categoryId)
  }

  // Add a param only if the user filled it in.
  const add = (key: string, value: string) => {
    if (value.trim()) {
      params.set(key, value.trim())
    }
  }

  add('name', filters.name)
  add('characters', filters.characters)
  add('releaseDateFrom', filters.releaseDateFrom)
  add('releaseDateTo', filters.releaseDateTo)
  add('manufacturer', filters.manufacturer)
  add('materials', filters.materials)
  add('series', filters.series)
  add('priceMin', filters.priceMin)
  add('priceMax', filters.priceMax)
  add('country', filters.country)

  // Always include ordering so the server sorts consistently even when no filters are set.
  params.set('orderBy', filters.orderBy)
  params.set('orderDir', filters.orderDir)

  const query = params.toString()
  const path = query ? `/api/items?${query}` : '/api/items'
  return apiFetch<Item[]>(path)
}
```

Explanation:
- Reuses the same keys the backend expects.
- Always sends orderBy/orderDir so server ordering is predictable.

### Step 7 — Update React Query hook
Modify `frontend/src/features/items/queries/useItemsByCategory.ts`.

Why: need refetch when filters change.

```ts
import { useQuery } from '@tanstack/react-query'
import { fetchItemsByCategory } from '../api/fetchItemsByCategory'
import type { Item } from '../types'
import type { ItemFiltersState } from '../filters/types'

// React Query hook that refetches items whenever category or filters change.
export function useItemsByCategory(categoryId: string | null, filters: ItemFiltersState) {
  return useQuery<Item[]>({
    queryKey: ['items', categoryId, filters],
    queryFn: () => fetchItemsByCategory(categoryId, filters),
  })
}
```

### Step 8 — Use URL filters in ItemsGrid
Modify `frontend/src/features/items/components/ItemList/ItemsGrid.tsx`.

Why: ItemsGrid is where items are fetched; it must pass filters to the hook.

```tsx
import { useLocation } from 'react-router-dom'
import styles from './ItemsGrid.module.css'
import { ItemPreview } from '../ItemPreview/Item'
import { useCategoryUiStore } from '../../../categories/state/useCategoryUiStore'
import { useItemsByCategory } from '../../queries/useItemsByCategory'
import { parseFiltersFromSearch } from '../../filters/queryParams'

export function ItemsGrid() {
  // Active category scopes results when browsing a category page.
  const activeCategory = useCategoryUiStore((state) => state.activeCategory)

  // URL query params provide current filter state.
  const location = useLocation()
  const filters = parseFiltersFromSearch(location.search)

  // Query hook receives filters so it refetches when they change.
  const { data: items = [] } = useItemsByCategory(activeCategory?.id ?? null, filters)

  return (
    <div className={styles.itemsContainer}>
      {items.map((item) => (
        <ItemPreview key={item.id} item={item} />
      ))}
    </div>
  )
}
```

### Step 9 — Render filters in MainPage
Modify `frontend/src/pages/MainPage/MainPage.tsx`.

Why: same page renders main and category routes.

```tsx
import { ItemsFilters } from '../../features/items/components/ItemsFilters/ItemsFilters'
// Other existing imports and component code remain unchanged.
<div className={styles.itemsSection}>
  {isAdmin && (
    <div className={styles.pageLinks}>
      <Link to="/items/new">Add item</Link>
    </div>
  )}
  <ItemsFilters />
  <div className={styles.itemsContainer}>
    <ItemsGrid />
  </div>
</div>
```

### Step 10 — Validate UX
- Confirm filters stay after refresh/back.
- Confirm category pages preserve filters.
- Confirm Apply is the only way to change results.

## Notes / Edge Cases
- Sorting empty fields last (backend enforced) — no special UI changes required.
- Price currency ignored for sorting, but currency field should be displayed with item (if UI already shows price).
- Autosuggest filtering (case-insensitive, 2+ chars, max 8) can be done on the client using values from `/api/items/filters`.
