import { z } from "zod";

import { entityModuleKeys } from "../data/entity-modules";

export const featureFlagKeys = [
  "guides",
  ...entityModuleKeys,
  "tierLists",
  "news",
  "search",
  "calculator",
  "planner",
] as const;

export type FeatureFlagKey = (typeof featureFlagKeys)[number];

const featureFlagsShape = Object.fromEntries(
  featureFlagKeys.map((key) => [key, z.boolean()]),
) as Record<FeatureFlagKey, z.ZodBoolean>;

const pageIdSchema = z.string().regex(/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/);
const uniquePageIdsSchema = z
  .array(pageIdSchema)
  .min(1)
  .refine((values) => new Set(values).size === values.length, {
    message: "Page ID references must be unique.",
  });

export const gameConfigSchema = z
  .object({
    brand: z
      .object({
        name: z.string().trim().min(2),
        shortName: z.string().trim().min(2),
        mark: z.string().trim().min(1).max(6),
        tagline: z.string().trim().min(8),
      })
      .strict(),
    site: z
      .object({
        url: z.url().refine((value) => new URL(value).protocol === "https:", {
          message: "Production site URL must use HTTPS.",
        }),
        locale: z
          .string()
          .regex(/^en(?:-[A-Z]{2})?$/, "Locale must target an English market."),
        timezone: z.string().trim().min(1),
      })
      .strict(),
    seo: z
      .object({
        defaultTitle: z.string().trim().min(20).max(65),
        titleTemplate: z.string().includes("%s"),
        defaultDescription: z.string().trim().min(50).max(170),
      })
      .strict(),
    social: z
      .object({
        xHandle: z.string().regex(/^@[A-Za-z0-9_]{1,15}$/).optional(),
      })
      .strict(),
    navigation: z
      .object({
        primaryPageIds: uniquePageIdsSchema,
      })
      .strict(),
    homepage: z
      .object({
        featuredPageIds: uniquePageIdsSchema,
      })
      .strict(),
    features: z.object(featureFlagsShape).strict(),
  })
  .strict();

export type GameConfigInput = z.input<typeof gameConfigSchema>;
export type GameConfig = z.output<typeof gameConfigSchema>;

export function defineGameConfig(input: GameConfigInput) {
  return Object.freeze(gameConfigSchema.parse(input));
}
