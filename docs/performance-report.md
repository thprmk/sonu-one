# SONU Shopify Theme Performance Report

This document reports critical web performance issues discovered during the audit of the SONU Shopify theme, along with recommended solutions to maximize site speed and user experience.

---

## 1. Critical Performance Issues Identified

### A. Redundant Library CDN Imports (Swiper)
Multiple custom sections (e.g. `sonu-v2-testi.liquid` and `sonu-product2.liquid`) load Swiper directly from a third-party CDN:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```
- **The Issue:** The theme *already* bundles Swiper locally inside `assets/swiper.js` (91KB) and `assets/swiper.css` (7.4KB), loaded through import maps.
- **Performance Impact:** Duplicating this library creates double network requests, blocking the render thread and wasting cellular data. If the jsDelivr CDN experiences downtime or slow performance, sections of the site will break.

### B. Render-Blocking Font CDN Imports
Custom sections load Google Fonts directly within section files:
```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```
- **The Issue:** Inlining font link tags deep in section markup causes the browser to pause page layout calculation to fetch external stylesheets mid-rendering.
- **Performance Impact:** Increases the Cumulative Layout Shift (CLS) and triggers a flash of unstyled text (FOUT). If multiple sections load the same stylesheet link, redundant HTTP connections are initiated.

### C. Autoplay Video Delivery
Custom testimonial sections (e.g., `sonu-v2-testi.liquid`) use raw, autoplaying video elements:
```html
<video playsinline muted autoplay loop>
  <source src="{{ block.settings.video_url }}" type="video/mp4">
</video>
```
- **The Issue:** Autoplay videos on mobile do not have dimensions restricted, leading to significant bandwidth waste if the file sizes are large.
- **Performance Impact:** Delays Largest Contentful Paint (LCP) and consumes excessive mobile data.

---

## 2. Theme Editor & JS Initialization Issues

A critical bug was found in the custom section scripts (such as `sonu-faq.liquid` and `sonu-v2-testi.liquid`). They listen only to standard window events:
```javascript
document.addEventListener('DOMContentLoaded', function(){ ... });
// or
window.onload = function(){ ... };
```

### The Problem
When a merchant edits section content in the **Shopify Theme Editor**, Shopify re-renders and swaps sections on-the-fly via AJAX.
- The `DOMContentLoaded` event **does not fire** during these editor re-renders.
- Consequently, accordions, sliders, and video controls **freeze and become completely non-functional** in the editor preview window.

### The Solution
All custom scripts must be refactored to use Shopify's native Theme Editor JS lifecycle events. Instead of executing on load, they must be registered to listen for section changes:
```javascript
document.addEventListener('shopify:section:load', function(event) {
  const sectionId = event.detail.sectionId;
  const sectionContainer = event.target;
  
  if (sectionContainer.querySelector('.v2-reviews-swiper')) {
    // Re-initialize Swiper slider specifically inside the modified section
    initReviewsSwiper(sectionContainer);
  }
});
```

---

## 3. Recommended Optimization Checklist

> [!TIP]
> **Performance Improvements:**
> 1. **Ditch CDNs:** Remove external stylesheet and script CDN links for Swiper. Import Swiper modules directly from the local bundle or reference local assets.
> 2. **Preload Fonts:** Load custom/google fonts globally in the theme head (`snippets/fonts.liquid`) rather than in section body tags, using high priority `font-display: swap` instructions.
> 3. **Video Optimization:** Compress all user-uploaded videos using modern formats (e.g., `.webm` with `.mp4` fallback). Limit video dimensions to the maximum card size (e.g., 450px width for testimonials) and use `preload="metadata"` or `loading="lazy"` tags.
