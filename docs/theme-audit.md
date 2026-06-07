# SONU Shopify Theme Audit & Settings Plan

This report provides a comprehensive architectural audit of the SONU Shopify development theme, documenting the theme structure, update risks, and a concrete setting implementation plan.

---

## 1. Theme Structure Report

### Core Theme Information
- **Base Theme Framework:** Pebble Theme (v1.2.0) by FoxEcom (a premium section-based theme using Shopify's modern Flex Sections architecture).
- **Asset Bundle Size:** High (~650KB+ of native JS modules and Tailwind CSS utility sheets).
- **Core Stylesheet:** `assets/theme.css` (contains the utility-first CSS layout engine).
- **JS Modular Architecture:** Uses a native browser import map system (`snippets/scripts.liquid` mapping core modules like `@theme/utilities`, `@theme/carousel`, etc.) with `modulepreload` headers.

### Directory Analysis
- **`layout/`**: Contains core layouts `theme.liquid` and `password.liquid`. `theme.liquid` is highly organized and loads critical CSS above-the-fold and loads modules dynamically.
- **`sections/`**: 112 files. A mix of core Pebble sections, custom blocks, and bespoke sections created for the SONU brand (prefixed with `sonu-*` and `spatial-*`).
- **`snippets/`**: 110 files. Includes logic templates (like `css-variables.liquid`, `color-schemes.liquid`) and standard UI modules.
- **`assets/`**: 181 files. Core vendor libraries (Swiper, PhotoSwipe, Lenis) and custom stylesheets/scripts.
- **`config/`**: Contains global theme data (`settings_data.json`) and the primary editor schema configuration (`settings_schema.json`).
- **`templates/`**: 28 JSON templates supporting page variants (`page.sonu`, `page.spatial`, `page.spatial2`) and product options (`product.2-columns`).

### Custom Bypasses vs. Core Files
We identified a critical structural bypass in `sections/footer-group.json`:
- **The Issue:** The theme's native editable `footer` section is set to `"disabled": true`.
- **The Bypass:** It has been replaced by a raw `custom-liquid` block (`custom_liquid_VXHzkP`) containing **fully hardcoded HTML, CSS, and JS**.
- **Impact:** The footer uses hardcoded logo URLs, navigation links, background images, and social links. The client cannot manage this content via Shopify settings.

---

## 2. Theme Update Risk Report

Modifying files in a pre-built premium theme introduces high risks of locking the codebase from upstream updates.

> [!WARNING]
> **Pebble Theme Upgrades:** Upgrading the Pebble base theme to newer versions will overwrite all core files under `assets/`, `snippets/`, and `layout/`. Any modifications made directly to core files will be lost.

### Identified High-Risk Customizations
1. **Google Fonts CDN Links:** Directly injected in individual sections (e.g. `sonu-flex-banner.liquid` loading `Instrument Sans`).
2. **Third-Party CDN Libraries:** Swiper loads directly from jsDelivr inside sections, bypassing the theme asset pipeline.
3. **Hardcoded Color/Typography Values:** Section style blocks bypass the central variable registry.

### Decoupling & Protection Strategy
To ensure the theme remains update-safe, follow these rules:
- **No Direct Core Editing:** Never modify core assets like `assets/theme.css` or `assets/theme.js`.
- **Bespoke Files Separation:** All custom configurations must live in separated, branded section/snippet files prefixed with `custom-*`.
- **Custom Asset Pipeline:** Append custom CSS and JS exclusively into `assets/custom.css` and `assets/custom.js` respectively. Add single inclusions for these files inside `snippets/styles.liquid` and `snippets/scripts.liquid`.

---

## 3. Global Settings Plan

To satisfy the client requirement that **Colors, Typography, Buttons, and Spacing** must be manageable from the Shopify Theme Settings, we will map settings to Pebble's native variables or use custom variables.

### A. Spacing Configuration
Since Pebble's settings schema does not have a global "Spacing" panel, spacing is currently configured inside section margins and block settings.
- **Plan:** Leverage Pebble's spacing helper utility: `{% render 'spacing-style', settings: section.settings %}`.
- All custom sections must include layout range sliders for padding/margins in their schema, mirroring this pattern.

### B. Color & Typography Mapping
Currently, custom sections have hardcoded color values and font declarations. They must be refactored to use theme CSS variables:

| Hardcoded Value | Custom Section File | Target Shopify Setting Variable | CSS Property Replacement |
| :--- | :--- | :--- | :--- |
| `font-family: 'Instrument Sans'` | Multiple `sonu-*` files | Heading/Body Font Picker | `font-family: var(--font-body--family)` or `var(--font-heading--family)` |
| `background-color: #D7CEC7` | `sonu-faq.liquid` | Color Schemes Background | `background-color: var(--color-background-secondary)` |
| `color: #3D1B03` | `sonu-faq.liquid` | Color Schemes Text | `color: var(--color-foreground)` |
| `color: #001755` | `sonu-flex-banner.liquid` | Primary Button Color | `color: var(--color-foreground)` (Dynamic Schemes) |

### C. Standard Button Mapping
Custom sections currently declare raw `.sonu-sound-banner__button` styles.
- **Plan:** Refactor these custom elements to inherit standard theme classes (e.g., `button button--primary` or `button button--secondary`).
- They will automatically inherit client configurations for:
  - `--button-height`
  - `--button-corner-radius`
  - `--button-border-thickness`
  - Color scheme background/text variables.
