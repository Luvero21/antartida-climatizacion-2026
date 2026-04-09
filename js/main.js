console.log("JS cargado");
// HEADER
const header = document.getElementById("header");
const menu = document.getElementById("menu");
const toggle = document.getElementById("menu-toggle");

if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });
}

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}

// ACCORDION
const headers = document.querySelectorAll(".accordion-header");

headers.forEach(header => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling;

    document.querySelectorAll(".accordion-content").forEach(c => {
      if (c !== content) c.style.maxHeight = null;
    });

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// HERO SLIDER
const heroSlides = document.querySelectorAll(".hero-slide");

if (heroSlides.length > 0) {
  let currentSlide = 0;

  setInterval(() => {
    heroSlides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % heroSlides.length;
    heroSlides[currentSlide].classList.add("active");
  }, 5000);
}

// CAROUSEL SERVICIOS
const Track = document.querySelector(".custom-carousel .carousel-track");
const Slides = document.querySelectorAll(".custom-carousel .carousel-item");
const nextBtn = document.querySelector(".custom-carousel .next");
const prevBtn = document.querySelector(".custom-carousel .prev");

let indexServicios = 0;

function updateCarouselServicios() {
  Track.style.transform = `translateX(-${indexServicios * 100}%)`;
}

if (nextBtn && prevBtn) {
  nextBtn.addEventListener("click", () => {
    indexServicios = (indexServicios + 1) % Slides.length;
    updateCarouselServicios();
  });

  prevBtn.addEventListener("click", () => {
    indexServicios = (indexServicios - 1 + Slides.length) % Slides.length;
    updateCarouselServicios();
  });
}

// AOS
if (typeof AOS !== "undefined") {
  AOS.init();
}

// ==========================
// CAROUSEL TESTIMONIOS
// ==========================
window.addEventListener("load", () => {

  const section = document.querySelector(".sectionDos");

  const trackTest = section.querySelector(".carousel-track");
  const cardsTest = section.querySelectorAll(".testimonio-card");
  const nextTest = section.querySelector(".next-test");
  const prevTest = section.querySelector(".prev-test");

  if (!trackTest || cardsTest.length === 0 || !nextTest || !prevTest) {
    console.log("❌ Testimonios no encontrados");
    return;
  }

  let indexTest = 0;
  const gap = 25;
  let auto;

  function getCardWidth() {
    return cardsTest[0].offsetWidth + gap;
  }

  function updateTestimonios() {
    trackTest.style.transform = `translateX(-${indexTest * getCardWidth()}px)`;
  }

  // 👉 botones
  nextTest.addEventListener("click", () => {
    indexTest = (indexTest + 1) % cardsTest.length;
    updateTestimonios();
  });

  prevTest.addEventListener("click", () => {
    indexTest = (indexTest - 1 + cardsTest.length) % cardsTest.length;
    updateTestimonios();
  });

  // 👉 autoplay
  function startAuto() {
    auto = setInterval(() => {
      indexTest = (indexTest + 1) % cardsTest.length;
      updateTestimonios();
    }, 3000);
  }

  function stopAuto() {
    clearInterval(auto);
  }

  startAuto();

  // 👉 pausa al hover (UX PRO)
  trackTest.addEventListener("mouseenter", stopAuto);
  trackTest.addEventListener("mouseleave", startAuto);

});