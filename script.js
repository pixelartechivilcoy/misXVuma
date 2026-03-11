// =======================
// 🎵 MÚSICA
// =======================
const audio = document.getElementById("musica");
const musicBtn = document.getElementById("musicToggle");

let iniciado = false;

// función para iniciar música
function iniciarMusica() {
  if (iniciado) return;

  audio.play().then(() => {
    musicBtn.textContent = "❚❚";
    musicBtn.classList.remove("paused");
    iniciado = true;
  }).catch(() => {
    // si el navegador bloquea, no hacemos nada
  });
}

// ▶ arrancar música si venimos desde el botón INGRESAR
if (sessionStorage.getItem("playMusic") === "true") {
  iniciarMusica();
  sessionStorage.removeItem("playMusic");
}


// 🔥 PRIMERA interacción del usuario (CLAVE)
document.addEventListener("click", iniciarMusica, { once: true });
document.addEventListener("touchstart", iniciarMusica, { once: true });
document.addEventListener("scroll", iniciarMusica, { once: true });

// botón play / pausa
musicBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    musicBtn.textContent = "❚❚";
    musicBtn.classList.remove("paused");
  } else {
    audio.pause();
    musicBtn.textContent = "▶";
    musicBtn.classList.add("paused");
  }
});

// =======================
// 🎥 PARALLAX PORTADA
// =======================
const heroes = document.querySelectorAll(".foto-portada img");

window.addEventListener("scroll", () => {

  const scrollY = window.scrollY;

  heroes.forEach(hero => {
    hero.style.transform = `translateY(${scrollY * 0.3}px)`;
  });

});
const fondoBlur = document.querySelector(".fondo-blur");
const heroText = document.querySelector(".hero-text");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

 if (portadaImg && scrollY <= window.innerHeight * 0.9) {
  portadaImg.style.transform = `translateY(${scrollY * 0.25}px)`;
}

if (fondoBlur && scrollY <= window.innerHeight * 0.9) {
  fondoBlur.style.transform = `scale(1.2) translateY(${scrollY * 0.15}px)`;
}

if (heroText && scrollY <= window.innerHeight * 0.9) {
  heroText.style.transform = `translateX(-50%) translateY(${scrollY * 0.08}px)`;
}
});

// =======================
// ⏳ CUENTA REGRESIVA
// =======================
// ⚠️ CAMBIÁ ESTA FECHA POR LA REAL
const targetDate = new Date("2026-04-11T21:00:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0) return;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

// 🔥 CLAVE: ejecutar inmediatamente
updateCountdown();

// 🔁 y después cada segundo
setInterval(updateCountdown, 1000);


// =======================
// ⏳ CUENTA REGRESIVA AL HACER SCROLL
// =======================
const countdownWrapper = document.querySelector(".countdown-wrapper");

function showCountdownOnScroll() {
  if (!countdownWrapper) return;

  const triggerPoint = window.innerHeight * 0.95;
  const elementTop = countdownWrapper.getBoundingClientRect().top;

  if (elementTop < triggerPoint) {
    countdownWrapper.classList.add("visible");
    window.removeEventListener("scroll", showCountdownOnScroll);
  }
}

window.addEventListener("scroll", showCountdownOnScroll);

const fadeSections = document.querySelectorAll(".fade-section");

// =======================
// 🗺️ MAPA MODAL
// =======================
const mapaModal = document.getElementById("mapaModal");

function abrirMapa() {
  if (mapaModal) {
    mapaModal.classList.add("activo");
  }
}

function cerrarMapa() {
  if (mapaModal) {
    mapaModal.classList.remove("activo");
  }
}

let currentIndex = 0;

function moveSlide(button, direction) {
  const container = button.closest(".carousel-container");

  // Pausar autoplay al interactuar
  if (container._autoplayInterval) {
    clearInterval(container._autoplayInterval);
    container._autoplayInterval = null;
  }

  slideCarousel(container, direction);

  // 🔁 volver a activar autoplay después de 4s sin interacción
  setTimeout(() => {
    if (!container._autoplayInterval) {
      container._autoplayInterval = setInterval(() => {
        slideCarousel(container, 1);
      }, 3500);
    }
  }, 4000);
}


function slideCarousel(container, direction = 1) {
  const track = container.querySelector(".carousel-track");
  const items = container.querySelectorAll(".carousel-item");

  const isHorizontal = container.closest(".carousel-horizontal");
  const visibleItems = isHorizontal ? 1 : (window.innerWidth <= 768 ? 1 : 3);

  let index = container.dataset.index
    ? parseInt(container.dataset.index)
    : 0;

  const maxIndex = items.length - visibleItems;

  index += direction;

  if (index > maxIndex) index = 0;        // loop
  if (index < 0) index = maxIndex;

const style = getComputedStyle(items[0]);
const marginRight = parseFloat(style.marginRight);
const itemWidth = items[0].offsetWidth + marginRight;


  track.style.transform = `translateX(-${index * itemWidth}px)`;
  container.dataset.index = index;
}

function startAutoplay(container) {
  // Evitar duplicados
  if (container.dataset.autoplay) return;

  const interval = setInterval(() => {
    slideCarousel(container, 1);
  }, 3500);

  container.dataset.autoplay = interval;
}


document.querySelectorAll(".carousel-container").forEach(container => {
  container._autoplayInterval = setInterval(() => {
    slideCarousel(container, 1);
  }, 3500);
});



// =======================
// REVEAL ON SCROLL
// =======================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((el) => {
  revealObserver.observe(el);
});

