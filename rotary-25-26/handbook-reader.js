(() => {
  const pageCount = 41;
  const reader = document.querySelector("[data-handbook-reader]");

  if (!reader || !window.siteI18n) {
    return;
  }

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => {
    const figure = document.createElement("figure");
    const image = new Image();
    const fileNumber = String(page).padStart(2, "0");

    figure.className = "manual-reader-page";
    image.loading = "lazy";
    image.decoding = "async";
    image.fetchPriority = "low";
    image.width = 993;
    image.height = 1404;
    image.src = `assets/handbook-pages/handover-manual-${fileNumber}.jpg`;
    figure.append(image);

    return { page, image, figure };
  });

  reader.replaceChildren(...pages.map(({ figure }) => figure));

  const updateLabels = () => {
    reader.setAttribute("aria-label", window.siteI18n.t("handbook.reader.pagesAria"));

    pages.forEach(({ page, image }) => {
      image.alt = window.siteI18n.t("handbook.reader.pageAlt", { page });
    });
  };

  updateLabels();
  window.siteI18n.subscribe(updateLabels);
})();
