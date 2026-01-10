# Iteration 02 Progress Log

## Work Completed (detailed)
- Dependencies
  - Added `@tanstack/react-query` and `zustand` to `package.json`.
  - Updated `package-lock.json` via `npm install`.
- Providers
  - Wrapped the app with `QueryClientProvider` in `src/main.tsx`.
  - Created a single `QueryClient` instance at module scope.
- Types
  - Added `src/types/category.ts` with a `Category` type supporting nested children.
- Mock data + API
  - Added the full two-level category tree in `src/data/mockCategories.ts`.
  - Added `fetchCategories` in `src/api/categories.ts` with a simulated delay.
- Query hooks
  - Added `src/queries/categories.ts` with `categoryQueryKeys` and `useCategories`.
- UI state (Zustand)
  - Added `src/state/useUiStore.ts` with `activeCategoryId` and setter.
  - Included `searchTerm` and setter for future filter UI.
- CategoryList integration
  - Updated `src/layout/CategoryList.tsx` to query categories and render a nested tree.
  - Added loading and error placeholders for the categories query.
  - Added click handlers to persist the selected category in Zustand.
  - Kept existing router links (Main, Add item, View/Edit item example).
- Styling
  - Updated `src/App.css` to style the nested category list, active states,
    and a sidebar "Categories" section header.

## Behavior Verified (manual)
- Sidebar shows the original navigation links plus a category tree.
- Selecting a category highlights it and stores its id in the UI store.
