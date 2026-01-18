// Год в футере
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Modal =====
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalClose = document.getElementById("modalClose");
const modalX = document.getElementById("modalX");
const openModalBtn = document.getElementById("openModalBtn");

function openModal(src, title = "Просмотр фото") {
  modalImg.src = src;
  modalTitle.textContent = title;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}
function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

openModalBtn.addEventListener("click", () => openModal("img/car.jpg", "Главное фото Радриго"));
modalClose.addEventListener("click", closeModal);
modalX.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Галерея: клики по картинкам
document.querySelectorAll(".g-item").forEach((btn) => {
  btn.addEventListener("click", () => {
    const full = btn.getAttribute("data-full");
    const label = btn.querySelector("span")?.textContent?.trim() || "Фото";
    openModal(full, label);
  });
});

// Плавный скролл
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ===== Scroll animations (IntersectionObserver) =====
const items = document.querySelectorAll("[data-animate]");
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

items.forEach((el) => io.observe(el));

// ===== Theme toggle (Light/Dark) =====
const themeBtn = document.getElementById("themeBtn");
const root = document.documentElement;

function setTheme(t) {
  if (t === "dark") root.setAttribute("data-theme", "dark");
  else root.removeAttribute("data-theme");
  localStorage.setItem("theme", t);
}

const saved = localStorage.getItem("theme");
if (saved === "dark") setTheme("dark");
else setTheme("light");

themeBtn.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  setTheme(isDark ? "light" : "dark");
});

// ===== Random quote button =====
const randomQuoteBtn = document.getElementById("randomQuoteBtn");
const randomBox = document.getElementById("randomBox");

// мемные “в стиле” (не официальные)
const quotes = [
  "«Если заблудился в лесу, иди домой.»",
  "«В жизни всегда есть две дороги: одна — первая, а другая — вторая.»",
  "«Из проведённых 64-х боёв у меня 64 победы. Все бои были с тенью.»",
  "«Делай, как надо. Как не надо, не делай.»",
  "«Не будьте эгоистами, в первую очередь думайте о себе!»",
  "«Жалко… жалко у пчёлки в попке.»",
  "«Работа — это не волк. Работа — ворк. А волк — это ходить.»",
  "«Марианскую впадину знаешь? Это я упал.»",
];

function pickRandom() {
  const idx = Math.floor(Math.random() * quotes.length);
  return quotes[idx];
}

randomQuoteBtn.addEventListener("click", () => {
  randomBox.textContent = pickRandom();
});

// чтобы не было пусто при загрузке
randomBox.textContent = pickRandom();
