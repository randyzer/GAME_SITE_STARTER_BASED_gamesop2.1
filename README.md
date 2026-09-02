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

## Start a New Game Site

1. Follow the authoritative
   [`GAME_SOP_2.1`](https://github.com/randyzer/GAME_SOP_2.1) before adapting
   the Starter.
2. Complete `PROJECT_BRIEF.md`, `RESEARCH_SOURCES.md`,
   `KEYWORD_RESEARCH.md`, `COMPETITOR_ANALYSIS.md`, `SITE_STRUCTURE.md`, and
   `CURRENT_STATUS.md` for the new project.
3. Complete Discovery Research before locking the page plan.
4. Finalize the structured runtime Page Inventory SSOT; this Starter uses
   `src/data/page-inventory.json` as that authority.
5. Stop for human review if Discovery materially adds, removes, or merges page
   scope.
6. Enter implementation only after the artifacts, Inventory, and any material
   scope change are approved.

During implementation, configure `game.config.ts`, add cited content and data
through the existing schemas, enable only reviewed modules, and finish the
complete check/build/preview workflow in `docs/QA_CHECKLIST.md`.

## Customize Game Visual Identity

1. Follow `GAME_SOP_2.1` to complete Game Visual Identity Research.
2. Open `src/styles/theme.css`.
3. Replace the Starter fallback theme with the researched palette.
4. Keep game-specific colors out of components; consume the shared Theme
   Tokens instead.
5. Run the complete QA workflow after changing the palette.

Theme mechanism = Stable Core. Game-specific palette = Flexible Edge.

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
