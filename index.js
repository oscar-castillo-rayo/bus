const d = document,
  w = window,
  n = navigator;

w.addEventListener("scroll", (e) => {
  const $fixedTop = d.querySelector(".fixed-top"),
    $navLink = d.querySelectorAll(".nav-link"),
    $navBrand = d.querySelector(".navbar-brand");
  scrollPosition = w.scrollY;

  if (scrollPosition > 0) {
    $fixedTop.classList.add("scroll");
    $navLink.forEach((el) => {
      el.classList.add("nav-scroll");
    });
    $navBrand.classList.add("navBrand-scroll");
  } else {
    $fixedTop.classList.remove("scroll");
    $navLink.forEach((el) => {
      el.classList.remove("nav-scroll");
    });
    $navBrand.classList.remove("navBrand-scroll");
  }
});

const isMenuColapse = function hamburguerMenu(menu, icoMenu) {
  d.addEventListener("click", (e) => {
    const $panel = d.querySelector(".navbar-collapse");

    if (e.target.matches(menu) || e.target.matches(icoMenu)) {
      d.querySelector(menu).classList.toggle("show");
      d.querySelector(icoMenu).classList.toggle("show");
    } else {
      $panel.classList.remove("show");
    }
  });
};

function showOverlay(card) {
  let overlay = card.previousElementSibling;
  overlay.classList.add("service-selected");
}

function hideOverlay(card) {
  let overlay = card.previousElementSibling;
  overlay.classList.remove("service-selected");
}

w.addEventListener("DOMContentLoaded", (e) => {
  isMenuColapse(".navbar-toggler", ".navbar-toggler-icon");
});
