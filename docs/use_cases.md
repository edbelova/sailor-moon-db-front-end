# Desktop Features & Use Cases: Sailor Moon Museum Database

This document details the features and user journeys currently implemented in the desktop version of the Sailor Moon Museum database. It defines the "What" and "Why" behind every user interaction to provide a complete functional reference for the mobile design phase.

---

## 1. Discovery & Browsing (Consumer Journey)

### **Hierarchical Category Navigation**
- **User Intention:** As a collector, I want to explore specific categories of merchandise (e.g., Dolls, Stationery) to see the breadth of items available in those niches.
- **Features:** 
    - **Category Sidebar:** A persistent tree menu allowing users to drill down from broad categories (Home Goods) to specific sub-types (Pencil Cases).
    - **Recursive Inclusion:** Selecting a parent category automatically displays all items from its children sub-categories.
    - **Leaf Category Restriction (Admin):** New items can only be assigned to the most specific "leaf" categories in the tree.

### **Wayfinding with Breadcrumbs**
- **User Intention:** As a user browsing deep in the catalog, I want to understand my current location in the hierarchy and quickly return to a broader category.
- **Features:**
    - **Dynamic Path:** Displays the full trail from Home to the current category (e.g., *Stationery > Pens & Pencils*).
    - **One-Click Navigation:** Every level in the breadcrumb is a clickable link for rapid upward traversal.

### **Visual Result Grid**
- **User Intention:** As a browser, I want to see a high-level preview of multiple items at once to identify things that catch my eye visually.
- **Features:**
    - **Item Preview Cards:** Each card displays the primary thumbnail image, item name, and key metadata.
    - **Interactive Hover States:** Cards provide visual feedback when hovered, leading to the full item page.

---

## 2. Search & Filtering (Consumer Journey)

### **Global Full-Text Search**
- **User Intention:** As a fan with a specific item in mind, I want to find it quickly using any keywords I remember (part of a name, a manufacturer, or a character).
- **Features:**
    - **Keyword Matching:** Scans Name, Description, and other metadata.
    - **Partial Matching:** Matches partial strings (e.g., "sai" matches "Sailor").
    - **Relevance Ranking:** Prioritizes results where the search term appears in the item title.

### **Advanced Attribute Filtering**
- **User Intention:** As a shopper with specific constraints, I want to filter the catalog to find items that match my budget, a certain era, or a specific character.
- **Features:**
    - **Multi-Select Text Filters:** Users can filter by Manufacturer, Series, Country, Characters, and Materials. These support entering multiple values (comma-separated in the desktop UI).
    - **Range Selectors:** Precise filtering for Release Date windows (From/To) and Price points (Min/Max).
    - **Autosuggestions:** Inputs for Characters, Manufacturer, etc., provide a dropdown of existing values from the database after typing 2 characters.

### **Results Sorting**
- **User Intention:** As a user looking at many results, I want to organize them by price or release date to find the newest or most affordable items.
- **Features:**
    - **Multi-Attribute Sort:** Change order by Name, Release Date, Price, Manufacturer, Series, or Country.
    - **Direction Toggle:** Switch between Ascending and Descending order for any attribute.

---

## 3. Item Information (Consumer Journey)

### **Multi-Image Gallery**
- **User Intention:** As a potential buyer or researcher, I want to see the item from multiple angles and in detail to verify its condition or appearance.
- **Features:**
    - **Gallery View:** A dedicated area for all uploaded photos of an item.
    - **Main Image Display:** One image is prominently displayed as the primary focus.

### **Structured Metadata & Description**
- **User Intention:** As a collector, I need to know the official production details (Manufacturer, Materials, Dimensions) to verify authenticity or ensure it fits on my display shelf.
- **Features:**
    - **Data Grid:** Organized display of Name, Series, Season, Release Date, Manufacturer, Materials, Dimensions, Price, and Country.
    - **Variable Precision Dates:** Support for displaying dates as a Year (2021), Year-Month (2021-12), or Full Date (2021-12-25).
    - **Rich Description:** A dedicated section for free-text descriptions containing history or extra details.

---

## 4. Administration (Contributor Journey)

