import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();

function read(filePath) {
  return fs.readFileSync(path.join(root, filePath), "utf8");
}

function createClassList() {
  const classes = new Set();

  return {
    toggle(name, force) {
      if (force) {
        classes.add(name);
      } else {
        classes.delete(name);
      }
    },
    contains(name) {
      return classes.has(name);
    },
  };
}

function createElement({ dataset = {}, textContent = "", innerHTML = "", attributes = {}, options = [] } = {}) {
  const attributeMap = new Map(Object.entries(attributes));

  return {
    dataset: { ...dataset },
    textContent,
    innerHTML,
    classList: createClassList(),
    setAttribute(name, value) {
      attributeMap.set(name, String(value));
    },
    getAttribute(name) {
      return attributeMap.get(name);
    },
    querySelectorAll(selector) {
      if (selector === "[data-language-option]") {
        return options;
      }

      return [];
    },
  };
}

function createHarness(initialStorage = {}) {
  const storage = new Map(Object.entries(initialStorage));

  const textElement = createElement({
    dataset: { i18n: "common.nav.home" },
  });
  const htmlElement = createElement({
    dataset: { i18nHtml: "home.hero.textHtml" },
  });
  const attrElement = createElement({
    dataset: { i18nAttr: "content:meta.home.description" },
  });
  const zhOption = createElement({
    dataset: { languageOption: "zh-TW", i18n: "common.language.zhShort" },
  });
  const enOption = createElement({
    dataset: { languageOption: "en", i18n: "common.language.enShort" },
  });
  const toggle = createElement({
    options: [zhOption, enOption],
  });

  const selectorMap = new Map([
    ["[data-i18n]", [textElement, zhOption, enOption]],
    ["[data-i18n-html]", [htmlElement]],
    ["[data-i18n-attr]", [attrElement]],
    ["[data-language-toggle]", [toggle]],
  ]);

  const document = {
    documentElement: {
      lang: "zh-Hant",
      dataset: {},
    },
    querySelectorAll(selector) {
      return selectorMap.get(selector) || [];
    },
    addEventListener() {},
  };

  const windowObject = {
    localStorage: {
      getItem(key) {
        return storage.has(key) ? storage.get(key) : null;
      },
      setItem(key, value) {
        storage.set(key, String(value));
      },
    },
  };

  const context = {
    window: windowObject,
    document,
    console,
  };

  windowObject.window = windowObject;
  windowObject.document = document;

  vm.runInNewContext(read("site/i18n-data.js"), context);
  vm.runInNewContext(read("site/i18n.js"), context);

  return {
    context,
    storage,
    textElement,
    htmlElement,
    attrElement,
    toggle,
    zhOption,
    enOption,
    document,
  };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const firstRun = createHarness();

assert(firstRun.document.documentElement.lang === "zh-Hant", "default language should be zh-Hant");
assert(firstRun.textElement.textContent === "首頁", "default text translation should be Chinese");
assert(firstRun.attrElement.getAttribute("content")?.includes("年度展示網站首頁"), "default meta description should be Chinese");
assert(firstRun.zhOption.classList.contains("is-current"), "zh-TW option should start active");

firstRun.context.window.siteI18n.setLanguage("en");

assert(firstRun.document.documentElement.lang === "en", "switching language should update document lang");
assert(firstRun.textElement.textContent === "Home", "text translation should switch to English");
assert(firstRun.htmlElement.innerHTML.includes("Activities"), "HTML translation should switch to English");
assert(firstRun.attrElement.getAttribute("content")?.includes("Homepage for the 25-26 year showcase"), "meta description should switch to English");
assert(firstRun.storage.get("rotary-25-26-language") === "en", "selected language should persist to localStorage");
assert(firstRun.enOption.classList.contains("is-current"), "English option should become active");
assert(firstRun.toggle.getAttribute("aria-label") === "Switch to Traditional Chinese", "toggle aria label should describe the next language");

const secondRun = createHarness({
  "rotary-25-26-language": "en",
});

assert(secondRun.document.documentElement.lang === "en", "stored language should be restored on reload");
assert(secondRun.textElement.textContent === "Home", "stored language should apply on reload");

console.log("i18n runtime smoke test passed.");
