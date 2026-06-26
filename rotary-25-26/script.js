const HTML_ESCAPES = Object.freeze({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
});

const refs = {
  archive: document.getElementById("archive"),
  grid: document.getElementById("eventGrid"),
  filter: document.getElementById("filterChips"),
  resultsNote: document.getElementById("resultsNote"),
  heroStats: document.getElementById("heroStats"),
  heroPhotoFilter: document.getElementById("heroPhotoFilter"),
  detailModal: document.getElementById("detailModal"),
  detailPanel: document.querySelector(".detail-panel"),
  detailClose: document.getElementById("detailClose"),
  detailScroll: document.querySelector(".detail-scroll"),
  detailHero: document.getElementById("detailHero"),
  detailKicker: document.getElementById("detailKicker"),
  detailTitle: document.getElementById("detailTitle"),
  detailSummary: document.getElementById("detailSummary"),
  detailActivities: document.getElementById("detailActivities"),
  detailActivityBlocks: document.getElementById("detailActivityBlocks"),
  detailInfo: document.getElementById("detailInfo"),
  detailTags: document.getElementById("detailTags"),
  detailLinks: document.getElementById("detailLinks"),
  detailGallery: document.getElementById("detailGallery"),
};

const state = {
  activeFilter: "all",
  lastTrigger: null,
  activeEventId: null,
  cardRenderFrame: 0,
};

const hasArchiveView = Boolean(refs.archive && refs.grid && refs.filter && refs.resultsNote);
const hasDetailView = Boolean(
  refs.detailModal &&
    refs.detailPanel &&
    refs.detailClose &&
    refs.detailScroll &&
    refs.detailHero &&
    refs.detailKicker &&
    refs.detailTitle &&
    refs.detailSummary &&
    refs.detailInfo &&
    refs.detailTags &&
    refs.detailLinks &&
    refs.detailGallery,
);

function t(path, params) {
  return window.siteI18n?.t?.(path, params) ?? path;
}

function getArchive() {
  return window.ACTIVITY_ARCHIVE_DATA.getArchiveData(
    window.siteI18n?.getLanguage?.() || window.ACTIVITY_ARCHIVE_DATA.defaultLanguage || "zh-TW",
  );
}

function getEventById(eventId) {
  return getArchive().eventById.get(eventId);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => HTML_ESCAPES[character]);
}

function renderList(items, renderItem) {
  return items.map((item, index) => renderItem(item, index)).join("");
}

function getActiveFilter() {
  const { filterById } = getArchive();
  return filterById.get(state.activeFilter) || filterById.get("all");
}

function getVisibleEvents() {
  return getActiveFilter().apply(getArchive().orderedEvents);
}

function getResultsMessage(count) {
  const filterLabel = getActiveFilter().label;

  if (state.activeFilter === "photo-first") {
    return t("common.archive.results.photoFirst", {
      count,
      label: filterLabel,
    });
  }

  if (state.activeFilter === "all") {
    return t("common.archive.results.all", {
      count,
    });
  }

  return t("common.archive.results.filtered", {
    count,
    label: filterLabel,
  });
}

function getHeroStatItems() {
  const { stats } = getArchive();

  return [
    {
      value: stats.total,
      label: t("common.archive.stats.total"),
    },
    {
      value: `${stats.startLabel} → ${stats.endLabel}`,
      label: t("common.archive.stats.range"),
    },
    {
      value: stats.realPhotoMonths,
      label: t("common.archive.stats.photoMonths"),
    },
  ];
}

function getDetailInfoItems(event) {
  return [
    {
      label: t("common.archive.info.folder"),
      value: event.folder,
    },
    {
      label: t("common.archive.info.date"),
      value: event.dateLabel,
    },
    {
      label: t("common.archive.info.location"),
      value: event.location,
    },
    {
      label: t("common.archive.info.summary"),
      value: event.materialStatus,
    },
  ];
}

