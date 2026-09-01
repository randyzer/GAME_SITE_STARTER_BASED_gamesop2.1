import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const contentSchema = z
  .object({
    pageId: z.string().regex(/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/),
  })
  .strict();

function editorialCollection(base: string) {
  return defineCollection({
    loader: glob({ base, pattern: "**/*.{md,mdx}" }),
    schema: contentSchema,
  });
}

export const collections = {
  guides: editorialCollection("./src/content/guides"),
  tierLists: editorialCollection("./src/content/meta"),
  news: editorialCollection("./src/content/news"),
};
