const PLACEHOLDER = "assets/images/placeholder-foto.svg";
const VIDEO_EXTENSIONS = /\.(mp4|webm|mov|ogg|m4v)(\?.*)?$/i;

function getMediaSrc(item) {
  return item?.media || item?.photo || item?.src || null;
}

function isVideoSrc(src) {
  return VIDEO_EXTENSIONS.test(src);
}

function createMediaHtml(src, title, { preview = false, className = "" } = {}) {
  if (!src) return "";

  if (isVideoSrc(src)) {
    const previewAttrs = preview
      ? 'muted playsinline preload="metadata"'
      : 'controls playsinline preload="auto"';
    return `<video src="${src}" class="${className}" ${previewAttrs} aria-label="${title}"></video>`;
  }

  return `<img
    src="${src}"
    alt="${title}"
    class="${className}"
    loading="lazy"
    onerror="this.src='${PLACEHOLDER}'"
  >`;
}

function createPreviewWrap(src, title, { wrapClass = "timeline__photo-wrap", mediaClass = "timeline__photo" } = {}) {
  const videoClass = isVideoSrc(src) ? `${wrapClass} ${wrapClass}--video` : wrapClass;
  const badge = isVideoSrc(src) ? '<span class="media-play-badge" aria-hidden="true">▶</span>' : "";

  return `<div class="${videoClass}">
    ${createMediaHtml(src, title, { preview: true, className: mediaClass })}
    ${badge}
  </div>`;
}

function pauseVideos(container) {
  container?.querySelectorAll("video").forEach((video) => {
    video.pause();
  });
}

function clearMediaWrap(wrap) {
  if (!wrap) return;
  pauseVideos(wrap);
  wrap.innerHTML = "";
  wrap.hidden = true;
}

function setMediaWrap(wrap, src, title, { preview = false, className = "" } = {}) {
  if (!src) {
    clearMediaWrap(wrap);
    return;
  }

  wrap.hidden = false;
  wrap.innerHTML = "";

  if (isVideoSrc(src)) {
    const video = document.createElement("video");
    video.src = src;
    video.className = className;
    video.playsInline = true;
    video.setAttribute("aria-label", title);

    if (preview) {
      video.muted = true;
      video.preload = "metadata";
      wrap.classList.add("timeline__photo-wrap--video");

      const badge = document.createElement("span");
      badge.className = "media-play-badge";
      badge.setAttribute("aria-hidden", "true");
      badge.textContent = "▶";

      wrap.appendChild(video);
      wrap.appendChild(badge);
    } else {
      video.controls = true;
      video.preload = "auto";
      wrap.classList.remove("timeline__photo-wrap--video");
      wrap.appendChild(video);
    }

    return;
  }

  wrap.classList.remove("timeline__photo-wrap--video");

  const img = document.createElement("img");
  img.src = src;
  img.alt = title;
  img.className = className;
  img.loading = preview ? "lazy" : "eager";
  img.onerror = () => {
    img.src = PLACEHOLDER;
  };
  wrap.appendChild(img);
}

function createTimelineEvent(event, index, openCardModal) {
  const el = document.createElement("article");
  el.className = `timeline__event timeline__event--${event.side}`;
  el.style.setProperty("--delay", `${index * 0.1}s`);

  const mediaSrc = getMediaSrc(event);
  const mediaHtml = mediaSrc
    ? createPreviewWrap(mediaSrc, event.title)
    : "";

  el.innerHTML = `
    <div class="timeline__dot" aria-hidden="true"></div>
    <div class="timeline__card" tabindex="0" role="button" aria-label="Ver ${event.title}">
      <time class="timeline__date">${event.date}</time>
      <h3 class="timeline__event-title">${event.title}</h3>
      <p class="timeline__text">${event.text}</p>
      ${mediaHtml}
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
  const mediaWrap = modal.querySelector(".modal__media-wrap");

  function openCardModal(event) {
    dateEl.textContent = event.date;
    titleEl.textContent = event.title;
    textEl.textContent = event.text;

    setMediaWrap(mediaWrap, getMediaSrc(event), event.title, {
      preview: false,
      className: "modal__media",
    });

    modal.classList.add("modal--open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    closeBtn.focus();
  }

  function closeCardModal() {
    modal.classList.remove("modal--open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    clearMediaWrap(mediaWrap);
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

  const mediaSrc = getMediaSrc(item);
  const mediaContent = mediaSrc
    ? createPreviewWrap(mediaSrc, item.caption, {
        wrapClass: "gallery__photo-wrap",
        mediaClass: "gallery__photo",
      })
    : `<div class="gallery__photo-wrap">${createMediaHtml(PLACEHOLDER, item.caption, {
        preview: true,
        className: "gallery__photo",
      })}</div>`;

  el.innerHTML = `
    ${mediaContent}
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
