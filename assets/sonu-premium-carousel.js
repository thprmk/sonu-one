document.addEventListener("scroll", function () {
  const parallaxItems = document.querySelectorAll(".premium-carousel .carousel-card-bg.parallax img");
  parallaxItems.forEach((img) => {
    const rect = img.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top < windowHeight && rect.bottom > 0) {
      let offset = (rect.top - windowHeight / 2) * 0.1;
      offset = Math.max(Math.min(offset, 30), -30);
      img.style.transform = `translateY(${offset}px)`;
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const carousels = document.querySelectorAll(".premium-carousel");
  carousels.forEach(sectionWrapper => {
    const wrapper  = sectionWrapper.querySelector(".carousel-wrapper");
    const progress = sectionWrapper.querySelector(".progress-bar-card");
    const nextBtn  = sectionWrapper.querySelector(".carousel-next");
    const prevBtn  = sectionWrapper.querySelector(".carousel-prev");
    const card     = sectionWrapper.querySelector(".carousel-card");

    if(!wrapper || !progress || !card) return;

    function updateProgress() {
      const scrollWidth = wrapper.scrollWidth - wrapper.clientWidth;

      if (prevBtn) {
        if (wrapper.scrollLeft <= 5) {
          prevBtn.style.opacity = '0.35';
          prevBtn.style.pointerEvents = 'none';
        } else {
          prevBtn.style.opacity = '1';
          prevBtn.style.pointerEvents = 'auto';
        }
      }

      if (nextBtn) {
        if (scrollWidth <= 0 || wrapper.scrollLeft >= scrollWidth - 5) {
          nextBtn.style.opacity = '0.35';
          nextBtn.style.pointerEvents = 'none';
        } else {
          nextBtn.style.opacity = '1';
          nextBtn.style.pointerEvents = 'auto';
        }
      }

      const scrollPercent = scrollWidth > 0 ? (wrapper.scrollLeft / scrollWidth) : 0;
      const minWidth = 15; // Minimum 15% width at scroll 0
      const percent = minWidth + (scrollPercent * (100 - minWidth));
      progress.style.width = percent + "%";
    }

    wrapper.addEventListener("scroll", updateProgress);

    if(nextBtn){
      nextBtn.addEventListener("click", function () {
        wrapper.scrollBy({ left: card.offsetWidth + 20, behavior: "smooth" });
      });
    }

    if(prevBtn){
      prevBtn.addEventListener("click", function () {
        wrapper.scrollBy({ left: -(card.offsetWidth + 20), behavior: "smooth" });
      });
    }

    updateProgress();
  });
});
