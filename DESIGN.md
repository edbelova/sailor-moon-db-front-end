---
# Design Tokens
colors:
  text:
    primary: "#213547"    # Base text
    secondary: "#302A4E"  # Headers, brand, and sidebar headings
    muted: "#444444"      # Tags and minor labels
    link: "#139ECD"       # Primary links
    link-hover: "#535BF2" # Hover state for links
    brown: "#433126"      # Category list text
  background:
    surface: "#FFFFFF"
    accent: "#F2F2F6"     # Subtle backgrounds (tags)
    neutral: "#D9D9D9"    # Search bar, inactive pills
    glass-frame: "rgba(255, 255, 255, 0.2)"
    glass-sidebar: "rgba(255, 255, 255, 0.4)"
    active-pill: "rgba(235, 225, 223, 0.8)"
  gradients:
    primary: "linear-gradient(120deg, #dfb3ff 0%, #ffb2a6 100%)" # Apply buttons
  border:
    subtle: "rgba(0, 0, 0, 0.12)"
    divider: "#E3E3E8"

typography:
  family:
    base: "system-ui, Avenir, Helvetica, Arial, sans-serif"
  size:
    brand: "26px"
    heading: "14px"
    body: "12px"
    label: "11px"
    tag: "10px"
  weight:
    bold: 700
    semibold: 600
    medium: 500
    regular: 400
  letter-spacing:
    normal: "normal"

spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "18px"
  xl: "24px"

radii:
  small: "6px"
  medium: "10px"
  large: "18px"
  pill: "999px"

shadows:
  soft: "0 2px 4px rgba(0, 0, 0, 0.1)"
  medium: "0 2px 6px rgba(0, 0, 0, 0.12)"
  heavy: "0 6px 24px rgba(0, 0, 0, 0.12)"
  sidebar: "0 8px 20px rgba(0, 0, 0, 0.05)"

motion:
  blur: "6px" # For backdrop-filter

assets:
  background: "bg-main.webp" # Main sparkling pastel background
  logo: "Logo.png"           # Primary brand logo
---

# Design System: Pretty Guardian Sailor Moon Museum

This design system defines the visual identity of the Sailor Moon Museum database. It evokes a magical, high-end museum atmosphere through the use of soft pastel gradients, layered white transparencies, and a structured, clean layout.

## Look & Feel
The application is built around a "Modern Museum" aesthetic. It balances the playful, vibrant nature of Sailor Moon merchandise with a sophisticated, minimalist interface. Key features include layered white transparencies, pill-shaped interactive elements, and an airy, spacious layout that lets product imagery take center stage.

## Visual Identity
- **Brand Assets:** The application is anchored by a warm, sparkling pastel background image (`bg-main.webp`) that establishes the atmosphere and naturally tints the UI. The primary brand mark is `Logo.png`, maintaining a consistent identity across platforms.
- **Layered Transparencies & Solid Cards:** The interface avoids heavy, stark backgrounds. Instead, panels and structural frames use subtle white transparencies (e.g., `rgba(255, 255, 255, 0.4)`) that allow the warm, sparkling pastel background image to naturally tint the UI. Solid white (`#FFFFFF`) is reserved strictly for Item Cards to ensure merchandise photography pops with maximum contrast.
- **Magical Gradients:** Strategic use of linear gradients (pink to lavender) for primary actions adds a touch of "magical girl" charm without overwhelming the clean interface.
- **Clean Typography:** Typography relies on standard sentence casing and natural letter spacing to prioritize legibility across dense data grids and filters, while remaining clean and modern.
- **Targeted Pill UI:** The full pill radius (`999px`) is used strategically. It is applied to search bar inputs and primary action buttons to ensure a soft tactile language, but omitted from secondary controls to prevent visual clutter.
- **Natural Neutrals:** Aside from the brand colors, the palette relies on warm, earthy neutrals (browns and off-whites) in the sidebar to keep the focus grounded and readable.

## Design Intent
The intent is to provide a "digital showcase" for collectors. The design avoids heavy shadows or sharp corners, opting instead for soft elevations and rounded edges to create an inviting, "dream-like" space for browsing items. The interface is designed to be secondary to the merchandise, providing a quiet but elegant framework for discovery.

## Elements Catalog & Component Guidelines

To maintain a clean visual hierarchy and prevent the interface from becoming cluttered, UI elements must follow these strict usage rules based on their purpose:

### 1. Primary Actions (The "Pills")
- **Appearance:** Full pill radius (`999px`), bold text. Filled with the magical pink gradient (`gradients.primary`) or a solid high-contrast color.
- **Usage:** Reserved strictly for the *main* action on a screen that drives the user forward or finalizes a task. There should rarely be more than one on screen at a time.
- **Examples:** "Login" button, "Show Results" (Apply Filters) button, "Save Item" (Admin).

### 2. Secondary Controls (Flat / Ghost Buttons)
- **Appearance:** Standard sentence-case text, often paired with a small, simple icon. No background color or heavy borders.
- **Usage:** For frequent interactions that manipulate the view but don't finalize a major workflow. They must be legible but should not visually compete with primary actions or content.
- **Examples:** "Sort" and "Filter" toggles on the main grid, Breadcrumb links, "Cancel" or "Reset" buttons.

### 3. Informational Tags
- **Appearance:** Very small pill shapes (`tag` font size), muted text colors, and subtle accent backgrounds (`#F2F2F6`).
- **Usage:** To display non-interactive metadata on item cards or detail pages without cluttering the layout.
- **Examples:** "Season 1", "S.H. Figuarts" labels.

### 4. Quick Actions (Icon Buttons)
- **Appearance:** Small circular touch targets containing a single icon. Slightly translucent background if floating over an image.
- **Usage:** For single-tap, universally recognizable actions attached to a specific context.
- **Examples:** Heart (Like), Bookmark, Hamburger Menu, Search icon.

### 5. Content Containers (Cards & Panels)
- **Appearance:** Solid white (`#FFFFFF`) backgrounds, `medium` border radius (`10px`), and `soft` shadows.
- **Usage:** To group related information (like a product photo and its metadata) or to create a distinct structural layer over the background (like the Filter Bottom Sheet or Nav Drawer).
