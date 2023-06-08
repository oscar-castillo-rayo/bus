const d = document,
  w = window,
  n = navigator,
  $template = d.getElementById("accordion-template").content,
  $fragment = d.createDocumentFragment(),
  $busesInformation = d.querySelector("#bus-rutes-prices");

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

//Agregar datos de las rutas a los modales
const rutes = async () => {
  try {
    let res = await fetch("./assets/rutes.json"),
      json = await res.json();
    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    json.rutas.forEach((ruta) => {
      let $clone = $template.cloneNode(true);
      let horaFragment = d.createDocumentFragment();
      let tipoHorarioFragment = d.createDocumentFragment();

      $clone.querySelector(".accordion-header").textContent = ruta.nombre;
      const $accordionId = $clone.querySelector(".accordion-header");
      $accordionId.setAttribute("id", ruta.id);
      const $contentId = $clone.querySelector(".accordion-collapse");
      $contentId.setAttribute("id", ruta.id);

      ruta.tipoHorario.forEach((el) => {
        const tipoHorario = d.createElement("h4");
        tipoHorario.textContent = el.nombre;
        tipoHorarioFragment.appendChild(tipoHorario);
        $clone
          .querySelector(".accordion-body")
          .appendChild(tipoHorarioFragment);

        el.horarios.forEach((hora) => {
          hour = d.createElement("p");
          hour.textContent = hora.hora;
          horaFragment.appendChild(hour);
        });
        $clone.querySelector(".accordion-body").appendChild(horaFragment);
      });

      const price = d.createElement("p"),
        note = d.createElement("p");
      price.innerHTML = `<p><b>Precio: </b>¢${ruta.precio}</p>`;

      if (ruta.nota !== undefined) {
        note.innerHTML = `<p><b>${ruta.nota}</b></p>`;
      }
      $clone.querySelector(".accordion-body").appendChild(price);
      $clone.querySelector(".accordion-body").appendChild(note);
      $clone.querySelector(".accordion-body").appendChild(price);
      $fragment.appendChild($clone);
    });
    $busesInformation.appendChild($fragment);
  } catch (err) {
    let messagge = err.statusText || "Ocurrió un error";
    $busesInformation.insertAdjacentHTML(
      "afterend",
      `<p><b>${err.status}: ${messagge}</b></p>`
    );
  }
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
  rutes();
});

d.addEventListener("click", (e) => {
  if (e.target.classList.contains("accordion-header")) {
    const $showRutes = d.querySelectorAll(".accordion-collapse");
    $showRutes.forEach((el) => {
      if (e.target.id === el.id) {
        el.classList.toggle("show");
      } else {
        el.classList.remove("show");
      }
    });
  }

  if (
    e.target.id === "bus-modal" ||
    e.target.classList.contains("btn-close") ||
    e.target.id === "btn-close-rutes"
  ) {
    if (!e.target.classList.contains("show")) {
      const $showRutes = d.querySelectorAll(".accordion-collapse");
      $showRutes.forEach((e) => {
        e.classList.remove("show");
      });
    }
  }
});
