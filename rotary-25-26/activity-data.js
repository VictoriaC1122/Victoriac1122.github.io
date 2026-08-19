(() => {
  const DEFAULT_LANGUAGE = "zh-TW";
  const SUPPORTED_LANGUAGES = Object.freeze(["zh-TW", "en"]);

  const STATUS_LABELS = Object.freeze({
    photo: localized("活動相片", "Photos"),
    document: localized("手冊頁面", "Handbook page"),
    placeholder: localized("待補照片", "Coming soon"),
  });

  const FILTER_LABELS = Object.freeze({
    all: localized("全部活動", "All events"),
  });

  function localized(zhTw, en) {
    return Object.freeze({
      "zh-TW": zhTw,
      en,
    });
  }

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

  function createLocalizedLink(zhTwLabel, enLabel, url, options = {}) {
    return {
      label: localized(zhTwLabel, enLabel),
      url,
      ...options,
    };
  }

  function localizedList(...entries) {
    return entries.map(([zhTw, en]) => localized(zhTw, en));
  }

  function galleryImage(src, zhTwAlt, enAlt, zhTwCaption, enCaption, options = {}) {
    return createImageAsset(src, localized(zhTwAlt, enAlt), {
      ...(zhTwCaption || enCaption ? { caption: localized(zhTwCaption, enCaption) } : {}),
      ...options,
    });
  }

  function createEvent(config) {
    return {
      highlights: [],
      links: [],
      activityBlocks: [],
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

  function isLocalizedValue(value) {
    if (!value || Array.isArray(value) || typeof value !== "object") {
      return false;
    }

    const keys = Object.keys(value);

    return (
      keys.length === SUPPORTED_LANGUAGES.length &&
      SUPPORTED_LANGUAGES.every((language) => language in value) &&
      keys.every((key) => SUPPORTED_LANGUAGES.includes(key))
    );
  }

  function resolveLocalizedValue(value, language) {
    if (isLocalizedValue(value)) {
      return value[language] ?? value[DEFAULT_LANGUAGE];
    }

    if (Array.isArray(value)) {
      return value.map((item) => resolveLocalizedValue(item, language));
    }

    if (value && typeof value === "object") {
      return Object.entries(value).reduce((result, [key, entryValue]) => {
        result[key] = resolveLocalizedValue(entryValue, language);
        return result;
      }, {});
    }

    return value;
  }

  function createFrameCountLabel(count, language) {
    return language === "en" ? `${count} photos` : `${count} 張照片`;
  }

  function normalizeEvent(rawEvent, language) {
    const event = resolveLocalizedValue(rawEvent, language);
    const label = formatEventLabel(event.year, event.month);
    const statusLabel = resolveLocalizedValue(STATUS_LABELS[event.visualMode], language);
    const dateLabel = event.date || label;

    return {
      ...event,
      label,
      dateLabel,
      statusLabel,
      frameCountLabel: createFrameCountLabel(event.gallery.length, language),
      detailKicker: `${label}｜${dateLabel}`,
      materialStatus: event.availability,
    };
  }

  const activityEvents = [
    createPhotoEvent({
      id: "2025-06",
      year: 2025,
      month: 6,
      order: 1,
      title: localized("北區與新北區聯合交接典禮・九份畢旅", "Joint Handover Ceremony & Jiufen Trip"),
      subtitle: localized("年度從交接典禮與九份畢旅揭開序幕。", "The year opens with the handover ceremony and the Jiufen trip."),
      folder: localized("6月活動＿交接典禮＆九份畢旅", "June Activities — Handover Ceremony & Jiufen Trip"),
      date: localized("2025/6/28 聯合交接典禮・2025/6/28-29 九份畢旅", "2025/6/28 Joint Handover Ceremony · 2025/6/28-29 Jiufen Trip"),
      location: localized("交接典禮 / 九份", "Handover Ceremony / Jiufen"),
      accent: "#b06f4a",
      coverSrc: "assets/photos/june-handover-handbook-cover.jpg",
      coverAlt: localized("6月交接典禮手冊人物合照", "June handbook portrait from the handover ceremony"),
      summary: localized(
        "6 月先是北區與新北區的聯合交接典禮，接著銜接九份畢旅，替新年度留下第一段共同記憶。",
        "June begins with the joint handover ceremony for Taipei North and New Taipei, followed by the Jiufen trip that opens the year with its first shared memories.",
      ),
      highlights: localizedList(
        ["年度交接", "Handover"],
        ["九份畢旅", "Jiufen trip"],
        ["兩位會長", "Both presidents"],
        ["年度起點", "Opening chapter"],
      ),
      availability: localized(
        "交接與畢旅都收在這個月份裡，也替新年度留下最初的合照與行程。",
        "The handover and trip sit together in this opening month, leaving the first group photos and first shared itinerary of the year.",
      ),
      gallery: [
        galleryImage(
          "assets/photos/june-handover-handbook-cover.jpg",
          "交接典禮手冊人物合照",
          "Portrait from the handover handbook",
          "交接典禮人物合照。",
          "Portrait from the handover ceremony handbook.",
        ),
        galleryImage(
          "assets/photos/june-handover-handbook-page.jpg",
          "交接典禮手冊月份頁",
          "June page from the handover handbook",
          "6 月手冊頁。",
          "June handbook spread.",
        ),
        galleryImage(
          "assets/photos/june-jiufen-handbook-group.jpg",
          "九份畢旅手冊團體畫面",
          "Jiufen trip group photo from the handbook",
          "九份畢旅團體畫面。",
          "Group photo from the Jiufen trip.",
        ),
      ],
      links: [createLocalizedLink("下載交接典禮手冊 PDF", "Download the handover handbook PDF", "assets/downloads/handover-manual-2025.pdf", { download: true })],
    }),
    createPhotoEvent({
      id: "2025-07",
      year: 2025,
      month: 7,
      order: 2,
      title: localized("北區新北區聯合幹部訓練", "Joint Leadership Training"),
      subtitle: localized("在宜蘭進行兩天一夜的聯合幹部訓練。", "A two-day joint leadership training takes place in Yilan."),
      folder: localized("7月活動＿幹部訓練", "July Activities — Leadership Training"),
      date: "2025/7/19-20",
      location: localized("宜蘭", "Yilan"),
      accent: "#766247",
      coverSrc: "assets/photos/july-training-handbook-cover.jpg",
      coverAlt: localized("7月幹部訓練手冊人物合照", "July leadership training portrait from the handbook"),
      summary: localized(
        "7 月在宜蘭進行兩天一夜的幹部訓練，透過課程、協作與相處，把新年度的節奏先定下來。",
        "July's overnight leadership training in Yilan uses workshops, teamwork, and shared time to set the tone for the new year.",
      ),
      highlights: localizedList(
        ["幹部訓練", "Leadership training"],
        ["宜蘭", "Yilan"],
        ["年度默契", "Team chemistry"],
      ),
      availability: localized(
        "兩天一夜的訓練，也讓幹部分工與合作節奏更清楚。",
        "The two-day training also helps the team settle into clearer roles and a steadier working rhythm.",
      ),
      gallery: [
        galleryImage(
          "assets/photos/july-training-handbook-cover.jpg",
          "幹部訓練手冊人物合照",
          "Leadership training portrait from the handbook",
          "幹部訓練合照。",
          "Leadership training group photo.",
        ),
        galleryImage(
          "assets/photos/july-training-handbook-page.jpg",
          "幹部訓練手冊月份頁",
          "July leadership training handbook page",
          "7 月手冊頁。",
          "July handbook spread.",
        ),
      ],
    }),
    createPhotoEvent({
      id: "2025-08",
      year: 2025,
      month: 8,
      order: 3,
      title: localized("五區交接暨菁英論壇", "Five-District Handover & Leadership Forum"),
      subtitle: localized("五區交接與論壇安排在同一天展開。", "The handover and forum unfold on the same day."),
      folder: localized("8月五區聯合交接暨菁英論壇", "August Activities — Five-District Handover & Leadership Forum"),
      date: "2025/8/16",
      location: localized("五區聯合活動", "Five-district joint event"),
      accent: "#36547a",
      coverSrc: "assets/photos/aug-forum-meeting-photo.jpg",
      coverAlt: localized("五區交接暨菁英論壇現場會議畫面", "Forum meeting scene from the five-district handover"),
      summary: localized(
        "8 月的五區交接暨菁英論壇，既是正式交棒，也是交流場合；論壇內容也讓不同區的夥伴有更多對話。",
        "August's five-district handover and forum marks the formal transition while also creating room for conversation across districts.",
      ),
      highlights: localizedList(
        ["五區聯合", "Five districts"],
        ["交接", "Handover"],
        ["菁英論壇", "Leadership forum"],
      ),
      availability: localized(
        "交接與論壇同場進行，留下的是上任時刻與現場交流。",
        "The handover and forum share the same stage, pairing the new term with live exchange across the room.",
      ),
      gallery: [
        galleryImage(
          "assets/photos/aug-forum-meeting-photo.jpg",
          "五區交接暨菁英論壇現場會議畫面",
          "Meeting scene from the five-district handover forum",
          "論壇現場畫面。",
          "Forum meeting scene.",
        ),
        galleryImage(
          "assets/photos/aug-forum-group-handbook.jpg",
          "五區交接暨菁英論壇手冊擷取團體畫面",
          "Group image from the five-district handover handbook",
          "手冊團體畫面。",
          "Group image from the handbook.",
        ),
        galleryImage(
          "assets/photos/aug-forum-handbook-page.jpg",
          "五區交接暨菁英論壇手冊月份頁",
          "August page from the five-district handover handbook",
          "8 月手冊頁。",
          "August handbook spread.",
        ),
      ],
    }),
    createPhotoEvent({
      id: "2025-09",
      year: 2025,
      month: 9,
      order: 4,
      title: localized("扶輪聲林之王", "Rotary Singing Night"),
      subtitle: localized("在浪漫屋視聽歌唱城辦一場熱鬧的唱歌例會。", "A lively karaoke meeting at Romantic House KTV."),
      folder: localized("9月活動__扶輪聲林之王", "September Activities — Rotary Singing Night"),
      date: "2025/9/20",
      location: localized("浪漫屋視聽歌唱城", "Romantic House KTV"),
      accent: "#69337a",
      coverSrc: "assets/photos/sep-singing-group-photo.jpg",
      coverAlt: localized("扶輪聲林之王現場主持與評審席畫面", "Scene from the Rotary Singing Night panel table"),
      summary: localized(
        "9 月在浪漫屋視聽歌唱城辦趣味唱歌競賽，大家輪流上台演唱，重點是玩得開心。",
        "September brings a playful singing competition at Romantic House KTV. Everyone takes turns on stage, with the focus on enjoying the night together.",
      ),
      highlights: localizedList(
        ["歌唱比賽", "Singing contest"],
        ["舞台例會", "Stage meeting"],
        ["頒獎畫面", "Award moments"],
        ["現場實拍", "Live event photos"],
      ),
      availability: localized(
        "以趣味唱歌競賽為主題，現場氣氛輕鬆又熱鬧。",
        "This meeting is built around a playful singing competition, with a relaxed and lively atmosphere throughout the night.",
      ),
      gallery: [
        galleryImage(
          "assets/photos/sep-singing-group-photo.jpg",
          "扶輪聲林之王現場主持與評審席畫面",
          "Scene from the Rotary Singing Night panel table",
          "扶輪聲林之王現場畫面。",
          "Rotary Singing Night scene.",
        ),
        galleryImage(
          "assets/photos/sep-singing-handbook-page.jpg",
          "扶輪聲林之王手冊月份頁",
          "September page from the Rotary Singing Night handbook",
          "9 月手冊頁。",
          "September handbook spread.",
        ),
      ],
    }),
    createPhotoEvent({
      id: "2025-10",
      year: 2025,
      month: 10,
      order: 5,
      title: localized("游泳例會", "Swimming Meeting"),
      subtitle: localized("先聽健康衛教，再下水活動。", "A wellness briefing comes before the pool session."),
      folder: localized("10月活動_游泳例會", "October Activities — Swimming Meeting"),
      date: "2025/10/12",
      location: localized("運動健康例會", "Sports and wellness meeting"),
      accent: "#336987",
      coverSrc: "assets/photos/oct-swim-pool-scene-01.jpg",
      coverAlt: localized("游泳例會泳池活動畫面", "Swimming meeting pool scene"),
      summary: localized(
        "10 月的游泳例會先由胡祐笙分享運動前的暖身與保護觀念，接著再進入泳池活動。",
        "October's swimming meeting opens with Hu You-Sheng's talk on warming up and injury prevention, then moves into the pool session.",
      ),
      highlights: localizedList(
        ["運動健康", "Wellness"],
        ["例會", "Monthly meeting"],
        ["手冊頁面", "Handbook page"],
      ),
      availability: localized(
        "這場例會把健康知識與泳池活動排在同一天。",
        "This meeting places wellness guidance and pool activity in the same afternoon.",
      ),
      gallery: [
        galleryImage(
          "assets/photos/oct-swim-pool-scene-01.jpg",
          "游泳例會泳池活動畫面",
          "Swimming meeting pool scene",
          "游泳例會泳池活動畫面。",
          "Pool scene from the swimming meeting.",
        ),
        galleryImage(
          "assets/photos/oct-swim-group-handbook.jpg",
          "游泳例會手冊擷取團體畫面",
          "Swimming meeting group photo from the handbook",
          "游泳例會團體畫面。",
          "Swimming meeting group photo.",
        ),
        galleryImage(
          "assets/photos/oct-swim-handbook-page.jpg",
          "游泳例會手冊月份頁",
          "October page from the swimming meeting handbook",
          "10 月手冊頁。",
          "October handbook spread.",
        ),
      ],
    }),
    createPhotoEvent({
      id: "2025-11-textile",
      year: 2025,
      month: 11,
      order: 6,
      title: localized("紡織例會", "Textile Meeting"),
      subtitle: localized("11 月第一場例會，是一場紡織手作分享。", "November begins with a hands-on textile session."),
      folder: localized("11月活動_紡織例會", "November Activities — Textile Meeting"),
      date: "2025/11/8",
      location: localized("紡織手作例會", "Textile workshop meeting"),
      accent: "#7c5a68",
      coverSrc: "assets/photos/nov-textile-group-photo.jpg",
      coverAlt: localized("紡織例會手作品展示畫面", "Textile meeting display photo"),
      summary: localized(
        "由瑤池藝術工作室創辦人、獎學生賴綉丹帶來飲料提袋手作，也談自己的紡織設計經驗。",
        "Scholarship student Lai Hsiu-Dan, founder of Yaochi Art Studio, leads a drink-bag workshop and shares her textile design practice.",
      ),
      highlights: localizedList(
        ["紡織手作", "Textile workshop"],
        ["飲料提袋", "Drink-bag craft"],
        ["11 月例會", "November meeting"],
      ),
      availability: localized(
        "11 月從一場細緻的手作例會開始。",
        "November opens with a quieter, hands-on studio-style meeting.",
      ),
      gallery: [
        galleryImage(
          "assets/photos/nov-textile-group-photo.jpg",
          "紡織例會手作品展示畫面",
          "Textile meeting display photo",
          "紡織例會現場畫面。",
          "Textile meeting scene.",
        ),
        galleryImage(
          "assets/photos/nov-textile-handbook-page.jpg",
          "紡織例會手冊月份頁",
          "November textile meeting handbook page",
          "紡織例會手冊頁。",
          "Textile meeting handbook page.",
        ),
      ],
    }),
    createPhotoEvent({
      id: "2025-11-blood",
      year: 2025,
      month: 11,
      order: 6.1,
      title: localized("捐血例會", "Blood Donation Meeting"),
      subtitle: localized("11 月把公益行動排進例會日程。", "November makes room for service on the calendar."),
      folder: localized("11月活動_捐血例會", "November Activities — Blood Donation Meeting"),
      date: "2025/11/15",
      location: localized("捐血公益服務", "Blood donation service"),
      accent: "#a15d70",
      coverSrc: "assets/photos/nov-blood-donation-group-photo.jpg",
      coverAlt: localized("捐血例會現場合照", "Blood donation meeting group photo"),
      summary: localized(
        "11 月中的捐血例會，以實際行動回應公益，也替這個月留下另一種聚會方式。",
        "Mid-November's blood donation meeting turns public service into a shared act and gives the month a different kind of gathering.",
      ),
      highlights: localizedList(
        ["公益參與", "Public service"],
        ["社會服務", "Community outreach"],
        ["11 月例會", "November meeting"],
      ),
      availability: localized(
        "這場例會把捐血行動留在 11 月的時間軸上。",
        "This meeting leaves a public-service mark on November's timeline.",
      ),
      gallery: [
        galleryImage(
          "assets/photos/nov-blood-donation-group-photo.jpg",
          "捐血例會現場合照",
          "Blood donation meeting group photo",
          "捐血例會現場合照。",
          "Blood donation meeting group photo.",
        ),
      ],
    }),
    createPhotoEvent({
      id: "2025-11-blockchain",
      year: 2025,
      month: 11,
      order: 6.2,
      title: localized("區塊鏈例會", "Blockchain Meeting"),
      subtitle: localized("從區塊鏈發展談到金融與數位時代。", "A session on blockchain, finance, and the digital age."),
      folder: localized("11月活動_區塊鏈例會", "November Activities — Blockchain Meeting"),
      date: "2025/11/29",
      location: localized("區塊鏈職業例會", "Blockchain professional meeting"),
      accent: "#5a5f8e",
      coverSrc: "assets/photos/nov-blockchain-award-photo.jpg",
      coverAlt: localized("區塊鏈例會講師致謝畫面", "Blockchain meeting speaker appreciation photo"),
      summary: localized(
        "由 Paper Plane 創辦人涂立青主講，從區塊鏈發展談到金融應用與數位時代的變化。",
        "Paper Plane founder Larry Tu leads the session, tracing blockchain's development, its financial uses, and the broader shifts of the digital age.",
      ),
      highlights: localizedList(
        ["區塊鏈", "Blockchain"],
        ["職業例會", "Professional meeting"],
        ["金融科技", "Fintech"],
      ),
      availability: localized(
        "11 月最後一場例會，以科技與金融為題收尾。",
        "November closes with a meeting centered on technology and finance.",
      ),
      gallery: [
        galleryImage(
          "assets/photos/nov-blockchain-poster.jpg",
          "區塊鏈職業例會活動海報",
          "Blockchain meeting event poster",
          "區塊鏈職業例會活動海報。",
          "Poster for the blockchain meeting.",
        ),
        galleryImage(
          "assets/photos/nov-blockchain-award-photo.jpg",
          "區塊鏈例會講師致謝畫面",
          "Blockchain meeting speaker appreciation photo",
          "區塊鏈例會講師致謝畫面。",
          "Speaker appreciation moment from the blockchain meeting.",
        ),
        galleryImage(
          "assets/photos/nov-blockchain-speaker-portrait.jpg",
          "區塊鏈例會合影",
          "Blockchain meeting portrait photo",
          "區塊鏈例會合影。",
          "Portrait photo from the blockchain meeting.",
        ),
        galleryImage(
          "assets/photos/nov-blockchain-group-photo.jpg",
          "區塊鏈例會現場團體畫面",
          "Blockchain meeting group photo",
          "區塊鏈例會現場團體畫面。",
          "Group photo from the blockchain meeting.",
        ),
      ],
    }),
    createPhotoEvent({
      id: "2025-12",
      year: 2025,
      month: 12,
      order: 7,
      title: localized("街友送餐公益服務", "Meal Service for Unhoused People"),
      subtitle: localized("從採買、備餐到發送，這一天都在現場完成。", "Shopping, prep, and delivery all unfold in one day."),
      folder: localized("12月例會_街友送餐", "December Activities — Meal Service"),
      date: "2025/12/13",
      location: localized("街友送餐 / 社會服務", "Meal service / community outreach"),
      accent: "#93604f",
      coverSrc: "assets/photos/dec-meals-dec13-group-01.jpg",
      coverAlt: localized("12月13日公益送餐例會合影", "13 December community meal service group photo"),
      summary: localized(
        "12 月的街友送餐公益服務，從市場採買開始，接著分組備餐，最後前往北車發送，把歲末關懷落在具體行動裡。",
        "December's meal service begins at the market, moves into team meal prep, and ends with distribution near Taipei Main Station.",
      ),
      highlights: localizedList(
        ["街友送餐", "Meal service"],
        ["社會服務", "Community outreach"],
        ["歲末關懷", "Year-end care"],
      ),
      availability: localized(
        "採買、備餐與發送，都在這一天一段段完成。",
        "Shopping, prep, and distribution are all completed step by step in a single day.",
      ),
      gallery: [
        galleryImage(
          "assets/photos/dec-meals-dec13-group-01.jpg",
          "12月13日公益送餐例會合影",
          "13 December community meal service group photo",
          "12月13日公益送餐例會合影。",
          "Group photo from the 13 December community meal service meeting.",
        ),
        galleryImage(
          "assets/photos/dec-meals-dec13-hosts-01.jpg",
          "12月13日公益送餐例會主持與分享",
          "13 December community meal service hosts and sharing",
          "12月13日公益送餐例會主持與分享。",
          "Hosts and sharing during the 13 December community meal service meeting.",
        ),
        galleryImage(
          "assets/photos/dec-meals-dec13-prep-group-01.jpg",
          "12月13日公益送餐例會食材準備",
          "13 December community meal service ingredient preparation",
          "12月13日公益送餐例會食材準備合影。",
          "Group photo during ingredient preparation for the 13 December community meal service meeting.",
        ),
        galleryImage(
          "assets/photos/dec-meals-dec13-prep-cutting-01.jpg",
          "12月13日公益送餐例會備餐紀錄",
          "13 December community meal service meal prep",
          "12月13日公益送餐例會備餐紀錄。",
          "Meal preparation in the kitchen during the 13 December community meal service meeting.",
        ),
        galleryImage(
          "assets/photos/dec-meals-dec13-hosts-02.jpg",
          "12月13日公益送餐例會主持與說明",
          "13 December community meal service opening remarks",
          "12月13日公益送餐例會主持與說明。",
          "Opening remarks during the 13 December community meal service meeting.",
        ),
        galleryImage(
          "assets/photos/dec-meals-handbook-cover.jpg",
          "街友送餐公益服務手冊人物合照",
          "Meal service portrait from the handbook",
          "手冊中的街友送餐志工合照。",
          "Volunteer group photo from the handbook.",
        ),
        galleryImage(
          "assets/photos/dec-meals-handbook-group-2.jpg",
          "街友送餐公益服務備餐人物畫面",
          "Meal prep scene from the handbook",
          "手冊中的備餐過程人物畫面。",
          "Meal prep scene from the handbook.",
        ),
        galleryImage(
          "assets/photos/dec-meals-handbook-service.jpg",
          "街友送餐公益服務發送畫面",
          "Meal distribution scene from the handbook",
          "手冊中的送餐現場畫面。",
          "Meal distribution scene from the handbook.",
        ),
      ],
    }),
    createPhotoEvent({
      id: "2026-01",
      year: 2026,
      month: 1,
      order: 8,
      title: localized("頒獎典禮", "Award Ceremony"),
      subtitle: localized("學長姐和新一屆獎學生在頒獎典禮正式見面。", "Senior members and the new scholarship recipients meet at the ceremony."),
      folder: localized("2026年1月頒獎典禮", "January 2026 — Award Ceremony"),
      date: "2026/1/17",
      location: localized("2026.01.17 頒獎典禮", "2026.01.17 Award Ceremony"),
      accent: "#ab5f4f",
      coverSrc: "assets/photos/jan-awards-event-02.jpg",
      coverAlt: localized("頒獎典禮台上多人合照", "Award ceremony stage group photo"),
      summary: localized(
        "1 月的頒獎典禮，是與新一屆獎學生正式見面的場合，學長姐也一同參與司儀與頒獎工作。",
        "January's award ceremony is the first formal meeting with the new scholarship recipients, with senior members helping as MCs and presenters.",
      ),
      highlights: localizedList(
        ["公開相簿", "Public album"],
        ["頒獎典禮", "Award ceremony"],
        ["舞台紀錄", "Stage moments"],
      ),
      availability: localized(
        "這場典禮讓新一屆獎學生與學長姐正式相見。",
        "The ceremony formally brings new recipients and senior members together.",
      ),
      gallery: [
        galleryImage(
          "assets/photos/jan-awards-event-01.jpg",
          "頒獎典禮台上合照",
          "Award ceremony group photo on stage",
          "台上合照。",
          "Group photo on stage.",
        ),
        galleryImage(
          "assets/photos/jan-awards-event-02.jpg",
          "頒獎典禮舞台全景",
          "Wide stage view of the award ceremony",
          "舞台全景。",
          "Wide stage view.",
        ),
        galleryImage(
          "assets/photos/jan-awards-event-03.jpg",
          "頒獎典禮扶輪旗幟合照",
          "Stage photo with Rotary banners",
          "扶輪旗幟合照。",
          "Group photo with Rotary banners.",
        ),
        galleryImage(
          "assets/photos/jan-awards-event-04.jpg",
          "頒獎典禮近景合照",
          "Closer stage group photo at the award ceremony",
          "近景合照。",
          "Closer group photo.",
        ),
        galleryImage(
          "assets/photos/jan-awards-event-05.jpg",
          "頒獎典禮頒獎畫面",
          "Award presentation scene on stage",
          "頒獎畫面。",
          "Award presentation scene.",
        ),
        galleryImage(
          "assets/photos/jan-awards-event-06.jpg",
          "頒獎典禮多人上台畫面",
          "Multiple recipients on stage at the award ceremony",
          "多人上台畫面。",
          "Multiple recipients on stage.",
        ),
        galleryImage(
          "assets/photos/jan-awards-event-07.jpg",
          "頒獎典禮舞台隊列畫面",
          "Stage lineup at the award ceremony",
          "舞台隊列畫面。",
          "Stage lineup scene.",
        ),
        galleryImage(
          "assets/photos/jan-awards-event-08.jpg",
          "頒獎典禮會場全景",
          "Auditorium-wide view of the award ceremony",
          "會場全景。",
          "Auditorium-wide view.",
        ),
        galleryImage(
          "assets/photos/jan-awards-event-09.jpg",
          "頒獎典禮全體台上畫面",
          "Full on-stage group at the award ceremony",
          "全體台上畫面。",
          "Full on-stage group.",
        ),
        galleryImage(
          "assets/photos/jan-awards-event-10.jpg",
          "頒獎典禮典禮現場畫面",
          "Ceremony hall view during the award ceremony",
          "典禮現場畫面。",
          "Ceremony hall view.",
        ),
      ],
      links: [createLocalizedLink("2026.1.17 公開相簿", "Public album · 2026.1.17", "https://drive.google.com/drive/folders/1Kle3PPCBJu9I4H-XeVltSkrMaHs-E3gs?usp=drive_link")],
    }),
    createPhotoEvent({
      id: "2026-02",
      year: 2026,
      month: 2,
      order: 9,
      title: localized("北區｜新北區聯合小迎新", "Joint Mini Welcome Event"),
      subtitle: localized("用破冰與分組活動，讓新生更快熟悉彼此。", "Icebreakers and small-group activities help everyone get acquainted."),
      folder: localized("2026年2月小迎新", "February 2026 — Mini Welcome Event"),
      date: "2026/2/7",
      location: localized("迎新活動", "Welcome event"),
      accent: "#8a5b61",
      coverSrc: "assets/photos/feb-welcome-group-photo.jpg",
      coverAlt: localized("北區新北區聯合小迎新大合照", "Group photo from the joint mini welcome event"),
      summary: localized(
        "2 月的小迎新以破冰與分組交流為主，讓新生更認識扶輪，也更自在地走進聯誼會。",
        "February's mini welcome event centers on icebreakers and group exchange, helping new members settle into Rotary and the fellowship with ease.",
      ),
      highlights: localizedList(
        ["小迎新", "Mini welcome"],
        ["新夥伴", "New members"],
        ["關係建立", "Connection building"],
      ),
      availability: localized(
        "破冰與交流，是這場小迎新的主軸。",
        "Icebreakers and conversation set the tone for this mini welcome event.",
      ),
      gallery: [
        galleryImage(
          "assets/photos/feb-welcome-group-photo.jpg",
          "北區新北區聯合小迎新大合照",
          "Group photo from the joint mini welcome event",
          "小迎新大合照。",
          "Mini welcome group photo.",
        ),
        galleryImage(
          "assets/photos/feb-welcome-opening-photo-01.jpg",
          "北區新北區聯合小迎新共同主席開場畫面",
          "Joint mini welcome opening moment with the co-chairs",
          "共同主席宣布小迎新開始的現場畫面。",
          "The co-chairs opening the mini welcome event.",
        ),
        galleryImage(
          "assets/photos/feb-welcome-bell-photo-01.jpg",
          "北區新北區聯合小迎新敲鐘開場畫面",
          "Bell-ringing opening moment at the joint mini welcome event",
          "共同主席敲鐘宣布活動開始。",
          "The co-chairs ring the bell to open the event.",
        ),
        galleryImage(
          "assets/photos/feb-welcome-sharing-photo-01.jpg",
          "北區新北區聯合小迎新分享互動畫面",
          "Sharing moment at the joint mini welcome event",
          "現場交流畫面。",
          "A candid exchange during the event.",
        ),
        galleryImage(
          "assets/photos/feb-welcome-sharing-photo-02.jpg",
          "北區新北區聯合小迎新自我介紹畫面",
          "Self-introduction moment at the joint mini welcome event",
          "新夥伴自我介紹的現場畫面。",
          "A self-introduction moment from the event.",
        ),
        galleryImage(
          "assets/photos/feb-welcome-icebreaker-photo-01.jpg",
          "北區新北區聯合小迎新分組互動畫面",
          "Group interaction at the joint mini welcome event",
          "分組活動中的互動畫面。",
          "A group interaction during the activities.",
        ),
        galleryImage(
          "assets/photos/feb-welcome-icebreaker-photo-02.jpg",
          "北區新北區聯合小迎新交流畫面",
          "Conversation moment at the joint mini welcome event",
          "現場交流與互動的畫面。",
          "A conversation and interaction moment during the event.",
        ),
        galleryImage(
          "assets/photos/feb-welcome-host-photo-02.jpg",
          "北區新北區聯合小迎新主持帶領畫面",
          "Host leading the joint mini welcome event",
          "主持帶領活動進行的畫面。",
          "The host leading the event.",
        ),
        galleryImage(
          "assets/photos/feb-welcome-sharing-photo-03.jpg",
          "北區新北區聯合小迎新分享畫面",
          "Speaker sharing at the joint mini welcome event",
          "分享環節畫面。",
          "A moment from the sharing session.",
        ),
        galleryImage(
          "assets/photos/feb-welcome-group-handbook.jpg",
          "北區新北區聯合小迎新手冊團體畫面",
          "Mini welcome group photo from the handbook",
          "手冊團體畫面。",
          "Group photo from the handbook.",
        ),
        galleryImage(
          "assets/photos/feb-welcome-handbook-page.jpg",
          "北區新北區聯合小迎新手冊月份頁",
          "February page from the mini welcome handbook",
          "2 月手冊頁。",
          "February handbook spread.",
        ),
      ],
    }),
    createPhotoEvent({
      id: "2026-03",
      year: 2026,
      month: 3,
      order: 10,
      title: localized("五區聯合大迎新", "Five-District Welcome Camp"),
      subtitle: localized("兩天一夜的迎新安排了講座、破冰、夜市和大地遊戲。", "The two-day welcome camp includes talks, icebreakers, a night market, and field games."),
      folder: localized("2026年3月大迎新", "March 2026 — Five-District Welcome Camp"),
      date: "2026/3/7-8",
      location: localized("迎新活動", "Welcome event"),
      accent: "#8b5d70",
      coverSrc: "assets/photos/march-welcome-group-photo.jpg",
      coverAlt: localized("五區聯合大迎新戶外大合照", "Outdoor group photo from the five-district welcome camp"),
      summary: localized(
        "五區夥伴共同籌辦兩天一夜的大迎新，講座、破冰、夜市與大地遊戲，把不同區的新生聚在一起。",
        "Members from all five districts shape this two-day welcome camp with talks, icebreakers, a night market, and field games that bring new members together.",
      ),
      highlights: localizedList(
        ["大迎新", "Welcome camp"],
        ["新生加入", "New members"],
        ["五區聚會", "Five districts"],
      ),
      availability: localized(
        "兩天一夜的大迎新，讓五區新生在活動裡熟悉彼此。",
        "The overnight camp gives new members across the five districts time to get to know one another.",
      ),
      gallery: [
        galleryImage(
          "assets/photos/march-welcome-group-photo.jpg",
          "五區聯合大迎新戶外大合照",
          "Outdoor group photo from the five-district welcome camp",
          "大迎新戶外大合照。",
          "Outdoor welcome camp group photo.",
        ),
        galleryImage(
          "assets/photos/march-welcome-handbook-cover.jpg",
          "五區聯合大迎新手冊大合照",
          "Welcome camp group photo from the handbook",
          "手冊中的大迎新合照。",
          "Welcome camp group photo from the handbook.",
        ),
        galleryImage(
          "assets/photos/march-welcome-handbook-page.jpg",
          "五區聯合大迎新手冊月份頁",
          "March page from the welcome camp handbook",
          "3 月手冊頁。",
          "March handbook spread.",
        ),
      ],
    }),
    createPhotoEvent({
      id: "2026-04",
      year: 2026,
      month: 4,
      order: 11,
      title: localized("淨灘公益沙排例會", "Beach Cleanup & Sand Volleyball Meeting"),
      subtitle: localized("淨灘、沙排與溫泉排在同一天。", "Cleanup, volleyball, and hot springs share the same day."),
      folder: localized("2026年4月淨灘例會", "April 2026 — Beach Cleanup Meeting"),
      date: "2026/4/11",
      location: localized("白宮行館 / 海邊淨灘", "White House Resort / beach cleanup"),
      accent: "#32707d",
      coverSrc: "assets/photos/april-beach-group-photo.jpg",
      coverAlt: localized("淨灘公益沙排例會海邊大合照", "Beach group photo from the cleanup meeting"),
      summary: localized(
        "4 月前往白宮行館進行淨灘，之後接著沙排與休息行程，讓公益與相聚放在同一個午後。",
        "April brings the group to White House Resort for a beach cleanup, followed by volleyball and time to unwind in the same afternoon.",
      ),
      highlights: localizedList(
        ["淨灘例會", "Beach cleanup"],
        ["海邊行動", "Seaside service"],
        ["大合照", "Group photo"],
      ),
      availability: localized(
        "這一天從海邊淨灘開始，也把相聚留到行程最後。",
        "The day begins with cleanup at the shore and holds space for time together afterward.",
      ),
      gallery: [
        galleryImage(
          "assets/photos/april-beach-group-photo.jpg",
          "淨灘公益沙排例會海邊大合照",
          "Beach group photo from the cleanup meeting",
          "淨灘例會海邊大合照。",
          "Beach cleanup group photo.",
        ),
        galleryImage(
          "assets/photos/april-beach-cleanup-photo-01.jpg",
          "淨灘例會海邊撿拾垃圾畫面",
          "Beach cleanup action on the shore",
          "海邊淨灘過程。",
          "A moment from the beach cleanup.",
        ),
        galleryImage(
          "assets/photos/april-beach-cleanup-photo-02.jpg",
          "淨灘例會海邊合影",
          "Beach cleanup photo by the shore",
          "淨灘後的海邊合影。",
          "A group photo by the shore after the cleanup.",
        ),
        galleryImage(
          "assets/photos/april-beach-cleanup-photo-03.jpg",
          "淨灘例會成果合影",
          "Beach cleanup results group photo",
          "淨灘成果合影。",
          "A group photo with the cleanup results.",
        ),
        galleryImage(
          "assets/photos/april-beach-handbook-page.jpg",
          "淨灘例會手冊月份頁",
          "April page from the beach cleanup handbook",
          "4 月手冊頁。",
          "April handbook spread.",
        ),
      ],
    }),
    createPhotoEvent({
      id: "2026-05",
      year: 2026,
      month: 5,
      order: 12,
      title: localized("直播產業職業例會", "Livestream Industry Meeting"),
      subtitle: localized("從直播工作談到自媒體判讀與資訊辨識。", "A talk on livestream work, media literacy, and reading information carefully."),
      folder: localized("2026年5月直播產業職業例會", "May 2026 — Livestream Industry Meeting"),
      date: "2026/5/31",
      location: localized("直播產業職業例會", "Livestream industry meeting"),
      accent: "#256877",
      coverSrc: "assets/photos/may-live-event-01.jpg",
      coverAlt: localized("直播產業職業例會大合照", "Livestream industry meeting group photo"),
      summary: localized(
        "5 月邀請主播夏晧軒分享直播工作經驗，也從自媒體、詐騙與虛假影像談到資訊辨識。",
        "May's session invites host Hsia Hao-Hsuan to share livestream industry experience while opening a conversation about media literacy, scams, and manipulated images.",
      ),
      highlights: localizedList(
        ["直播產業", "Livestream industry"],
        ["活動現場", "Event photos"],
        ["主題講座", "Talk session"],
      ),
      availability: localized(
        "這場例會把直播產業經驗與媒體判讀放在同一場講座裡。",
        "The meeting places livestream industry experience and media literacy in the same lecture.",
      ),
      gallery: [
        galleryImage(
          "assets/photos/may-live-event-01.jpg",
          "直播產業職業例會大合照",
          "Livestream industry meeting group photo",
          "直播產業職業例會大合照。",
          "Group photo from the livestream industry meeting.",
        ),
        galleryImage(
          "assets/photos/may-live-event-02.jpg",
          "直播產業職業例會主持畫面",
          "Hosts at the livestream industry meeting",
          "主持畫面。",
          "Hosts on stage.",
        ),
        galleryImage(
          "assets/photos/may-live-event-03.jpg",
          "直播產業職業例會台前分享畫面",
          "Panel sharing at the livestream industry meeting",
          "台前分享畫面。",
          "Panel sharing scene.",
        ),
        galleryImage(
          "assets/photos/may-live-event-04.jpg",
          "直播產業職業例會講座全景",
          "Wide lecture view from the livestream industry meeting",
          "講座全景。",
          "Wide view of the lecture.",
        ),
        galleryImage(
          "assets/photos/may-live-event-05.jpg",
          "直播產業職業例會簡報分享畫面",
          "Slide presentation at the livestream industry meeting",
          "簡報分享畫面。",
          "Slide presentation scene.",
        ),
        galleryImage(
          "assets/photos/may-live-event-06.jpg",
          "直播產業職業例會主講畫面",
          "Speaker close-up at the livestream industry meeting",
          "主講畫面。",
          "Speaker close-up.",
        ),
        galleryImage(
          "assets/photos/may-live-event-07.jpg",
          "直播產業職業例會互動畫面",
          "Discussion moment at the livestream industry meeting",
          "現場互動畫面。",
          "Discussion moment.",
        ),
        galleryImage(
          "assets/photos/may-live-event-08.jpg",
          "直播產業職業例會合影畫面",
          "Guest photo at the livestream industry meeting",
          "會後合影畫面。",
          "Guest photo after the talk.",
        ),
        galleryImage(
          "assets/photos/may-live-event-09.jpg",
          "直播產業職業例會來賓合照",
          "Guest photo in front of the title slide",
          "來賓合照。",
          "Guest photo in front of the title slide.",
        ),
        galleryImage(
          "assets/photos/may-live-event-10.jpg",
          "直播產業職業例會交流畫面",
          "Candid conversation after the livestream industry meeting",
          "活動後交流畫面。",
          "Candid conversation after the event.",
        ),
      ],
    }),
    createPhotoEvent({
      id: "2026-06",
      year: 2026,
      month: 6,
      order: 13,
      title: localized("雙北交接典禮", "Taipei & New Taipei Handover Ceremony"),
      subtitle: localized("詠文與婉華在 6 月底完成卸任，替 25-26 年度收尾。", "Victoria and Hannah complete their term at the end of June and bring the 25-26 year to its close."),
      folder: localized("2026年6月雙北交接典禮", "June 2026 — Taipei & New Taipei Handover Ceremony"),
      date: "2026/6/27",
      location: localized("雙北交接典禮", "Taipei & New Taipei handover ceremony"),
      accent: "#8c7d9e",
      coverSrc: "assets/photos/june-2026-handover-group-photo.jpg",
      coverAlt: localized("雙北交接典禮全場合照", "Full group photo from the Taipei and New Taipei handover ceremony"),
      summary: localized(
        "6 月底的雙北交接典禮，記下詠文與婉華卸任的時刻，也替 25-26 年度留下最後一張年度合照。",
        "The late-June handover ceremony marks Victoria and Hannah stepping down and leaves the year with one final group portrait.",
      ),
      highlights: localizedList(
        ["雙北交接", "Dual-district handover"],
        ["年度卸任", "End of term"],
        ["交棒時刻", "Passing the baton"],
      ),
      availability: localized(
        "這場交接典禮，為 25-26 年度留下一個正式而完整的句點。",
        "The ceremony gives the 25-26 year a formal and complete closing note.",
      ),
      gallery: [
        galleryImage(
          "assets/photos/june-2026-handover-group-photo.jpg",
          "雙北交接典禮全場合照",
          "Full group photo from the Taipei and New Taipei handover ceremony",
          "雙北交接典禮全場合照。",
          "Full group photo from the handover ceremony.",
        ),
        galleryImage(
          "assets/photos/june-2026-handover-speech.jpg",
          "雙北交接典禮上詠文致詞畫面",
          "Victoria speaking at the handover ceremony",
          "詠文在典禮上的致詞畫面。",
          "Victoria speaking during the ceremony.",
        ),
        galleryImage(
          "assets/photos/june-2026-handover-portrait.jpg",
          "雙北交接典禮現場側拍",
          "Portrait from the handover ceremony venue",
          "雙北交接典禮現場側拍。",
          "A portrait from the handover ceremony venue.",
        ),
      ],
    }),
  ];

  function buildArchiveData(language = DEFAULT_LANGUAGE) {
    const safeLanguage = SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
    const orderedEvents = activityEvents
      .map((event) => normalizeEvent(event, safeLanguage))
      .sort((leftEvent, rightEvent) => leftEvent.order - rightEvent.order);
    const eventById = new Map(orderedEvents.map((event) => [event.id, event]));
    const years = [...new Set(orderedEvents.map((event) => event.year))];
    const monthKeys = [...new Set(orderedEvents.map((event) => `${event.year}-${padNumber(event.month)}`))];
    const photoMonthKeys = new Set(
      orderedEvents
        .filter((event) => event.visualMode === "photo")
        .map((event) => `${event.year}-${padNumber(event.month)}`),
    );

    const filters = [
      {
        id: "all",
        label: resolveLocalizedValue(FILTER_LABELS.all, safeLanguage),
        apply: (items) => items,
      },
      ...years.map((year) => ({
        id: String(year),
        label: String(year),
        apply: (items) => items.filter((item) => item.year === year),
      })),
    ];

    const filterById = new Map(filters.map((filter) => [filter.id, filter]));
    const stats = {
      total: monthKeys.length,
      startLabel: orderedEvents[0]?.label || "",
      endLabel: orderedEvents[orderedEvents.length - 1]?.label || "",
      realPhotoMonths: photoMonthKeys.size,
    };

    return {
      orderedEvents,
      eventById,
      filters,
      filterById,
      stats,
    };
  }

  const archiveCache = new Map();

  function getArchiveData(language = DEFAULT_LANGUAGE) {
    const safeLanguage = SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;

    if (!archiveCache.has(safeLanguage)) {
      archiveCache.set(safeLanguage, buildArchiveData(safeLanguage));
    }

    return archiveCache.get(safeLanguage);
  }

  window.ACTIVITY_ARCHIVE_DATA = {
    defaultLanguage: DEFAULT_LANGUAGE,
    languages: [...SUPPORTED_LANGUAGES],
    getArchiveData,
  };
})();
