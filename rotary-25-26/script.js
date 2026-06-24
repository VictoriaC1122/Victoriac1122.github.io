const STATUS_LABELS = Object.freeze({
  photo: "精選照片",
  document: "文件封面",
  placeholder: "待補照片",
});

const MODE_PRIORITY = Object.freeze({
  photo: 0,
  document: 1,
  placeholder: 2,
});

const HTML_ESCAPES = Object.freeze({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
});

function padNumber(value) {
  return String(value).padStart(2, "0");
}

function formatEventLabel(year, month) {
  return `${year}.${padNumber(month)}`;
}

function createImageAsset(src, alt, options = {}) {
  return {
    kind: "image",
    src,
    alt,
    ...options,
  };
}

function createGeneratedAsset({ theme, title, month, badge = STATUS_LABELS.placeholder, caption }) {
  return {
    kind: "generated",
    theme,
    badge,
    title,
    month,
    ...(caption ? { caption } : {}),
  };
}

function createLink(label, url, options = {}) {
  return {
    label,
    url,
    ...options,
  };
}

function createEvent(config) {
  return {
    highlights: [],
    links: [],
    ...config,
  };
}

function createPhotoEvent({ coverSrc, coverAlt, gallery, ...event }) {
  return createEvent({
    ...event,
    visualMode: "photo",
    cover: createImageAsset(coverSrc, coverAlt),
    gallery,
  });
}

function createDocumentEvent({
  coverSrc,
  coverAlt,
  galleryAlt = coverAlt,
  galleryCaption,
  coverClassName = "document-cover",
  ...event
}) {
  return createEvent({
    ...event,
    visualMode: "document",
    cover: createImageAsset(coverSrc, coverAlt, { className: coverClassName }),
    gallery: [createImageAsset(coverSrc, galleryAlt, { caption: galleryCaption })],
  });
}

function createPlaceholderEvent({
  theme,
  badge = STATUS_LABELS.placeholder,
  coverTitle,
  galleryCaption,
  ...event
}) {
  const monthLabel = formatEventLabel(event.year, event.month);
  const title = coverTitle || event.title;

  return createEvent({
    ...event,
    visualMode: "placeholder",
    cover: createGeneratedAsset({
      theme,
      badge,
      title,
      month: monthLabel,
    }),
    gallery: [
      createGeneratedAsset({
        theme,
        badge,
        title,
        month: monthLabel,
        caption: galleryCaption,
      }),
    ],
  });
}

function normalizeEvent(event) {
  const label = formatEventLabel(event.year, event.month);
  const statusLabel = STATUS_LABELS[event.visualMode];

  return {
    ...event,
    label,
    statusLabel,
    chapterLabel: `Chapter ${padNumber(event.order)}`,
    frameCountLabel: `${event.gallery.length} Frames`,
    detailKicker: `${label}｜${statusLabel}`,
    materialStatus: `${statusLabel}｜${event.availability}`,
  };
}

