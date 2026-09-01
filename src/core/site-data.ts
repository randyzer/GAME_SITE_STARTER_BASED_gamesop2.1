import pageInventoryData from "../data/page-inventory.json";
import {
  parsePageInventory,
  type PageInventoryEntry,
} from "../data/schemas/page-inventory";
import { loadGameConfig } from "../config/load-config";
import { buildEnabledPageCatalog } from "./catalog";

export const siteConfig = loadGameConfig();
export const pageInventory = parsePageInventory(pageInventoryData);
export const enabledPageCatalog = buildEnabledPageCatalog(
  siteConfig,
  pageInventory,
);

const enabledPageByRoute = new Map(
  enabledPageCatalog.map((page) => [page.route, page]),
);
const enabledPageById = new Map(
  enabledPageCatalog.map((page) => [page.pageId, page]),
);

function resolveEnabledPageIds(pageIds: string[]) {
  return pageIds.flatMap((pageId) => {
    const page = enabledPageById.get(pageId);
    return page ? [page] : [];
  });
}

export const primaryNavigationPages = resolveEnabledPageIds(
  siteConfig.navigation.primaryPageIds,
);
export const featuredHomepagePages = resolveEnabledPageIds(
  siteConfig.homepage.featuredPageIds,
);
export const homepageBrowsePages = enabledPageCatalog.filter(
  (page) =>
    page.visibility === "public" &&
    !["home", "privacy", "terms", "not-found"].includes(page.pageType),
);

export function getPageByRoute(route: string): PageInventoryEntry {
  const page = enabledPageByRoute.get(route);
  if (!page) {
    throw new Error(`No enabled page is registered for route: ${route}`);
  }

  return page;
}

export function getRelatedPages(page: PageInventoryEntry) {
  return page.relatedPageIds.flatMap((pageId) => {
    const relatedPage = enabledPageById.get(pageId);
    return relatedPage ? [relatedPage] : [];
  });
}
