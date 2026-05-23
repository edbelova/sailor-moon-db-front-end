---
name: Pretty Guardian Sailor Moon Museum
colors:
  primary: '#006686'
  primary-container: '#139ecd'
  secondary: '#605980'
  secondary-container: '#dbd1ff'
  error: '#ba1a1a'
  heart: '#ba1a1a'
  bookmark: '#006686'
  background: '#faf9f9'
  surface: '#ffffff'
  surface-variant: '#eeeeee'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  accent: '#f2f2f6'
  on-surface: '#1a1c1c'
  on-surface-variant: '#3e484e'
  on-primary: '#ffffff'
  text-category: '#433126'
typography:
  brand-display:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
  heading-main:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
  body-standard:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
  label-medium:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '500'
  tag-caption:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '500'
rounded:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 18px
  xl: 24px
  grid-margin: 24px
  grid-gutter: 16px
---

# Design Guidebook: Pretty Guardian Sailor Moon Museum

This document serves as the visual and structural source of truth for the Sailor Moon Museum frontend. It establishes a "Modern Museum" aesthetic: high-end, clean, and magical, optimized for a premium mobile experience.

---

## 1. Design Philosophy

The application is built as a **digital showcase**. The interface should remain secondary to the merchandise photography, providing an elegant, airy, and tactile framework for discovery.

- **Modern Museum:** Minimalist layouts, generous whitespace, and sophisticated typography.
- **Magical Realism:** Subtle use of pastel gradients and glassmorphism (frosted glass) to evoke a "magical girl" atmosphere without sacrificing usability.
- **Mobile-First Tactility:** Large touch targets, pill-shaped interactive elements, and smooth transitions.

---

## 2. Design Tokens (CSS Variables)

Always use CSS variables from `src/shared/styles/tokens.css`. Never hardcode colors or spacing.

### Palette & Surface
| Token | Value / Purpose |
| :--- | :--- |
| `--color-primary` | `#006686` - Primary brand color (Admin/Links) |
| `--color-surface` | `#FFFFFF` - **Pure White**: Used for solid cards, bottom sheets, and high-contrast containers. |
| `--color-background` | `#FAF9F9` - **Off-White**: Base app background layer (visible behind the glass). |
| `--color-accent` | `#F2F2F6` - **Light Grey**: Subtle backgrounds for inactive tags or secondary inputs. |
| `--gradient-magical` | `linear-gradient(120deg, #dfb3ff, #ffb2a6)` - Primary CTAs |
| `--glass-card-bg` | `rgba(255, 255, 255, 0.45)` - **Translucent White**: Frosted glass panels. |
| `--glass-blur` | `12px` - Standard backdrop filter blur |

### Typography
- **Font Family:** `Plus Jakarta Sans`
- **Scale:**
  - `xl (14px)`: Headings, primary buttons.
  - `md (12px)`: Body text, inputs.
  - `sm (11px)`: Chips, secondary labels.
  - `xs (10px)`: Tag captions.

### Spacing & Grid
- **Margins:** `--grid-margin (16px)` - Standard horizontal padding for all pages.
- **Gutters:** `--grid-gutter (16px)` - Gap between items in a grid.
- **Header Heights:**
  - `--header-height-base (64px)`: Standard single-row fixed header.
  - `--header-height-main (144px)`: 3-row fixed header with filters/sort.
- **Standard Scale:** `xs (4px)`, `sm (8px)`, `md (12px)`, `lg (18px)`, `xl (24px)`.

### Shapes (Radius)
- **`--radius-md (16px)`**: Standard card and panel rounding.
- **`--radius-lg (32px)`**: Large containers (e.g., Image Gallery).
- **`--radius-full (9999px)`**: Pill buttons, search bars, tags.

---

## 3. Component Catalog & Usage

### 3.1 Buttons (`Button`)
The base `Button` component in `src/shared/components/base/Button` defines our interactive language.

- **`variant="magical"`**: The primary call-to-action (CTA). Use once per screen for the main goal (e.g., "Login", "Add to Collection"). Uses the pink-lavender gradient.
- **`variant="surface"`**: White solid background. Used for active filter states or prominent secondary actions.
- **`variant="neutral"`**: Light grey background. Used for inactive filter states or standard secondary buttons.
- **`variant="ghost"`**: No background. Used for navigation (Breadcrumbs), icons in headers, or low-emphasis actions.

### 3.2 Inputs & Selection
- **`PillInput`**: Used for Search and Text entries. Always paired with an icon on the left. Supports `sm`, `md`, and `lg` sizes.
- **`PillSelect`**: Used for category or option selection. Always pill-shaped with a custom dropdown arrow. Supports `sm`, `md`, and `lg` sizes.
- **`TagInput`**: Specialized input for adding/removing metadata tags.

### 3.3 Cards & Containers

Cards are the primary building blocks of our "Museum" layout. We use a balanced radius hierarchy to distinguish between structural layers and interactive elements.

#### A. GlassCard (Structural)
- **Purpose:** To group information sections (e.g., Login form, Item Metadata).
- **Visuals:** Uses `--glass-card-bg` and `--glass-blur`.
- **Radius:** `--radius-md` (16px).

