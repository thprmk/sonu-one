# SONU Shopify Theme Cleanup Report

This report categorizes files inside the theme directory based on their usage, identifying redundant assets and templates that are safe for removal versus core files that must not be modified.

---

## 1. Safe to Remove

The following files are either completely empty (0 bytes) or are duplicate files that are not referenced in any layout, page templates, header/footer configuration groups, or core rendering files.

### Sections
- **`sections/sonu-featured-product.liquid`**: 0 bytes, completely empty stub file.
- **`sections/testimonials.liquid`**: Legacy testimonial layout file. Not referenced in any page templates or layouts.
- **`sections/testimonials-slider.liquid`**: Legacy slider layout file. Duplicate of `sonu-testimonial-slider.liquid`. Not referenced.
- **`sections/testimonials-parallax.liquid`**: Parallax testimonial variant. Not referenced in any page templates or layouts.

---

## 2. Review Required

The following files are not currently referenced in any active templates, groups, or layouts. However, they may represent draft designs, collection widgets, or alternate product pages that the merchant could activate in the future. 

We recommend client review before purging:

### Custom/Spatial Drafts
- **`sections/sonu-therapy.liquid`**: Draft theme section; check if required for legacy template backups.
- **`sections/variant-data.liquid`**: Unreferenced helper widget.

### Unused Base Theme Widgets & Features
- **`sections/announcement-bar.liquid`**: Core Pebble announcement bar. Unused because the header group utilizes custom `sonu-announcement` instead. Keep as fallback backup.
- **`sections/collage-product-card-overlay.liquid`**: Collage overlay component. Unreferenced.
- **`sections/collection-highlight-scrolling.liquid`**: Unreferenced collection scrolling section.
- **`sections/collection-highlight-with-image.liquid`**: Unreferenced collection layout.
- **`sections/collection-highlight.liquid`**: Unreferenced.
- **`sections/collection-list.liquid`**: Unreferenced collection index cards.
- **`sections/collection-tabs.liquid`**: Unreferenced tab layout.
- **`sections/highlight-text-with-image.liquid`**: Unreferenced text layout.
- **`sections/lookbook-banner.liquid`**: Unreferenced lookbook feature.
- **`sections/lookbook-carousel.liquid`**: Unreferenced.
- **`sections/masonry-section.liquid`**: Unreferenced layout grid.
- **`sections/media-gallery.liquid`**: Unreferenced standalone media widget.
- **`sections/product-highlight-points.liquid`**: Unreferenced features bullet card.
- **`sections/product-recently-viewed.liquid`**: Unreferenced section. Recently viewed products are typically dynamic, verify if legacy scripts require it.
- **`sections/product-suggestion.liquid`**: Unreferenced.
- **`sections/products-bundle-selection.liquid`**: Bundle drawer builder, check if linked to cart drawer.
- **`sections/products-bundle.liquid`**: Unreferenced bundle widget.
- **`sections/products-combine.liquid`**: Unreferenced.
- **`sections/products-highlight.liquid`**: Unreferenced.
- **`sections/quick-order-list.liquid`**: Unreferenced bulk order list layout.
- **`sections/scrolling-card-layered.liquid`**: Unreferenced layer layout.
- **`sections/scrolling-cards.liquid`**: Unreferenced scrolling blocks.
- **`sections/section-rendering-product-card.liquid`**: Dynamic card loader, confirm if accessed via AJAX product-card previews.
- **`sections/shop-the-look.liquid`**: Unreferenced visual lookbook.

---

## 3. Do Not Touch

The following files are **actively in use** by page templates, layout groups, or core rendering structures. Removing or modifying these files will break live pages.

### Active Custom/Bespoke Sections
- **`sections/sonu-v2-testi.liquid`**: Active on home page (`index.json`), spatial 2 page (`page.spatial2.json`), and sonu page (`page.sonu.json`).
- **`sections/sonu-testimonial-slider.liquid`**: Active on spatial page (`page.spatial.json`).
- **`sections/Testimonial-test.liquid`**: Active on spatial page (`page.spatial.json`).
- **`sections/sonu-testimonial.liquid`**: Active on home page (`index.json`).
- **`sections/sonu-faq.liquid`**: Active on multiple page templates.
- **`sections/sonu-hero.liquid`**: Active on multiple layouts.
- **`sections/sonu-flex-banner.liquid`**: Active on spatial and homepage templates.
- **`sections/sonu-logo-list.liquid`**: Active.
- **`sections/sonu-logo-unique.liquid`**: Active.
- **`sections/sonu-premium-carousel.liquid`**: Active.
- **`sections/sonu-press.liquid`**: Active.
- **`sections/sonu-product-card.liquid`**: Active.
- **`sections/sonu-product-section.liquid`**: Active.
- **`sections/sonu-product2.liquid`**: Active.
- **`sections/sonu-slide.liquid`**: Active.
- **`sections/sonu-slide2.liquid`**: Active.
- **`sections/sonu-specification.liquid`**: Active.
- **`sections/sonu-split-content.liquid`**: Active.
- **`sections/sonu-therapy-section.liquid`**: Active.
- **`sections/spatial-custom.liquid`**: Active.
- **`sections/spatial-hero.liquid`**: Active.
- **`sections/spatial-spec.liquid`**: Active.
- **`sections/spatial-therapy.liquid`**: Active.
- **`sections/store-locator.liquid`**: Active.

### Core Layout and Engine Files
- **`sections/custom-section.liquid`**: The core Pebble Flex Layout engine (267KB). Defines the block nesting system for custom layouts.
- **`sections/header.liquid`**: Active header.
- **`sections/footer.liquid`**: Core Pebble footer. Currently disabled in favor of a custom-liquid layout, but must remain intact as standard fallback.
