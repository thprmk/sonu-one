document.addEventListener('DOMContentLoaded', function() {
  // Product image thumbnail switcher
  const thumbnails = document.querySelectorAll('.thumbnail-item');
  const mainImage = document.getElementById('ProductMainImage');
  
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', function() {
      const imageUrl = this.getAttribute('data-image');
      if (imageUrl && mainImage) {
        mainImage.src = imageUrl;
      }
      thumbnails.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Quantity selector with number display
  const minusBtn = document.querySelector('.quantity-btn.minus');
  const plusBtn = document.querySelector('.quantity-btn.plus');
  const quantityNumber = document.querySelector('.quantity-number');
  
  if (minusBtn && plusBtn && quantityNumber) {
    let currentQuantity = 1;
    
    minusBtn.addEventListener('click', function() {
      if (currentQuantity > 1) {
        currentQuantity--;
        quantityNumber.textContent = currentQuantity;
      }
    });
    
    plusBtn.addEventListener('click', function() {
      currentQuantity++;
      quantityNumber.textContent = currentQuantity;
    });
  }
  
  // Color swatch selection and variant update
  const colorSwatches = document.querySelectorAll('.color-swatch');
  const priceElement = document.querySelector('.current-price');
  const comparePriceElement = document.querySelector('.compare-price');
  const stockStatusElement = document.querySelector('.stock-status');
  const buyNowBtn = document.querySelector('.buy-now');
  
  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', function() {
      const variantId = this.getAttribute('data-variant-id');
      const variantPrice = this.getAttribute('data-price');
      const variantComparePrice = this.getAttribute('data-compare-price');
      const variantAvailable = this.getAttribute('data-available') === 'true';
      const variantImage = this.getAttribute('data-image');
      
      // Update active state
      colorSwatches.forEach(s => s.classList.remove('active'));
      this.classList.add('active');
      
      // Update price
      if (priceElement && variantPrice) {
        priceElement.textContent = variantPrice;
      }
      
      // Update compare price
      if (comparePriceElement) {
        if (variantComparePrice && variantComparePrice !== '{{ 0 | money }}') {
          comparePriceElement.textContent = variantComparePrice;
          comparePriceElement.style.display = 'inline';
        } else {
          comparePriceElement.style.display = 'none';
        }
      }
      
      // Update stock status
      if (stockStatusElement) {
        if (variantAvailable) {
          stockStatusElement.innerHTML = '<span class="in-stock">âœ“ In stock, ready to ship</span>';
        } else {
          stockStatusElement.innerHTML = '<span class="out-of-stock">âœ— Out of stock</span>';
        }
      }
      
      // Update buy button
      if (buyNowBtn) {
        buyNowBtn.setAttribute('data-variant-id', variantId);
        if (!variantAvailable) {
          buyNowBtn.disabled = true;
        } else {
          buyNowBtn.disabled = false;
        }
      }
      
      // Update main image
      if (variantImage && mainImage) {
        mainImage.src = variantImage;
      }
    });
  });
  
  // Add to cart / Buy Now functionality
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', function() {
      const variantId = this.getAttribute('data-variant-id');
      const quantity = parseInt(document.querySelector('.quantity-number')?.textContent || 1);
      
      if (!variantId) {
        console.error('No variant ID found');
        return;
      }
      
      // Add to cart via Shopify AJAX API
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
      .then(data => {
        window.location.href = '/cart';
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
        window.location.href = '/cart/' + variantId + ':' + quantity;
      });
    });
  }
});