#### B. MobileItemCard (Product)
- **Purpose:** The standard grid unit for merchandise.
- **Visuals:** Solid `--color-surface` (White). Uses `--shadow-card`.
- **Radius:** `--radius-md` (16px).
- **Structure:**
  - **Image Area (65%):** Centered `contain` image with `var(--spacing-md)` padding.
  - **Content Area (35%):** Mandatory `var(--spacing-md)` (12px) internal padding.
  - **Typography:** Titles use `--font-size-lg` and are clamped to 2 lines.
- **Actions:** Floating `ActionIconButton` elements pinned at `var(--spacing-sm)`.

#### C. Drawers & Bottom Sheets
- **Purpose:** For contextual menus and filters.
- **Visuals:** Solid white background, anchored to bottom, with `--radius-lg` (32px) on top corners.

### 3.4 Feedback & Metadata
- **`Tag`**: Small informational labels. Use for seasons, categories, or series names. Non-interactive unless specifically marked.
- **`ActionIconButton`**: Circular ghost buttons (Heart/Bookmark).
  - **Heart:** High-contrast red when active.
  - **Bookmark:** Primary blue when active.

---

## 4. Vertical Rhythm & Spacing

To maintain a consistent flow across different page types, we use a tiered spacing system. Use these "gaps" to separate elements vertically:

### 4.1 Vertical Gap Tiers
| Tier | Variable | Value | Usage |
| :--- | :--- | :--- | :--- |
| **Section Gap** | `--grid-margin` | 16px | Between major page blocks (e.g., Header -> Gallery -> Description). |
| **Field Gap** | `--spacing-lg` | 18px | Standard vertical spacing between interactive form fields. |
| **Data Row Gap** | `--spacing-md` | 12px | Spacing between rows of information/metadata or list items. |
| **Internal Gap** | `--spacing-sm` | 8px | Between a label and its input, or between tightly grouped items. |

### 4.2 The Distributed Gap Pattern
For stacked components (like Header rows or List items), we avoid one-sided margins. Instead:
- Each row provides **half the desired gap** as vertical padding.
- For a **Data Row Gap (12px)**, each row uses `6px` top/bottom padding.
- **Internal Gap (8px)**, each row uses `4px` (`--spacing-xs`) top/bottom padding.
- **Screen Edge Padding:** The main Header adds a top and bottom offset of `var(--spacing-md)` (12px). Combined with the row's padding, this creates a **16px total gap** from the screen edges (top and bottom of the header), ensuring visual breathability and symmetry.

---

## 5. Layout Patterns

### 5.1 Screen Offsets
All elements pinned to the screen edges follow our standard tokens:
- **Header Top/Bottom:** `var(--spacing-md)` (12px) internal padding.
- **Add FAB:** Pinned at `var(--spacing-xl)` (24px) from the bottom and right edges.

### 5.2 Optical Alignment (Hanging Elements)
Circular icon-only buttons at the start of a row should "hang" slightly into the left margin to align their icon content with the flat edges of images or text above/below them.
- **Example:** A `size="sm"` circle button uses `margin-left: -6px` to pull its center-aligned icon into visual alignment with the grid edge.

### 5.3 Grid System
The main product grid uses a 2-column layout on mobile with:
- `padding: 0 var(--grid-margin)`
- `gap: var(--grid-gutter)`

### 5.4 Radius Strategy (Unified Input Shape)
To maintain a high-end, tactile experience, the application follows a strict **Pill-First** mandate for all interactive data entries.

- **Unified Inputs:** All single-line inputs (`PillInput`, `PillSelect`, `TagInput`, `CategorySelector`) must use **`--radius-full`**. This creates a consistent "magical" language for all user input.
- **Structural Rhythm:** Larger containers like **Cards**, **Hero Blocks**, **Textareas**, and **Panels** use **`--radius-md`** (16px) to provide a stable, professional frame for the museum archives.
- **Large Interaction Blocks:** Specialized high-softness elements like **Bottom Sheets** use **`--radius-lg`** (32px).

### 5.5 Page Structure
1.  **Header:** Fixed glass panel (`.glass` class) with navigation and brand identity.
2.  **Main Content:** 
    - Use `padding: var(--spacing-xl) var(--grid-margin)` for standard pages.
    - Group content in `GlassCard` components for a layered look.
3.  **Bottom Navigation / FAB:** 
    - `AddFab`: Positioned fixed bottom-right for admin creation tasks.

### 5.6 Visual Standards

- **Shadows:** Use `--shadow-sm` for subtle lift and `--shadow-card` for items. Avoid heavy shadows.
- **Borders:** Use `--border-divider` for separators. Avoid dark, heavy borders.
- **Transitions:** All interactive elements (`Button`, `Tag`, `Card`) should have a subtle transition on hover/active states (standard: `0.2s ease`).
- **Icons:** Use **Material Symbols Outlined**. Standardize icon size to `20px` or `24px`.

### 5.7 Interactive States
To ensure a consistent feedback loop, all interactive elements share the same semantic colors for activation:
- **Active / Focus:** Use **`--color-primary`** (`#006686`) for borders and text highlights. This is the standard "Selected" state for Chips, Sort options, and Toggle buttons.
- **Focus Rings:** Use a translucent version of the primary color (`rgba(0, 102, 134, 0.1)`) for subtle depth without cluttering the UI.
