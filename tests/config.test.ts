import { describe, expect, it } from "vitest";

import {
  defineGameConfig,
  featureFlagKeys,
  type GameConfigInput,
} from "../src/config/schema";
import {
  pageModuleSchema,
  pageTypeSchema,
} from "../src/data/schemas/page-inventory";

const validConfig: GameConfigInput = {
  brand: {
    name: "Game Atlas",
    shortName: "Atlas",
    mark: "GA",
    tagline: "Clear answers for every session.",
  },
  site: {
    url: "https://gameatlas.example",
    locale: "en",
    timezone: "UTC",
  },
  seo: {
    defaultTitle: "Game Atlas — Guides, Builds & Game Data",
    titleTemplate: "%s | Game Atlas",
    defaultDescription:
      "A fast, source-aware starter for guides, builds, and game reference data.",
  },
  social: {
    xHandle: "@gameatlas",
  },
  navigation: {
    primaryPageIds: ["home", "hub.guides", "search"],
  },
  homepage: {
    featuredPageIds: ["guide.getting-started"],
  },
  features: {
    guides: true,
    heroes: false,
    weapons: false,
    items: false,
    maps: false,
    tierLists: false,
    news: false,
    search: true,
    calculator: false,
    planner: false,
  },
};

describe("defineGameConfig", () => {
  it("does not expose unimplemented builds or codes capabilities", () => {
    expect(featureFlagKeys).not.toContain("builds");
    expect(featureFlagKeys).not.toContain("codes");
    expect(pageModuleSchema.safeParse("builds").success).toBe(false);
    expect(pageModuleSchema.safeParse("codes").success).toBe(false);
    expect(pageTypeSchema.safeParse("build").success).toBe(false);
    expect(pageTypeSchema.safeParse("codes").success).toBe(false);
    expect(pageTypeSchema.safeParse("tier-list").success).toBe(false);
    expect(pageTypeSchema.safeParse("news").success).toBe(false);
  });

  it("accepts an English-first config with every feature flag explicit", () => {
    const config = defineGameConfig(validConfig);

    expect(config.site.locale).toBe("en");
    expect(Object.keys(config.features).sort()).toEqual(
      [...featureFlagKeys].sort(),
    );
    expect(config.navigation.primaryPageIds).toEqual([
      "home",
      "hub.guides",
      "search",
    ]);
    expect(config.homepage.featuredPageIds).toEqual([
      "guide.getting-started",
    ]);
    expect(Object.isFrozen(config)).toBe(true);
  });

  it("rejects a non-HTTPS production site URL", () => {
    expect(() =>
      defineGameConfig({
        ...validConfig,
        site: { ...validConfig.site, url: "http://gameatlas.example" },
      }),
    ).toThrow(/HTTPS/i);
  });

  it("rejects a non-English locale", () => {
    expect(() =>
      defineGameConfig({
        ...validConfig,
        site: { ...validConfig.site, locale: "zh-CN" },
      }),
    ).toThrow(/English/i);
  });

  it("rejects a config that omits a feature flag", () => {
    const { heroes: _heroes, ...incompleteFeatures } = validConfig.features;

    expect(() =>
      defineGameConfig({
        ...validConfig,
        features: incompleteFeatures,
      } as GameConfigInput),
    ).toThrow();
  });
});
