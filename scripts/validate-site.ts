import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import gameConfig from "../game.config";
import { buildEnabledPageCatalog } from "../src/core/catalog";
import { readContentEntriesFromDirectory } from "../src/core/content-files";
import type { ContentEntryReference } from "../src/core/page-resolution";
import { collectSiteValidationErrors } from "../src/core/site-validation";
import {
  entityModuleKeys,
  entityTypeKeys,
  type EntityFactModule,
} from "../src/data/entity-modules";
import pageInventoryData from "../src/data/page-inventory.json";
import { parsePageInventory } from "../src/data/schemas/page-inventory";

const projectRoot = process.cwd();
const readErrors: string[] = [];
const inventory = parsePageInventory(pageInventoryData);
const contentEntries: ContentEntryReference[] = [];

const contentCollections = [
  {
    collection: "guides",
    directory: "src/content/guides",
    feature: "guides",
  },
  {
    collection: "tierLists",
    directory: "src/content/meta",
    feature: "tierLists",
  },
  {
    collection: "news",
    directory: "src/content/news",
    feature: "news",
  },
] as const;

for (const definition of contentCollections) {
  if (!gameConfig.features[definition.feature]) {
    continue;
  }

  const directory = resolve(projectRoot, definition.directory);
  try {
    contentEntries.push(
      ...readContentEntriesFromDirectory(directory, definition.collection),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    readErrors.push(`Could not read ${definition.collection} content: ${message}`);
  }
}

const factModules: Partial<Record<EntityFactModule, unknown>> = {};
const entityFactModules: EntityFactModule[] = [...entityModuleKeys];

for (const module of entityFactModules) {
  const filePath = resolve(projectRoot, `src/data/facts/${module}.json`);
  if (!existsSync(filePath)) {
    continue;
  }

  try {
    factModules[module] = JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    readErrors.push(`Could not parse src/data/facts/${module}.json: ${message}`);
    factModules[module] = null;
  }
}

const validationErrors = collectSiteValidationErrors({
  config: gameConfig,
  inventory,
  contentEntries,
  factModules,
  fixedRoutes: [
    "/",
    "/about/",
    "/privacy/",
    "/terms/",
    "/404.html",
  ],
  implementedPageTypes: [
    "home",
    "guide",
    "hub",
    "search",
    "about",
    "privacy",
    "terms",
    "not-found",
    "database",
    ...entityTypeKeys,
    "meta",
    "patch",
    "calculator",
    "planner",
  ],
});
const errors = [...readErrors, ...validationErrors];

if (errors.length > 0) {
  console.error("Site validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
} else {
  const enabledPages = buildEnabledPageCatalog(gameConfig, inventory);
  console.log(
    `Site validation passed: ${enabledPages.length} enabled pages, ${contentEntries.length} content entries.`,
  );
}
