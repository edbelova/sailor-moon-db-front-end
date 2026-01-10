# Iteration 01 — Routing + Placeholder Screens

## Goal
Create the initial React SPA skeleton with:
- 4 placeholder screens (Main, View Item, Edit Item, Add Item)
- Shared `Header` and `Footer` across all screens
- A shared left-side vertical menu for “most screens” (decide which in this iteration)
- React Router navigation that updates the URL and renders the correct screen

This iteration is intentionally UI-only (no backend calls, no real data).

## Inputs / Reference
- Product concept: `../docs/Concept.md` (MVP focuses on item CRUD + browsing and viewing details).

## Scope (in)
- Add routing with `react-router-dom` (already installed).
- Create a layout shell: header + footer + main content area.
- Create a vertical left menu component and wire it to routes via `<Link>` / `<NavLink>`.
- Create placeholder page components for each screen with simple content and links.
- Define route paths and add a “Not Found” route.

## Scope (out)
- API integration, data fetching, forms, validation, state management, auth.
- Styling beyond minimal layout clarity (basic CSS only).
- Upload/gallery, categories/manufacturers, search/filtering.

## Screen List (placeholders)
1. **Main screen**: collection “home” / entry point
2. **View single item**: shows an `itemId` from the URL
3. **Edit single item**: shows an `itemId` from the URL
4. **Add single item**: placeholder form area

## Routes (proposed)
| Screen | Route | Notes |
|---|---|---|
| Main | `/` | Default landing |
| View item | `/items/:itemId` | Uses URL param |
| Edit item | `/items/:itemId/edit` | Uses URL param |
| Add item | `/items/new` | “new” avoids conflict with `:itemId` |
| Not found | `*` | Catch-all |

Optional (nice-to-have in this iteration): redirect `/items` → `/` (or to a future list page).

## Layout Behavior (proposed)
- `Header`: always visible, top of page.
- `Footer`: always visible, bottom of page.
- `Body` area: two-column layout:
  - Left: vertical menu (width ~200–240px).
  - Right: route outlet (the screen body).

Decision: the vertical menu appears on **all** screens in iteration 01.

## Implementation Plan (detailed)

### 1) Clean template starter UI
- Remove the Vite counter/demo content from `src/App.tsx`.
- Remove or simplify `src/App.css` and `src/index.css` so the layout uses full viewport (no centered demo styling).
- Keep CSS minimal and readable (flex layout, spacing, typography).

### 2) Establish folder structure
Create a small, predictable structure that scales:
- `src/layout/`
  - `Header.tsx`
  - `Footer.tsx`
  - `SideNav.tsx`
  - `AppLayout.tsx` (wraps header/footer and renders `<Outlet />`)
- `src/pages/`
  - `MainPage.tsx`
  - `ItemViewPage.tsx`
  - `ItemEditPage.tsx`
  - `ItemCreatePage.tsx`
  - `NotFoundPage.tsx`
- `src/router/`
  - `router.tsx` (route table)

### 3) Add routes + navigation wiring
Choose one of these React Router setups (pick A for clarity and nested layouts):

**A) Data router (`createBrowserRouter` + `RouterProvider`)**
- Define nested routes:
  - Root route renders `AppLayout`
  - Child routes render each page via `<Outlet />`
- Update `src/main.tsx` to render `<RouterProvider router={router} />`.

**B) Component router (`BrowserRouter` + `<Routes>` in `App.tsx`)**
- Wrap `<App />` in `<BrowserRouter>` from `src/main.tsx`.
- Define `<Routes>` and `<Route>` tree in `src/App.tsx`.

Either option should include:
- A catch-all `*` route to `NotFoundPage`.
- Links using `<Link>` or `<NavLink>` (avoid plain `<a>` so routing stays client-side).

Decision: use **A) Data router** for iteration 01.

### 4) Build shared layout components
- `Header`:
  - App name/title.
  - Quick links: “Home”, “Add item”.
- `Footer`:
  - Placeholder (e.g., copyright / build info).
- `SideNav`:
  - Vertical menu with links:
    - Home (`/`)
    - Add item (`/items/new`)
    - Example item: View `1` (`/items/1`)
    - Example item: Edit `1` (`/items/1/edit`)
  - Use `<NavLink>` to show active state.
- `AppLayout`:
  - Renders `Header`, then body with optional `SideNav`, then `Footer`.
  - The route content renders via `<Outlet />`.

### 5) Build placeholder pages
Each page should:
- Show a clear title (e.g., “View Item”).
- Show the current route/params where relevant (`itemId` on view/edit pages).
- Include a few links/buttons for navigation (e.g., from View → Edit, from Edit → View, etc.).

Suggested page content:
- `MainPage`: links to “Add item” and “View item #1”.
- `ItemViewPage`: show `itemId`, link to edit and back to main.
- `ItemEditPage`: show `itemId`, link to view and back to main.
- `ItemCreatePage`: placeholder “new item form goes here”, link back to main.
- `NotFoundPage`: show attempted path and link to home.

### 6) Minimal layout styling
- Use a simple flex layout for the full-height page:
  - `Header` fixed height.
  - `Footer` fixed height.
  - Body grows to fill remaining height.
- Sidebar uses a light background, vertical links, and active styling.

Keep styling in a small number of files (prefer one app-level CSS file for now).

### 7) Validation checklist (Definition of Done)
- Running `npm run dev` shows the Main page at `/`.
- Clicking links updates the URL and swaps the page content without full refresh.
- Header and footer remain visible across route changes.
- Sidebar appears according to the chosen rule (all pages vs. most pages).
- Direct navigation (paste URL) works for:
  - `/items/1`
  - `/items/1/edit`
  - `/items/new`
- Unknown URL shows Not Found page.
- `npm run build` completes successfully.

## Deliverables
- New route table and placeholder pages in `src/pages/*`.
- Shared layout components in `src/layout/*`.
- New file structure + minimal CSS for layout.
- This plan stored in `docs/iteration01.md`.

## Decisions (confirmed)
- Left-side vertical menu shows on all screens.
