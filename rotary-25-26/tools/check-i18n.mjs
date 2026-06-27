import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();

function read(filePath) {
  return fs.readFileSync(path.join(root, filePath), "utf8");
}

function getByPath(object, key) {
  return key.split(".").reduce((current, segment) => {
    if (current && typeof current === "object" && segment in current) {
      return current[segment];
    }

    return undefined;
  }, object);
}

function collectQuotedValues(source, marker) {
  return source
    .split(marker)
    .slice(1)
    .map((segment) => segment.split('"')[0]);
}

const i18nContext = {
  window: {},
};

vm.runInNewContext(read("site/i18n-data.js"), i18nContext);
const translations = i18nContext.window.SITE_I18N_CONFIG?.translations || {};

const htmlFiles = [
  "site/index.html",
  "site/activities.html",
  "site/leaders.html",
  "site/activities/index.html",
  "site/leaders/index.html",
];

const translationKeys = new Set();

for (const filePath of htmlFiles) {
  const source = read(filePath);

  collectQuotedValues(source, 'data-i18n="').forEach((key) => translationKeys.add(key));
  collectQuotedValues(source, 'data-i18n-html="').forEach((key) => translationKeys.add(key));

  collectQuotedValues(source, 'data-i18n-attr="').forEach((mapping) => {
    mapping
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .forEach((part) => {
        const separatorIndex = part.indexOf(":");

        if (separatorIndex === -1) {
          return;
        }

        translationKeys.add(part.slice(separatorIndex + 1).trim());
      });
  });
}

const scriptSource = read("site/script.js");
for (const match of scriptSource.matchAll(/(?:^|[^\w.])t\("([^"]+)"/g)) {
  translationKeys.add(match[1]);
}

const missingKeys = [];

for (const language of ["zh-TW", "en"]) {
  const dictionary = translations[language] || {};

  for (const key of translationKeys) {
    if (getByPath(dictionary, key) === undefined) {
      missingKeys.push(`${language}:${key}`);
    }
  }
}

const dataContext = {
  window: {},
};

vm.runInNewContext(read("site/activity-data.js"), dataContext);
const archive = dataContext.window.ACTIVITY_ARCHIVE_DATA;

function collectArchiveIssues(language) {
  const issues = [];
  const data = archive.getArchiveData(language);

  if (data.orderedEvents.length !== 14) {
    issues.push(`expected 14 events, got ${data.orderedEvents.length}`);
  }

  for (const event of data.orderedEvents) {
    for (const field of [
      "title",
      "subtitle",
      "summary",
      "availability",
      "folder",
      "location",
      "statusLabel",
      "frameCountLabel",
    ]) {
      if (typeof event[field] !== "string" || !event[field]) {
        issues.push(`${event.id}:${field}`);
      }
    }

    if (!event.cover || typeof event.cover.alt !== "string" || !event.cover.alt) {
      issues.push(`${event.id}:cover.alt`);
    }

    for (const item of event.gallery || []) {
      if (item.kind === "image") {
        if (typeof item.alt !== "string" || !item.alt) {
          issues.push(`${event.id}:gallery.alt`);
        }

        if (typeof item.caption !== "string" || !item.caption) {
          issues.push(`${event.id}:gallery.caption`);
        }
      }
    }

    for (const link of event.links || []) {
      if (typeof link.label !== "string" || !link.label) {
        issues.push(`${event.id}:link.label`);
      }
    }

    for (const block of event.activityBlocks || []) {
      for (const field of ["title", "summary"]) {
        if (typeof block[field] !== "string" || !block[field]) {
          issues.push(`${event.id}:activityBlock.${field}`);
        }
      }
    }
  }

  return issues;
}

const zhIssues = collectArchiveIssues("zh-TW");
const enIssues = collectArchiveIssues("en");

if (missingKeys.length || zhIssues.length || enIssues.length) {
  console.error(
    JSON.stringify(
      {
        missingKeys,
        zhIssues,
        enIssues,
      },
      null,
      2,
    ),
  );
  process.exit(1);
}

console.log(`Checked ${translationKeys.size} translation keys across HTML and JS.`);
console.log("Localized activity data looks complete for zh-TW and en.");
