import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { readContentEntriesFromDirectory } from "../src/core/content-files";

describe("readContentEntriesFromDirectory", () => {
  it("reads the starter guide id and pageId from MDX frontmatter", () => {
    const guideDirectory = fileURLToPath(
      new URL("../src/content/guides", import.meta.url),
    );

    expect(readContentEntriesFromDirectory(guideDirectory, "guides")).toEqual([
      {
        collection: "guides",
        id: "getting-started",
        data: { pageId: "guide.getting-started" },
      },
    ]);
  });
});
