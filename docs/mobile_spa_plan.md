# Mobile SPA Implementation Plan (User Agent Switching)

This document outlines the strategy for delivering a dedicated mobile UX using a separate Single Page Application (SPA) entry point while maintaining a shared business logic core. This approach avoids a separate domain (like `m.domain.com`) by using server-side User Agent switching.

## 1. Objectives
- **Dedicated Mobile UX:** 100% freedom to use mobile-native patterns (drawers, tab bars, swipe actions) without being constrained by desktop layouts.
- **Shared Business Logic:** Reuse all API fetchers, TanStack Query hooks, TypeScript types, and Zustand stores.
- **Single Domain:** Serve both desktop and mobile versions from the same URL based on the device.
- **Performance:** Mobile users only download the "Mobile Bundle," avoiding heavy desktop-only assets.

---

## 2. Architecture: Shared Core / Multi-Entry

### Folder Structure Refactor
We will reorganize `src/app` to distinguish between the two "shells."

```text
src/
├── app/
│   ├── desktop/            # Desktop entry point
│   │   ├── main.tsx        # (Current src/app/main.tsx)
│   │   └── App.tsx         # Desktop-specific routing/layouts
│   └── mobile/             # Mobile entry point
│       ├── main.tsx        # Mobile entry
│       └── App.tsx         # Mobile-specific routing/layouts
├── features/               # SHARED BUSINESS LOGIC (No change)
│   ├── items/
│   │   ├── api/            # Shared
│   │   ├── queries/        # Shared
│   │   └── state/          # Shared
│   └── categories/         # Shared
└── shared/                 # Shared styles (tokens.css) and utils
```

---

## 3. Vite Configuration (Multi-Entry Build)

Vite will be configured to produce two distinct HTML entry points.

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),   // Desktop
        mobile: resolve(__dirname, 'mobile.html') // Mobile
      }
    }
  }
})
```

---

## 4. Serving Strategy (User Agent Switching)

Since we want the same URL to serve different content, the server (Nginx or Node.js) must detect the mobile device and return the correct file.

### Nginx Implementation (Recommended for Production)
```nginx
location / {
    set $entry_point /index.html;
    
    if ($http_user_agent ~* (mobile|android|iphone|ipad|phone)) {
        set $entry_point /mobile.html;
    }
    
    try_files $uri $uri/ $entry_point;
}
```

---

## 5. Implementation Steps

### Phase 1: Infrastructure Setup
1. **Create `mobile.html`**: Copy `index.html` and point its script tag to `src/app/mobile/main.tsx`.
2. **Configure Vite**: Update `rollupOptions.input` to include both entry points.
3. **Refactor `src/app`**: Move current files to `src/app/desktop` and create a skeleton in `src/app/mobile`.

### Phase 2: Mobile Core Development
1. **Mobile Layout**: Implement `MobileAppLayout` with a bottom tab bar or navigation drawer.
2. **Mobile Router**: Create a dedicated mobile router using `react-router-dom`.
3. **Responsive Assets**: Ensure `tokens.css` supports mobile-first values (larger touch targets).

### Phase 3: Mobile Page Implementation
1. **Home Screen**: 2-column grid optimized for touch.
2. **Category Drawer**: Implement the hierarchical tree as a mobile drawer.
3. **Item Details**: Mobile-optimized view with swipeable gallery.
4. **Admin**: Simplified mobile form for quick updates.

### Phase 4: Deployment & Routing
1. **Update `deploy.sh`**: Ensure the deployment script correctly syncs both `index.html` and `mobile.html`.
2. **Nginx Config**: Update the production server to handle UA detection.

---

## 6. Pros & Cons

| Pros | Cons |
| :--- | :--- |
| Zero compromise on Mobile UX | Small increase in build time |
| Smaller JS bundles for mobile | Server-side configuration required (Nginx) |
| Shared data/logic (DRY) | Need to manage two sets of Routes/Layouts |
| Same URL is SEO friendly | |

---

## 7. Next Steps
1. Approve this plan.
2. Begin Phase 1 (infrastructure refactor).
3. Generate mobile UI mocks using Nano Banana to visualize the navigation patterns.
