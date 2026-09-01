import { describe, expect, it } from "vitest";

import {
  buildArticleSchema,
  buildBaseSeoGraph,
  buildBreadcrumbSchema,
  buildBreadcrumbTrail,
  buildCanonicalUrl,
  buildRobotsTxt,
  getSitemapRoutes,
  serializeJsonLd,
} from "../src/core/seo";
import {
  enabledPageCatalog,
  getPageByRoute,
  siteConfig,
} from "../src/core/site-data";

describe("technical SEO helpers", () => {
  it("selects only enabled, indexable routes for the sitemap", () => {
    expect(getSitemapRoutes(enabledPageCatalog)).toEqual([
      "/",
      "/guides/",
      "/guides/getting-started/",
      "/about/",
    ]);
  });

  it("builds canonical HTTPS URLs from inventory routes", () => {
    expect(buildCanonicalUrl(siteConfig, "/guides/")).toBe(
      "https://gameatlas.example/guides/",
    );
  });

  it("derives breadcrumbs only from enabled route ancestors", () => {
    const page = getPageByRoute("/guides/getting-started/");

    expect(buildBreadcrumbTrail(siteConfig, page, enabledPageCatalog)).toEqual([
      { name: "Game Atlas", url: "https://gameatlas.example/" },
      {
        name: "Game Guides & Field Notes | Game Atlas",
        url: "https://gameatlas.example/guides/",
      },
      {
        name: "How to Configure This Game Site Starter",
        url: "https://gameatlas.example/guides/getting-started/",
      },
    ]);
  });

  it("builds one accurate base graph and page-specific schema nodes", () => {
    const page = getPageByRoute("/guides/getting-started/");
    const trail = buildBreadcrumbTrail(siteConfig, page, enabledPageCatalog);
    const graph = [
      ...buildBaseSeoGraph(siteConfig, page),
      buildBreadcrumbSchema(buildCanonicalUrl(siteConfig, page.route), trail),
      buildArticleSchema(siteConfig, page),
    ];

    expect(graph.map((node) => node["@type"])).toEqual([
      "Organization",
      "WebSite",
      "WebPage",
      "BreadcrumbList",
      "Article",
    ]);
    expect(new Set(graph.flatMap((node) => node["@id"] ?? []))).toHaveLength(5);
    expect(graph.at(-1)).not.toHaveProperty("image");
  });

  it("serializes JSON-LD without allowing a script-closing sequence", () => {
    expect(serializeJsonLd({ value: "</script><script>alert(1)</script>" }))
      .not.toContain("</script>");
  });

  it("generates robots text from the configured production URL", () => {
    expect(buildRobotsTxt(siteConfig)).toBe(
      "User-agent: *\nAllow: /\n\nSitemap: https://gameatlas.example/sitemap-index.xml\n",
    );
  });
});