// ===== APARICIÓN DEL CARRUSEL + AUTOPLAY =====
const carousels = document.querySelectorAll('.carousel-container');

const carouselObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('carousel-hidden');
        entry.target.classList.add('carousel-visible');
      }
    });
  },
  { threshold: 0.4 }
);

carousels.forEach(carousel => {
  carouselObserver.observe(carousel);
});

// generar invitados
function generarPersonasUI() {
  const container = document.getElementById("personasContainer");
  const extra = document.getElementById("personasExtra");
  const selectCantidad = document.getElementById("cantidadPersonas");

  if (!container || !extra || !selectCantidad) return;

  const cantidad = parseInt(selectCantidad.value);
  container.innerHTML = "";
  extra.innerHTML = "";

  if (!cantidad) return;

  // Invitado 1 (dentro del cuadro principal)
  container.innerHTML = `
    <div class="campo persona">
      <label class="label">Invitado 1</label>
      <input type="text" placeholder="Nombre">
      <input type="text" placeholder="Apellido">
      <select class="restriccion">
        <option value="">Sin restricción</option>
        <option value="Vegetariana">Vegetariana</option>
        <option value="Vegana">Vegana</option>
        <option value="Sin TACC">Sin TACC</option>
        <option value="Sibo">Sibo</option>
        <option value="Otro">Otro</option>
      </select>
    </div>
  `;

  // Invitados 2+
  for (let i = 2; i <= cantidad; i++) {
    extra.innerHTML += `
      <div class="asistencia-card invitado-extra">
        <div class="campo persona">
          <label class="label">Invitado ${i}</label>
          <input type="text" placeholder="Nombre">
          <input type="text" placeholder="Apellido">
          <select class="restriccion">
            <option value="">Sin restricción</option>
            <option value="Vegetariana">Vegetariana</option>
            <option value="Vegana">Vegana</option>
            <option value="Sin TACC">Sin TACC</option>
            <option value="Sibo">Sibo</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
      </div>
    `;
  }
}


document
  .getElementById("cantidadPersonas")
  ?.addEventListener("change", generarPersonasUI);

// antes de enviar
const form = document.getElementById("asistenciaForm");

const mensajeGracias = document.getElementById("mensajeGracias");

if (form && mensajeGracias) {
  form.addEventListener("submit", function () {
    actualizarInvitadosHidden(); // 🔥 CLAVE

    setTimeout(() => {
      form.style.display = "none";
      mensajeGracias.classList.remove("oculto");
    }, 300);
  });
}


function actualizarInvitadosHidden() {
  const personas = document.querySelectorAll(".persona");
  let texto = "";

  personas.forEach((p, i) => {
    const nombre = p.querySelector('input[placeholder="Nombre"]')?.value || "";
    const apellido = p.querySelector('input[placeholder="Apellido"]')?.value || "";
    const restriccion =
      p.querySelector(".restriccion")?.value || "Sin restricción";

    if (nombre || apellido) {
      texto += `Invitado ${i + 1}: ${nombre} ${apellido} – ${restriccion}\n`;
    }
  });

  const hidden = document.getElementById("datosFinales");
  if (hidden) hidden.value = texto;
}

document.addEventListener("input", (e) => {
  if (e.target.closest("#personasContainer")) {
    actualizarInvitadosHidden();
  }
});

const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador");

if (mensaje && contador) {
  const max = mensaje.maxLength;

  mensaje.addEventListener("input", () => {
    const restantes = max - mensaje.value.length;
    contador.textContent = `${restantes} caracteres restantes`;
  });
}

const cantidadSelect = document.getElementById("cantidadPersonas");
const cantidadHidden = document.getElementById("cantidadHidden");

if (cantidadSelect && cantidadHidden) {
  cantidadSelect.addEventListener("change", () => {
    cantidadHidden.value = cantidadSelect.value;
  });
}

function abrirAlbum(){
document.getElementById("albumOverlay").classList.add("activo")
}

function cerrarAlbum(){
document.getElementById("albumOverlay").classList.remove("activo")
}

function abrirAlias(){
document.getElementById("aliasOverlay").classList.add("activo")
}

function cerrarAlias(){
document.getElementById("aliasOverlay").classList.remove("activo")
}