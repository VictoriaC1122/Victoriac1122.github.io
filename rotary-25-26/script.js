const HTML_ESCAPES = Object.freeze({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
});

const { orderedEvents, eventById, filters, filterById, stats } = window.ACTIVITY_ARCHIVE_DATA;

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

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => HTML_ESCAPES[character]);
}

function renderList(items, renderItem) {
  return items.map((item, index) => renderItem(item, index)).join("");
}

function getActiveFilter() {
  return filterById.get(state.activeFilter) || filterById.get("all");
}

function getVisibleEvents() {
  return getActiveFilter().apply(orderedEvents);
}

function getResultsMessage(count) {
  const filterLabel = getActiveFilter().label;

  return state.activeFilter === "photo-first"
    ? `目前以「${filterLabel}」排序，共 ${count} 個活動。`
    : `目前顯示「${filterLabel}」的 ${count} 個活動。`;
}

function getHeroStatItems() {
  return [
    {
      value: stats.total,
      label: "月度活動",
    },
    {
      value: `${stats.startLabel} → ${stats.endLabel}`,
      label: "展示範圍",
    },
    {
      value: stats.realPhotoMonths,
      label: "已接入實拍月份",
    },
  ];
}

function getDetailInfoItems(event) {
  return [
    {
      label: "Archive Folder",
      value: event.folder,
    },
    {
      label: "Activity Date",
      value: event.dateLabel,
    },
    {
      label: "Activity Scene",
      value: event.location,
    },
    {
      label: "活動簡介",
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
      aria-label="查看 ${escapeHtml(event.label)} ${escapeHtml(event.title)} 詳情"
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
              <span class="card-cta">展開本月篇章</span>
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
  refs.grid.innerHTML = renderList(visibleEvents, renderEventCard);
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
  if (!links.length) {
    return "";
  }

  return renderList(links, renderLink);
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

  const event = eventById.get(eventId);

  if (!event) {
    return;
  }

  state.lastTrigger = triggerElement;
  populateDetail(event);

  if (refs.detailScroll) {
    refs.detailScroll.scrollTop = 0;
  }

  setModalOpen(true);
  refs.detailClose.focus();
}

function closeDetail() {
  if (!hasDetailView || refs.detailModal.hidden) {
    return;
  }

  setModalOpen(false);
  state.lastTrigger?.focus?.();
}

function setActiveFilter(filterId, options = {}) {
  if (!hasArchiveView || !filterById.has(filterId)) {
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

function handleCardClick(event) {
  const card = event.target.closest("[data-event-id]");

  if (!card) {
    return;
  }

  openDetail(card.dataset.eventId, card);
}

function handleCardKeydown(event) {
  const card = event.target.closest("[data-event-id]");

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
  if (!refs.detailModal.hidden && event.key === "Escape") {
    closeDetail();
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
}

function init() {
  if (hasDetailView) {
    setModalOpen(false);
  }

  renderHeroStats();
  if (hasArchiveView) {
    renderFilters();
    renderCards();
  }

  bindEvents();
}

init();
