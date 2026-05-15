# GEMINI Instructions: Pretty Guardian Sailor Moon Museum Frontend

This project is the React-based frontend for the Sailor Moon Museum database. It provides a curated, high-end museum aesthetic for browsing and managing collectible items.

## Project Overview

- **Core Tech:** React 19, TypeScript, Vite 7.
- **State Management:** TanStack Query (Server State), Zustand (UI/Form State).
- **Routing:** React Router 7 with nested layouts and admin guards.
- **Styling:** CSS Modules with a custom design system (defined in `DESIGN.md`).
- **Drag & Drop:** `@dnd-kit` for image reordering in forms.

## Architecture & Conventions

### 1. Feature-Based Structure
The project follows a modular, feature-based architecture in `src/features/`. 

### 2. Multi-Entry SPA (Mobile Support)
The application is structured as two distinct Single Page Applications (SPAs) sharing a common feature core.
- **Desktop SPA:** `src/app/desktop/`
  - `pages/`: Desktop-specific route components.
  - `layout/`: Desktop-specific layout components (Header, Footer, Sidebar).
  - `router/`: Desktop-specific route definitions.
- **Mobile SPA:** `src/app/mobile/`
  - `pages/`: Mobile-specific route components.
  - `layout/`: Mobile-specific layout components (Tabs, Drawers).
  - `router/`: Mobile-specific route definitions.
- **Shared Features:** `src/features/` contains all API logic, TanStack Query hooks, and business types shared by both platforms.
- **Shared Core:** `src/shared/` contains common API clients, styles, and cross-platform components (e.g., `RequireAdmin`).
- **UA Switching:** The server (Nginx) and Vite dev server are configured to detect mobile devices and serve the appropriate entry point on the same URL.

### 3. API Integration
All API calls must use `apiFetch` from `src/shared/api.ts`.
- **CSRF Protection:** `apiFetch` automatically handles `XSRF-TOKEN` cookies and `X-XSRF-TOKEN` headers.
- **Base URL:** Defined in `src/shared/api.ts` (local dev vs. production).
- **Credentials:** Always uses `credentials: 'include'` for cookie-based auth.

### 3. Styling & Design System
Follow the "Modern Museum" aesthetic defined in `DESIGN.md`:
- **CSS Modules:** Use `.module.css` for component-specific styles.
- **Design Tokens:** Reference variables from `src/shared/styles/tokens.css`.
- **Look & Feel:** Prioritize glassmorphism (frosted glass), pill-shaped elements, and spacious layouts.

### 4. Component Patterns
- Prefer functional components with explicit props types.
- Use CSS Modules for isolation.
- Keep components small and focused. Feature components go in `src/features/*/components`, while cross-cutting components go in `src/shared`.

### 5. Authentication & Authorization
- Auth is managed via `src/features/auth/useAuth.ts`.
- Routes are protected using the `RequireAdmin` wrapper in `src/router/router.tsx`.

## Key Commands

- **Install Dependencies:** `npm install`
- **Development Server:** `npm run dev` (Runs at `http://localhost:5173`)
- **Build Project:** `npm run build` (Runs `tsc` then `vite build`)
- **Linting:** `npm run lint` (ESLint)
- **Preview Build:** `npm run preview`

## Deployment

The project includes a `deploy.sh` script. Deployment involves:
1. Building the frontend (`npm run build`).
2. Syncing the `dist/` directory to the server via `rsync`.
3. Reloading the Nginx server on the host.

See `README.md` for detailed manual deployment steps and server information.

## Testing TODO
- [ ] Implement unit tests for utility functions.
- [ ] Add component tests using React Testing Library.
- [ ] Add E2E tests for critical flows (Login, Item Creation).