function renderVisual(cover, title, options = {}) {
  const { lazy = true } = options;

  if (cover.kind === "image") {
    const className = cover.className ? ` class="${escapeHtml(cover.className)}"` : "";

    return `
      <img
        ${className}
        src="${escapeHtml(cover.src)}"
        alt="${escapeHtml(cover.alt || title)}"
        loading="${lazy ? "lazy" : "eager"}"
        decoding="async"
      />
    `;
  }

  return `
    <div class="generated-cover theme-${escapeHtml(cover.theme)}">
      <span class="plate-month">${escapeHtml(cover.month)}</span>
      <span class="plate-badge">${escapeHtml(cover.badge)}</span>
      <strong class="plate-title">${escapeHtml(cover.title)}</strong>
    </div>
  `;
}

function renderTag(tag) {
  return `<span class="tag">${escapeHtml(tag)}</span>`;
}

function renderStatCard(stat, index) {
  return `
    <article class="stat-card ${index === 1 ? "stat-card--wide" : ""}">
      <strong>${escapeHtml(stat.value)}</strong>
      <span>${escapeHtml(stat.label)}</span>
    </article>
  `;
}

function renderFilterButton(filter) {
  const isActive = filter.id === state.activeFilter;

  return `
    <button
      class="filter-chip ${isActive ? "is-active" : ""}"
      type="button"
      data-filter="${escapeHtml(filter.id)}"
      aria-pressed="${isActive ? "true" : "false"}"
    >
      ${escapeHtml(filter.label)}
    </button>
  `;
}

function renderHeroStats() {
  if (!refs.heroStats) {
    return;
  }

  refs.heroStats.innerHTML = renderList(getHeroStatItems(), renderStatCard);
}

function renderFilters() {
  if (!refs.filter) {
    return;
  }

  const { filters } = getArchive();
  refs.filter.innerHTML = renderList(filters, renderFilterButton);
}

function renderEventCard(event, index = 0) {
  const showCoverOverlay = event.cover.kind === "image";
  const shouldLazyLoad = index > 1;

  return `
    <article
      class="event-card"
      tabindex="0"
      role="button"
      aria-label="${escapeHtml(t("common.archive.card.openAria", { label: event.label, title: event.title }))}"
      data-event-id="${escapeHtml(event.id)}"
      style="--event-accent: ${escapeHtml(event.accent)}; --card-delay: ${index * 70}ms"
    >
      <div class="timeline-rail" aria-hidden="true">
        <span class="timeline-stamp">${escapeHtml(event.label)}</span>
        <span class="timeline-node"></span>
      </div>

      <div class="timeline-shell">
        <div class="card-cover">
          ${renderVisual(event.cover, event.title, { lazy: shouldLazyLoad })}
          ${
            showCoverOverlay
              ? `
                <div class="card-overlay">
                  <span>${escapeHtml(event.folder)}</span>
                  <strong>${escapeHtml(event.location)}</strong>
                </div>
              `
              : ""
          }
        </div>

        <div class="card-body">
          <div class="card-topline">
            <div class="card-meta-pills">
              <span class="card-badge badge-${escapeHtml(event.visualMode)}">
                ${escapeHtml(event.statusLabel)}
              </span>
              <span class="card-chapter">${escapeHtml(event.chapterLabel)}</span>
            </div>
            <span class="card-frames">${escapeHtml(event.frameCountLabel)}</span>
          </div>

          <p class="card-scene">${escapeHtml(event.dateLabel)}</p>
          <h3>${escapeHtml(event.title)}</h3>
          <p class="card-subtitle">${escapeHtml(event.subtitle)}</p>
          <div class="tag-row">${renderList(event.highlights, renderTag)}</div>
            <div class="card-bottom">
              <p class="card-source">${escapeHtml(event.availability)}</p>
              <div class="card-footline">
                <span class="card-folder">${escapeHtml(event.folder)}</span>
                <span class="card-cta">${escapeHtml(t("common.archive.card.cta"))}</span>
              </div>
            </div>
        </div>
      </div>
    </article>
  `;
}

