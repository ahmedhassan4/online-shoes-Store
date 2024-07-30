var direction = window.innerWidth <= 768 ? "horizontal" : "vertical";

var swiper = new Swiper(".swiper-container", {
  direction: direction,
  slidesPerView: 1,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  speed: 1500,
  mousewheel: false,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
});
