(() => {
  const DEFAULT_LANGUAGE = "zh-TW";
  const SUPPORTED_LANGUAGES = Object.freeze(["zh-TW", "en"]);

  const STATUS_LABELS = Object.freeze({
    photo: localized("精選照片", "Featured photos"),
    document: localized("文件封面", "Document cover"),
    placeholder: localized("待補照片", "Photo coming soon"),
  });

  const FILTER_LABELS = Object.freeze({
    all: localized("全部活動", "All events"),
    photoFirst: localized("精選照片優先", "Photos first"),
  });

  const MODE_PRIORITY = Object.freeze({
    photo: 0,
    document: 1,
    placeholder: 2,
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

  function createChapterLabel(order, language) {
    return language === "en" ? `Month ${padNumber(order)}` : `第 ${padNumber(order)} 月`;
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
      chapterLabel: createChapterLabel(event.order, language),
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
      subtitle: localized("6 月從交接典禮和九份畢旅開始。", "June begins with the handover ceremony and the Jiufen trip."),
      folder: localized("6月活動＿交接典禮＆九份畢旅", "June Activities — Handover Ceremony & Jiufen Trip"),
      date: localized("2025/6/28 聯合交接典禮・2025/6/28-29 九份畢旅", "2025/6/28 Joint Handover Ceremony · 2025/6/28-29 Jiufen Trip"),
      location: localized("交接典禮 / 九份", "Handover Ceremony / Jiufen"),
      accent: "#b06f4a",
      coverSrc: "assets/photos/june-handover-handbook-cover.jpg",
      coverAlt: localized("6月交接典禮手冊人物合照", "June handbook portrait from the handover ceremony"),
      summary: localized(
        "6 月有交接典禮和九份畢旅。先完成交接與上任，再一起到九份走走，替新年度揭開序幕。",
        "June includes the handover ceremony and the Jiufen trip. The new term begins with the formal handover, then continues with a shared trip to Jiufen.",
      ),
      highlights: localizedList(
        ["年度交接", "Handover"],
        ["九份畢旅", "Jiufen trip"],
        ["兩位會長", "Both presidents"],
        ["大合照優先", "Group photos first"],
      ),
      availability: localized(
        "交接典禮完成正式交接，九份畢旅也讓大家多了一點相處時間。",
        "The handover ceremony marks the official transition, and the Jiufen trip gives everyone more time together at the start of the year.",
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
      subtitle: localized("在宜蘭把新年度的默契先建立起來。", "The new team builds its rhythm together in Yilan."),
      folder: localized("7月活動＿幹部訓練", "July Activities — Leadership Training"),
      date: "2025/7/19-20",
      location: localized("宜蘭", "Yilan"),
      accent: "#766247",
      coverSrc: "assets/photos/july-training-handbook-cover.jpg",
      coverAlt: localized("7月幹部訓練手冊人物合照", "July leadership training portrait from the handbook"),
      summary: localized(
        "大家一起到宜蘭進行幹部訓練，用遊戲、協作和交流更了解彼此，也先把新年度的合作默契拉起來。",
        "The group heads to Yilan for leadership training, using games, teamwork, and conversation to get to know one another and build early momentum for the new year.",
      ),
      highlights: localizedList(
        ["幹部訓練", "Leadership training"],
        ["宜蘭", "Yilan"],
        ["年度默契", "Team chemistry"],
      ),
      availability: localized(
        "幹部訓練用兩天一夜的相處，把大家的默契先暖起來。",
        "Two days together help the officers settle into a shared pace before the year fully starts.",
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
      subtitle: localized("五區會長正式上任，也安排論壇分享。", "The five districts mark their handover and share a forum together."),
      folder: localized("8月五區聯合交接暨菁英論壇", "August Activities — Five-District Handover & Leadership Forum"),
      date: "2025/8/16",
      location: localized("五區聯合活動", "Five-district joint event"),
      accent: "#36547a",
      coverSrc: "assets/photos/aug-forum-meeting-photo.jpg",
      coverAlt: localized("五區交接暨菁英論壇現場會議畫面", "Forum meeting scene from the five-district handover"),
      summary: localized(
        "8 月是五區交接暨菁英論壇。除了共同見證會長上任，也安排不同領域的講者分享，讓大家交流近況。",
        "August centers on the five-district handover and leadership forum. Alongside the formal handover, speakers from different fields share their work and spark conversations across districts.",
      ),
      highlights: localizedList(
        ["五區聯合", "Five districts"],
        ["交接", "Handover"],
        ["菁英論壇", "Leadership forum"],
      ),
      availability: localized(
        "大家一起參加五區交接暨菁英論壇，見證會長上任，也聽講者分享。",
        "Members join the five-district handover and forum to witness the new term and hear the invited speakers.",
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
      subtitle: localized("先聽健康分享，再一起下水。", "A wellness talk first, then everyone gets in the water."),
      folder: localized("10月活動_游泳例會", "October Activities — Swimming Meeting"),
      date: "2025/10/12",
      location: localized("運動健康例會", "Sports and wellness meeting"),
      accent: "#336987",
      coverSrc: "assets/photos/oct-swim-group-handbook.jpg",
      coverAlt: localized("游泳例會手冊擷取團體畫面", "Swimming meeting group photo from the handbook"),
      summary: localized(
        "這場例會先由獎學生胡祐笙分享健康衛教，提醒大家在運動前暖身、避免受傷，之後再一起到泳池活動。",
        "This meeting begins with a wellness talk by scholarship student Hu You-Sheng, covering warm-ups and injury prevention before everyone moves to the pool.",
      ),
      highlights: localizedList(
        ["運動健康", "Wellness"],
        ["例會", "Monthly meeting"],
        ["活動文件", "Handbook visuals"],
      ),
      availability: localized(
        "先聽健康衛教分享，再一起下水。",
        "The group starts with a health talk, then heads into the pool together.",
      ),
      gallery: [
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
      id: "2025-11",
      year: 2025,
      month: 11,
      order: 6,
      title: localized("紡織例會・捐血例會・區塊鏈例會", "Textile Meeting · Blood Donation Meeting · Blockchain Meeting"),
      subtitle: localized("11 月連著辦了手作、公益和科技三場例會。", "November brings three meetings on craft, public service, and technology."),
      folder: localized("11 月三場主題例會", "November Activities — Three Themed Meetings"),
      date: localized("2025/11/8・2025/11/15・2025/11/29", "2025/11/8 · 2025/11/15 · 2025/11/29"),
      location: localized(
        "11/08 紡織例會 ・ 11/15 捐血例會 ・ 11/29 區塊鏈職業例會",
        "11/08 Textile Meeting · 11/15 Blood Donation Meeting · 11/29 Blockchain Meeting",
      ),
      accent: "#7c5a68",
      coverSrc: "assets/photos/nov-textile-group-photo.jpg",
      coverAlt: localized("紡織例會手作品展示畫面", "Textile meeting display photo"),
      summary: localized(
        "11 月有三場不同主題的例會：8 日紡織手作、15 日捐血公益、29 日區塊鏈分享，各自分開進行。",
        "November includes three separate meetings: a textile workshop on the 8th, a blood donation service event on the 15th, and a blockchain session on the 29th.",
      ),
      highlights: localizedList(
        ["紡織", "Textile"],
        ["捐血", "Blood donation"],
        ["區塊鏈", "Blockchain"],
        ["月內三場", "Three events"],
      ),
      availability: localized(
        "11 月接連辦了紡織、捐血和區塊鏈三場例會。",
        "Three separate meetings are held in November, covering textile work, blood donation, and blockchain.",
      ),
      activityBlocks: [
        {
          date: "2025/11/8",
          title: localized("紡織例會", "Textile Meeting"),
          summary: localized(
            "由瑤池藝術工作室創辦人、獎學生賴綉丹帶大家做飲料提袋，也分享自己的紡織設計專長。",
            "Scholarship student Lai Hsiu-Dan, founder of Yaochi Art Studio, leads a drink-bag workshop and shares her textile design work.",
          ),
          imageSrc: "assets/photos/nov-textile-group-photo.jpg",
          imageAlt: localized("紡織例會手作品展示畫面", "Textile meeting display photo"),
          imageCaption: localized("紡織例會現場畫面", "Textile meeting scene"),
          tags: localizedList(["紡織手作", "Textile workshop"], ["飲料提袋", "Drink-bag craft"]),
        },
        {
          date: "2025/11/15",
          title: localized("捐血例會", "Blood Donation Meeting"),
          summary: localized(
            "11 月中的捐血例會，大家用實際行動參與公益。",
            "Mid-November's blood donation meeting turns public service into a shared action on the ground.",
          ),
          imageSrc: "assets/photos/nov-blood-donation-group-photo.jpg",
          imageAlt: localized("捐血例會現場合照", "Blood donation meeting group photo"),
          imageCaption: localized("捐血例會現場畫面", "Blood donation meeting scene"),
          tags: localizedList(["公益參與", "Public service"], ["社會服務", "Community outreach"]),
        },
        {
          date: "2025/11/29",
          title: localized("區塊鏈例會", "Blockchain Meeting"),
          summary: localized(
            "邀請 Paper Plane 創辦人涂立青分享區塊鏈的由來、發展與基本觀念。",
            "Paper Plane founder Tu Li-Ching is invited to introduce the background, development, and core ideas behind blockchain.",
          ),
          imageSrc: "assets/photos/nov-blockchain-group-photo.jpg",
          imageAlt: localized("區塊鏈例會現場團體畫面", "Blockchain meeting group photo"),
          imageCaption: localized("區塊鏈例會現場畫面", "Blockchain meeting scene"),
          tags: localizedList(["區塊鏈", "Blockchain"], ["新興科技", "Emerging tech"]),
        },
      ],
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
        galleryImage(
          "assets/photos/nov-blood-donation-group-photo.jpg",
          "捐血例會現場合照",
          "Blood donation meeting group photo",
          "捐血例會現場合照。",
          "Blood donation meeting group photo.",
        ),
        galleryImage(
          "assets/photos/nov-blockchain-group-photo.jpg",
          "區塊鏈例會現場團體畫面",
          "Blockchain meeting group photo",
          "區塊鏈例會現場畫面。",
          "Blockchain meeting scene.",
        ),
      ],
    }),
    createPhotoEvent({
      id: "2025-12",
      year: 2025,
      month: 12,
      order: 7,
      title: localized("街友送餐公益服務", "Meal Service for Unhoused People"),
      subtitle: localized("從市場採買到分組料理與北車發送，把歲末關懷做成實際行動。", "Shopping, cooking, and meal delivery turn year-end care into action."),
      folder: localized("12月例會_街友送餐", "December Activities — Meal Service"),
      date: "2025/12/13",
      location: localized("街友送餐 / 社會服務", "Meal service / community outreach"),
      accent: "#93604f",
      coverSrc: "assets/photos/dec-meals-handbook-cover.jpg",
      coverAlt: localized("街友送餐公益服務手冊人物合照", "Meal service portrait from the handbook"),
      summary: localized(
        "街友送餐是聯誼會固定會辦的例會之一。大家一早到市場採買，再分組料理，最後到北車發送給街友。",
        "This meal service is one of the fellowship's recurring service activities. Members start at the market, cook in teams, and finish by distributing meals near Taipei Main Station.",
      ),
      highlights: localizedList(
        ["街友送餐", "Meal service"],
        ["社會服務", "Community outreach"],
        ["歲末關懷", "Year-end care"],
      ),
      availability: localized(
        "從採買、備餐到送餐，大家一起完成這場歲末關懷。",
        "From shopping to prep to delivery, the whole event is carried out together as a year-end act of care.",
      ),
      gallery: [
        galleryImage(
          "assets/photos/dec-meals-handbook-cover.jpg",
          "街友送餐公益服務手冊人物合照",
          "Meal service portrait from the handbook",
          "街友送餐志工合照。",
          "Volunteer group photo.",
        ),
        galleryImage(
          "assets/photos/dec-meals-handbook-group-2.jpg",
          "街友送餐公益服務備餐人物畫面",
          "Meal prep scene from the handbook",
          "備餐過程人物畫面。",
          "Meal prep scene.",
        ),
        galleryImage(
          "assets/photos/dec-meals-handbook-service.jpg",
          "街友送餐公益服務發送畫面",
          "Meal distribution scene from the handbook",
          "送餐現場畫面。",
          "Meal distribution scene.",
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
      coverSrc: "assets/photos/jan-awards-handbook-cover.jpg",
      coverAlt: localized("頒獎典禮手冊人物合照", "Award ceremony portrait from the handbook"),
      summary: localized(
        "這場頒獎典禮是和新一屆獎學生第一次正式見面，學長姐也擔任司儀與遞獎人員，一起完成整場典禮。",
        "The award ceremony is the first formal meeting with the new scholarship recipients. Senior members also help run the event as MCs and award presenters.",
      ),
      highlights: localizedList(
        ["公開相簿串接", "Public album"],
        ["頒獎典禮", "Award ceremony"],
        ["舞台現場", "Stage moments"],
      ),
      availability: localized(
        "頒獎典禮讓學長姐和新一屆獎學生正式見面，也把聯誼會的傳承接下去。",
        "The ceremony formally brings senior members and new recipients together while carrying the fellowship into the next year.",
      ),
      gallery: [
        galleryImage(
          "assets/photos/jan-awards-handbook-cover.jpg",
          "頒獎典禮手冊人物合照",
          "Award ceremony portrait from the handbook",
          "頒獎典禮合照。",
          "Award ceremony group photo.",
        ),
        galleryImage(
          "assets/photos/jan-awards-handbook-page.jpg",
          "頒獎典禮手冊月份頁",
          "January page from the award ceremony handbook",
          "1 月手冊頁。",
          "January handbook spread.",
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
      subtitle: localized("用破冰遊戲和分組活動，讓新生快一點認識扶輪與聯誼會。", "Icebreakers and group activities help new members get to know Rotary faster."),
      folder: localized("2026年2月小迎新", "February 2026 — Mini Welcome Event"),
      date: "2026/2/7",
      location: localized("迎新活動", "Welcome event"),
      accent: "#8a5b61",
      coverSrc: "assets/photos/feb-welcome-group-photo.jpg",
      coverAlt: localized("北區新北區聯合小迎新大合照", "Group photo from the joint mini welcome event"),
      summary: localized(
        "這場小迎新用分組活動和破冰遊戲，讓新生更了解扶輪與獎學生聯誼會，也更快熟起來。",
        "This mini welcome event uses icebreakers and small-group activities to help new members get familiar with Rotary and the fellowship.",
      ),
      highlights: localizedList(
        ["小迎新", "Mini welcome"],
        ["新夥伴", "New members"],
        ["關係建立", "Connection building"],
      ),
      availability: localized(
        "用分組活動和破冰遊戲，讓新生更了解扶輪與聯誼會。",
        "Group activities and icebreakers help new members get to know Rotary and the fellowship.",
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
      subtitle: localized("兩天一夜從講座、破冰、夜市到大地遊戲，讓新生慢慢熟起來。", "A two-day welcome camp built around talks, icebreakers, night markets, and team games."),
      folder: localized("2026年3月大迎新", "March 2026 — Five-District Welcome Camp"),
      date: "2026/3/7-8",
      location: localized("迎新活動", "Welcome event"),
      accent: "#8b5d70",
      coverSrc: "assets/photos/march-welcome-group-photo.jpg",
      coverAlt: localized("五區聯合大迎新戶外大合照", "Outdoor group photo from the five-district welcome camp"),
      summary: localized(
        "五個區的夥伴一起規劃這場兩天一夜的大迎新，從講座、破冰、夜市到第二天的大地遊戲，讓新生在兩天內熟悉彼此。",
        "Members from all five districts organize this two-day welcome camp, moving from talks and icebreakers to the night market and second-day field games so new members can get familiar quickly.",
      ),
      highlights: localizedList(
        ["大迎新", "Welcome camp"],
        ["新生加入", "New members"],
        ["社群擴張", "Growing community"],
      ),
      availability: localized(
        "五區夥伴一起規劃兩天一夜迎新，陪新生慢慢熟起來。",
        "The five districts plan the two-day welcome camp together and spend time helping new members settle in.",
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
      subtitle: localized("在白宮行館淨灘、打沙排、泡溫泉，把公益和交流排在同一天。", "Beach cleanup, volleyball, and hot springs all happen in one day."),
      folder: localized("2026年4月淨灘例會", "April 2026 — Beach Cleanup Meeting"),
      date: "2026/4/11",
      location: localized("白宮行館 / 海邊淨灘", "White House Resort / beach cleanup"),
      accent: "#32707d",
      coverSrc: "assets/photos/april-beach-group-photo.jpg",
      coverAlt: localized("淨灘公益沙排例會海邊大合照", "Beach group photo from the cleanup meeting"),
      summary: localized(
        "大家前往白宮行館淨灘，在海灘上撿拾垃圾，活動結束後再一起打沙排、泡溫泉。",
        "Everyone heads to White House Resort for a beach cleanup, then stays for sand volleyball and hot springs after the service work is done.",
      ),
      highlights: localizedList(
        ["淨灘例會", "Beach cleanup"],
        ["海邊行動", "Seaside service"],
        ["大合照", "Group photo"],
      ),
      availability: localized(
        "大家前往白宮行館淨灘、打沙排、泡溫泉，把公益和交流排在同一天。",
        "Beach cleanup, volleyball, and time together all take place on the same day at White House Resort.",
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
      title: localized("直播講座例會", "Livestream Talk Meeting"),
      subtitle: localized("從直播分享談到自媒體判讀，也聊怎麼辨識資訊。", "A livestream talk about media literacy, misinformation, and online content."),
      folder: localized("2026年5月直播例會", "May 2026 — Livestream Talk Meeting"),
      date: "2026/5/31",
      location: localized("直播形式例會", "Livestream meeting"),
      accent: "#256877",
      coverSrc: "assets/photos/may-live-handbook-cover.jpg",
      coverAlt: localized("直播講座例會手冊人物合照", "Livestream talk portrait from the handbook"),
      summary: localized(
        "這場直播講座邀請曾做過網路直播的主播夏晧軒分享經驗，也談到詐騙與虛假影片的辨識。",
        "This livestream talk invites host Hsia Hao-Hsuan to share firsthand livestream experience, while also discussing scams, deepfakes, and how to judge online content more carefully.",
      ),
      highlights: localizedList(
        ["直播例會", "Livestream meeting"],
        ["實拍活動照", "Event photos"],
        ["主題分享", "Themed talk"],
      ),
      availability: localized(
        "邀請主播夏晧軒分享直播經驗，也談自媒體判讀和資訊辨識。",
        "The speaker shares livestream experience while opening a discussion about media literacy and information judgment.",
      ),
      gallery: [
        galleryImage(
          "assets/photos/may-live-handbook-cover.jpg",
          "直播講座例會手冊人物合照",
          "Livestream talk portrait from the handbook",
          "直播講座例會人物合照。",
          "Livestream talk portrait.",
        ),
        galleryImage(
          "assets/photos/may-live-handbook-page.jpg",
          "直播講座例會手冊月份頁",
          "May page from the livestream talk handbook",
          "5 月手冊頁。",
          "May handbook spread.",
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
      {
        id: "photo-first",
        label: resolveLocalizedValue(FILTER_LABELS.photoFirst, safeLanguage),
        apply: (items) =>
          [...items].sort(
            (leftEvent, rightEvent) =>
              MODE_PRIORITY[leftEvent.visualMode] - MODE_PRIORITY[rightEvent.visualMode] ||
              leftEvent.order - rightEvent.order,
          ),
      },
    ];

    const filterById = new Map(filters.map((filter) => [filter.id, filter]));
    const stats = {
      total: orderedEvents.length,
      startLabel: orderedEvents[0]?.label || "",
      endLabel: orderedEvents[orderedEvents.length - 1]?.label || "",
      realPhotoMonths: orderedEvents.filter((event) => event.visualMode === "photo").length,
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
