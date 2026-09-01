import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import { join, resolve } from "node:path";

import { collectBuildHtmlAuditErrors, collectReferencedAssetPaths } from "../src/core/html-audit";
import { routeToOutputFile } from "../src/core/output-reconciliation";
import {
  buildCanonicalUrl,
  buildRobotsTxt,
  getSitemapRoutes,
} from "../src/core/seo";
import { enabledPageCatalog, siteConfig } from "../src/core/site-data";

const outputDirectory = resolve(process.cwd(), "dist");
const htmlByRoute = new Map(
  enabledPageCatalog.map((page) => [
    page.route,
    readFileSync(join(outputDirectory, routeToOutputFile(page.route)), "utf8"),
  ]),
);
const errors = collectBuildHtmlAuditErrors({
  config: siteConfig,
  pages: enabledPageCatalog,
  htmlByRoute,
});

function directorySize(directory: string): number {
  return readdirSync(directory, { withFileTypes: true }).reduce(
    (total, entry) => {
      const path = join(directory, entry.name);
      return total + (entry.isDirectory() ? directorySize(path) : statSync(path).size);
    },
    0,
  );
}

function assetSize(assetPath: string): number {
  const path = join(outputDirectory, assetPath.replace(/^\//, ""));
  if (!existsSync(path)) {
    errors.push(`Referenced build asset is missing: ${assetPath}`);
    return 0;
  }
  return statSync(path).size;
}

const referencedAssets = new Set<string>();
let largestHtmlBytes = 0;
let largestReferencedCssBytes = 0;
let largestReferencedJsBytes = 0;

for (const page of enabledPageCatalog) {
  const html = htmlByRoute.get(page.route)!;
  const htmlBytes = Buffer.byteLength(html);
  const assets = collectReferencedAssetPaths(html);
  assets.forEach((asset) => referencedAssets.add(asset));
  const cssBytes = assets
    .filter((asset) => asset.endsWith(".css"))
    .reduce((total, asset) => total + assetSize(asset), 0);
  const jsBytes = assets
    .filter((asset) => asset.endsWith(".js"))
    .reduce((total, asset) => total + assetSize(asset), 0);

  largestHtmlBytes = Math.max(largestHtmlBytes, htmlBytes);
  largestReferencedCssBytes = Math.max(largestReferencedCssBytes, cssBytes);
  largestReferencedJsBytes = Math.max(largestReferencedJsBytes, jsBytes);

  if (htmlBytes > 80_000) {
    errors.push(`[${page.route}] HTML exceeds the 80 KB budget: ${htmlBytes} bytes.`);
  }
  if (cssBytes > 64_000) {
    errors.push(`[${page.route}] Referenced CSS exceeds the 64 KB budget: ${cssBytes} bytes.`);
  }
  if (jsBytes > 230_000) {
    errors.push(`[${page.route}] Referenced JS exceeds the 230 KB budget: ${jsBytes} bytes.`);
  }

  const interactivePageTypes = new Set([
    "search",
    "hub",
    "database",
    "calculator",
    "planner",
  ]);
  if (!interactivePageTypes.has(page.pageType) && jsBytes > 0) {
    errors.push(`[${page.route}] Static page unexpectedly references client JavaScript.`);
  }
  if (/<script\b[^>]*\bsrc=["']https?:\/\//i.test(html)) {
    errors.push(`[${page.route}] External script reference is not allowed by default.`);
  }
}

const requiredFiles = [
  "favicon.svg",
  "robots.txt",
  "sitemap-index.xml",
  "sitemap-0.xml",
  "pagefind/pagefind.js",
  "pagefind/pagefind-entry.json",
];
for (const file of requiredFiles) {
  if (!existsSync(join(outputDirectory, file))) {
    errors.push(`Required build artifact is missing: ${file}`);
  }
}

const robotsPath = join(outputDirectory, "robots.txt");
if (
  existsSync(robotsPath) &&
  readFileSync(robotsPath, "utf8") !== buildRobotsTxt(siteConfig)
) {
  errors.push("robots.txt does not match the configured production URL.");
}

const sitemapPath = join(outputDirectory, "sitemap-0.xml");
if (existsSync(sitemapPath)) {
  const sitemap = readFileSync(sitemapPath, "utf8");
  const actualUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => match[1])
    .sort();
  const expectedUrls = getSitemapRoutes(enabledPageCatalog)
    .map((route) => buildCanonicalUrl(siteConfig, route))
    .sort();
  if (JSON.stringify(actualUrls) !== JSON.stringify(expectedUrls)) {
    errors.push("Sitemap URLs do not match enabled indexable inventory routes.");
  }
}

const pagefindDirectory = join(outputDirectory, "pagefind");
const pagefindBytes = existsSync(pagefindDirectory)
  ? directorySize(pagefindDirectory)
  : 0;
if (pagefindBytes > 800_000) {
  errors.push(`Pagefind output exceeds the 800 KB starter budget: ${pagefindBytes} bytes.`);
}

const referencedJsBytes = [...referencedAssets]
  .filter((asset) => asset.endsWith(".js"))
  .reduce((total, asset) => total + assetSize(asset), 0);
const referencedCssBytes = [...referencedAssets]
  .filter((asset) => asset.endsWith(".css"))
  .reduce((total, asset) => total + assetSize(asset), 0);

if (errors.length > 0) {
  console.error("Generated build audit failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    [
      `Generated build audit passed for ${enabledPageCatalog.length} pages.`,
      `Largest HTML: ${largestHtmlBytes} B.`,
      `Largest page CSS reference: ${largestReferencedCssBytes} B.`,
      `Largest page JS reference: ${largestReferencedJsBytes} B.`,
      `Unique referenced CSS: ${referencedCssBytes} B.`,
      `Unique referenced JS: ${referencedJsBytes} B.`,
      `Pagefind output: ${pagefindBytes} B.`,
    ].join(" "),
  );
}
