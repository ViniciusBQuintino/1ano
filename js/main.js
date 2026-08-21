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

function createDeckCard(item, index, total) {
  const card = document.createElement("article");
  card.className = "deck__card";
  card.dataset.index = String(index);

  const mediaSrc = getMediaSrc(item) || PLACEHOLDER;
  const depth = total - 1 - index;
  const offsetY = Math.min(depth, 2) * 8;
  const scale = 1 - Math.min(depth, 2) * 0.04;
  const rotate = depth === 0 ? 0 : depth % 2 === 0 ? -3 : 3;

  card.style.transform = `translateY(${offsetY}px) scale(${scale}) rotate(${rotate}deg)`;
  card.style.zIndex = String(100 - depth);

  if (isVideoSrc(mediaSrc)) {
    card.innerHTML = `
      <video src="${mediaSrc}" class="deck__media" muted playsinline preload="metadata" aria-label="${item.caption}"></video>
      <span class="deck__play" aria-hidden="true">▶</span>
      <span class="deck__hint deck__hint--left">←</span>
      <span class="deck__hint deck__hint--right">→</span>
    `;
  } else {
    card.innerHTML = `
      <img
        src="${mediaSrc}"
        alt="${item.caption}"
        class="deck__media"
        draggable="false"
        onerror="this.src='${PLACEHOLDER}'"
      >
      <span class="deck__hint deck__hint--left">←</span>
      <span class="deck__hint deck__hint--right">→</span>
    `;
  }

  return card;
}

