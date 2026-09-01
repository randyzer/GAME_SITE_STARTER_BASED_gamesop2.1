# Content and Data Guide

## Page Inventory owns publishing intent

Create or edit `src/data/page-inventory.json` first. Each row owns the stable
route, page type, cluster/module, feature gate, publishing workflow,
indexability, title, description, primary keyword, relationships, sources, and
confidence. Page components consume those values; do not duplicate them in MDX
frontmatter.

An editorial MDX file contains only its matching `pageId` in frontmatter:

```md
---
pageId: guide.example-topic
---

# Visible article content starts here
```

The Inventory row must include a matching `contentRef.collection` and
`contentRef.slug`. Build validation rejects unknown, duplicate, disabled, or
mismatched references.

## Game facts own patch-sensitive values

Entity files live at:

- `src/data/facts/heroes.json`
- `src/data/facts/weapons.json`
- `src/data/facts/items.json`
- `src/data/facts/maps.json`

The corresponding module key, entity type, route segment, parser, and labels
are registered once in `src/data/entity-modules.ts`. Concrete schemas and route
presenters remain explicit per family; the registry is not a plugin system or a
universal entity renderer.

Do not create an empty production file for a disabled module. When enabled,
the complete file must pass its explicit schema in `src/data/schemas/facts.ts`.
Every record includes an ID/slug, summary, patch, update date, confidence, and
at least one source with URL, access date, type, and evidence note.

Facts do not create routes by themselves. Add reviewed hub/database/detail
Inventory rows and matching entity references before enabling the module.
Inventory validation rejects feature/module/page-type combinations that do not
match the registered capability owner.

## Tools

Use one `src/data/tools/<route-slug>.json` file per enabled tool. Calculator
formulas are declarative operation trees; arbitrary JavaScript and `eval` are
not supported. Planner slots/options are explicit and share state only through
the URL fragment. See `src/data/tools/README.md` and
`src/data/schemas/tools.ts` for the exact contract.

## Editorial collections

- Guides: `src/content/guides/`
- Tier/meta reports: `src/content/meta/`
- Patch/news: `src/content/news/`

Empty optional collections are intentional. Add no filler article simply to
remove an empty-glob message. Each published page must answer a distinct search
intent with page-specific value; do not generate thin keyword-swapped pages.

## Validation sequence

```bash
npm run validate
npm run check
npm run build
```

Use Page Inventory relationships for hubs, children, related entities, and
related guides. Build audit rejects broken internal routes and orphaned
indexable pages.
