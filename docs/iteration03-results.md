# Iteration 03 Results — Folder-per-Component + Feature Refactor

## What Changed
- Moved the app entry into `src/app/main.tsx` and `src/app/App/App.tsx`; updated `index.html` to load `/src/app/main.tsx`.
- Converted layout and pages to folder-per-component with CSS Modules:
  - `src/layout/AppLayout/AppLayout.tsx` + `src/layout/AppLayout/AppLayout.module.css`
  - `src/layout/Header/Header.tsx` + `src/layout/Header/Header.module.css`
  - `src/layout/Footer/Footer.tsx` + `src/layout/Footer/Footer.module.css`
  - `src/pages/*/*Page.tsx` + `src/pages/*/*Page.module.css`
- Migrated CategoryList into the categories feature slice:
  - UI: `src/features/categories/components/CategoryList/CategoryList.tsx`
  - Styles: `src/features/categories/components/CategoryList/CategoryList.module.css`
  - API/queries/state/data/types under `src/features/categories/*`
- Replaced global styles with tokens + base globals:
  - Added `src/shared/styles/tokens.css`
  - Added `src/shared/styles/globals.css`
  - Removed `src/App.css` and `src/index.css`

## Why These Changes
- Co-locating `tsx` + `css` makes component ownership explicit and reduces global CSS churn.
- Feature grouping keeps domain logic (API/queries/state/types) together, so categories can scale independently.
- Global styles are now just shared tokens and base styles, reducing the risk of cross-component CSS leaks.

## Files Removed
- `src/App.css`
- `src/index.css`

## Current Structure Snapshot
```
src/
  app/
    App/
      App.tsx
    main.tsx
  router/
    router.tsx
  layout/
    AppLayout/
    Header/
    Footer/
  pages/
    MainPage/
    ItemCreatePage/
    ItemEditPage/
    ItemViewPage/
    NotFoundPage/
  features/
    categories/
      components/
        CategoryList/
      api/
      queries/
      state/
      data/
      types.ts
  shared/
    styles/
      tokens.css
      globals.css
```

## Notes
- `useUiStore` was renamed to `useCategoryUiStore` in `src/features/categories/state/useCategoryUiStore.ts`.
- No behavioral changes were introduced; the refactor is structural.
