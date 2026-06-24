const events = [
  {
    id: "2025-06",
    year: 2025,
    month: 6,
    order: 1,
    label: "2025.06",
    title: "交接典禮＆九份畢旅",
    subtitle: "年度交接與旅程開場，從典禮感一路延伸到九份記憶。",
    folder: "6月活動＿交接典禮＆九份畢旅",
    location: "交接典禮 / 九份",
    sourceType: "精選照片",
    visualMode: "photo",
    accent: "#b06f4a",
    cover: {
      kind: "image",
      src: "assets/photos/june-group.jpg",
      alt: "2025年6月交接典禮大合照",
    },
    summary:
      "2025-26 年度從交接儀式正式展開，現階段優先選用了大合照，先把整體氛圍立起來，也保留後續補進會長人物照的空間。",
    highlights: ["年度交接", "九份畢旅", "大合照優先"],
    availability:
      "目前已整理出交接典禮大合照，另有一張手冊人物素材可作為後續版位替換參考。",
    gallery: [
      {
        kind: "image",
        src: "assets/photos/june-group.jpg",
        alt: "交接典禮大合照",
        caption: "優先選用的大合照，作為整個年度展示的開場畫面。",
      },
      {
        kind: "image",
        src: "assets/photos/june-president.jpg",
        alt: "手冊中的人物素材",
        caption: "資料夾中找到的手冊人物素材，後續若確認為正式會長照可直接替換使用。",
      },
    ],
    links: [
      {
        label: "下載交接典禮手冊 PDF",
        url: "assets/downloads/handover-manual-2025.pdf",
        download: true,
      },
    ],
  },
  {
    id: "2025-07",
    year: 2025,
    month: 7,
    order: 2,
    label: "2025.07",
    title: "幹部訓練（宜蘭）",
    subtitle: "用一場幹部訓練，把新年度的分工與默契先建立起來。",
    folder: "7月活動＿幹部訓練",
    location: "宜蘭",
    sourceType: "待補照片",
    visualMode: "placeholder",
    accent: "#766247",
    cover: {
      kind: "generated",
      theme: "mountain",
      badge: "待補活動照",
      title: "幹部訓練（宜蘭）",
      month: "2025.07",
    },
    summary:
      "這個月份目前資料夾以會務簡報為主，尚未找到適合直接放上網站的活動實拍，因此先保留完整月度版位，之後可直接補上團體訓練照片。",
    highlights: ["幹部訓練", "宜蘭", "年度默契"],
    availability: "目前先使用設計占位視覺，等待更完整的現場照片補入。",
    gallery: [
      {
        kind: "generated",
        theme: "mountain",
        badge: "待補活動照",
        title: "幹部訓練（宜蘭）",
        month: "2025.07",
        caption: "資料夾內目前以簡報檔為主，網站先保留月份與故事說明，待補正式活動照。",
      },
    ],
    links: [],
  },
  {
    id: "2025-08",
    year: 2025,
    month: 8,
    order: 3,
    label: "2025.08",
    title: "五區聯合交接暨菁英論壇",
    subtitle: "把個別月份的節奏，拉到更大的區域交流視野。",
    folder: "8月五區聯合交接暨菁英論壇",
    location: "五區聯合活動",
    sourceType: "待補照片",
    visualMode: "placeholder",
    accent: "#36547a",
    cover: {
      kind: "generated",
      theme: "forum",
      badge: "待補活動照",
      title: "五區聯合交接暨菁英論壇",
      month: "2025.08",
    },
    summary:
      "目前資料夾內尚未找到可直接使用的圖像素材，因此先用論壇感的視覺把月份補齊，維持整站時間線完整。",
    highlights: ["五區聯合", "交接", "菁英論壇"],
    availability: "待補現場照片後，可優先放入大合照或論壇台上畫面。",
    gallery: [
      {
        kind: "generated",
        theme: "forum",
        badge: "待補活動照",
        title: "五區聯合交接暨菁英論壇",
        month: "2025.08",
        caption: "先保留聯合論壇版位，後續最適合補入區域大合照或講者台上畫面。",
      },
    ],
    links: [],
  },
  {
    id: "2025-09",
    year: 2025,
    month: 9,
    order: 4,
    label: "2025.09",
    title: "扶輪聲林之王",
    subtitle: "用歌唱比賽例會把氣氛拉滿，是年度裡很有記憶點的一站。",
    folder: "9月活動__扶輪聲林之王",
    location: "歌唱比賽例會",
    sourceType: "文件封面",
    visualMode: "document",
    accent: "#69337a",
    cover: {
      kind: "image",
      src: "assets/covers/sep-cover.png",
      alt: "9月扶輪聲林之王活動封面",
      className: "document-cover",
    },
    summary:
      "目前可直接使用的素材以活動簡報封面為主，已能清楚呈現這場歌唱比賽例會的舞台主題與兩位會長資訊。",
    highlights: ["歌唱比賽", "舞台例會", "活動主視覺"],
    availability: "現階段先用簡報封面補位，後續若有舞台合照可優先替換。",
    gallery: [
      {
        kind: "image",
        src: "assets/covers/sep-cover.png",
        alt: "扶輪聲林之王簡報封面",
        caption: "活動簡報封面已帶出舞台與主題氛圍，適合作為暫時展示畫面。",
      },
    ],
    links: [],
  },
  {
    id: "2025-10",
    year: 2025,
    month: 10,
    order: 5,
    label: "2025.10",
    title: "游泳例會",
    subtitle: "把運動主題帶進例會節奏，也讓年度活動變得更有身體感。",
    folder: "10月活動_游泳例會",
    location: "運動健康例會",
    sourceType: "文件封面",
    visualMode: "document",
    accent: "#336987",
    cover: {
      kind: "image",
      src: "assets/covers/oct-cover.png",
      alt: "10月游泳例會感謝狀封面",
      className: "document-cover",
    },
    summary:
      "目前資料夾以感謝狀與簽到單為主，因此先採用感謝狀畫面作為活動封面，維持月度敘事的連續性。",
    highlights: ["運動健康", "例會", "活動文件"],
    availability: "待補泳池現場照或團體照後，可立即換掉封面文件。",
    gallery: [
      {
        kind: "image",
        src: "assets/covers/oct-cover.png",
        alt: "游泳例會感謝狀",
        caption: "目前最完整的月度視覺來源，先用來代表游泳例會的活動存在。",
      },
    ],
    links: [],
  },
  {
    id: "2025-11-a",
    year: 2025,
    month: 11,
    order: 6,
    label: "2025.11",
    title: "紡織例會",
    subtitle: "從職業主題切入，把產業視角帶進這個月份的交流現場。",
    folder: "11月活動_紡織例會",
    location: "職業例會",
    sourceType: "文件封面",
    visualMode: "document",
    accent: "#9a6d3e",
    cover: {
      kind: "image",
      src: "assets/covers/nov-textile-cover.png",
      alt: "11月紡織例會感謝狀封面",
      className: "document-cover",
    },
    summary:
      "目前可用素材以感謝狀與簽到資料為主，所以先以活動文件封面保留月份，等待後續補進例會現場合照。",
    highlights: ["紡織", "職業例會", "產業視角"],
    availability: "最適合後續替換的照片會是講者台上照、合照或桌次交流畫面。",
    gallery: [
      {
        kind: "image",
        src: "assets/covers/nov-textile-cover.png",
        alt: "紡織例會感謝狀",
        caption: "先用現有文件封面補齊月份展示，保留後續改成活動照的版位。",
      },
    ],
    links: [],
  },
  {
    id: "2025-11-b",
    year: 2025,
    month: 11,
    order: 7,
    label: "2025.11",
    title: "區塊鏈職業例會",
    subtitle: "從新技術與未來產業談起，讓 11 月多了一個很不同的職業切角。",
    folder: "11月活動_區塊鏈職業例會",
    location: "職業例會",
    sourceType: "文件封面",
    visualMode: "document",
    accent: "#3a547b",
    cover: {
      kind: "image",
      src: "assets/covers/nov-blockchain-cover.png",
      alt: "11月區塊鏈職業例會感謝狀封面",
      className: "document-cover",
    },
    summary:
      "區塊鏈職業例會目前同樣以活動文件為主要來源，因此先保留主題感與月份順序，之後再補上更有現場感的照片。",
    highlights: ["區塊鏈", "職業例會", "未來產業"],
    availability: "可優先補上講者演講照片、台下互動畫面或講後合照。",
    gallery: [
      {
        kind: "image",
        src: "assets/covers/nov-blockchain-cover.png",
        alt: "區塊鏈職業例會感謝狀",
        caption: "目前先由活動文件扛起視覺角色，待補現場活動照片。",
      },
    ],
    links: [],
  },
  {
    id: "2025-12",
    year: 2025,
    month: 12,
    order: 8,
    label: "2025.12",
    title: "街友送餐",
    subtitle: "把例會延伸到城市關懷，讓歲末有一個很溫柔的收尾。",
    folder: "12月例會_街友送餐",
    location: "街友送餐 / 社會服務",
    sourceType: "文件封面",
    visualMode: "document",
    accent: "#93604f",
    cover: {
      kind: "image",
      src: "assets/covers/dec-cover.png",
      alt: "12月街友送餐文件封面",
      className: "document-cover",
    },
    summary:
      "12 月活動目前以 H&S 單與簽到文件為主，網站先保留服務主題與月份位置，後續可優先換成送餐現場合照。",
    highlights: ["街友送餐", "社會服務", "歲末關懷"],
    availability: "若補照片，最適合優先放入的是送餐行動照與團隊合照。",
    gallery: [
      {
        kind: "image",
        src: "assets/covers/dec-cover.png",
        alt: "街友送餐文件封面",
        caption: "先以現有文件封面代表 12 月社會服務主題。",
      },
    ],
    links: [],
  },
  {
    id: "2026-01",
    year: 2026,
    month: 1,
    order: 9,
    label: "2026.01",
    title: "頒獎典禮",
    subtitle: "從舞台到觀眾席，讓榮耀感成為新年的第一個活動記憶。",
    folder: "2026年1月頒獎典禮",
    location: "2026.01.17 頒獎典禮",
    sourceType: "精選照片",
    visualMode: "photo",
    accent: "#ab5f4f",
    cover: {
      kind: "image",
      src: "assets/photos/jan-awards-1.jpg",
      alt: "2026年1月頒獎典禮代表畫面",
    },
    summary:
      "這個月份已串接你提供的公開 Google Drive 相簿，先挑入三張代表畫面，後續如果想換成大合照也能直接替換。",
    highlights: ["公開相簿串接", "頒獎典禮", "舞台現場"],
    availability: "目前先放入典禮台上與觀眾席畫面，待指定更理想的大合照後可再調整。",
    gallery: [
      {
        kind: "image",
        src: "assets/photos/jan-awards-1.jpg",
        alt: "頒獎典禮舞台畫面",
        caption: "典禮現場代表畫面，保留舞台與儀式感。",
      },
      {
        kind: "image",
        src: "assets/photos/jan-awards-2.jpg",
        alt: "頒獎典禮觀眾席畫面",
        caption: "觀眾席畫面補足活動的現場密度與參與感。",
      },
      {
        kind: "image",
        src: "assets/photos/jan-awards-3.jpg",
        alt: "頒獎典禮鼓掌畫面",
        caption: "以鼓掌畫面延續典禮氛圍，後續可換成更完整的團體合照。",
      },
    ],
    links: [
      {
        label: "2026.1.17 公開相簿",
        url: "https://drive.google.com/drive/folders/1Kle3PPCBJu9I4H-XeVltSkrMaHs-E3gs?usp=drive_link",
      },
    ],
  },
  {
    id: "2026-02",
    year: 2026,
    month: 2,
    order: 10,
    label: "2026.02",
    title: "小迎新",
    subtitle: "用更輕鬆的節奏迎接新夥伴，讓社群關係慢慢展開。",
    folder: "2026年2月小迎新",
    location: "迎新活動",
    sourceType: "文件封面",
    visualMode: "document",
    accent: "#8a5b61",
    cover: {
      kind: "image",
      src: "assets/covers/feb-cover.png",
      alt: "2026年2月小迎新文件封面",
      className: "document-cover",
    },
    summary:
      "2 月目前可見資料多為簽到與工作人員文件，因此先用文件封面保留這場迎新活動的位置與節奏。",
    highlights: ["小迎新", "新夥伴", "關係建立"],
    availability: "之後若補活動照片，最適合優先換成新生與幹部互動畫面。",
    gallery: [
      {
        kind: "image",
        src: "assets/covers/feb-cover.png",
        alt: "小迎新文件封面",
        caption: "先保留 2 月迎新版位，等待更完整的現場照片素材。",
      },
    ],
    links: [],
  },
  {
    id: "2026-03",
    year: 2026,
    month: 3,
    order: 11,
    label: "2026.03",
    title: "大迎新",
    subtitle: "把迎新的規模拉大，讓年度社群的擴張感更明顯。",
    folder: "2026年3月大迎新",
    location: "迎新活動",
    sourceType: "待補照片",
    visualMode: "placeholder",
    accent: "#8b5d70",
    cover: {
      kind: "generated",
      theme: "welcome",
      badge: "待補活動照",
      title: "大迎新",
      month: "2026.03",
    },
    summary:
      "目前找到的資料偏向司儀稿與行政檔，網站先保留月份敘事與迎新主題，之後可直接替換成大合照或迎新互動畫面。",
    highlights: ["大迎新", "新生加入", "社群擴張"],
    availability: "優先建議補入大合照、新生互動或舞台介紹畫面。",
    gallery: [
      {
        kind: "generated",
        theme: "welcome",
        badge: "待補活動照",
        title: "大迎新",
        month: "2026.03",
        caption: "先用主題占位視覺保留 3 月活動位階，等待正式照片到位。",
      },
    ],
    links: [],
  },
  {
    id: "2026-04",
    year: 2026,
    month: 4,
    order: 12,
    label: "2026.04",
    title: "淨灘例會",
    subtitle: "把行動帶向海邊，讓這個月份有非常明確的公共參與感。",
    folder: "2026年4月淨灘例會",
    location: "海邊淨灘 / 社會服務",
    sourceType: "精選照片",
    visualMode: "photo",
    accent: "#32707d",
    cover: {
      kind: "image",
      src: "assets/photos/april-beach-group-1.jpg",
      alt: "2026年4月淨灘例會大合照",
    },
    summary:
      "4 月這一版已補上真正的大合照，並保留多人淨灘行動與海邊氛圍畫面，讓活動頁既有全體感，也看得到大家實際參與的過程。",
    highlights: ["淨灘例會", "海邊行動", "大合照"],
    availability: "目前已具備兩張全體合照與多張實拍活動照，可直接作為正式展示版本。",
    gallery: [
      {
        kind: "image",
        src: "assets/photos/april-beach-group-1.jpg",
        alt: "淨灘例會全體大合照",
        caption: "這張全體合照最適合作為 4 月主視覺，能一眼看出整個活動的規模與氣氛。",
      },
      {
        kind: "image",
        src: "assets/photos/april-beach-group-2.jpg",
        alt: "淨灘例會第二張團體合照",
        caption: "第二張團體照保留更輕鬆的活動尾聲感，也讓相簿層次更完整。",
      },
      {
        kind: "image",
        src: "assets/photos/april-beach-4.jpg",
        alt: "多人在海邊淨灘",
        caption: "多人一起清理海灘的畫面，補足活動不只是合照，也是真正在做事。",
      },
      {
        kind: "image",
        src: "assets/photos/april-beach-5.jpg",
        alt: "淨灘互動畫面",
        caption: "用近距離的互動畫面把參與感拉近，讓例會主題更鮮明。",
      },
      {
        kind: "image",
        src: "assets/photos/april-beach-1.jpg",
        alt: "海邊活動氛圍照",
        caption: "保留海邊地景與人物氛圍，作為這個月份的收尾畫面。",
      },
    ],
    links: [],
  },
  {
    id: "2026-05",
    year: 2026,
    month: 5,
    order: 13,
    label: "2026.05",
    title: "直播例會",
    subtitle: "把活動從現場拉到數位介面，呈現年度中很不同的形式轉換。",
    folder: "2026年5月直播例會",
    location: "直播形式例會",
    sourceType: "精選照片",
    visualMode: "photo",
    accent: "#256877",
    cover: {
      kind: "image",
      src: "assets/photos/may-live-group.jpg",
      alt: "2026年5月直播例會大合照",
    },
    summary:
      "5 月直播例會已補上現場實拍，這一版以全體合照作為主視覺，再搭配主持、講者與台上互動畫面，把活動主題和當天氣氛一起帶進網站。",
    highlights: ["直播例會", "實拍活動照", "主題分享"],
    availability: "目前已具備大合照、主持畫面、台上互動與講者合影，可直接作為正式展示內容。",
    gallery: [
      {
        kind: "image",
        src: "assets/photos/may-live-group.jpg",
        alt: "直播例會全體合照",
        caption: "這張全體合照最適合當 5 月主圖，能把整個例會的參與感一次帶出來。",
      },
      {
        kind: "image",
        src: "assets/photos/may-live-hosts.jpg",
        alt: "直播例會主持畫面",
        caption: "主持畫面很能交代現場節奏，也讓月度頁不只有合照而已。",
      },
      {
        kind: "image",
        src: "assets/photos/may-live-panel.jpg",
        alt: "直播例會台上互動畫面",
        caption: "台上互動與分享畫面，補足例會主題的現場感與內容感。",
      },
      {
        kind: "image",
        src: "assets/photos/may-live-speaker.jpg",
        alt: "直播例會講者合影",
        caption: "保留主題講座與合影瞬間，讓這個月份更完整地對應『自媒體與直播』主題。",
      },
    ],
    links: [],
  },
  {
    id: "2026-06",
    year: 2026,
    month: 6,
    order: 14,
    label: "2026.06",
    title: "交接典禮",
    subtitle: "從開場的交接回到收束的交接，形成年度最完整的前後呼應。",
    folder: "2026年6月交接典禮",
    location: "雙北交接典禮",
    sourceType: "待補照片",
    visualMode: "placeholder",
    accent: "#875c53",
    cover: {
      kind: "generated",
      theme: "finale",
      badge: "待補活動照",
      title: "交接典禮",
      month: "2026.06",
    },
    summary:
      "目前這個資料夾以程序表、報名表單與音控素材為主，因此先保留年度收尾的典禮位置，讓整條時間線完整閉合。",
    highlights: ["年度收束", "交接典禮", "傳承"],
    availability: "後續最適合補入交接台上合照、兩位會長畫面與全場大合照。",
    gallery: [
      {
        kind: "generated",
        theme: "finale",
        badge: "待補活動照",
        title: "交接典禮",
        month: "2026.06",
        caption: "先保留收尾典禮的視覺位置，等待正式交接照片補進來。",
      },
    ],
    links: [],
  },
];

