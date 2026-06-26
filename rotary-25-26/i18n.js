(() => {
  const config = window.SITE_I18N_CONFIG || {};
  const languages = Array.isArray(config.languages) ? config.languages : ["zh-TW", "en"];
  const defaultLanguage = languages.includes(config.defaultLanguage) ? config.defaultLanguage : "zh-TW";
  const translations = config.translations || {};
  const storageKey = config.storageKey || "site-language";
  const subscribers = new Set();

  function getValueByPath(object, path) {
    return path.split(".").reduce((current, segment) => {
      if (current && typeof current === "object" && segment in current) {
        return current[segment];
      }

      return undefined;
    }, object);
  }

  function interpolate(template, params = {}) {
    return String(template).replace(/\{(\w+)\}/g, (_, key) => {
      if (key in params) {
        return String(params[key]);
      }

      return `{${key}}`;
    });
  }

  function getStoredLanguage() {
    try {
      const storedLanguage = window.localStorage.getItem(storageKey);
      return languages.includes(storedLanguage) ? storedLanguage : null;
    } catch (error) {
      return null;
    }
  }

  let currentLanguage = getStoredLanguage() || defaultLanguage;

  function setStoredLanguage(language) {
    try {
      window.localStorage.setItem(storageKey, language);
    } catch (error) {
      // Ignore storage errors and continue with the in-memory preference.
    }
  }

  function t(path, params) {
    const activeDictionary = translations[currentLanguage] || {};
    const fallbackDictionary = translations[defaultLanguage] || {};
    const value =
      getValueByPath(activeDictionary, path) ??
      getValueByPath(fallbackDictionary, path) ??
      path;

    if (typeof value !== "string") {
      return path;
    }

    return interpolate(value, params);
  }

  function translateAttributes(root = document) {
    root.querySelectorAll("[data-i18n-attr]").forEach((element) => {
      const attributeMappings = element.dataset.i18nAttr
        .split(";")
        .map((mapping) => mapping.trim())
        .filter(Boolean);

      attributeMappings.forEach((mapping) => {
        const [attributeName, key] = mapping.split(":");

        if (!attributeName || !key) {
          return;
        }

        element.setAttribute(attributeName.trim(), t(key.trim()));
      });
    });
  }

  function translateText(root = document) {
    root.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = t(element.dataset.i18n);
    });

    root.querySelectorAll("[data-i18n-html]").forEach((element) => {
      element.innerHTML = t(element.dataset.i18nHtml);
    });
  }

  function syncLanguageToggle() {
    document.querySelectorAll("[data-language-toggle]").forEach((button) => {
      const nextLanguage = currentLanguage === "zh-TW" ? "en" : "zh-TW";
      const ariaKey =
        nextLanguage === "en"
          ? "common.language.switchToEnglish"
          : "common.language.switchToChinese";

      button.setAttribute("aria-label", t(ariaKey));
      button.setAttribute("title", t(ariaKey));
      button.dataset.languageNext = nextLanguage;

      button.querySelectorAll("[data-language-option]").forEach((option) => {
        const isCurrent = option.dataset.languageOption === currentLanguage;
        option.classList.toggle("is-current", isCurrent);
        option.setAttribute("aria-current", isCurrent ? "true" : "false");
      });
    });
  }

  function applyTranslations(root = document) {
    document.documentElement.lang = currentLanguage === "zh-TW" ? "zh-Hant" : "en";
    document.documentElement.dataset.language = currentLanguage;
    translateText(root);
    translateAttributes(root);
    syncLanguageToggle();
  }

  function setLanguage(language) {
    if (!languages.includes(language) || language === currentLanguage) {
      return;
    }

    currentLanguage = language;
    setStoredLanguage(language);
    applyTranslations();
    subscribers.forEach((callback) => {
      callback(currentLanguage);
    });
  }

  function subscribe(callback) {
    subscribers.add(callback);

    return () => {
      subscribers.delete(callback);
    };
  }

  function bindEvents() {
    document.addEventListener("click", (event) => {
      const toggle = event.target.closest("[data-language-toggle]");

      if (!toggle) {
        return;
      }

      setLanguage(currentLanguage === "zh-TW" ? "en" : "zh-TW");
    });
  }

  window.siteI18n = {
    t,
    getLanguage: () => currentLanguage,
    setLanguage,
    applyTranslations,
    subscribe,
    languages: [...languages],
  };

  applyTranslations();
  bindEvents();
})();
