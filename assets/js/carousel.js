/* ==========================================
   GLOBALFIBER PREMIUM CAROUSEL
========================================== */

window.addEventListener("componentsLoaded", initCarousel);
document.addEventListener("DOMContentLoaded", initCarousel);

function initCarousel() {

  const slider = document.querySelector(".gf-slider");

  // Evitar doble inicialización
  if (!slider || slider.dataset.initialized) return;

  slider.dataset.initialized = "true";

  const slides = document.querySelectorAll(".gf-slide");
  const indicators = document.querySelectorAll(".gf-indicator");

  const nextBtn = document.querySelector(".gf-btn-next");
  const prevBtn = document.querySelector(".gf-btn-prev");

  const lightbox = document.querySelector(".gf-lightbox");
  const lightboxImg = document.querySelector(".gf-lightbox img");
  const lightboxClose = document.querySelector(".gf-lightbox-close");

  let currentIndex = 0;
  let autoSlide;

  /* ==========================================
     UPDATE
  ========================================== */

  function updateCarousel() {

    slider.style.transform =
      `translateX(-${currentIndex * 100}%)`;

    slides.forEach(slide => {
      slide.classList.remove("active");
    });

    indicators.forEach(indicator => {
      indicator.classList.remove("active");
    });

    slides[currentIndex].classList.add("active");

    if (indicators[currentIndex]) {
      indicators[currentIndex].classList.add("active");
    }
  }

  /* ==========================================
     NEXT
  ========================================== */

  function nextSlide() {

    currentIndex++;

    if (currentIndex >= slides.length) {
      currentIndex = 0;
    }

    updateCarousel();
  }

  /* ==========================================
     PREV
  ========================================== */

  function prevSlide() {

    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = slides.length - 1;
    }

    updateCarousel();
  }

  /* ==========================================
     BUTTONS
  ========================================== */

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetAutoSlide();
    });
  }

  /* ==========================================
     INDICATORS
  ========================================== */

  indicators.forEach((indicator, index) => {

    indicator.addEventListener("click", () => {

      currentIndex = index;

      updateCarousel();

      resetAutoSlide();

    });

  });

  /* ==========================================
     AUTOPLAY
  ========================================== */

  function startAutoSlide() {

    autoSlide = setInterval(() => {

      nextSlide();

    }, 2800); // más fluido y moderno

  }

  function resetAutoSlide() {

    clearInterval(autoSlide);

    startAutoSlide();

  }

  /* ==========================================
     PAUSE ON HOVER
  ========================================== */

  slider.addEventListener("mouseenter", () => {
    clearInterval(autoSlide);
  });

  slider.addEventListener("mouseleave", () => {
    startAutoSlide();
  });

  /* ==========================================
     LIGHTBOX
  ========================================== */

  slides.forEach(slide => {

    const img = slide.querySelector("img");

    if (!img) return;

    img.addEventListener("click", () => {

      if (!lightbox || !lightboxImg) return;

      lightbox.classList.add("show");

      lightboxImg.src = img.src;

    });

  });

  if (lightboxClose) {

    lightboxClose.addEventListener("click", () => {

      lightbox.classList.remove("show");

    });

  }

  if (lightbox) {

    lightbox.addEventListener("click", (e) => {

      if (e.target === lightbox) {

        lightbox.classList.remove("show");

      }

    });

  }

  /* ==========================================
     TOUCH SWIPE MOBILE
  ========================================== */

  let startX = 0;

  slider.addEventListener("touchstart", (e) => {

    startX = e.touches[0].clientX;

  });

  slider.addEventListener("touchend", (e) => {

    const endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
      nextSlide();
    }

    if (endX - startX > 50) {
      prevSlide();
    }

  });

  /* ==========================================
     INIT
  ========================================== */

  updateCarousel();

  startAutoSlide();

}