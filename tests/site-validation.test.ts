import { describe, expect, it } from "vitest";

import { defineGameConfig } from "../src/config/schema";
import {
  pageInventory,
  siteConfig,
} from "../src/core/site-data";
import { collectSiteValidationErrors } from "../src/core/site-validation";

const guideContent = {
  collection: "guides",
  id: "getting-started",
  data: { pageId: "guide.getting-started" },
};

describe("collectSiteValidationErrors", () => {
  it("aggregates independent route, content, implementation, and fact errors", () => {
    const configWithHeroes = defineGameConfig({
      ...siteConfig,
      features: { ...siteConfig.features, heroes: true },
    });
    const inventoryWithoutHome = pageInventory.filter(
      (page) => page.pageId !== "home",
    );

    const errors = collectSiteValidationErrors({
      config: configWithHeroes,
      inventory: inventoryWithoutHome,
      contentEntries: [],
      factModules: {},
      fixedRoutes: ["/"],
      implementedPageTypes: [
        "home",
        "guide",
        "hub",
        "search",
        "about",
        "privacy",
        "terms",
        "not-found",
      ],
    });

    expect(errors.join("\n")).toMatch(/fixed route.*\//i);
    expect(errors.join("\n")).toMatch(/content entry.*guide\.getting-started/i);
    expect(errors.join("\n")).toMatch(/route family.*hero/i);
    expect(errors.join("\n")).toMatch(/heroes\.json/i);
  });

  it("accepts the starter's enabled pages and content", () => {
    const errors = collectSiteValidationErrors({
      config: siteConfig,
      inventory: pageInventory,
      contentEntries: [guideContent],
      factModules: {},
      fixedRoutes: ["/"],
      implementedPageTypes: [
        "home",
        "guide",
        "hub",
        "search",
        "about",
        "privacy",
        "terms",
        "not-found",
      ],
    });

    expect(errors).toEqual([]);
  });

  it("reports broken configured, related, and indexability references together", () => {
    const brokenConfig = defineGameConfig({
      ...siteConfig,
      navigation: {
        primaryPageIds: ["home", "hero.demo-sentinel"],
      },
      homepage: {
        featuredPageIds: ["guide.missing"],
      },
    });
    const brokenInventory = pageInventory.map((page) => {
      if (page.pageId === "home") {
        return { ...page, relatedPageIds: ["guide.missing"] };
      }
      if (page.pageId === "about") {
        return { ...page, visibility: "private" as const };
      }
      return page;
    });

    const errors = collectSiteValidationErrors({
      config: brokenConfig,
      inventory: brokenInventory,
      contentEntries: [guideContent],
      factModules: {},
      fixedRoutes: ["/"],
      implementedPageTypes: [
        "home",
        "guide",
        "hub",
        "search",
        "about",
        "privacy",
        "terms",
        "not-found",
      ],
    }).join("\n");

    expect(errors).toMatch(/navigation.*hero\.demo-sentinel/i);
    expect(errors).toMatch(/homepage.*guide\.missing/i);
    expect(errors).toMatch(/related page.*guide\.missing/i);
    expect(errors).toMatch(/indexable.*about/i);
  });

  it("rejects an entity page gated by another module's feature", () => {
    const mismatchedInventory = pageInventory.map((page) =>
      page.pageId === "hero.demo-sentinel"
        ? { ...page, feature: "items" as const }
        : page,
    );

    const errors = collectSiteValidationErrors({
      config: siteConfig,
      inventory: mismatchedInventory,
      contentEntries: [guideContent],
      factModules: {},
      fixedRoutes: ["/"],
      implementedPageTypes: [
        "home",
        "guide",
        "hub",
        "search",
        "about",
        "privacy",
        "terms",
        "not-found",
      ],
    }).join("\n");

    expect(errors).toMatch(/hero\.demo-sentinel.*feature.*heroes/i);
  });
});
