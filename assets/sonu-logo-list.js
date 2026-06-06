document.addEventListener("DOMContentLoaded", function () {

  const isMobile = window.innerWidth <= 768;

  document.querySelectorAll('[id^="logoTrack-"]').forEach(track => {

    let items = track.children;
    let count = items.length;

    // MOBILE → always slider
    if (isMobile || count > 5) {

      track.classList.add("slider");

      // duplicate once only
      if (!track.classList.contains("duplicated")) {

        track.innerHTML += track.innerHTML;

        track.classList.add("duplicated");

      }

    }

  });

});
