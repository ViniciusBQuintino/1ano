const PLACEHOLDER = "assets/images/placeholder-foto.svg";

function createTimelineEvent(event, index, openCardModal) {
  const el = document.createElement("article");
  el.className = `timeline__event timeline__event--${event.side}`;
  el.style.setProperty("--delay", `${index * 0.1}s`);

  const photoHtml = event.photo
    ? `<div class="timeline__photo-wrap">
        <img
          src="${event.photo}"
          alt="${event.title}"
          class="timeline__photo"
          loading="lazy"
          onerror="this.src='${PLACEHOLDER}'"
        >
      </div>`
    : "";

  el.innerHTML = `
    <div class="timeline__dot" aria-hidden="true"></div>
    <div class="timeline__card" tabindex="0" role="button" aria-label="Ver ${event.title}">
      <time class="timeline__date">${event.date}</time>
      <h3 class="timeline__event-title">${event.title}</h3>
      <p class="timeline__text">${event.text}</p>
      ${photoHtml}
    </div>
  `;

  const card = el.querySelector(".timeline__card");
  card.addEventListener("click", () => openCardModal(event));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openCardModal(event);
    }
  });

  return el;
}

function setupCardModal() {
  const modal = document.getElementById("card-modal");
  const backdrop = modal.querySelector(".modal__backdrop");
  const closeBtn = modal.querySelector(".modal__close");
  const dateEl = modal.querySelector(".modal__date");
  const titleEl = modal.querySelector(".modal__title");
  const textEl = modal.querySelector(".modal__text");
  const photoWrap = modal.querySelector(".modal__photo-wrap");
  const photoEl = modal.querySelector(".modal__photo");

  function openCardModal(event) {
    dateEl.textContent = event.date;
    titleEl.textContent = event.title;
    textEl.textContent = event.text;

    if (event.photo) {
      photoWrap.hidden = false;
      photoEl.hidden = false;
      photoEl.src = event.photo;
      photoEl.alt = event.title;
      photoEl.onerror = () => {
        photoEl.src = PLACEHOLDER;
      };
    } else {
      photoEl.onerror = null;
      photoEl.removeAttribute("src");
      photoEl.alt = "";
      photoEl.hidden = true;
      photoWrap.hidden = true;
    }

    modal.classList.add("modal--open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    closeBtn.focus();
  }

  function closeCardModal() {
    modal.classList.remove("modal--open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    photoEl.onerror = null;
    photoEl.removeAttribute("src");
    photoEl.alt = "";
    photoEl.hidden = true;
    photoWrap.hidden = true;
  }

  backdrop.addEventListener("click", closeCardModal);
  closeBtn.addEventListener("click", closeCardModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("modal--open")) {
      closeCardModal();
    }
  });

  return { openCardModal, closeCardModal };
}

function createGalleryItem(item, index) {
  const el = document.createElement("figure");
  el.className = "gallery__item";
  el.style.setProperty("--delay", `${index * 0.08}s`);

  el.innerHTML = `
    <div class="gallery__photo-wrap">
      <img
        src="${item.src}"
        alt="${item.caption}"
        class="gallery__photo"
        loading="lazy"
        onerror="this.src='${PLACEHOLDER}'"
      >
    </div>
    <figcaption class="gallery__caption">${item.caption}</figcaption>
  `;

  return el;
}

function renderTimeline(openCardModal) {
  const container = document.getElementById("timeline-events");
  TIMELINE.forEach((event, i) => {
    container.appendChild(createTimelineEvent(event, i, openCardModal));
  });
}

function renderGallery() {
  const container = document.getElementById("gallery-grid");
  GALLERY.forEach((item, i) => {
    container.appendChild(createGalleryItem(item, i));
  });
}

function setupScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  document
    .querySelectorAll(".timeline__event, .gallery__item, .finale__card, .timeline__header")
    .forEach((el) => observer.observe(el));
}

function setupLandingHearts() {
  const container = document.querySelector(".landing__hearts");
  for (let i = 0; i < 12; i++) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = "♥";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDelay = `${Math.random() * 8}s`;
    heart.style.animationDuration = `${6 + Math.random() * 6}s`;
    heart.style.fontSize = `${0.6 + Math.random() * 1.2}rem`;
    heart.style.opacity = 0.15 + Math.random() * 0.25;
    container.appendChild(heart);
  }
}

function startExperience() {
  const landing = document.getElementById("landing");
  const timeline = document.getElementById("timeline");

  landing.classList.add("landing--exit");

  setTimeout(() => {
    landing.classList.add("hidden");
    timeline.classList.remove("hidden");
    document.body.classList.add("timeline-active");
    window.scrollTo({ top: 0, behavior: "instant" });

    requestAnimationFrame(() => {
      document.querySelector(".timeline__header")?.classList.add("visible");
    });
  }, 800);
}

function init() {
  const { openCardModal } = setupCardModal();

  renderTimeline(openCardModal);
  renderGallery();

  document.getElementById("finale-text").textContent = FINALE_MESSAGE.trim();
  document.getElementById("footer-date").textContent = new Date().getFullYear();

  setupLandingHearts();
  setupScrollAnimations();

  document.getElementById("btn-comecar").addEventListener("click", startExperience);
}

document.addEventListener("DOMContentLoaded", init);
