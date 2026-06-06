document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.doctor-section').forEach(sectionWrapper => {
    // MODAL LOGIC
    const modal = sectionWrapper.querySelector('.modal');
    const closeBtn = sectionWrapper.querySelector('.close');

    sectionWrapper.querySelectorAll('.doctor-card').forEach(card => {
      card.onclick = () => {
        const data = card.querySelector('.modal-data');
        if (!modal || !data) return;

        modal.style.display = 'flex';
        
        // Safety check in case image is missing
        const imgHtml = data.querySelector('img') ? data.querySelector('img').outerHTML : '';
        modal.querySelector('.left').innerHTML = imgHtml;
        
        modal.querySelector('.right').innerHTML = `
          <h3>${data.querySelector('h3').innerText}</h3>
          <p style="font-weight:500; color:#666; margin-bottom: 20px;">${data.querySelector('.role').innerText}</p>
          <p style="line-height:1.6;">${data.querySelector('p:last-child').innerText}</p>
        `;
      }
    });

    if (closeBtn && modal) {
      closeBtn.onclick = () => {
        modal.style.display = 'none';
      };
    }

    // SLIDER LOGIC
    const slider = sectionWrapper.querySelector('.mobile-slider .doctor-wrapper') || sectionWrapper.querySelector('.doctor-wrapper');
    // Find the child progress bar of this section specifically
    const progressBar = sectionWrapper.querySelector('.team-progress-bar-card'); 
    const nextBtn = sectionWrapper.querySelector('.team-next-btn');
    const prevBtn = sectionWrapper.querySelector('.team-prev-btn');

    if(!slider || !progressBar) return;

    const updateProgress = () => {
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      if(maxScroll <= 0){
        progressBar.style.width = '100%';
        return;
      }
      const percent = (slider.scrollLeft / maxScroll) * 100;
      progressBar.style.width = `${percent}%`;
    };

    slider.addEventListener('scroll', updateProgress);

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const card = slider.querySelector('.doctor-card');
        slider.scrollBy({ left: card.offsetWidth + 15, behavior: 'smooth' });
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const card = slider.querySelector('.doctor-card');
        slider.scrollBy({ left: -(card.offsetWidth + 15), behavior: 'smooth' });
      });
    }

    // Small timeout ensures everything is loaded before first calculation
    setTimeout(updateProgress, 100);
  });
});
