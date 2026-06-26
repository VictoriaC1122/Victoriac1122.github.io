(() => {
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
    const dateLabel = event.date || label;

    return {
      ...event,
      label,
      dateLabel,
      statusLabel,
      chapterLabel: `Chapter ${padNumber(event.order)}`,
      frameCountLabel: `${event.gallery.length} Frames`,
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
      title: "北區與新北區聯合交接典禮・九份畢旅",
      subtitle: "從交接典禮到九份畢旅，替 2025-26 年度留下第一段共同回憶。",
      folder: "6月活動＿交接典禮＆九份畢旅",
      date: "2025/6/28 聯合交接典禮・2025/6/28-29 九份畢旅",
      location: "交接典禮 / 九份",
      accent: "#b06f4a",
      coverSrc: "assets/photos/june-handover-handbook-cover.jpg",
      coverAlt: "6月交接典禮手冊人物合照",
      summary:
        "手冊裡把這個月份分成「交接」與「九份畢旅」兩段：一邊是正式上任、交棒與年度感謝，一邊是在典禮後相約九份漫步老街、品茶與共遊，讓新年度從儀式感與同行情誼一起展開。",
      highlights: ["年度交接", "九份畢旅", "兩位會長", "大合照優先"],
      availability: "透過交接典禮的正式交棒與九份畢旅的相聚同行，替 2025-26 年度揭開充滿儀式感與情誼的開場。",
      gallery: [
        createImageAsset("assets/photos/june-handover-handbook-cover.jpg", "交接典禮手冊人物合照", {
          caption: "以手冊中的交接典禮人物合照作為 6 月主圖，保留正式上任與年度交棒的儀式感。",
        }),
        createImageAsset("assets/photos/june-handover-handbook-page.jpg", "交接典禮手冊月份頁", {
          caption: "保留手冊中的 6 月主頁，讓交接典禮的正式敘事和人物照片一起被看見。",
        }),
        createImageAsset("assets/photos/june-jiufen-handbook-group.jpg", "九份畢旅手冊團體畫面", {
          caption: "把手冊中的九份畢旅團體畫面留下來，延續 6 月交接後的相聚與旅行感。",
        }),
      ],
      links: [
        createLink("下載交接典禮手冊 PDF", "assets/downloads/handover-manual-2025.pdf", {
          download: true,
        }),
      ],
    }),
    createPhotoEvent({
      id: "2025-07",
      year: 2025,
      month: 7,
      order: 2,
      title: "北區新北區聯合幹部訓練",
      subtitle: "在宜蘭透過遊戲、協作與水上體驗，把幹部默契和信任感先建立起來。",
      folder: "7月活動＿幹部訓練",
      date: "2025/7/19-20",
      location: "宜蘭",
      accent: "#766247",
      coverSrc: "assets/photos/july-training-handbook-cover.jpg",
      coverAlt: "7月幹部訓練手冊人物合照",
      summary:
        "手冊寫到，大家一起到宜蘭包棟別墅進行幹部訓練，更深入了解扶輪，也透過遊戲、協作與交流活動增進彼此默契與感情，為新年度團隊奠定合作基礎。",
      highlights: ["幹部訓練", "宜蘭", "年度默契"],
      availability: "在宜蘭兩天一夜的幹部訓練中，透過遊戲、協作與交流活動，逐步建立團隊默契與彼此信任。",
      gallery: [
        createImageAsset("assets/photos/july-training-handbook-cover.jpg", "幹部訓練手冊人物合照", {
          caption: "把手冊中最完整的一張幹部訓練合照放在前面，保留 7 月最重要的團隊感。",
        }),
        createImageAsset("assets/photos/july-training-handbook-page.jpg", "幹部訓練手冊月份頁", {
          caption: "保留 7 月手冊頁，讓幹部訓練的活動畫面和當月敘事一起呈現。",
        }),
      ],
    }),
    createPhotoEvent({
      id: "2025-08",
      year: 2025,
      month: 8,
      order: 3,
      title: "五區交接暨菁英論壇",
      subtitle: "五區會長正式上任，也把聯誼會視野拉向更大的區域交流。",
      folder: "8月五區聯合交接暨菁英論壇",
      date: "2025/8/16",
      location: "五區聯合活動",
      accent: "#36547a",
      coverSrc: "assets/photos/aug-forum-meeting-photo.jpg",
      coverAlt: "五區交接暨菁英論壇現場會議畫面",
      summary:
        "手冊將 8 月定為「五區交接暨菁英論壇」，在五區夥伴共同見證會長上任之外，也透過跨領域講者分享，讓獎學生的視野與交流層次一同被拉開。",
      highlights: ["五區聯合", "交接", "菁英論壇"],
      availability: "五區夥伴在交接暨菁英論壇中共同見證會長上任，也藉由跨領域交流拓展獎學生的視野與連結。",
      gallery: [
        createImageAsset("assets/photos/aug-forum-meeting-photo.jpg", "五區交接暨菁英論壇現場會議畫面", {
          caption: "以現場會議畫面作為主圖，保留五區交接暨菁英論壇正式進行中的氛圍與年度儀式感。",
        }),
        createImageAsset("assets/photos/aug-forum-group-handbook.jpg", "五區交接暨菁英論壇手冊擷取團體畫面", {
          caption: "手冊中的團體畫面延續 8 月五區交接暨菁英論壇共同參與的集體氛圍。",
        }),
        createImageAsset("assets/photos/aug-forum-handbook-page.jpg", "五區交接暨菁英論壇手冊月份頁", {
          caption: "保留手冊原始月份頁，讓網站也能呈現 8 月在手冊中的完整敘事與排版。",
        }),
      ],
    }),
    createPhotoEvent({
      id: "2025-09",
      year: 2025,
      month: 9,
      order: 4,
      title: "扶輪聲林之王",
      subtitle: "在浪漫屋視聽歌唱城辦一場人人有獎、重在參與的趣味唱歌競賽。",
      folder: "9月活動__扶輪聲林之王",
      date: "2025/9/20",
      location: "浪漫屋視聽歌唱城",
      accent: "#69337a",
      coverSrc: "assets/photos/sep-singing-group-photo.jpg",
      coverAlt: "扶輪聲林之王現場主持與評審席畫面",
      summary:
        "手冊寫到，為了給獎學生們一個展示自我的舞台，9 月舉辦了趣味唱歌競賽，地點選在浪漫屋視聽歌唱城，復古歌舞廳讓大家夢回 80 年代，人人有獎、重在參與。",
      highlights: ["歌唱比賽", "舞台例會", "頒獎畫面", "現場實拍"],
      availability: "以趣味唱歌競賽打造展示自我的舞台，在復古歌舞廳裡人人有獎、重在參與，留下熱鬧又輕鬆的共同回憶。",
      gallery: [
        createImageAsset("assets/photos/sep-singing-group-photo.jpg", "扶輪聲林之王現場主持與評審席畫面", {
          caption: "改用現場主持與評審席畫面作為 9 月主圖，讓扶輪聲林之王回到真正的活動現場氛圍。",
        }),
        createImageAsset("assets/photos/sep-singing-handbook-page.jpg", "扶輪聲林之王手冊月份頁", {
          caption: "保留手冊中的 9 月整頁，讓頒獎與演唱人物照片一起被完整呈現。",
        }),
      ],
    }),
    createPhotoEvent({
      id: "2025-10",
      year: 2025,
      month: 10,
      order: 5,
      title: "游泳例會",
      subtitle: "先學健康衛教，再下水實練，讓例會真的把知識和運動連在一起。",
      folder: "10月活動_游泳例會",
      date: "2025/10/12",
      location: "運動健康例會",
      accent: "#336987",
      coverSrc: "assets/photos/oct-swim-group-handbook.jpg",
      coverAlt: "健康衛教游泳例會手冊擷取團體畫面",
      summary:
        "手冊提到，這場例會先由獎學生胡祐笙普及健康衛教知識，讓大家在運動前充分暖身、避免運動傷害，再在講座結束後一起到泳池實練、強身健體。",
      highlights: ["運動健康", "例會", "活動文件"],
      availability: "先由胡祐笙分享健康衛教知識，再透過游泳實練把運動安全、暖身觀念與強身健體真正連在一起。",
      gallery: [
        createImageAsset("assets/photos/oct-swim-group-handbook.jpg", "健康衛教游泳例會手冊擷取團體畫面", {
          caption: "從手冊裡先救出最清楚的一張團體畫面，讓 10 月月頁至少先回到有人、有活動的狀態。",
        }),
        createImageAsset("assets/photos/oct-swim-handbook-page.jpg", "健康衛教游泳例會手冊月份頁", {
          caption: "完整保留 10 月手冊頁，能同時看見講座、交流與月份敘事的原始版面。",
        }),
      ],
    }),
    createPhotoEvent({
      id: "2025-11",
      year: 2025,
      month: 11,
      order: 6,
      title: "紡織例會・捐血例會・區塊鏈例會",
      subtitle: "同一個月份裡，手作、公益與科技三條主題線並行展開。",
      folder: "11 月三場主題例會",
      date: "2025/11/8・2025/11/15・2025/11/29",
      location: "11/08 紡織例會 ・ 11/15 捐血例會 ・ 11/29 區塊鏈職業例會",
      accent: "#7c5a68",
      coverSrc: "assets/photos/nov-textile-group-photo.jpg",
      coverAlt: "紡織例會手作品展示畫面",
      summary:
        "手冊中 11 月橫跨三場不同主題的例會：8 日以紡織手作打開職涯分享，15 日以捐血行動延伸公益參與，29 日再從區塊鏈講座切入新興科技視角，讓這個月份同時保有創作、服務與知識交流的層次。",
      highlights: ["紡織", "捐血", "區塊鏈", "月內三場"],
      availability: "11 月把紡織手作、捐血公益與區塊鏈講座排成三場獨立例會，讓手作實作、社會服務與新知交流在同一個月份並行展開。",
      activityBlocks: [
        {
          date: "2025/11/8",
          title: "紡織例會",
          summary:
            "由瑤池藝術工作室創辦人、獎學生賴綉丹帶大家動手製作飲料提袋，從手作過程裡看見紡織設計與日常實作如何連回個人專長與職涯分享。",
          imageSrc: "assets/photos/nov-textile-group-photo.jpg",
          imageAlt: "紡織例會手作品展示畫面",
          imageCaption: "紡織例會現場畫面",
          tags: ["紡織手作", "飲料提袋"],
        },
        {
          date: "2025/11/15",
          title: "捐血例會",
          summary:
            "手冊也將 11 月中的捐血例會收進年度紀錄，讓大家把例會從交流與學習延伸到更直接的公益參與，以實際行動回應社會服務的初衷。",
          imageSrc: "assets/photos/nov-blood-donation-group-photo.jpg",
          imageAlt: "捐血例會現場合照",
          imageCaption: "捐血例會現場畫面",
          tags: ["公益參與", "社會服務"],
        },
        {
          date: "2025/11/29",
          title: "區塊鏈例會",
          summary:
            "邀請 Paper Plane 創辦人涂立青分享區塊鏈的由來、發展與規則，帶大家從新興科技的角度理解產業脈絡、運作方式與未來想像。",
          imageSrc: "assets/photos/nov-blockchain-group-photo.jpg",
          imageAlt: "區塊鏈例會現場團體畫面",
          imageCaption: "區塊鏈例會現場畫面",
          tags: ["區塊鏈", "新興科技"],
        },
      ],
      gallery: [
        createImageAsset("assets/photos/nov-textile-group-photo.jpg", "紡織例會手作品展示畫面", {
          caption: "改用紡織例會現場手作品展示畫面，讓 11 月主視覺直接回到同場活動本身。",
        }),
        createImageAsset("assets/photos/nov-textile-handbook-page.jpg", "紡織例會手冊月份頁", {
          caption: "保留手冊中的紡織例會整頁，讓 11 月上旬的活動主題與人物照片一起呈現。",
        }),
        createImageAsset("assets/photos/nov-blood-donation-group-photo.jpg", "捐血例會現場合照", {
          caption: "補進捐血例會現場合照，讓 11 月中旬的公益行動也能直接回到同場活動本身。",
        }),
        createImageAsset("assets/photos/nov-blockchain-group-photo.jpg", "區塊鏈例會現場團體畫面", {
          caption: "改用區塊鏈例會現場團體畫面，讓 11 月下旬的科技主題直接回到同場活動本身。",
        }),
      ],
    }),
    createPhotoEvent({
      id: "2025-12",
      year: 2025,
      month: 12,
      order: 7,
      title: "街友送餐公益服務",
      subtitle: "從市場採買到分組料理與北車分發，把歲末關懷真正做成行動。",
      folder: "12月例會_街友送餐",
      date: "2025/12/13",
      location: "街友送餐 / 社會服務",
      accent: "#93604f",
      coverSrc: "assets/photos/dec-meals-handbook-cover.jpg",
      coverAlt: "街友送餐公益服務手冊人物合照",
      summary:
        "手冊寫到，街友送餐是聯誼會每年必辦的例會之一，大家一早到市場採買，再分組進行廚藝競賽，做出台式便當、日式咖哩與韓式泡麵，最後一起到北車分發給街友，在寒冬中帶去溫暖。",
      highlights: ["街友送餐", "社會服務", "歲末關懷"],
      availability: "從市場採買、分組料理到北車發送餐點，大家把歲末關懷化為實際行動，在寒冬中送出一份溫暖。",
      gallery: [
        createImageAsset("assets/photos/dec-meals-handbook-cover.jpg", "街友送餐公益服務手冊人物合照", {
          caption: "把手冊中的志工合照放在最前面，保留 12 月最核心的公益服務人物畫面。",
        }),
        createImageAsset("assets/photos/dec-meals-handbook-group-2.jpg", "街友送餐公益服務備餐人物畫面", {
          caption: "保留手冊中的備餐與成員合影，讓 12 月頁面維持人物主體而不放餐點特寫。",
        }),
        createImageAsset("assets/photos/dec-meals-handbook-service.jpg", "街友送餐公益服務發送畫面", {
          caption: "用手冊中的送餐現場人物畫面收尾，讓 12 月回到真正的服務對象與互動本身。",
        }),
      ],
    }),
    createPhotoEvent({
      id: "2026-01",
      year: 2026,
      month: 1,
      order: 8,
      title: "頒獎典禮",
      subtitle: "學長姐把祝福和傳承一起遞出去，讓頒獎典禮成為新年的第一場相見。",
      folder: "2026年1月頒獎典禮",
      date: "2026/1/17",
      location: "2026.01.17 頒獎典禮",
      accent: "#ab5f4f",
      coverSrc: "assets/photos/jan-awards-handbook-cover.jpg",
      coverAlt: "頒獎典禮手冊人物合照",
      summary:
        "手冊提到，這場頒獎典禮是與新一屆獎學生學員的初次見面，學長姐擔任司儀與遞獎人員，遞出的不只是一張張獎狀，更是滿滿祝福與傳承。",
      highlights: ["公開相簿串接", "頒獎典禮", "舞台現場"],
      availability: "頒獎典禮是與新一屆獎學生的初次見面，也透過學長姐的參與與祝福，延續聯誼會的傳承精神。",
      gallery: [
        createImageAsset("assets/photos/jan-awards-handbook-cover.jpg", "頒獎典禮手冊人物合照", {
          caption: "把手冊中的典禮大合照放在最前面，讓 1 月先看見最完整的頒獎場面。",
        }),
        createImageAsset("assets/photos/jan-awards-handbook-page.jpg", "頒獎典禮手冊月份頁", {
          caption: "保留手冊中的 1 月整頁，讓頒獎典禮的人物畫面和當月敘事一起呈現。",
        }),
      ],
      links: [
        createLink(
          "2026.1.17 公開相簿",
          "https://drive.google.com/drive/folders/1Kle3PPCBJu9I4H-XeVltSkrMaHs-E3gs?usp=drive_link",
        ),
      ],
    }),
    createPhotoEvent({
      id: "2026-02",
      year: 2026,
      month: 2,
      order: 9,
      title: "北區｜新北區聯合小迎新",
      subtitle: "透過破冰遊戲與分組協作，讓新生更近距離認識扶輪與聯誼會。",
      folder: "2026年2月小迎新",
      date: "2026/2/7",
      location: "迎新活動",
      accent: "#8a5b61",
      coverSrc: "assets/photos/feb-welcome-group-photo.jpg",
      coverAlt: "北區新北區聯合小迎新大合照",
      summary:
        "手冊寫到，這場小迎新透過分組協作與破冰遊戲，讓新生更了解扶輪與獎學生聯誼會，也為未來加入聯誼會奠定基礎，並透過互動交流更快融入彼此。",
      highlights: ["小迎新", "新夥伴", "關係建立"],
      availability: "透過分組協作與破冰遊戲，讓新生更了解扶輪與獎學生聯誼會，也為未來的參與與連結暖身。",
      gallery: [
        createImageAsset("assets/photos/feb-welcome-group-photo.jpg", "北區新北區聯合小迎新大合照", {
          caption: "以小迎新大合照作為主圖，完整保留新舊夥伴在同一個空間裡互相認識、一起破冰的活動氛圍。",
        }),
        createImageAsset("assets/photos/feb-welcome-group-handbook.jpg", "北區新北區聯合小迎新手冊團體畫面", {
          caption: "保留手冊中的團體畫面，延續 2 月小迎新在互動與交流中的群體氛圍。",
        }),
        createImageAsset("assets/photos/feb-welcome-handbook-page.jpg", "北區新北區聯合小迎新手冊月份頁", {
          caption: "完整保留 2 月手冊頁，讓網站也能呈現小迎新的互動照片與當月原始編排。",
        }),
      ],
    }),
    createPhotoEvent({
      id: "2026-03",
      year: 2026,
      month: 3,
      order: 10,
      title: "五區聯合大迎新",
      subtitle: "兩天一夜從講座、破冰、夜市到大地遊戲，看著新生從陌生走向熟悉。",
      folder: "2026年3月大迎新",
      date: "2026/3/7-8",
      location: "迎新活動",
      accent: "#8b5d70",
      coverSrc: "assets/photos/march-welcome-group-photo.jpg",
      coverAlt: "五區聯合大迎新戶外大合照",
      summary:
        "手冊寫到，五個區的夥伴共同規劃這場兩天一夜的大型迎新活動，從講座、破冰遊戲、夜市活動到第二天的大地遊戲，每一個環節都仰賴大家共同協作，也看著新生在兩天內從陌生走向熟悉。",
      highlights: ["大迎新", "新生加入", "社群擴張"],
      availability: "五區夥伴共同規劃兩天一夜迎新，從講座、破冰、夜市到大地遊戲，陪伴新生在短時間內快速熟悉彼此。",
      gallery: [
        createImageAsset("assets/photos/march-welcome-group-photo.jpg", "五區聯合大迎新戶外大合照", {
          caption: "以你提供的五區聯合大迎新戶外大合照作為主圖，完整保留全體夥伴同框的年度規模感。",
        }),
        createImageAsset("assets/photos/march-welcome-handbook-cover.jpg", "五區聯合大迎新手冊大合照", {
          caption: "保留手冊中的大迎新合照版面，讓網站與交接手冊之間仍有一致的視覺脈絡。",
        }),
        createImageAsset("assets/photos/march-welcome-handbook-page.jpg", "五區聯合大迎新手冊月份頁", {
          caption: "保留手冊中的 3 月整頁，讓迎新合照與其他人物畫面一起被完整呈現。",
        }),
      ],
    }),
    createPhotoEvent({
      id: "2026-04",
      year: 2026,
      month: 4,
      order: 11,
      title: "淨灘公益沙排例會",
      subtitle: "在白宮行館淨灘、打沙排、泡溫泉，把公益與交流結合在同一天。",
      folder: "2026年4月淨灘例會",
      date: "2026/4/11",
      location: "白宮行館 / 海邊淨灘",
      accent: "#32707d",
      coverSrc: "assets/photos/april-beach-handbook-cover.jpg",
      coverAlt: "淨灘公益沙排例會手冊人物合照",
      summary:
        "手冊寫到，新生們踴躍報名這次例會，大家驅車前往白宮行館，在海灘上撿起一片片垃圾，還給海洋一片清澈；活動結束後也打沙排、泡溫泉，成為勞逸結合的一次體驗。",
      highlights: ["淨灘例會", "海邊行動", "大合照"],
      availability: "大家前往白宮行館淨灘、打沙排、泡溫泉，透過公益行動與交流互動，完成一次勞逸結合的例會體驗。",
      gallery: [
        createImageAsset("assets/photos/april-beach-handbook-cover.jpg", "淨灘例會手冊人物合照", {
          caption: "把手冊中的淨灘團體畫面放在最前面，保留 4 月最清楚的全體參與感。",
        }),
        createImageAsset("assets/photos/april-beach-handbook-page.jpg", "淨灘例會手冊月份頁", {
          caption: "保留手冊中的 4 月整頁，讓淨灘行動與人物互動照片一起呈現。",
        }),
      ],
    }),
    createPhotoEvent({
      id: "2026-05",
      year: 2026,
      month: 5,
      order: 12,
      title: "直播講座例會",
      subtitle: "從直播秘辛到自媒體判讀，讓大家更懂內容產製，也更懂辨識虛假影片。",
      folder: "2026年5月直播例會",
      date: "2026/5/31",
      location: "直播形式例會",
      accent: "#256877",
      coverSrc: "assets/photos/may-live-handbook-cover.jpg",
      coverAlt: "直播講座例會手冊人物合照",
      summary:
        "手冊寫到，這場直播講座邀請曾做過網路直播的主播夏晧軒分享直播秘辛，帶大家理解自媒體如何吸引目光，也提醒大家警惕詐騙、辨識斷章取義與博眼球的虛假影片。",
      highlights: ["直播例會", "實拍活動照", "主題分享"],
      availability: "邀請主播夏晧軒分享直播秘辛與自媒體判讀，理解如何吸引目光，也學會辨識虛假影片與詐騙內容。",
      gallery: [
        createImageAsset("assets/photos/may-live-handbook-cover.jpg", "直播講座例會手冊人物合照", {
          caption: "把手冊中的 5 月人物合照放在最前面，保留直播講座例會最直接的參與感。",
        }),
        createImageAsset("assets/photos/may-live-handbook-page.jpg", "直播講座例會手冊月份頁", {
          caption: "保留手冊中的 5 月整頁，讓直播講座的人物畫面與當月敘事一起被呈現。",
        }),
      ],
    }),
  ].map(normalizeEvent);

  const orderedEvents = [...activityEvents].sort((leftEvent, rightEvent) => leftEvent.order - rightEvent.order);
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

  window.ACTIVITY_ARCHIVE_DATA = {
    orderedEvents,
    eventById,
    filters,
    filterById,
    stats,
  };
})();
