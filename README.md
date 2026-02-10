# Frontend (React + Vite)

## Overview
React + TypeScript app for the Sailor Moon DB UI. The frontend talks to the Spring Boot backend over REST, uses React Query for server data, and protects admin-only flows in the router.

The app supports category browsing, item search/filtering, item details, and admin item management (create, edit, delete) including image upload.

## Tech stack
- React 19 + TypeScript
- Vite 7
- @tanstack/react-query
- react-router-dom 7
- Zustand (UI/form state)
- CSS Modules
- dnd-kit (image ordering in forms)

## Requirements
- Node.js 20+ (LTS recommended)
- npm (comes with Node)

## Install
```bash
npm install
```

## Run (local dev)
```bash
npm run dev
```
The app runs at `http://localhost:5173`.

By default, API base URL is:
- dev: `http://localhost:8080`
- prod build: `https://api.sailormoonmuseum.com`

(see `src/shared/api.ts`)

## Build
```bash
npm run build
```

## Preview production build locally
```bash
npm run preview
```

## Auth notes
Login page is `/login`. Auth uses cookies + CSRF (`XSRF-TOKEN` cookie and `X-XSRF-TOKEN` request header). Admin-only routes are guarded (create/edit flows).

Credentials are managed by the backend database seed/configuration, not an in-memory frontend list.

## Project structure (high level)
- `src/pages` route pages
- `src/features/*` feature modules (auth, categories, items)
- `src/router` route definitions and admin guard
- `src/shared` API client and shared styles
- `src/layout` application shell (header/footer/layout)

## API integration details
The API client is `src/shared/api.ts`.

Category APIs:
- `GET /api/categories` via `src/features/categories/api/fetchCategories.ts`

Item APIs:
- `GET /api/items` (with query params for filters/sorting/category) via `src/features/items/api/fetchItemsByCategory.ts`
- `GET /api/items/{itemId}` via `src/features/items/api/fetchItemById.ts`
- `POST /api/items` via `src/features/items/api/createItem.ts`
- `PUT /api/items/{itemId}` via `src/features/items/api/updateItem.ts`
- `DELETE /api/items/{itemId}` via `src/features/items/api/deleteItem.ts`
- `GET /api/items/filters` via `src/features/items/api/fetchItemFilterOptions.ts`

Image API:
- `POST /api/images` (`multipart/form-data`) via `src/features/items/api/uploadItemImage.ts`

## Useful commands
```bash
npm run lint
```

## Deployment scripts
This repository already includes deploy scripts:
- backend only: `webapp/deploy.sh`
- frontend only: `frontend/deploy.sh`
- full deploy: `deploy-all.sh`

`frontend/deploy.sh` installs dependencies, builds the frontend, rsyncs `dist/` to the server nginx html directory, and reloads nginx.

## Deployment (backend + frontend)
You can deploy manually without scripts. The commands below mirror script behavior, so deployment is understandable even if a script fails.

Build backend and frontend artifacts locally:
```bash
cd /path/to/Capstone/webapp
docker build -t smdb-api:latest .
docker save smdb-api:latest > ./deploy/smdb-api.tar

cd /path/to/Capstone/frontend
npm install
npm run build
```

Copy artifacts to the server:
```bash
scp -i ~/Documents/smdb-key.pem /path/to/Capstone/webapp/deploy/smdb-api.tar \
  ubuntu@44.242.4.61:~/smdb-deploy/

scp -i ~/Documents/smdb-key.pem /path/to/Capstone/webapp/deploy/docker-compose.yml \
  ubuntu@44.242.4.61:~/smdb-deploy/

rsync -av --delete -e "ssh -i ~/Documents/smdb-key.pem" \
  /path/to/Capstone/frontend/dist/ \
  ubuntu@44.242.4.61:~/smdb-deploy/nginx/html/
```

Load backend image and restart backend service:
```bash
ssh -i ~/Documents/smdb-key.pem ubuntu@44.242.4.61 \
  "cd ~/smdb-deploy && docker load < smdb-api.tar && rm -f smdb-api.tar && docker compose up -d app"
```

Reload nginx after frontend sync:
```bash
ssh -i ~/Documents/smdb-key.pem ubuntu@44.242.4.61 \
  "cd ~/smdb-deploy && docker compose exec nginx nginx -s reload"
```

Optional operations that scripts support:
```bash
# Optional nginx config sync + validation (same behavior as SYNC_NGINX_CONF=1 in frontend/deploy.sh)
rsync -av --delete -e "ssh -i ~/Documents/smdb-key.pem" \
  /path/to/Capstone/webapp/deploy/nginx/conf.d/ \
  ubuntu@44.242.4.61:~/smdb-deploy/nginx/conf.d/

ssh -i ~/Documents/smdb-key.pem ubuntu@44.242.4.61 \
  "cd ~/smdb-deploy && docker compose exec nginx nginx -t && docker compose exec nginx nginx -s reload"
```
