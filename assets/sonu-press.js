document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".press-feature").forEach(section => {
    const slider = section.querySelector(".mobile-press-slider");
    if (!slider || window.innerWidth > 768) return;

    const current = section.querySelector("[id^='mobilePressCurrent-']");
    const dots = section.querySelectorAll(".mobile-press-dots .dot");

    function updateMobilePressSlider() {
      const cards = slider.querySelectorAll(".press-item");
      if (!cards.length) return;

      const cardWidth = cards[0].offsetWidth + 18;
      let index = Math.round(slider.scrollLeft / cardWidth);
      index = Math.max(0, Math.min(index, cards.length - 1));

      if (current) current.textContent = index + 1;
      dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    }

    slider.addEventListener("scroll", updateMobilePressSlider);
  });
});

/* PARALLAX */
document.addEventListener("scroll", function () {
  const items = document.querySelectorAll(".press-feature .parallax img");
  items.forEach((img) => {
    const rect = img.getBoundingClientRect();
    const offset = (rect.top - window.innerHeight / 2) * 0.1;
    const limited = Math.max(Math.min(offset, 30), -30);
    img.style.transform = `translateY(${limited}px)`;
  });
});

/* ADVISOR SLIDER */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".press-feature").forEach(section => {
    const slider = section.querySelector("[id^='advisorSlider-']");
    const next = section.querySelector("[id^='advisorNext-']");
    const prev = section.querySelector("[id^='advisorPrev-']");
    const progress = section.querySelector("[id^='advisorProgress-']");

    if (!slider) return;

    const cards = slider.querySelectorAll(".advisor-card");
    let currentIndex = 0;

    function visibleCards() { return window.innerWidth < 768 ? 1 : 4; }
    function maxIndex() { return Math.max(cards.length - visibleCards(), 0); }

    function updateSlider(smooth = true) {
      if (!cards.length) return;
      const cardWidth = cards[0].offsetWidth + 24;

      slider.style.transition = smooth ? "transform .45s ease" : "none";
      slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

      const total = maxIndex();
      let progressPercent = 0;
      if (total > 0) {
        progressPercent = ((currentIndex + 1) / (total + 1)) * 100;
      } else {
        progressPercent = 100;
      }
      if (progress) progress.style.width = `${progressPercent}%`;
    }

    if (next) {
      next.addEventListener("click", () => {
        if (currentIndex < maxIndex()) { currentIndex++; updateSlider(); }
      });
    }

    if (prev) {
      prev.addEventListener("click", () => {
        if (currentIndex > 0) { currentIndex--; updateSlider(); }
      });
    }

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    slider.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
    });

    slider.addEventListener("touchend", () => {
      if (!isDragging) return;
      const diff = startX - currentX;
      if (diff > 50 && currentIndex < maxIndex()) { currentIndex++; updateSlider(); }
      if (diff < -50 && currentIndex > 0) { currentIndex--; updateSlider(); }
      isDragging = false;
    });

    window.addEventListener("resize", () => updateSlider(false));
    updateSlider(false);
  });
});