function setupGalleryDeck() {
  const stack = document.getElementById("gallery-deck");
  const captionEl = document.getElementById("gallery-caption");
  const counterEl = document.getElementById("gallery-counter");

  let items = [...GALLERY];
  let currentIndex = 0;
  let isAnimating = false;
  let dragStartX = null;
  let dragDeltaX = 0;
  let didDrag = false;

  function updateMeta() {
    const item = items[currentIndex];
    captionEl.classList.add("is-updating");
    setTimeout(() => {
      captionEl.textContent = item ? item.caption : "Todas as fotos ♥";
      captionEl.classList.remove("is-updating");
    }, 150);

    counterEl.textContent = items.length
      ? `${currentIndex + 1} / ${items.length}`
      : "";
  }

  function layoutStack() {
    const cards = [...stack.querySelectorAll(".deck__card:not(.is-leaving-left):not(.is-leaving-right)")];
    cards.forEach((card, i) => {
      const depth = cards.length - 1 - i;
      const offsetY = Math.min(depth, 2) * 8;
      const scale = 1 - Math.min(depth, 2) * 0.04;
      const rotate = depth === 0 ? 0 : depth % 2 === 0 ? -3 : 3;
      card.style.transition = "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)";
      card.style.transform = `translateY(${offsetY}px) scale(${scale}) rotate(${rotate}deg)`;
      card.style.zIndex = String(100 - depth);
      card.classList.toggle("is-top", depth === 0);
    });
  }

  function renderDeck() {
    stack.innerHTML = "";

    if (!items.length) {
      stack.innerHTML = `
        <div class="deck__empty">
          <span>Você folheou todas as fotos ♥</span>
          <button type="button" class="deck__empty-btn" id="deck-reset">Ver de novo</button>
        </div>
      `;
      captionEl.textContent = "";
      counterEl.textContent = "";
      stack.querySelector("#deck-reset")?.addEventListener("click", () => {
        items = [...GALLERY];
        currentIndex = 0;
        renderDeck();
      });
      return;
    }

    const visible = items.slice(currentIndex, currentIndex + 3);
    visible
      .slice()
      .reverse()
      .forEach((item, reverseIndex) => {
        const absoluteIndex = currentIndex + (visible.length - 1 - reverseIndex);
        const card = createDeckCard(item, absoluteIndex, visible.length);
        stack.appendChild(card);
      });

    layoutStack();
    updateMeta();
    bindTopCardGestures();
  }

  function getTopCard() {
    return stack.querySelector(".deck__card.is-top");
  }

  function swipe(direction) {
    if (isAnimating || !items.length) return;

    const card = getTopCard();
    if (!card) return;

    isAnimating = true;
    card.classList.remove("is-dragging-left", "is-dragging-right");
    card.style.transition = "none";
    card.style.transform = "";
    // Força reflow para a animação de queda começar do zero
    void card.offsetWidth;
    card.classList.add(direction === "left" ? "is-leaving-left" : "is-leaving-right");

    setTimeout(() => {
      card.remove();
      currentIndex += 1;

      if (currentIndex >= items.length) {
        items = [];
        currentIndex = 0;
        renderDeck();
      } else {
        const nextUpcoming = items[currentIndex + 2];
        if (nextUpcoming) {
          const under = createDeckCard(nextUpcoming, currentIndex + 2, 3);
          under.style.transform = "translateY(16px) scale(0.92) rotate(3deg)";
          under.style.zIndex = "97";
          stack.insertBefore(under, stack.firstChild);
        }
        layoutStack();
        updateMeta();
        bindTopCardGestures();
      }

      isAnimating = false;
    }, 750);
  }

  function bindTopCardGestures() {
    const card = getTopCard();
    if (!card) return;

    card.onpointerdown = (e) => {
      if (isAnimating) return;
      dragStartX = e.clientX;
      dragDeltaX = 0;
      didDrag = false;
      card.setPointerCapture?.(e.pointerId);
      card.style.transition = "none";
    };

    card.onpointermove = (e) => {
      if (dragStartX === null || isAnimating) return;
      dragDeltaX = e.clientX - dragStartX;
      if (Math.abs(dragDeltaX) > 8) didDrag = true;
      const rotate = dragDeltaX * 0.08;
      card.style.transform = `translateX(${dragDeltaX}px) rotate(${rotate}deg)`;
      card.classList.toggle("is-dragging-left", dragDeltaX < -30);
      card.classList.toggle("is-dragging-right", dragDeltaX > 30);
    };

    card.onpointerup = (e) => {
      if (dragStartX === null) return;
      const threshold = 80;

      if (dragDeltaX <= -threshold) {
        swipe("left");
      } else if (dragDeltaX >= threshold) {
        swipe("right");
      } else if (!didDrag) {
        const mid = card.getBoundingClientRect().left + card.offsetWidth / 2;
        swipe(e.clientX < mid ? "left" : "right");
      } else {
        card.style.transition = "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)";
        card.classList.remove("is-dragging-left", "is-dragging-right");
        layoutStack();
      }

      dragStartX = null;
      dragDeltaX = 0;
      didDrag = false;
    };

    card.onpointercancel = () => {
      dragStartX = null;
      dragDeltaX = 0;
      didDrag = false;
      card.classList.remove("is-dragging-left", "is-dragging-right");
      layoutStack();
    };
  }

  renderDeck();
}

function renderTimeline(openCardModal) {
  const container = document.getElementById("timeline-events");
  TIMELINE.forEach((event, i) => {
    container.appendChild(createTimelineEvent(event, i, openCardModal));
  });
}

function setupScrollAnimations(root = document) {
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

  root
    .querySelectorAll(".timeline__event, .finale__card, .timeline__header, .gallery__header")
    .forEach((el) => {
      if (!el.dataset.observed) {
        el.dataset.observed = "true";
        observer.observe(el);
      }
    });

  return observer;
}

function revealStageHeader(stageId) {
  requestAnimationFrame(() => {
    const stage = document.getElementById(stageId);
    if (!stage) return;

    stage
      .querySelectorAll(".timeline__header, .gallery__header, .finale__card")
      .forEach((el) => el.classList.add("visible"));
  });
}

function goToStage(nextId) {
  const current = document.querySelector(".stage.stage--active:not(.hidden)");
  const next = document.getElementById(nextId);

  if (!next || next === current) return;

  const finish = () => {
    if (current) {
      current.classList.add("hidden");
      current.classList.remove("stage--active", "stage--exit");
      current.setAttribute("aria-hidden", "true");
    }

    next.classList.remove("hidden");
    next.classList.add("stage--active");
    next.setAttribute("aria-hidden", "false");
    document.body.dataset.stage = nextId;
    window.scrollTo({ top: 0, behavior: "instant" });
    revealStageHeader(nextId);
    setupScrollAnimations(next);
  };

  if (!current) {
    finish();
    return;
  }

  current.classList.add("stage--exit");
  setTimeout(finish, 550);
}