const events = [
  createPhotoEvent({
    id: "2025-06",
    year: 2025,
    month: 6,
    order: 1,
    title: "交接典禮＆九份畢旅",
    subtitle: "年度交接與旅程開場，從典禮感一路延伸到九份記憶。",
    folder: "6月活動＿交接典禮＆九份畢旅",
    location: "交接典禮 / 九份",
    accent: "#b06f4a",
    coverSrc: "assets/photos/june-group.jpg",
    coverAlt: "2025年6月交接典禮大合照",
    summary:
      "2025-26 年度從交接儀式正式展開，現階段優先選用了大合照，先把整體氛圍立起來，也保留後續補進會長人物照的空間。",
    highlights: ["年度交接", "九份畢旅", "大合照優先"],
    availability:
      "目前已整理出交接典禮大合照，另有一張手冊人物素材可作為後續版位替換參考。",
    gallery: [
      createImageAsset("assets/photos/june-group.jpg", "交接典禮大合照", {
        caption: "優先選用的大合照，作為整個年度展示的開場畫面。",
      }),
      createImageAsset("assets/photos/june-president.jpg", "手冊中的人物素材", {
        caption: "資料夾中找到的手冊人物素材，後續若確認為正式會長照可直接替換使用。",
      }),
    ],
    links: [
      createLink("下載交接典禮手冊 PDF", "assets/downloads/handover-manual-2025.pdf", {
        download: true,
      }),
    ],
  }),
  createPlaceholderEvent({
    id: "2025-07",
    year: 2025,
    month: 7,
    order: 2,
    title: "幹部訓練（宜蘭）",
    subtitle: "用一場幹部訓練，把新年度的分工與默契先建立起來。",
    folder: "7月活動＿幹部訓練",
    location: "宜蘭",
    accent: "#766247",
    theme: "mountain",
    summary:
      "這個月份目前資料夾以會務簡報為主，尚未找到適合直接放上網站的活動實拍，因此先保留完整月度版位，之後可直接補上團體訓練照片。",
    highlights: ["幹部訓練", "宜蘭", "年度默契"],
    availability: "目前先使用設計占位視覺，等待更完整的現場照片補入。",
    galleryCaption:
      "資料夾內目前以簡報檔為主，網站先保留月份與故事說明，待補正式活動照。",
  }),
  createPlaceholderEvent({
    id: "2025-08",
    year: 2025,
    month: 8,
    order: 3,
    title: "五區聯合交接暨菁英論壇",
    subtitle: "把個別月份的節奏，拉到更大的區域交流視野。",
    folder: "8月五區聯合交接暨菁英論壇",
    location: "五區聯合活動",
    accent: "#36547a",
    theme: "forum",
    summary:
      "目前資料夾內尚未找到可直接使用的圖像素材，因此先用論壇感的視覺把月份補齊，維持整站時間線完整。",
    highlights: ["五區聯合", "交接", "菁英論壇"],
    availability: "待補現場照片後，可優先放入大合照或論壇台上畫面。",
    galleryCaption: "先保留聯合論壇版位，後續最適合補入區域大合照或講者台上畫面。",
  }),
  createDocumentEvent({
    id: "2025-09",
    year: 2025,
    month: 9,
    order: 4,
    title: "扶輪聲林之王",
    subtitle: "用歌唱比賽例會把氣氛拉滿，是年度裡很有記憶點的一站。",
    folder: "9月活動__扶輪聲林之王",
    location: "歌唱比賽例會",
    accent: "#69337a",
    coverSrc: "assets/covers/sep-cover.png",
    coverAlt: "9月扶輪聲林之王活動封面",
    galleryAlt: "扶輪聲林之王簡報封面",
    summary:
      "目前可直接使用的素材以活動簡報封面為主，已能清楚呈現這場歌唱比賽例會的舞台主題與兩位會長資訊。",
    highlights: ["歌唱比賽", "舞台例會", "活動主視覺"],
    availability: "現階段先用簡報封面補位，後續若有舞台合照可優先替換。",
    galleryCaption: "活動簡報封面已帶出舞台與主題氛圍，適合作為暫時展示畫面。",
  }),
  createDocumentEvent({
    id: "2025-10",
    year: 2025,
    month: 10,
    order: 5,
    title: "游泳例會",
    subtitle: "把運動主題帶進例會節奏，也讓年度活動變得更有身體感。",
    folder: "10月活動_游泳例會",
    location: "運動健康例會",
    accent: "#336987",
    coverSrc: "assets/covers/oct-cover.png",
    coverAlt: "10月游泳例會感謝狀封面",
    galleryAlt: "游泳例會感謝狀",
    summary:
      "目前資料夾以感謝狀與簽到單為主，因此先採用感謝狀畫面作為活動封面，維持月度敘事的連續性。",
    highlights: ["運動健康", "例會", "活動文件"],
    availability: "待補泳池現場照或團體照後，可立即換掉封面文件。",
    galleryCaption: "目前最完整的月度視覺來源，先用來代表游泳例會的活動存在。",
  }),
  createDocumentEvent({
    id: "2025-11-a",
    year: 2025,
    month: 11,
    order: 6,
    title: "紡織例會",
    subtitle: "從職業主題切入，把產業視角帶進這個月份的交流現場。",
    folder: "11月活動_紡織例會",
    location: "職業例會",
    accent: "#9a6d3e",
    coverSrc: "assets/covers/nov-textile-cover.png",
    coverAlt: "11月紡織例會感謝狀封面",
    galleryAlt: "紡織例會感謝狀",
    summary:
      "目前可用素材以感謝狀與簽到資料為主，所以先以活動文件封面保留月份，等待後續補進例會現場合照。",
    highlights: ["紡織", "職業例會", "產業視角"],
    availability: "最適合後續替換的照片會是講者台上照、合照或桌次交流畫面。",
    galleryCaption: "先用現有文件封面補齊月份展示，保留後續改成活動照的版位。",
  }),
  createDocumentEvent({
    id: "2025-11-b",
    year: 2025,
    month: 11,
    order: 7,
    title: "區塊鏈職業例會",
    subtitle: "從新技術與未來產業談起，讓 11 月多了一個很不同的職業切角。",
    folder: "11月活動_區塊鏈職業例會",
    location: "職業例會",
    accent: "#3a547b",
    coverSrc: "assets/covers/nov-blockchain-cover.png",
    coverAlt: "11月區塊鏈職業例會感謝狀封面",
    galleryAlt: "區塊鏈職業例會感謝狀",
    summary:
      "區塊鏈職業例會目前同樣以活動文件為主要來源，因此先保留主題感與月份順序，之後再補上更有現場感的照片。",
    highlights: ["區塊鏈", "職業例會", "未來產業"],
    availability: "可優先補上講者演講照片、台下互動畫面或講後合照。",
    galleryCaption: "目前先由活動文件扛起視覺角色，待補現場活動照片。",
  }),
  createDocumentEvent({
    id: "2025-12",
    year: 2025,
    month: 12,
    order: 8,
    title: "街友送餐",
    subtitle: "把例會延伸到城市關懷，讓歲末有一個很溫柔的收尾。",
    folder: "12月例會_街友送餐",
    location: "街友送餐 / 社會服務",
    accent: "#93604f",
    coverSrc: "assets/covers/dec-cover.png",
    coverAlt: "12月街友送餐文件封面",
    galleryAlt: "街友送餐文件封面",
    summary:
      "12 月活動目前以 H&S 單與簽到文件為主，網站先保留服務主題與月份位置，後續可優先換成送餐現場合照。",
    highlights: ["街友送餐", "社會服務", "歲末關懷"],
    availability: "若補照片，最適合優先放入的是送餐行動照與團隊合照。",
    galleryCaption: "先以現有文件封面代表 12 月社會服務主題。",
  }),
  createPhotoEvent({
    id: "2026-01",
    year: 2026,
    month: 1,
    order: 9,
    title: "頒獎典禮",
    subtitle: "從舞台到觀眾席，讓榮耀感成為新年的第一個活動記憶。",
    folder: "2026年1月頒獎典禮",
    location: "2026.01.17 頒獎典禮",
    accent: "#ab5f4f",
    coverSrc: "assets/photos/jan-awards-1.jpg",
    coverAlt: "2026年1月頒獎典禮代表畫面",
    summary:
      "這個月份已串接你提供的公開 Google Drive 相簿，先挑入三張代表畫面，後續如果想換成大合照也能直接替換。",
    highlights: ["公開相簿串接", "頒獎典禮", "舞台現場"],
    availability: "目前先放入典禮台上與觀眾席畫面，待指定更理想的大合照後可再調整。",
    gallery: [
      createImageAsset("assets/photos/jan-awards-1.jpg", "頒獎典禮舞台畫面", {
        caption: "典禮現場代表畫面，保留舞台與儀式感。",
      }),
      createImageAsset("assets/photos/jan-awards-2.jpg", "頒獎典禮觀眾席畫面", {
        caption: "觀眾席畫面補足活動的現場密度與參與感。",
      }),
      createImageAsset("assets/photos/jan-awards-3.jpg", "頒獎典禮鼓掌畫面", {
        caption: "以鼓掌畫面延續典禮氛圍，後續可換成更完整的團體合照。",
      }),
    ],
    links: [
      createLink(
        "2026.1.17 公開相簿",
        "https://drive.google.com/drive/folders/1Kle3PPCBJu9I4H-XeVltSkrMaHs-E3gs?usp=drive_link",
      ),
    ],
  }),
  createDocumentEvent({
    id: "2026-02",
    year: 2026,
    month: 2,
    order: 10,
    title: "小迎新",
    subtitle: "用更輕鬆的節奏迎接新夥伴，讓社群關係慢慢展開。",
    folder: "2026年2月小迎新",
    location: "迎新活動",
    accent: "#8a5b61",
    coverSrc: "assets/covers/feb-cover.png",
    coverAlt: "2026年2月小迎新文件封面",
    galleryAlt: "小迎新文件封面",
    summary:
      "2 月目前可見資料多為簽到與工作人員文件，因此先用文件封面保留這場迎新活動的位置與節奏。",
    highlights: ["小迎新", "新夥伴", "關係建立"],
    availability: "之後若補活動照片，最適合優先換成新生與幹部互動畫面。",
    galleryCaption: "先保留 2 月迎新版位，等待更完整的現場照片素材。",
  }),
  createPlaceholderEvent({
    id: "2026-03",
    year: 2026,
    month: 3,
    order: 11,
    title: "大迎新",
    subtitle: "把迎新的規模拉大，讓年度社群的擴張感更明顯。",
    folder: "2026年3月大迎新",
    location: "迎新活動",
    accent: "#8b5d70",
    theme: "welcome",
    summary:
      "目前找到的資料偏向司儀稿與行政檔，網站先保留月份敘事與迎新主題，之後可直接替換成大合照或迎新互動畫面。",
    highlights: ["大迎新", "新生加入", "社群擴張"],
    availability: "優先建議補入大合照、新生互動或舞台介紹畫面。",
    galleryCaption: "先用主題占位視覺保留 3 月活動位階，等待正式照片到位。",
  }),
  createPhotoEvent({
    id: "2026-04",
    year: 2026,
    month: 4,
    order: 12,
    title: "淨灘例會",
    subtitle: "把行動帶向海邊，讓這個月份有非常明確的公共參與感。",
    folder: "2026年4月淨灘例會",
    location: "海邊淨灘 / 社會服務",
    accent: "#32707d",
    coverSrc: "assets/photos/april-beach-group-1.jpg",
    coverAlt: "2026年4月淨灘例會大合照",
    summary:
      "4 月這一版已補上真正的大合照，並保留多人淨灘行動與海邊氛圍畫面，讓活動頁既有全體感，也看得到大家實際參與的過程。",
    highlights: ["淨灘例會", "海邊行動", "大合照"],
    availability: "目前已具備兩張全體合照與多張實拍活動照，可直接作為正式展示版本。",
    gallery: [
      createImageAsset("assets/photos/april-beach-group-1.jpg", "淨灘例會全體大合照", {
        caption: "這張全體合照最適合作為 4 月主視覺，能一眼看出整個活動的規模與氣氛。",
      }),
      createImageAsset("assets/photos/april-beach-group-2.jpg", "淨灘例會第二張團體合照", {
        caption: "第二張團體照保留更輕鬆的活動尾聲感，也讓相簿層次更完整。",
      }),
      createImageAsset("assets/photos/april-beach-4.jpg", "多人在海邊淨灘", {
        caption: "多人一起清理海灘的畫面，補足活動不只是合照，也是真正在做事。",
      }),
      createImageAsset("assets/photos/april-beach-5.jpg", "淨灘互動畫面", {
        caption: "用近距離的互動畫面把參與感拉近，讓例會主題更鮮明。",
      }),
      createImageAsset("assets/photos/april-beach-1.jpg", "海邊活動氛圍照", {
        caption: "保留海邊地景與人物氛圍，作為這個月份的收尾畫面。",
      }),
    ],
  }),
  createPhotoEvent({
    id: "2026-05",
    year: 2026,
    month: 5,
    order: 13,
    title: "直播例會",
    subtitle: "把活動從現場拉到數位介面，呈現年度中很不同的形式轉換。",
    folder: "2026年5月直播例會",
    location: "直播形式例會",
    accent: "#256877",
    coverSrc: "assets/photos/may-live-group.jpg",
    coverAlt: "2026年5月直播例會大合照",
    summary:
      "5 月直播例會已補上現場實拍，這一版以全體合照作為主視覺，再搭配主持、講者與台上互動畫面，把活動主題和當天氣氛一起帶進網站。",
    highlights: ["直播例會", "實拍活動照", "主題分享"],
    availability: "目前已具備大合照、主持畫面、台上互動與講者合影，可直接作為正式展示內容。",
    gallery: [
      createImageAsset("assets/photos/may-live-group.jpg", "直播例會全體合照", {
        caption: "這張全體合照最適合當 5 月主圖，能把整個例會的參與感一次帶出來。",
      }),
      createImageAsset("assets/photos/may-live-hosts.jpg", "直播例會主持畫面", {
        caption: "主持畫面很能交代現場節奏，也讓月度頁不只有合照而已。",
      }),
      createImageAsset("assets/photos/may-live-panel.jpg", "直播例會台上互動畫面", {
        caption: "台上互動與分享畫面，補足例會主題的現場感與內容感。",
      }),
      createImageAsset("assets/photos/may-live-speaker.jpg", "直播例會講者合影", {
        caption: "保留主題講座與合影瞬間，讓這個月份更完整地對應『自媒體與直播』主題。",
      }),
    ],
  }),
  createPlaceholderEvent({
    id: "2026-06",
    year: 2026,
    month: 6,
    order: 14,
    title: "交接典禮",
    subtitle: "從開場的交接回到收束的交接，形成年度最完整的前後呼應。",
    folder: "2026年6月交接典禮",
    location: "雙北交接典禮",
    accent: "#875c53",
    theme: "finale",
    summary:
      "目前這個資料夾以程序表、報名表單與音控素材為主，因此先保留年度收尾的典禮位置，讓整條時間線完整閉合。",
    highlights: ["年度收束", "交接典禮", "傳承"],
    availability: "後續最適合補入交接台上合照、兩位會長畫面與全場大合照。",
    galleryCaption: "先保留收尾典禮的視覺位置，等待正式交接照片補進來。",
  }),
].map(normalizeEvent);

