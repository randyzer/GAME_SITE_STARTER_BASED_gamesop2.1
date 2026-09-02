import { existsSync, readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const themeUrl = new URL("../src/styles/theme.css", import.meta.url);
const globalStylesUrl = new URL(
  "../src/styles/global.css",
  import.meta.url,
);

describe("theme tokens", () => {
  it("defines the reusable semantic color contract", () => {
    expect(existsSync(themeUrl)).toBe(true);
    if (!existsSync(themeUrl)) {
      return;
    }

    const theme = readFileSync(themeUrl, "utf8");
    for (const token of [
      "--color-background",
      "--color-surface",
      "--color-text",
      "--color-text-muted",
      "--color-primary",
      "--color-accent",
      "--color-accent-strong",
      "--color-border",
      "--color-border-strong",
    ]) {
      expect(theme).toContain(`${token}:`);
    }
  });

  it("loads the theme contract from the global stylesheet", () => {
    const globalStyles = readFileSync(globalStylesUrl, "utf8");

    expect(globalStyles).toMatch(/@import\s+["']\.\/theme\.css["'];/);
  });
});