function setupBackgroundMusic() {
  const audio = document.getElementById("bg-music");
  const btn = document.getElementById("btn-music");
  const config = typeof BACKGROUND_MUSIC !== "undefined" ? BACKGROUND_MUSIC : null;

  if (!audio || !btn || !config?.src) return { start: () => {} };

  audio.src = config.src;
  audio.loop = config.loop !== false;
  audio.volume = Math.min(1, Math.max(0, config.volume ?? 0.35));
  audio.preload = "auto";

  let started = false;
  let muted = false;

  function updateButton() {
    const playing = started && !audio.paused && !muted;
    btn.classList.toggle("is-muted", muted || audio.paused);
    btn.classList.toggle("is-playing", playing);
    btn.setAttribute("aria-pressed", muted || audio.paused ? "true" : "false");
    btn.setAttribute(
      "aria-label",
      muted || audio.paused ? "Tocar música" : "Pausar música"
    );
  }

  async function start() {
    if (started) return;
    started = true;
    btn.classList.remove("hidden");

    try {
      await audio.play();
    } catch (err) {
      // Se o navegador bloquear, o botão fica disponível para tocar manualmente
      console.warn("Não foi possível iniciar a música automaticamente:", err);
    }

    updateButton();
  }

  btn.addEventListener("click", async () => {
    if (!started) {
      await start();
      return;
    }

    if (audio.paused || muted) {
      muted = false;
      audio.muted = false;
      try {
        await audio.play();
      } catch (err) {
        console.warn("Falha ao retomar a música:", err);
      }
    } else {
      muted = true;
      audio.pause();
    }

    updateButton();
  });

  audio.addEventListener("play", updateButton);
  audio.addEventListener("pause", updateButton);

  return { start };
}

function setupStageNavigation(onFirstAdvance) {
  let firstAdvanceDone = false;

  document.querySelectorAll("[data-next]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!firstAdvanceDone && btn.dataset.next === "timeline") {
        firstAdvanceDone = true;
        onFirstAdvance?.();
      }
      goToStage(btn.dataset.next);
    });
  });
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

function renderFinaleLetter() {
  const letter = typeof FINALE_LETTER !== "undefined" ? FINALE_LETTER : null;
  if (!letter) return;

  const titleEl = document.getElementById("letter-title");
  const greetingEl = document.getElementById("letter-greeting");
  const bodyEl = document.getElementById("letter-body");
  const farewellEl = document.getElementById("letter-farewell");
  const signatureEl = document.getElementById("letter-signature");

  titleEl.textContent = letter.title || "";
  greetingEl.textContent = letter.greeting || "";
  farewellEl.textContent = letter.farewell || "";
  signatureEl.textContent = letter.signature || "";

  bodyEl.innerHTML = "";
  const paragraphs = Array.isArray(letter.body)
    ? letter.body
    : String(letter.body || "")
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);

  paragraphs.forEach((text) => {
    const p = document.createElement("p");
    p.className = "letter__paragraph";
    p.textContent = text;
    bodyEl.appendChild(p);
  });

  titleEl.hidden = !letter.title;
  greetingEl.hidden = !letter.greeting;
  farewellEl.hidden = !letter.farewell;
  signatureEl.hidden = !letter.signature;
  bodyEl.hidden = paragraphs.length === 0;
}

function init() {
  const { openCardModal } = setupCardModal();
  const music = setupBackgroundMusic();

  renderTimeline(openCardModal);
  setupGalleryDeck();
  renderFinaleLetter();

  document.getElementById("footer-date").textContent = new Date().getFullYear();
  document.body.dataset.stage = "landing";

  setupLandingHearts();
  setupStageNavigation(() => music.start());
  setupScrollAnimations(document.getElementById("timeline"));
}

document.addEventListener("DOMContentLoaded", init);