const orderedEvents = [...events].sort((a, b) => a.order - b.order);
const eventById = new Map(orderedEvents.map((event) => [event.id, event]));
const years = [...new Set(orderedEvents.map((event) => event.year))];

const filters = [
  {
    id: "all",
    label: "全部活動",
    apply: (items) => items,
  },
  ...years.map((year) => ({
    id: String(year),
    label: String(year),
    apply: (items) => items.filter((item) => item.year === year),
  })),
  {
    id: "photo-first",
    label: "精選照片優先",
    apply: (items) =>
      [...items].sort(
        (a, b) => MODE_PRIORITY[a.visualMode] - MODE_PRIORITY[b.visualMode] || a.order - b.order,
      ),
  },
];

const filterById = new Map(filters.map((filter) => [filter.id, filter]));

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
  detailInfo: document.getElementById("detailInfo"),
  detailTags: document.getElementById("detailTags"),
  detailLinks: document.getElementById("detailLinks"),
  detailGallery: document.getElementById("detailGallery"),
};

const state = {
  activeFilter: "all",
  lastTrigger: null,
};

const stats = {
  total: orderedEvents.length,
  startLabel: orderedEvents[0]?.label || "",
  endLabel: orderedEvents[orderedEvents.length - 1]?.label || "",
  realPhotoMonths: orderedEvents.filter((event) => event.visualMode === "photo").length,
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => HTML_ESCAPES[character]);
}

