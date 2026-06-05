import Swiper from '@theme/swiper';

function initCustomFeaturedProduct(container) {
  const swiperEl = container.querySelector('.custom-prod-gallery');
  if (!swiperEl) return;

  const prevBtn = container.querySelector('.custom-prod-gallery__arrow--prev');
  const nextBtn = container.querySelector('.custom-prod-gallery__arrow--next');
  const paginationEl = container.querySelector('.custom-prod-gallery__pagination');

  // 1. Initialize Swiper Gallery
  new Swiper(swiperEl, {
    loop: true,
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
    },
    pagination: {
      el: paginationEl,
      clickable: true,
      bulletClass: 'swiper-pagination-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active',
    }
  });

  // 2. Quantity Selector Logic
  const minusBtn = container.querySelector('.custom-prod-qty-btn--minus');
  const plusBtn = container.querySelector('.custom-prod-qty-btn--plus');
  const qtyValue = container.querySelector('.custom-prod-qty-value');

  if (minusBtn && plusBtn && qtyValue) {
    let currentQty = 1;
    minusBtn.addEventListener('click', () => {
      if (currentQty > 1) {
        currentQty--;
        qtyValue.textContent = currentQty;
      }
    });
    plusBtn.addEventListener('click', () => {
      currentQty++;
      qtyValue.textContent = currentQty;
    });
  }

  // 3. Color Swatch and Active State Logic
  const swatches = container.querySelectorAll('.custom-prod-swatch');
  const swatchLabel = container.querySelector('.custom-prod-swatch-label');
  const buyBtn = container.querySelector('.custom-prod-buy-btn');

  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');

      const color = swatch.getAttribute('data-color');
      const variantId = swatch.getAttribute('data-variant-id');
      const isAvailable = swatch.getAttribute('data-available') === 'true';

      if (swatchLabel && color) {
        swatchLabel.textContent = color;
      }

      if (buyBtn && variantId) {
        buyBtn.setAttribute('data-variant-id', variantId);
        buyBtn.disabled = !isAvailable;
      }
    });
  });

  // 4. AJAX Cart Submit Handler
  if (buyBtn) {
    buyBtn.addEventListener('click', () => {
      const variantId = buyBtn.getAttribute('data-variant-id');
      const quantity = parseInt(qtyValue?.textContent || 1);
      if (!variantId) return;

      fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          id: parseInt(variantId),
          quantity: quantity
        })
      })
      .then(response => response.json())
      .then(() => {
        // Redirect or trigger cart drawer refresh
        window.location.href = '/cart';
      })
      .catch(error => {
        console.error('Add to cart failed:', error);
      });
    });
  }
}

function initCustomComparison(container) {
  const swiperEl = container.querySelector('.custom-comp-swiper');
  if (!swiperEl) return;

  const prevBtn = container.querySelector('.custom-comp-nav-btn--prev');
  const nextBtn = container.querySelector('.custom-comp-nav-btn--next');

  new Swiper(swiperEl, {
    slidesPerView: 'auto',
    spaceBetween: 24,
    loop: false,
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
    },
    breakpoints: {
      320: {
        spaceBetween: 12,
      },
      768: {
        spaceBetween: 24,
      }
    }
  });
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.shopify-section').forEach(section => {
    initCustomFeaturedProduct(section);
    initCustomComparison(section);
  });
});

// Theme Editor load
document.addEventListener('shopify:section:load', (event) => {
  initCustomFeaturedProduct(event.target);
  initCustomComparison(event.target);
});
