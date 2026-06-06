(function() {
  function initSwipers() {
    // ========= DESKTOP: Sync Reviews Swiper and Video Swiper =========
    const reviewsSwiperDesktop = document.getElementById('v2-reviewsSwiperDesktop');
    const videoSwiperDesktop = document.getElementById('v2-videoSwiperDesktop');
    
    let desktopReviewsSwiper = null;
    let desktopVideoSwiper = null;
    
    if (reviewsSwiperDesktop && videoSwiperDesktop) {
      desktopReviewsSwiper = new Swiper(reviewsSwiperDesktop, {
        loop: true,
        slidesPerView: 1,
        pagination: {
          el: '.v2-reviews-pagination',
          clickable: true,
        },
        on: {
          slideChange: function() {
            if (desktopVideoSwiper && desktopVideoSwiper.activeIndex !== this.activeIndex) {
              desktopVideoSwiper.slideToLoop(this.activeIndex);
            }
          }
        }
      });
      
      desktopVideoSwiper = new Swiper(videoSwiperDesktop, {
        loop: true,
        slidesPerView: 1,
        navigation: {
          nextEl: '.v2-desktop-video-next',
          prevEl: '.v2-desktop-video-prev',
        },
        on: {
          slideChange: function() {
            if (desktopReviewsSwiper && desktopReviewsSwiper.activeIndex !== this.activeIndex) {
              desktopReviewsSwiper.slideToLoop(this.activeIndex);
            }
          }
        }
      });
    }
    
    const mobileVideoSwiperEl = document.getElementById('v2-mobileVideoSwiper');

    if (mobileVideoSwiperEl) {
      const mobileVideoSwiper = new Swiper(
        mobileVideoSwiperEl,
        {
          loop:true,
          slidesPerView:1,
          allowTouchMove:true
        }
      );

      const prevBtn = mobileVideoSwiperEl.querySelector('.v2-mobile-video-prev');
      const nextBtn = mobileVideoSwiperEl.querySelector('.v2-mobile-video-next');

      if(prevBtn){
        prevBtn.addEventListener('click', function(e){
          e.preventDefault();
          mobileVideoSwiper.slidePrev();
        });
      }

      if(nextBtn){
        nextBtn.addEventListener('click', function(e){
          e.preventDefault();
          mobileVideoSwiper.slideNext();
        });
      }
    }

    // ========= MOBILE: Review Slider =========
    const mobileReviewsSwiperEl = document.getElementById('v2-mobileReviewsSwiper');
    const mobileReviewsPrev = document.querySelector('.v2-mobile-reviews-prev');
    const mobileReviewsNext = document.querySelector('.v2-mobile-reviews-next');
    
    if (mobileReviewsSwiperEl) {
      const mobileReviewsSwiper = new Swiper(mobileReviewsSwiperEl, {
        loop: true,
        slidesPerView: 1,
        allowTouchMove: true,
      });
      
      if (mobileReviewsPrev) {
        mobileReviewsPrev.addEventListener('click', function(e) {
          e.preventDefault();
          mobileReviewsSwiper.slidePrev();
        });
      }
      
      if (mobileReviewsNext) {
        mobileReviewsNext.addEventListener('click', function(e) {
          e.preventDefault();
          mobileReviewsSwiper.slideNext();
        });
      }
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSwipers);
  } else {
    initSwipers();
  }
  
  setTimeout(function() {
    const allVideos = document.querySelectorAll('.v2-testimonial-video-section video');
    allVideos.forEach(function(video) {
      video.setAttribute('playsinline', 'true');
      video.muted = true;
      video.play().catch(function(e) {
        console.log('Video autoplay prevented:', e);
      });
    });
  }, 100);
})();