### **Secure Access Control**
- **User Intention:** As an admin, I want to keep the database secure so that only authorized contributors can modify the museum's contents.
- **Features:**
    - **Login/Logout:** Credentials-based authentication.
    - **Admin Guard:** Edit/Create/Delete buttons and pages are hidden from guest users.

### **Item Creation & Data Entry**
- **User Intention:** As a database maintainer, I want to add new merchandise to the museum so that the catalog stays current with new releases.
- **Features:**
    - **Leaf Category Selection:** Items are added while a specific sub-category is active.
    - **Metadata Form:** Inputs for all structured fields (Name, Characters, Season, Manufacturer, Materials, Series, Price, Dimensions, Country).
    - **Validation:** The system prevents saving an item without a Name or at least one Image.

### **Media Curation**
- **User Intention:** As an admin, I want to organize the item's gallery to ensure the most representative or high-quality photo is shown first.
- **Features:**
    - **Batch Upload:** Simultaneous uploading of multiple image files.
    - **Main Image Selection:** A specific interaction to designate one photo as the primary thumbnail.
    - **Gallery Reordering:** Drag-and-drop interaction to set the display sequence of images.
    - **Image Deletion:** Ability to remove poor-quality or redundant photos from the item.

### **Item Editing & Maintenance**
- **User Intention:** As a contributor, I want to correct typos or update metadata (like a newly announced release date) so that the database remains accurate.
- **Features:**
    - **Full Attribute Editing:** Every field in the item profile can be modified.
    - **Gallery Updates:** Adding/removing images from an existing item.

### **Item Deletion**
- **User Intention:** As an admin, I want to remove duplicate or incorrect entries to maintain the quality of the museum's data.
- **Features:**
    - **Delete Action:** A permanent removal of the item and its media from the database.
    - **Confirmation Prompt:** A safety step to prevent accidental deletion.

---

## Mobile UI Screens & Design Approach

Based on the desktop user journeys, the mobile application screens have been divided into two categories: those with clear, standard patterns, and those requiring visual experimentation through UI mocks.

### Category 1: Clear Requirements (Standard Patterns)
These screens rely on established mobile UX patterns and require fewer exploratory variations.

1.  **Category Navigation (Drawer)**
    - **Layout & Interaction:** An overlay panel sliding in from the edge of the screen, darkening the Home Screen behind it.
    - **Accordion Hierarchy:** The 2-level category tree displayed as a vertical list. Tapping a parent expands it inline (accordion style) to reveal children, rather than navigating to a new screen.
    - **Selection:** Tapping a child category closes the drawer and filters the catalog.

2.  **Login Screen**
    - **Layout:** Standard secure authentication gate with stacked form inputs for credentials.

### Category 2: Requires Experimentation (Needs UI Variants)
These screens involve complex interactions or dense information architecture. The designer is requested to provide variations for specific features to help determine the best mobile UX.

