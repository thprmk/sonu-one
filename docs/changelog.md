# SONU Shopify Theme Git Changelog

This changelog documents the complete commit history on the active development branch (`sam`).

---

## Active Branch: `sam`
- **Source Repository:** `https://github.com/thprmk/sonu-one.git`
- **Workspace:** `/Users/jay/Downloads/getsonu`

---

## 1. Commit History (Chronological Order)

### June 6, 2026

* **fc41f82** - *Fix Swiper progress bar layout styling and class targets* (by Jay)
  - **Files modified:**
    - [sections/custom-video-slider.liquid](file:///Users/jay/Downloads/getsonu/sections/custom-video-slider.liquid) (Added `swiper-pagination` class)
    - [assets/custom.css](file:///Users/jay/Downloads/getsonu/assets/custom.css) (Added layout properties for progress bar fill)
* **5b8e254** - *Fix UGC video slider carousel initialization and add top/bottom spacing schema controls* (by Jay)
  - **Files modified:**
    - [assets/custom.js](file:///Users/jay/Downloads/getsonu/assets/custom.js) (Added check for `document.readyState` to initialize Swiper modules immediately when DOM is loaded, avoiding race condition)
    - [sections/custom-video-slider.liquid](file:///Users/jay/Downloads/getsonu/sections/custom-video-slider.liquid) (Added padding inputs to schema, wired style variables)
    - [sections/custom-comparison.liquid](file:///Users/jay/Downloads/getsonu/sections/custom-comparison.liquid) (Added padding inputs to schema, wired style variables)
    - [assets/custom.css](file:///Users/jay/Downloads/getsonu/assets/custom.css) (Wired dynamic spacing properties to layout rules)
* **1776355** - *add custom video slider section and integrate into sonu product page template* (by Jay)
  - **Files modified:**
    - [sections/custom-video-slider.liquid](file:///Users/jay/Downloads/getsonu/sections/custom-video-slider.liquid)
    - [assets/custom.js](file:///Users/jay/Downloads/getsonu/assets/custom.js)
    - [assets/custom.css](file:///Users/jay/Downloads/getsonu/assets/custom.css)
    - [templates/product.sonu-product-page.json](file:///Users/jay/Downloads/getsonu/templates/product.sonu-product-page.json)
* **5bcfee1** - *clean up system files* (by Jay)
* **1e4d55f** - *first* (by Jay)
* **dae6587** - *first* (by Jay)

### June 5, 2026

* **4dbc99a** - *Update from Shopify for theme sonu-one/sam* (by shopify[bot])
* **5fe6ea6** - *Update from Shopify for theme sonu-one/sam* (by shopify[bot])
* **2c63fc1** - *Update from Shopify for theme sonu-one/sam* (by shopify[bot])
* **11353a7** - *Merge remote main, keeping local refactor and remote popup fix* (by Prem s)
* **a40f047** - *Save local shopify pull and refactor* (by Prem s)
* **b9204c5** - *popup.liquid fix* (by Prem s)
* **ca940c2** - *rm env* (by Prem s)
* **d8c7e0e** - *start* (by Prem s)

---

## 2. Guidelines for Future Commits

To maintain a clean and update-safe codebase, please observe the following practices:

### Commit Messages Format
Use semantic and descriptive messages:
- `Fix: ...` (e.g. `Fix: Swiper progress bar layout styling and class targets`)
- `Feat: ...` (e.g. `Feat: add spacing settings to custom-comparison section`)
- `Docs: ...` (e.g. `Docs: create git commit changelog`)

### Decoupling Rules
1. **Never modify theme core files directly** (such as `assets/theme.css` or `assets/theme.js`).
2. **All custom styling must go in** `assets/custom.css`.
3. **All custom scripting must go in** `assets/custom.js`.
4. **All custom sections or snippets** must be prefixed with `custom-` (e.g., `sections/custom-video-slider.liquid`).

### Shopify Sync
- When developing locally, always pull changes (`git pull --rebase origin sam`) before pushing.
- Make sure to test your local builds in the editor to ensure styling schema variables map correctly.
