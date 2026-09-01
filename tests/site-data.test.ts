import { describe, expect, it } from "vitest";

import {
  enabledPageCatalog,
  featuredHomepagePages,
  getPageByRoute,
  getRelatedPages,
  homepageBrowsePages,
  primaryNavigationPages,
} from "../src/core/site-data";

describe("site data", () => {
  it("exposes only routes allowed by config and inventory", () => {
    expect(enabledPageCatalog.map((page) => page.route)).toEqual([
      "/",
      "/guides/",
      "/guides/getting-started/",
      "/search/",
      "/about/",
      "/privacy/",
      "/terms/",
      "/404.html",
    ]);
  });

  it("finds a routable page by its canonical route", () => {
    expect(getPageByRoute("/").pageId).toBe("home");
    expect(() => getPageByRoute("/heroes/demo-sentinel/")).toThrow(
      /enabled page/i,
    );
  });

  it("resolves related pages without leaking disabled modules", () => {
    const home = getPageByRoute("/");

    expect(getRelatedPages(home).map((page) => page.pageId)).toEqual([
      "guide.getting-started",
    ]);
  });

  it("resolves configured navigation and homepage references in order", () => {
    expect(primaryNavigationPages.map((page) => page.pageId)).toEqual([
      "home",
      "hub.guides",
      "search",
    ]);
    expect(featuredHomepagePages.map((page) => page.pageId)).toEqual([
      "guide.getting-started",
    ]);
  });

  it("keeps legal and error routes out of the homepage content directory", () => {
    expect(homepageBrowsePages.map((page) => page.pageId)).toEqual([
      "hub.guides",
      "guide.getting-started",
      "search",
      "about",
    ]);
  });
});
