# Iteration 02 — State Manager + Mocked Data (Zustand + TanStack Query)

## Goal
Introduce a lightweight state layer for UI state (Zustand) and a server-state layer for mocked API data (TanStack Query), then wire these into the existing pages and layout, starting with the `CategoryList` component.

## Current Setup Summary
- Routing uses a data router in `src/router/router.tsx`.
- Layout shell: `Header`, `Footer`, and `CategoryList` (side nav) in `src/layout`.
- Pages are placeholders: `MainPage`, `ItemViewPage`, `ItemEditPage`, `ItemCreatePage`, `NotFoundPage`.
- No state manager or data layer; pages use URL params and static links.

## Scope (in)
- Add Zustand for UI state (filters, selection, small cross-page UI flags).
- Add TanStack Query for mocked data fetching and caching.
- Create a mock data layer to simulate API calls (items + categories).
- Update `CategoryList` first to consume categories from the query and persist selection in the store.
- Update pages/components to read from queries and the UI store.
- Add minimal loading/error states.

## Scope (out)
- Real API calls, auth, mutations, forms, validation, optimistic updates.
- Complex data flows or global state architecture beyond the basics.

## Implementation Plan (detailed)

### 1) Install dependencies
- Add `zustand` and `@tanstack/react-query` to dependencies.

### 2) Add app-level providers
- Create a `QueryClient` and wrap the app in `QueryClientProvider` (prefer `src/main.tsx`).
- Keep `App` and the router unchanged aside from the provider.

### 3) Mock data + API layer
- Add mock data files:
  - `src/data/mockItems.ts`
  - `src/data/mockCategories.ts`
- Add mock API functions that return promises and simulate latency:
  - `src/api/items.ts` with `fetchItems`, `fetchItemById`
  - `src/api/categories.ts` with `fetchCategories`
- Keep data fields minimal and consistent with existing UI needs (id, name/title, description, categoryId).
- Seed the category mock data with the required 2-level hierarchy:
  - Figures
  - Dolls
  - Keychains
  - Stationarity
    - Pens & Pencils
    - Notebooks
    - Stickers & Seals
    - Letter Sets & Postcards
    - Folders & Clear Files
    - Pencil Cases & Storage
    - Art & Craft Supplies
    - Calendars & Planners
    - School Accessories
  - Home Goods
  - Plush Toys
  - Role-Play Toys
  - Trading Cards
  - Media
  - Books & Manga
  - Apparel
  - Food
  - Cosmetics & Beauty
  - Miscellaneous

### 4) Query hooks + keys
- Create query key helpers and hooks in `src/queries/`:
  - `src/queries/items.ts` for `useItems` and `useItem`
  - `src/queries/categories.ts` for `useCategories`
- Use query keys that include filter params so caching behaves correctly.

### 5) Zustand UI store
- Add `src/state/useUiStore.ts` with:
  - `activeCategoryId` (nullable)
  - `searchTerm` (optional string for later)
  - setter actions (e.g., `setActiveCategoryId`, `setSearchTerm`)
- Keep store small and UI-focused (not server data).

### 6) Wire store + queries into UI
- `CategoryList`:
  - Fetch categories via `useCategories`.
  - Render a 2-level tree (parent + children) from the mock data.
  - Clicking a category sets `activeCategoryId` in the store and persists the selection for future API filters.
  - Preserve existing navigation links (Home/Add item) so routing stays intact.
- `MainPage`:
  - Fetch items via `useItems`, using `activeCategoryId` and `searchTerm` as filters.
  - Render a simple list of items with links to view/edit.
- `ItemViewPage` and `ItemEditPage`:
  - Fetch item details via `useItem(itemId)`.
  - Render minimal item fields and handle loading/error states.
- `ItemCreatePage`:
  - Keep placeholder; optionally show selected category from the store.

### 7) Add minimal feedback states
- Show loading placeholders and basic error messages in list and detail pages.
- Keep visuals consistent with current minimal styling.

### 8) Validation checklist
- App renders with Query provider in place.
- Sidebar category clicks persist `activeCategoryId` in the UI store.
- Item view/edit pages show mocked data and loading states.
- No runtime errors in navigation or queries.
- `npm run build` succeeds.

## Deliverables
- New data layer (`src/data`, `src/api`, `src/queries`, `src/state`).
- Updated layout and pages wired to queries and UI store.
- This plan stored in `docs/iteration02.md`.