const statusLabels = {
  photo: "精選照片",
  document: "文件封面",
  placeholder: "待補照片",
};

const gridEl = document.getElementById("eventGrid");
const filterEl = document.getElementById("filterChips");
const resultsNoteEl = document.getElementById("resultsNote");
const heroStatsEl = document.getElementById("heroStats");
const heroPhotoFilterEl = document.getElementById("heroPhotoFilter");

const detailModalEl = document.getElementById("detailModal");
const detailPanelEl = document.querySelector(".detail-panel");
const detailCloseEl = document.getElementById("detailClose");
const detailScrollEl = document.querySelector(".detail-scroll");
const detailHeroEl = document.getElementById("detailHero");
const detailKickerEl = document.getElementById("detailKicker");
const detailTitleEl = document.getElementById("detailTitle");
const detailSummaryEl = document.getElementById("detailSummary");
const detailInfoEl = document.getElementById("detailInfo");
const detailTagsEl = document.getElementById("detailTags");
const detailLinksEl = document.getElementById("detailLinks");
const detailGalleryEl = document.getElementById("detailGallery");

const filters = [
  { id: "all", label: "全部活動" },
  { id: "2025", label: "2025" },
  { id: "2026", label: "2026" },
  { id: "photo-first", label: "精選照片優先" },
];