function renderList(items, renderItem) {
  return items.map(renderItem).join("");
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
  refs.heroStats.innerHTML = renderList(
    [
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
    ],
    renderStatCard,
  );
}

function renderFilters() {
  refs.filter.innerHTML = renderList(filters, renderFilterButton);
}

function renderEventCard(event) {
  return `
    <article
      class="event-card"
      tabindex="0"
      role="button"
      aria-label="查看 ${escapeHtml(event.label)} ${escapeHtml(event.title)} 詳情"
      data-event-id="${escapeHtml(event.id)}"
      style="--event-accent: ${escapeHtml(event.accent)}"
    >
      <div class="card-cover">
        ${renderVisual(event.cover, event.title)}
        <div class="card-chapter">${escapeHtml(event.chapterLabel)}</div>
        <div class="card-overlay">
          <span>${escapeHtml(event.folder)}</span>
          <strong>${escapeHtml(event.location)}</strong>
        </div>
      </div>

      <div class="card-body">
        <div class="card-topline">
          <p class="card-month">${escapeHtml(event.label)}</p>
          <span class="card-badge badge-${escapeHtml(event.visualMode)}">
            ${escapeHtml(event.statusLabel)}
          </span>
        </div>

        <h3>${escapeHtml(event.title)}</h3>
        <p class="card-subtitle">${escapeHtml(event.subtitle)}</p>
        <div class="tag-row">${renderList(event.highlights, renderTag)}</div>
        <div class="card-bottom">
          <p class="card-source">${escapeHtml(event.availability)}</p>
          <div class="card-footline">
            <span class="card-frames">${escapeHtml(event.frameCountLabel)}</span>
            <span class="card-cta">展開本月篇章</span>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderCards() {
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
  refs.detailInfo.innerHTML = renderList(
    [
      {
        label: "Archive Folder",
        value: event.folder,
      },
      {
        label: "Activity Scene",
        value: event.location,
      },
      {
        label: "Material Status",
        value: event.materialStatus,
      },
    ],
    renderInfoCard,
  );
}

function renderDetailLinks(links) {
  if (!links.length) {
    return "";
  }

  return renderList(
    links,
    (link) => `
      <a
        class="${link.download ? "is-download" : ""}"
        href="${escapeHtml(link.url)}"
        ${link.download ? "download" : 'target="_blank" rel="noreferrer"'}
      >
        ${escapeHtml(link.label)}
      </a>
    `,
  );
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
  refs.detailModal.hidden = !isOpen;
  refs.detailModal.setAttribute("aria-hidden", isOpen ? "false" : "true");
  document.body.classList.toggle("modal-open", isOpen);
}

function openDetail(eventId, triggerElement = document.activeElement) {
  const event = eventById.get(eventId);

  if (!event) {
    return;
  }

  state.lastTrigger = triggerElement;

  refs.detailPanel.style.setProperty("--detail-accent", event.accent);
  refs.detailHero.innerHTML = `
    ${renderVisual(event.cover, event.title, { lazy: false })}
    <div class="detail-hero-badge">
      <span>${escapeHtml(event.label)}</span>
      <strong>${escapeHtml(event.chapterLabel)}</strong>
    </div>
  `;
  refs.detailKicker.textContent = event.detailKicker;
  refs.detailTitle.textContent = event.title;
  refs.detailSummary.textContent = event.summary;
  refs.detailTags.innerHTML = renderList(event.highlights, renderTag);
  refs.detailLinks.innerHTML = renderDetailLinks(event.links);
  refs.detailGallery.innerHTML = renderList(event.gallery, renderGalleryItem);

  renderDetailInfo(event);

  if (refs.detailScroll) {
    refs.detailScroll.scrollTop = 0;
  }

  setModalOpen(true);
  refs.detailClose.focus();
}

function closeDetail() {
  if (refs.detailModal.hidden) {
    return;
  }

  setModalOpen(false);
  state.lastTrigger?.focus?.();
}

function setActiveFilter(filterId, options = {}) {
  if (!filterById.has(filterId)) {
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
  refs.filter.addEventListener("click", handleFilterClick);
  refs.grid.addEventListener("click", handleCardClick);
  refs.grid.addEventListener("keydown", handleCardKeydown);
  refs.detailModal.addEventListener("click", handleModalClick);
  refs.detailClose.addEventListener("click", closeDetail);
  refs.heroPhotoFilter?.addEventListener("click", () => {
    setActiveFilter("photo-first", { scrollToArchive: true });
  });
  window.addEventListener("keydown", handleWindowKeydown);
}

function init() {
  setModalOpen(false);
  renderHeroStats();
  renderFilters();
  renderCards();
  bindEvents();
}

init();
