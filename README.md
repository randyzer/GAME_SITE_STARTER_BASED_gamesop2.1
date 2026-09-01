# Game Atlas Starter

An English-first, static game SEO starter built around two separate sources of
truth:

- `src/data/page-inventory.json` decides which URLs may ship, index, link, and
  appear in search.
- `src/data/facts/*.json` and `src/data/tools/*.json` hold patch-sensitive game
  values and evidence once.

The default build contains a small generic starter site, not fictional game
facts or articles. Optional route families are absent until their feature flag,
Inventory rows, implementation, and validated data all agree.

## Requirements

- Node.js 22.22.0 (`.nvmrc`)
- npm with lockfile support

```bash
nvm use
npm ci
npm run check
npm run build
npm run preview
```

The production output is `dist/`. `npm run build` validates configuration and
data, builds Astro pages, reconciles every HTML route with Page Inventory,
creates the Pagefind index, and audits generated SEO/accessibility/link/budget
contracts.

## Architecture

- Astro static output; ordinary pages ship no client JavaScript.
- Strict TypeScript and Zod at configuration/data boundaries.
- MDX Content Collections for guides, meta reports, and patch news.
- Explicit route families for heroes, weapons, items, maps, editorial pages,
  calculators, and planners.
- React islands only for Pagefind search, entity filtering, calculators, and
  planners.
- Page Inventory-derived navigation, homepage directory, related links,
  canonical URLs, sitemap, indexability, and build reconciliation.
- Source/date/confidence provenance attached to facts, articles, and tools.

See [architecture](docs/ARCHITECTURE_PROPOSAL.md), [content and data](docs/CONTENT_AND_DATA_GUIDE.md), [patch workflow](docs/PATCH_WORKFLOW.md), [deployment](docs/DEPLOYMENT.md), [release QA](docs/QA_CHECKLIST.md), and the latest [release audit](docs/RELEASE_AUDIT.md).

## Adopt for a real game

1. Set the brand, real HTTPS domain, locale, navigation, homepage features, and
   feature flags in `game.config.ts`. The shared mark, short name, tagline, and
   locale label all render from this config.
2. Declare each intended page in `src/data/page-inventory.json` before writing
   content or adding route data.
3. Add cited content/facts/tool definitions using the matching schema and
   exact Inventory reference.
4. Enable only modules whose pages and data are reviewed.
5. Run `npm run patch:impact -- --entity-type hero --entity-id example-hero`
   when a game patch changes an entity.
6. Run the complete check/build/preview workflow and finish
   `docs/QA_CHECKLIST.md` before release.

## Feature flags

Flags live in `game.config.ts`. Disabling a module removes its routes from the
enabled catalog, which also removes it from navigation, homepage discovery,
related links, sitemap, Pagefind, and generated HTML. Enabling an entity or tool
without its required validated data stops the build with a precise file error.

The supported flags are `guides`, `heroes`, `weapons`, `items`, `maps`,
`tierLists`, `news`, `search`, `calculator`, and `planner`. There are no public
reserved flags for unimplemented route families. Tools are fully disabled when
both `calculator` and `planner` are false.

Entity-family registration lives in `src/data/entity-modules.ts`. Adding a new
family extends that one explicit definition plus its concrete fact schema,
Inventory data, route presenter, and tests; generic Core algorithms do not keep
a second entity-family list.

## Commercial-use boundary

The starter architecture is designed for commercial websites. That does not
grant rights to a game's name, logo, screenshots, official art, third-party
wiki content, APIs, scraped data, or community submissions. The adopter must
review licenses, platform terms, attribution, privacy, advertising, analytics,
and legal copy for the actual business and jurisdiction.

No analytics, telemetry, accounts, database, CMS, ad scripts, or external
search service are included by default.
