import fs from "node:fs";
import vm from "node:vm";

const scriptPath = new URL("../script.js", import.meta.url);
const scriptSource = fs.readFileSync(scriptPath, "utf8");
const keydownHandlers = [];

class MockHTMLElement {}

const context = {
  console,
  HTMLElement: MockHTMLElement,
  document: {
    activeElement: null,
    body: {
      classList: {
        toggle() {},
      },
    },
    getElementById() {
      return null;
    },
    querySelector() {
      return null;
    },
  },
  window: {
    ACTIVITY_ARCHIVE_DATA: {
      defaultLanguage: "zh-TW",
      getArchiveData() {
        return {
          orderedEvents: [],
          eventById: new Map(),
          filterById: new Map(),
          stats: {
            total: 0,
            startLabel: "",
            endLabel: "",
            realPhotoMonths: 0,
          },
        };
      },
    },
    requestAnimationFrame(callback) {
      callback();
      return 1;
    },
    cancelAnimationFrame() {},
    addEventListener(type, handler) {
      if (type === "keydown") {
        keydownHandlers.push(handler);
      }
    },
  },
};

vm.runInNewContext(scriptSource, context, { filename: scriptPath.pathname });

if (keydownHandlers.length === 0) {
  throw new Error("Expected script.js to register a keydown handler.");
}

keydownHandlers.forEach((handler) => {
  handler({ key: "Escape" });
});

console.log("Smoke test passed: script.js handles keydown safely without detail modal refs.");
