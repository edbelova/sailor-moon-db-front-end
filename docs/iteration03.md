# Iteration 03 — Folder-per-Component + Feature Refactor (CategoryList-first)

## Goal
Refactor the frontend into a scalable structure by co-locating components with their styles, and grouping domain logic into feature folders. Use `CategoryList` as the pilot to validate the approach.

## Why
- Reduce global CSS sprawl by moving styles next to their components.
- Keep domain logic (API, queries, state, types) together so features are easier to reason about.
- Make it clearer where to add new UI and state without scattering files.

## Proposed Folder Structure
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
      AppLayout.tsx
      AppLayout.module.css
    Header/
      Header.tsx
      Header.module.css
    Footer/
      Footer.tsx
      Footer.module.css

  pages/
    MainPage/
      MainPage.tsx
      MainPage.module.css
    ItemCreatePage/
      ItemCreatePage.tsx
      ItemCreatePage.module.css
    ItemEditPage/
      ItemEditPage.tsx
      ItemEditPage.module.css
    ItemViewPage/
      ItemViewPage.tsx
      ItemViewPage.module.css
    NotFoundPage/
      NotFoundPage.tsx
      NotFoundPage.module.css

  features/
    categories/
      components/
        CategoryList/
          CategoryList.tsx
          CategoryList.module.css
      api/
        fetchCategories.ts
      queries/
        useCategories.ts
      state/
        useCategoryUiStore.ts
      data/
        mockCategories.ts
      types.ts

  shared/
    styles/
      globals.css
      tokens.css
```

## Folder Purpose
- `src/app`: App entry points and top-level setup. Keep the root `App` minimal.
- `src/router`: Route definitions only.
- `src/layout`: Layout-only components that frame pages (shell, header, footer).
- `src/pages`: Route-level UI (components rendered by the router).
- `src/features`: Domain slices (API, queries, state, types, and feature UI).
- `src/shared`: Cross-cutting UI or styles that are not tied to a single feature.
- `src/shared/styles`: Global tokens, resets, and base typography.

## Refactor Plan
1) **Extract global styles**
   - Move shared tokens + resets from `src/index.css` into `src/shared/styles/tokens.css` and `src/shared/styles/globals.css`.
   - Keep only global imports in `src/main.tsx`.

2) **Introduce folder-per-component**
   - Create per-component folders in `src/layout` and `src/pages`.
   - Convert `App.css` into `*.module.css` files aligned to each component.

3) **Feature-first migration (CategoryList)**
   - Move `CategoryList` to `src/features/categories/components/CategoryList`.
   - Move category data and logic into feature folders:
     - `src/features/categories/api/fetchCategories.ts`
     - `src/features/categories/queries/useCategories.ts`
     - `src/features/categories/state/useCategoryUiStore.ts`
     - `src/features/categories/data/mockCategories.ts`
     - `src/features/categories/types.ts`
   - Update imports to use the new locations.

4) **Follow-up migration (items)**
   - Repeat the same pattern for item APIs, queries, and UI components when those are introduced.

## Acceptance Checklist
- `CategoryList` is imported from the categories feature folder.
- Global CSS is reduced to tokens + base styles only.
- Each layout/page component has its own folder and CSS module.
- Imports are updated; app builds and routes still render correctly.