function renderCards() {
  if (!hasArchiveView) {
    return;
  }

  const visibleEvents = getVisibleEvents();
  refs.resultsNote.textContent = getResultsMessage(visibleEvents.length);

  if (state.cardRenderFrame) {
    cancelAnimationFrame(state.cardRenderFrame);
  }

  state.cardRenderFrame = window.requestAnimationFrame(() => {
    refs.grid.innerHTML = renderList(visibleEvents, renderEventCard);
    state.cardRenderFrame = 0;
  });
}

function renderInfoCard(item) {
  return `
    <article class="info-card">
      <span>${escapeHtml(item.label)}</span>
      <p>${escapeHtml(item.value)}</p>
    </article>
  `;
}

function renderDetailInfo(event) {
  if (!refs.detailInfo) {
    return;
  }

  refs.detailInfo.innerHTML = renderList(getDetailInfoItems(event), renderInfoCard);
}

function renderActivityBlock(block) {
  const tags = Array.isArray(block.tags) && block.tags.length ? block.tags : [];
  const visual = block.imageSrc
    ? `
        <figure class="activity-block-visual">
          <img
            src="${escapeHtml(block.imageSrc)}"
            alt="${escapeHtml(block.imageAlt || block.title)}"
            loading="lazy"
            decoding="async"
          />
          ${
            block.imageCaption
              ? `<figcaption>${escapeHtml(block.imageCaption)}</figcaption>`
              : ""
          }
        </figure>
      `
    : "";

  return `
    <article class="activity-block">
      ${visual}
      <p class="activity-block-date">${escapeHtml(block.date)}</p>
      <h3>${escapeHtml(block.title)}</h3>
      <p>${escapeHtml(block.summary)}</p>
      ${tags.length ? `<div class="activity-block-tags">${renderList(tags, renderTag)}</div>` : ""}
    </article>
  `;
}

function renderDetailActivities(event) {
  if (!refs.detailActivities || !refs.detailActivityBlocks) {
    return;
  }

  const activityBlocks = Array.isArray(event.activityBlocks) ? event.activityBlocks : [];

  refs.detailActivities.hidden = activityBlocks.length === 0;
  refs.detailActivityBlocks.innerHTML = activityBlocks.length
    ? renderList(activityBlocks, renderActivityBlock)
    : "";
}

function renderLink(link) {
  return `
      <a
        class="${link.download ? "is-download" : ""}"
        href="${escapeHtml(link.url)}"
        ${link.download ? "download" : 'target="_blank" rel="noreferrer"'}
      >
        ${escapeHtml(link.label)}
      </a>
    `;
}

function renderDetailLinks(links) {
  return links.length ? renderList(links, renderLink) : "";
}

function renderGalleryItem(item) {
  if (item.kind === "image") {
    return `
      <figure class="gallery-item">
        <img
          src="${escapeHtml(item.src)}"
          alt="${escapeHtml(item.alt)}"
          loading="lazy"
          decoding="async"
        />
        <figcaption>${escapeHtml(item.caption)}</figcaption>
      </figure>
    `;
  }

  return `
    <article class="generated-plate">
      <div class="generated-cover theme-${escapeHtml(item.theme)}">
        <span class="plate-month">${escapeHtml(item.month)}</span>
        <span class="plate-badge">${escapeHtml(item.badge)}</span>
        <strong class="plate-title">${escapeHtml(item.title)}</strong>
      </div>
      <div class="plate-caption">${escapeHtml(item.caption)}</div>
    </article>
  `;
}

function setModalOpen(isOpen) {
  if (!hasDetailView) {
    return;
  }

  refs.detailModal.hidden = !isOpen;
  refs.detailModal.setAttribute("aria-hidden", isOpen ? "false" : "true");
  document.body.classList.toggle("modal-open", isOpen);
}

function renderDetailHero(event) {
  return `
    ${renderVisual(event.cover, event.title, { lazy: false })}
    <div class="detail-hero-badge">
      <span>${escapeHtml(event.label)}</span>
      <strong>${escapeHtml(event.chapterLabel)}</strong>
    </div>
  `;
}

