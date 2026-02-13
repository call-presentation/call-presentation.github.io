# Component-Based Architecture

## Overview

This site now uses a centralized component system to eliminate code redundancy. The navigation bar and footer are stored as reusable components and dynamically loaded into each page.

## Benefits

- **Single source of truth**: Navbar and footer only need to be edited once
- **Reduced redundancy**: Eliminated ~1,200 lines of duplicate code
- **Easier maintenance**: Update navigation/footer across all 21 pages by editing just 2 files
- **Consistent updates**: Changes are automatically reflected site-wide

## File Structure

```
call-presentation.github.io/
├── components/
│   ├── navbar.html      # Reusable navigation component
│   └── footer.html      # Reusable footer component
├── js/
│   └── components.js    # Component loader script
└── [HTML pages use placeholders]
```

## How It Works

### 1. Component Files

**`components/navbar.html`** - Contains the navbar HTML with `{{rootPath}}` placeholders:
```html
<a href="{{rootPath}}index.html">...</a>
```

**`components/footer.html`** - Contains the footer HTML with `{{rootPath}}` placeholders.

### 2. Component Loader (`js/components.js`)

- Automatically detects if page is in `/sections/` subdirectory
- Loads navbar and footer HTML
- Replaces `{{rootPath}}` with correct path (`../../` or `''`)
- Initializes navigation functionality (mobile menu, scroll effects, etc.)
- Highlights active page

### 3. HTML Pages

Each page includes two placeholders:

```html
<body>
    <!-- Navigation -->
    <div id="navbar-placeholder"></div>
    
    <!-- Page content here -->
    
    <!-- Footer -->
    <div id="footer-placeholder"></div>
    
    <!-- Load components -->
    <script src="js/components.js"></script>  <!-- Or ../../js/components.js for section pages -->
</body>
```

## Making Changes

### To update the navigation:

1. Edit **`components/navbar.html`**
2. Commit and push
3. Changes appear on all 21 pages automatically ✨

### To update the footer:

1. Edit **`components/footer.html`**
2. Commit and push
3. Changes appear on all pages automatically ✨

### To add a new topic:

1. Edit `components/navbar.html` - add link to dropdown
2. Edit `components/footer.html` - add link to footer nav
3. Edit `index.html` - add topic card
4. Changes propagate automatically

## Browser Compatibility

- Uses modern `fetch()` API (supported in all modern browsers)
- Async component loading with fallback handling
- No external dependencies required

## Notes

- The `{{rootPath}}` placeholder system handles relative paths automatically
- index.html has special transparent navbar styling (preserved)
- All JavaScript functionality from inline scripts moved to `components.js`
- Mobile navigation and scroll effects work identically

## Conversion Script

The `convert-to-components.sh` script was used to convert all existing HTML files. It's kept for reference but shouldn't be needed again.
