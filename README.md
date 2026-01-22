# Frontend (React + Vite)

## Overview
React + TypeScript app for the Sailor Moon DB UI. The frontend talks to the Spring Boot backend over REST and uses React Query for server data.

Key flows:
- Browse items by category (category tree is fetched from `/api/categories`)
- Item list filtering by category (`/api/items?categoryId=...`)
- Item details view (`/api/items/:itemId`)
- Admin-only item creation (`POST /api/items`)

## Tech stack
- React 18 + TypeScript
- Vite (dev server + build)
- React Query for data fetching/caching
- React Router for routing
- CSS Modules for styling

## Requirements
- Node.js 18+ (LTS recommended)
- npm 9+

## Install
```bash
npm install
```

## Run (local dev)
```bash
npm run dev
```
- App: `http://localhost:5173`
- API base URL in dev: `http://localhost:8080` (see `frontend/src/shared/api.ts`)

## Build
```bash
npm run build
```

## Auth notes
- Login page: `/login`
- Uses cookies + CSRF (`XSRF-TOKEN` / `X-XSRF-TOKEN`)
- Dev credentials (in-memory users from the backend):
  - `admin` / `change-me`
  - `customer` / `change-me`

## Project structure (high level)
- `src/pages` routes (e.g. main list, item view, login)
- `src/features/*` feature modules (items, categories, auth)
- `src/shared` cross-cutting helpers (API client, etc.)

## API integration details
- Base fetch helper: `src/shared/api.ts`
- Categories:
  - `GET /api/categories` -> `src/features/categories/api/fetchCategories.ts`
- Items:
  - `GET /api/items` + `?categoryId=` -> `src/features/items/api/fetchItemsByCategory.ts`
  - `GET /api/items/:itemId` -> `src/features/items/api/fetchItemById.ts`
  - `POST /api/items` -> `src/features/items/api/createItem.ts`

## Useful commands
```bash
npm run lint
```
