// ===== Partículas mágicas =====
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 3,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
  });
}
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffffff";
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ===== Menú hamburguesa =====
const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// ===== Música =====
const bgMusic = document.getElementById("bg-music");
const playPauseBtn = document.getElementById("play-pause");
playPauseBtn.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play();
    playPauseBtn.textContent = "⏸ Pausar Música";
  } else {
    bgMusic.pause();
    playPauseBtn.textContent = "▶ Reproducir Música";
  }
});
// ===== Scroll suave y cerrar menú =====
const menuLinks = document.querySelectorAll("#menu a");

menuLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Evita el salto inmediato

    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }

    // Cerrar menú hamburguesa después de click
    menu.classList.remove("active");
  });
});

// ===== Countdown =====
const countdown = document.getElementById("countdown");
const targetDate = new Date("2026-10-18T17:00:00"); // Ajusta la fecha
function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;
  if (diff <= 0) {
    countdown.textContent = "¡Es hoy!";
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  countdown.innerHTML = `
  <div class="time-box">
    <span class="time-number">${days}</span>
    <span class="time-label">Días</span>
  </div>
  <div class="separator">:</div>
  <div class="time-box">
    <span class="time-number">${hours}</span>
    <span class="time-label">Horas</span>
  </div>
  <div class="separator">:</div>
  <div class="time-box">
    <span class="time-number">${minutes}</span>
    <span class="time-label">Minutos</span>
  </div>
`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ===== Animar secciones al aparecer =====
const faders = document.querySelectorAll(".fade-in");
const appearOptions = { threshold: 0.2 };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);
faders.forEach((fader) => {
  fader.style.animationPlayState = "paused";
  appearOnScroll.observe(fader);
});
function checkOrientation() {
  const blocker = document.querySelector(".landscape-blocker");
  if (window.innerWidth > window.innerHeight) {
    blocker.style.display = "flex"; // mostrar overlay
  } else {
    blocker.style.display = "none"; // ocultar
  }
}
window.addEventListener("resize", checkOrientation);
window.addEventListener("load", checkOrientation);
const rsvpBtn = document.getElementById("rsvp-button");
//bloqueo de click derecho
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});
//prevenir atajos de teclado
document.addEventListener("keydown", function (e) {
  if (
    (e.ctrlKey || e.metaKey) &&
    ["s", "u", "p"].includes(e.key.toLowerCase())
  ) {
    e.preventDefault();
  }
});

// número y mensaje editables
const phoneNumber = "56966411859";
const message = "Hola Sofia! Confirmo mi asistencia a tus XV 🎉";

rsvpBtn.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
  message
)}`;
