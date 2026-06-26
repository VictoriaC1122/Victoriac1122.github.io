import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE_TAG = '    <base href="../" />';
const VIEWPORT_LINE = '    <meta name="viewport" content="width=device-width, initial-scale=1" />';

const routePages = [
  {
    source: "activities.html",
    target: "activities/index.html",
  },
  {
    source: "leaders.html",
    target: "leaders/index.html",
  },
];

function injectBaseHref(markup) {
  if (markup.includes(BASE_TAG)) {
    return markup;
  }

  return markup.replace(VIEWPORT_LINE, `${VIEWPORT_LINE}\n${BASE_TAG}`);
}

async function syncRoutePage(rootDir, page) {
  const sourcePath = path.join(rootDir, page.source);
  const targetPath = path.join(rootDir, page.target);
  const targetDir = path.dirname(targetPath);
  const sourceMarkup = await readFile(sourcePath, "utf8");
  const targetMarkup = injectBaseHref(sourceMarkup);

  await mkdir(targetDir, { recursive: true });
  await writeFile(targetPath, targetMarkup);

  return page.target;
}

async function main() {
  const currentFile = fileURLToPath(import.meta.url);
  const toolsDir = path.dirname(currentFile);
  const siteDir = path.resolve(toolsDir, "..");
  const syncedPages = [];

  for (const routePage of routePages) {
    syncedPages.push(await syncRoutePage(siteDir, routePage));
  }

  console.log(`Synced route pages: ${syncedPages.join(", ")}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
