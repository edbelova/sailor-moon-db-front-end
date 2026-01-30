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

## Deployment (backend + frontend)
This covers the full deployment flow for both the Spring Boot API and this React frontend.
Deployment can also be run via the script `webapp/deploy-webapp.sh` (backend only), `frontend/deploy-frontend.sh` (frontend only), or `deploy-all.sh` (full).

Local: build backend image and frontend assets
```bash
cd /path/to/Capstone/webapp
docker build -t smdb-api:latest .
docker save smdb-api:latest > ./deploy/smdb-api.tar

cd /path/to/Capstone/frontend
npm install
npm run build
```

Upload artifacts to the server
```bash
scp -i ~/Documents/smdb-key.pem /path/to/Capstone/webapp/deploy/smdb-api.tar \
  ubuntu@44.242.4.61:~/smdb-deploy/

scp -i ~/Documents/smdb-key.pem -r /path/to/Capstone/frontend/dist/* \
  ubuntu@44.242.4.61:~/smdb-deploy/nginx/html/
```

Load the image and restart services on the server
```bash
ssh -i ~/Documents/smdb-key.pem ubuntu@44.242.4.61 \
  "cd ~/smdb-deploy && docker load < smdb-api.tar && docker compose up -d app && docker compose exec nginx nginx -s reload"
```