1.  **Home / Catalog Screen**
    - **Constraints:** No hover states; critical metadata (Image, Title, Price/Year) must be visible by default.
    - *Design Variants Requested (Grid Layout):*
        - Variant A: **2-Column Grid** (Maximizes visible items, standard e-commerce pattern, smaller images/text).
        - Variant B: **1-Column List** (Large images spanning the screen width, better for showcasing details, slower scanning).
    - *Design Variants Requested (Filter/Sort Entry):*
        - Variant A: **Sticky Header Bar** below the search input.
        - Variant B: **Floating Action Button (FAB)** anchored to the bottom right corner.
    - *Design Variants Requested (Wayfinding & Breadcrumbs):*
        - Variant A: **Scrollable Breadcrumb Bar** (A horizontal, touch-friendly list of the full category path).
        - Variant B: **Alternative Context/Wayfinding** (If traditional breadcrumbs are omitted to save vertical space, the designer must provide an alternative UI element or interaction that fulfills the user's need to understand their current location and navigate upward).
    - *Design Variants Requested (Global Search Interaction):*
        - Variant A: **Full-Screen Search Overlay** (Tapping search opens a dedicated overlay with suggestions and recent searches).
        - Variant B: **Inline Expansion** (Search input expands inline, keeping the user in the catalog context).

2.  **Filter & Sort Modal (Full-Screen)**
    - **Flow:** Unified scrolling list (combining sort and filter). Batch apply via a sticky "Show Results" button at the bottom.
    - *Design Variants Requested (Complex Multi-Selects like Characters):*
        - Variant A: **Push to Sub-Screen** (taps slide in a dedicated search/select view).
        - Variant B: **Inline Accordion** (taps expand a search box and list directly in the main list).

3.  **Item Details Screen**
    - The comprehensive view for a single item, featuring a swipeable image gallery, structured metadata display, and detailed textual description.
    - *Design Variants Requested (Information Hierarchy):*
        - Variant A: **Accordion Metadata** (Images -> Title -> Expandable Metadata Accordion -> Description).
        - Variant B: **Description First** (Images -> Title -> Description -> Flat Metadata Table at the bottom).
    - *Design Variants Requested (Primary Actions - Edit/Bookmark):*
        - Variant A: **Sticky Bottom Bar** (Persistent actions while scrolling).
        - Variant B: **Inline Top Actions** (Icon buttons placed near the item title).
    - *Design Variants Requested (Image Gallery Interaction):*
        - Variant A: **Inline Swipe Carousel** (Images are swipeable but constrained to the screen width).
        - Variant B: **Fullscreen Lightbox** (Tapping an image opens a full-screen view allowing pinch-to-zoom for detailed inspection).

4.  **Admin - Edit/Create Item Screen (Includes Media Management)**
    - A complex data-entry interface encompassing textual metadata, dynamic validation, and inline image gallery management (batch upload, main image selection, reordering).
    - *Design Variants Requested (Form Flow):*
        - Variant A: **Single Long Form** (Continuous scroll containing text inputs followed by the image manager).
        - Variant B: **Multi-Step Wizard** (e.g., Step 1: Details, Step 2: Images).
    - *Design Variants Requested (Media Reordering):*
        - Variant A: **Thumbnail Grid** (Long-press and drag to reorder).
        - Variant B: **Vertical List with Handles** (Clear drag handles on the right side).

---

## Appendix A: Implementation Details
*Technical context that supports the user journeys.*

- **CSRF Protection:** Secure communication using `X-XSRF-TOKEN` headers.
- **Request Correlation:** Every API response includes a `requestId` for logging and debugging.
- **Backend Sorting/Ranking:** The server handles complex relevance logic for search results.
- **Automatic Media Cleanup:** The backend deletes unreferenced images from storage when they are removed from an item.
- **URL Persistence:** The state of filters and categories is maintained in the URL for deep-linking.

## Appendix B: Technical Details for Design Mocks
*Concrete data fields required to construct accurate UI mockups based on the current implementation.*

### 1. Categories & Subcategories
The design should accommodate a 2-level hierarchy. The expected tree is:
- Figures
    - Scale Figures & Statues
    - Action Figures
    - Chibi & Mini Figures
    - Gashapon & Trading Figures
    - Model Kits
- Dolls
    - Fashion Dolls
    - Mini/Adventure Dolls
    - Collector & Pullip Dolls
- Keychains
    - Metal & Enamel Keychains
    - Rubber & Phone Strap
    - Acrylic & 3D Charms
- Stationarity
    - Pens & Pencils
    - Notebooks
    - Stickers & Seals
    - Letter Sets & Postcards
    - Folders & Clear Files
    - Pencil Cases & Storage
    - Art & Craft Supplies
    - Calendars & Planners
    - School Accessories
- Home Goods
    - Kitchen & Dining
    - Bedding & Bath
    - Decor & Display
    - Storage & Containers
- Plush Toys
    - Plush dolls
    - Mini/Mascot Plush
    - Jumbo & Cushion Plush
- Role-Play Toys
    - Wands, Rods & Staffs
    - Brooches & Compacts
    - Weapons & Talismans
    - Other Gadgets & Accessories
- Trading Cards
    - Collectible Card Sets
    - Playing & Game Cards
    - Telephone Cards
    - Cards Albums & Storage
- Media
    - VHS/DVDs & Blu-rays
    - Music & Audio
    - Video Games
- Books & Manga
    - Manga
    - Artbooks
    - Magazines
    - Novels & Storybooks
    - Coloring & Activity Books
- Apparel
    - Clothing
    - Cosplay Costumes
    - Jewelry & Watches
    - Bags & Wallets
    - Socks & Footwear
    - Hats & Headwear
- Food
    - Candies & Gum
    - Chocolates & Sweets
    - Snacks & Instant Foods
    - Beverages
    - Other Edibles
- Cosmetics & Beauty
    - Makeup
    - Skincare & Bath
    - Fragrances & Perfumes
    - Nail Products
    - Beaty Accessories
- Miscellaneous
    - Pin & Badges
    - Board Games & Puzzles
    - Electronics & Gadgets
    - Promotional & Other

### 2. Filter & Sort Fields (Filter Modal)
The unified filter modal needs UI inputs for the following attributes:
- **Search/Text:** Global Search, Item Name.
- **Multi-select / Autosuggest:** Characters, Manufacturer, Materials, Series, Country.
- **Range Inputs:** Release Date (From/To), Price (Min/Max).
- **Sort Options:** Name, Release Date, Price, Manufacturer, Series, Country. (Needs Ascending/Descending toggles).

### 3. Item Attributes (Admin Edit/Create Screen)
The form must include inputs for the following data types:
- **Required:**
    - Name (Text)
    - Category (Dropdown/Selection restricted to leaf nodes)
    - Images (Media upload and drag-and-drop reordering)
- **Optional (but needs inputs):**
    - Release Date (Date selector: Year, Year-Month, or Full Date)
    - Manufacturer (Text)
    - Materials (Multi-tag input)
    - Series (Text)
    - Season (Text)
    - Price (Number)
    - Currency (Dropdown/Text, e.g., JPY, USD)
    - Dimensions (Text)
    - Country of Origin (Text)
    - Characters (Multi-tag input)
    - Description (Large Text Area)

### 4. Item Tile Actions (Main Page Grid)
The item cards on the main catalog screen should feature the following interactions:
- **Primary:** Tap image or title to navigate to Item Details.
- **Active Quick Actions:** 
    - Like / Favorite (Heart Icon)
    - Bookmark / Save (Bookmark Icon)
- **Planned Extensions (Optional for mocks, but space should be considered):**
    - Mark as Owned (Check Icon)
    - Add to Cart (Cart Icon)
    - Add Review / Rating (Star Icon)

---

## Appendix C: Prompt Guides for AI UI Generation

This section contains highly descriptive text prompts intended to be copy-pasted into AI UI generation tools (like Stitch) to accurately produce the required mobile screen variants.

### 1. Home / Catalog Screen (Variant A1: 2-Column Grid)
**Prompt to use:**
> Mobile app screen for an e-commerce catalog. 
> Background: Use a warm, sparkling pastel image ('bg-main.webp') as the base layer behind all content.
> Layout from top to bottom:
> 1. Top Header Bar: Translucent white background with a soft drop shadow. Inside the header, place a Hamburger menu icon on the far left, the main 'Logo.png' centered, and a Search (magnifying glass) icon on the far right.
> 2. Breadcrumb Navigation: A clean, horizontal text row right below the header with no background. Show the text path "Home > Figures > Scale Figures". Make the current category ("Scale Figures") bold and dark, while parent categories are muted gray.
> 3. Filter & Sort Action Bar: A horizontal bar that sticks below the breadcrumbs. On the left, place a text label "Release date" with a small Sort icon (e.g., up/down arrows or stacked lines) next to it. On the right, place a filter icon next to the text "Filter". Both should look like clickable but flat text-buttons.
> 4. Item Grid (Main Content): A 2-column grid of product cards with consistent spacing, scrolling vertically.
> 5. Item Card Design: Each card has a solid white background (`#FFFFFF`), rounded corners, and a soft shadow. The top two-thirds (2/3) of the card contains the product photo, scaled to fit the space. Floating over the bottom-right corner of the photo area are two small circular icon buttons placed next to each other: a Heart icon and a Bookmark icon. The bottom third (1/3) of the card contains two lines of left-aligned text for the product title (e.g., "2023 - Bandai - Sailor Moon Figure"), followed by a row of small, pill-shaped tags showing "Season 1" and "S.H. Figuarts".

### 2. Item Details Screen
**Prompt to use:**
> Mobile app screen for an item details page. 
> Background: Use a warm, sparkling pastel image ('bg-main.webp') as the base layer behind all content.
> Layout from top to bottom:
> 1. Top Header Bar: Translucent white background with a soft drop shadow. Inside the header, place a "Back" (left arrow) icon on the far left, the main 'Logo.png' centered, and an empty space or share icon on the far right.
> 2. Image Gallery: A large, prominent product photo taking up the top area. Directly beneath it, a horizontally scrollable carousel of smaller, square thumbnail images.
> 3. Category & Title Section: Below the gallery, first display a small, muted text breadcrumb trail showing the category (e.g., "Figures > Scale Figures"). Directly below the breadcrumbs, display a large, left-aligned product title (e.g., "1/8 Scale Sailor Moon Cosmos Figure").
> 4. Metadata Attributes Section: Below the title, a clean data panel. Use a solid white (`#FFFFFF`) background, rounded corners (`10px`), and a soft shadow. Inside, display a clear, readable vertical list of the following attributes: Release Date (e.g., 2023), Manufacturer (e.g., Bandai), Materials (e.g., PVC, ABS), Series (e.g., S.H. Figuarts), Season (e.g., Sailor Stars), Price (e.g., 15,000), Dimensions (e.g., 15cm), Country (e.g., Japan), and Characters (e.g., Sailor Moon).
> 5. Description Section: Below the attributes panel, a paragraph of standard, left-aligned sentence-cased text describing the item's history and details.

### 3. New Item Screen (Admin) - Empty State
**Prompt to use:**
> Mobile app screen for an admin data-entry form. 
> Background: Use a warm, sparkling pastel image ('bg-main.webp') as the base layer behind all content.
> Layout from top to bottom:
> 1. Top Header Bar: Translucent white background with a soft drop shadow. Inside the header, place the text "Cancel" on the far left, the title "Add New Item" centered, and a pill-shaped "Save" button filled with a pink-to-lavender gradient on the far right.
> 2. Media Upload Section: Below the header, a designated area for image management. Show a large empty square placeholder with a camera icon and the text "Upload from computer" inside it.
> 3. Form Fields (Scrollable Area): A vertical list of input fields. Each field consists of a small text label above a clean, white (`#FFFFFF`) input box with rounded corners (`6px`). 
> 4. Key Inputs to Display: Show inputs for "Name" (text), "Category" (dropdown arrow), "Price" (number), and "Release Date". Show an input for "Characters" that contains a few small, pill-shaped tags inside the text box (representing multi-select). 
> 5. Description Input: At the bottom of the form, display a large, multi-line text area for the "Description".

### 4. New Item Screen (Admin) - Populated State
**Prompt to use:**
> Mobile app screen for an admin data-entry form showing uploaded images.
> Background: Use a warm, sparkling pastel image ('bg-main.webp') as the base layer behind all content.
> Layout from top to bottom:
> 1. Top Header Bar: Translucent white background with a soft drop shadow. Inside the header, place the text "Cancel" on the far left, the title "Edit Item" centered, and a pill-shaped "Save" button filled with a pink-to-lavender gradient on the far right.
> 2. Media Upload Section (Populated): Below the header, a large square product photo representing the main cover image. Directly below this large photo, display a vertical list of the other uploaded images. Each row in this vertical list should contain: a small square thumbnail of the image on the left, a tiny trash bin icon next to it, and a "drag handle" icon (three horizontal lines or six dots) on the far right. Below this vertical list, place a wide button with a '+' icon and the text "Add Images".
> 3. Form Fields (Scrollable Area): A vertical list of input fields. Each field consists of a small text label above a clean, white (`#FFFFFF`) input box with rounded corners (`6px`). The inputs are filled with data (e.g., Name: "Sailor Moon Figure").
> 4. Description Input: At the bottom of the form, display a large, multi-line text area containing a paragraph of text for the "Description".