let activeFilter = "all";
let lastTrigger = null;
const orderedEvents = [...events].sort((a, b) => a.order - b.order);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function sortEvents(items) {
  return [...items].sort((a, b) => a.order - b.order);
}

function formatChapterNumber(value) {
  return String(value).padStart(2, "0");
}

function getFilterLabel(filterId) {
  return filters.find((filter) => filter.id === filterId)?.label || "全部活動";
}

function filterEvents(items, filterId) {
  if (filterId === "2025") {
    return items.filter((item) => item.year === 2025);
  }

  if (filterId === "2026") {
    return items.filter((item) => item.year === 2026);
  }

  if (filterId === "photo-first") {
    return sortEvents(items).sort((a, b) => {
      const aRank = a.visualMode === "photo" ? 0 : a.visualMode === "document" ? 1 : 2;
      const bRank = b.visualMode === "photo" ? 0 : b.visualMode === "document" ? 1 : 2;
      return aRank - bRank || a.order - b.order;
    });
  }

  return sortEvents(items);
}

function getVisibleEvents() {
  return filterEvents(orderedEvents, activeFilter);
}

function setActiveFilter(filterId, options = {}) {
  activeFilter = filterId;
  renderFilters();
  renderCards();

  if (options.scrollToArchive) {
    document.getElementById("archive")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function renderHeroStats() {
  const total = orderedEvents.length;
  const realPhotoMonths = orderedEvents.filter((item) => item.visualMode === "photo").length;
  const startLabel = orderedEvents[0].label;
  const endLabel = orderedEvents.at(-1).label;

  heroStatsEl.innerHTML = [
    {
      value: total,
      label: "月度活動",
    },
    {
      value: `${startLabel} → ${endLabel}`,
      label: "展示範圍",
    },
    {
      value: realPhotoMonths,
      label: "已接入實拍月份",
    },
  ]
    .map(
      (stat, index) => `
        <article class="stat-card ${index === 1 ? "stat-card--wide" : ""}">
          <strong>${escapeHtml(stat.value)}</strong>
          <span>${escapeHtml(stat.label)}</span>
        </article>
      `,
    )
    .join("");
}

function renderFilters() {
  filterEl.innerHTML = filters
    .map(
      (filter) => `
        <button
          class="filter-chip ${filter.id === activeFilter ? "is-active" : ""}"
          type="button"
          data-filter="${escapeHtml(filter.id)}"
          aria-pressed="${filter.id === activeFilter ? "true" : "false"}"
        >
          ${escapeHtml(filter.label)}
        </button>
      `,
    )
    .join("");
}

function renderVisual(cover, title, lazy = true) {
  if (cover.kind === "image") {
    const className = cover.className ? ` ${cover.className}` : "";
    return `
      <img
        class="${className.trim()}"
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

function renderCards() {
  const visibleEvents = getVisibleEvents();
  const filterLabel = getFilterLabel(activeFilter);

  resultsNoteEl.textContent =
    activeFilter === "photo-first"
      ? `目前以「${filterLabel}」排序，共 ${visibleEvents.length} 個活動。`
      : `目前顯示「${filterLabel}」的 ${visibleEvents.length} 個活動。`;

  gridEl.innerHTML = visibleEvents
    .map((event) => {
      const tags = event.highlights
        .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
        .join("");
      const chapterLabel = `Chapter ${formatChapterNumber(event.order)}`;
      const frameCount = `${event.gallery.length} Frames`;

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
            <div class="card-chapter">${escapeHtml(chapterLabel)}</div>
            <div class="card-overlay">
              <span>${escapeHtml(event.folder)}</span>
              <strong>${escapeHtml(event.location)}</strong>
            </div>
          </div>

          <div class="card-body">
            <div class="card-topline">
              <p class="card-month">${escapeHtml(event.label)}</p>
              <span class="card-badge badge-${escapeHtml(event.visualMode)}">
                ${escapeHtml(statusLabels[event.visualMode])}
              </span>
            </div>

            <h3>${escapeHtml(event.title)}</h3>
            <p class="card-subtitle">${escapeHtml(event.subtitle)}</p>
            <div class="tag-row">${tags}</div>
            <div class="card-bottom">
              <p class="card-source">${escapeHtml(event.availability)}</p>
              <div class="card-footline">
                <span class="card-frames">${escapeHtml(frameCount)}</span>
                <span class="card-cta">展開本月篇章</span>
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderDetailInfo(event) {
  const infoItems = [
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
      value: `${event.sourceType}｜${event.availability}`,
    },
  ];

  detailInfoEl.innerHTML = infoItems
    .map(
      (item) => `
        <article class="info-card">
          <span>${escapeHtml(item.label)}</span>
          <p>${escapeHtml(item.value)}</p>
        </article>
      `,
    )
    .join("");
}

function renderDetailTags(event) {
  detailTagsEl.innerHTML = event.highlights
    .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
    .join("");
}

function renderDetailLinks(event) {
  if (!event.links.length) {
    detailLinksEl.innerHTML = "";
    return;
  }

  detailLinksEl.innerHTML = event.links
    .map(
      (link) => `
        <a
          class="${link.download ? "is-download" : ""}"
          href="${escapeHtml(link.url)}"
          ${link.download ? "download" : 'target="_blank" rel="noreferrer"'}
        >
          ${escapeHtml(link.label)}
        </a>
      `,
    )
    .join("");
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

function openDetail(eventId, triggerEl) {
  const event = events.find((item) => item.id === eventId);

  if (!event) {
    return;
  }

  lastTrigger = triggerEl || document.activeElement;

  detailPanelEl.style.setProperty("--detail-accent", event.accent);
  detailHeroEl.innerHTML = `
    ${renderVisual(event.cover, event.title, false)}
    <div class="detail-hero-badge">
      <span>${escapeHtml(event.label)}</span>
      <strong>${escapeHtml(`Chapter ${formatChapterNumber(event.order)}`)}</strong>
    </div>
  `;
  detailKickerEl.textContent = `${event.label}｜${event.sourceType}`;
  detailTitleEl.textContent = event.title;
  detailSummaryEl.textContent = event.summary;

  renderDetailInfo(event);
  renderDetailTags(event);
  renderDetailLinks(event);

  detailGalleryEl.innerHTML = event.gallery.map(renderGalleryItem).join("");

  if (detailScrollEl) {
    detailScrollEl.scrollTop = 0;
  }

  detailModalEl.hidden = false;
  document.body.classList.add("modal-open");
  detailCloseEl.focus();
}

function closeDetail() {
  detailModalEl.hidden = true;
  document.body.classList.remove("modal-open");

  if (lastTrigger && typeof lastTrigger.focus === "function") {
    lastTrigger.focus();
  }
}

function bindEvents() {
  filterEl.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) {
      return;
    }

    setActiveFilter(button.dataset.filter);
  });

  gridEl.addEventListener("click", (event) => {
    const card = event.target.closest("[data-event-id]");
    if (!card) {
      return;
    }

    openDetail(card.dataset.eventId, card);
  });

  gridEl.addEventListener("keydown", (event) => {
    const card = event.target.closest("[data-event-id]");
    if (!card) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetail(card.dataset.eventId, card);
    }
  });

  detailModalEl.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.dataset.closeModal === "true") {
      closeDetail();
    }
  });

  detailCloseEl.addEventListener("click", closeDetail);

  heroPhotoFilterEl?.addEventListener("click", () => {
    setActiveFilter("photo-first", { scrollToArchive: true });
  });

  window.addEventListener("keydown", (event) => {
    if (!detailModalEl.hidden && event.key === "Escape") {
      closeDetail();
    }
  });
}

renderHeroStats();
renderFilters();
renderCards();
bindEvents();