function populateDetail(event) {
  if (!hasDetailView) {
    return;
  }

  refs.detailPanel.style.setProperty("--detail-accent", event.accent);
  refs.detailHero.innerHTML = renderDetailHero(event);
  refs.detailKicker.textContent = event.detailKicker;
  refs.detailTitle.textContent = event.title;
  refs.detailSummary.textContent = event.summary;
  renderDetailActivities(event);
  refs.detailTags.innerHTML = renderList(event.highlights, renderTag);
  refs.detailLinks.innerHTML = renderDetailLinks(event.links);
  refs.detailGallery.innerHTML = renderList(event.gallery, renderGalleryItem);
  renderDetailInfo(event);
}

function openDetail(eventId, triggerElement = document.activeElement) {
  if (!hasDetailView) {
    return;
  }

  const event = getEventById(eventId);

  if (!event) {
    return;
  }

  state.activeEventId = event.id;
  state.lastTrigger = triggerElement;
  populateDetail(event);

  if (refs.detailScroll) {
    refs.detailScroll.scrollTop = 0;
  }

  setModalOpen(true);
  refs.detailClose.focus();
}

function getActiveCardElement() {
  if (!refs.grid || !state.activeEventId) {
    return null;
  }

  return refs.grid.querySelector(`[data-event-id="${state.activeEventId}"]`);
}

function closeDetail() {
  if (!hasDetailView || refs.detailModal.hidden) {
    return;
  }

  const focusTarget = state.lastTrigger?.isConnected ? state.lastTrigger : getActiveCardElement();

  setModalOpen(false);
  state.activeEventId = null;
  focusTarget?.focus?.();
}

function setActiveFilter(filterId, options = {}) {
  if (!hasArchiveView) {
    return;
  }

  const filterById = getArchive().filterById;

  if (!filterById.has(filterId)) {
    return;
  }

  if (filterId === state.activeFilter && !options.scrollToArchive) {
    return;
  }

  state.activeFilter = filterId;
  renderFilters();
  renderCards();

  if (options.scrollToArchive) {
    refs.archive?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

function handleFilterClick(event) {
  const button = event.target.closest("[data-filter]");

  if (!button) {
    return;
  }

  setActiveFilter(button.dataset.filter);
}

function getCardFromEvent(event) {
  return event.target.closest("[data-event-id]");
}

function handleCardClick(event) {
  const card = getCardFromEvent(event);

  if (!card) {
    return;
  }

  openDetail(card.dataset.eventId, card);
}

function handleCardKeydown(event) {
  const card = getCardFromEvent(event);

  if (!card || (event.key !== "Enter" && event.key !== " ")) {
    return;
  }

  event.preventDefault();
  openDetail(card.dataset.eventId, card);
}

function handleModalClick(event) {
  if (event.target instanceof HTMLElement && event.target.dataset.closeModal === "true") {
    closeDetail();
  }
}

function handleWindowKeydown(event) {
  if (hasDetailView && !refs.detailModal.hidden && event.key === "Escape") {
    closeDetail();
  }
}

function rerenderLocalizedContent() {
  renderHeroStats();

  if (hasArchiveView) {
    renderFilters();
    renderCards();
  }

  if (hasDetailView && state.activeEventId) {
    const event = getEventById(state.activeEventId);

    if (event) {
      populateDetail(event);
    }
  }
}

function bindEvents() {
  if (hasArchiveView) {
    refs.filter.addEventListener("click", handleFilterClick);
    refs.grid.addEventListener("click", handleCardClick);
    refs.grid.addEventListener("keydown", handleCardKeydown);
  }

  if (hasDetailView) {
    refs.detailModal.addEventListener("click", handleModalClick);
    refs.detailClose.addEventListener("click", closeDetail);
  }

  refs.heroPhotoFilter?.addEventListener("click", () => {
    setActiveFilter("photo-first", { scrollToArchive: true });
  });

  window.addEventListener("keydown", handleWindowKeydown);
  window.siteI18n?.subscribe?.(rerenderLocalizedContent);
}

function init() {
  if (hasDetailView) {
    setModalOpen(false);
  }

  rerenderLocalizedContent();
  bindEvents();
}

init();
