console.log("hello");

document.addEventListener("DOMContentLoaded", function () {
  console.log("loaded");
  document.getElementById("icon").addEventListener("click", function () {
    document.getElementById("icon").classList.toggle("hidden");
    document.getElementById(
      "menu-button"
    ).innerHTML = `<i class="fa-solid fa-bars icon-container z-10"></i>`;
  });
  document.getElementById("menu-button").addEventListener("click", function () {
    let isOpen = document.getElementById("icon").classList.toggle("hidden");

    if (isOpen) {
      this.innerHTML = `<i class="fa-solid fa-bars icon-container z-10"></i>`;
    } else {
      this.innerHTML = `<button type="button" style="z-index: 100 !important;" class="z-10 text-gray-700">
    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>`;
    }
  });
});
