# Release QA Checklist

Use this checklist after changing configuration, Page Inventory, content,
facts, tool definitions, dependencies, or page templates. Automated checks are
necessary but do not replace review of game accuracy, rights, or live-domain
behavior.

## Automated release gate

Run with the pinned Node version:

```bash
source /Users/randyz/.nvm/nvm.sh
nvm use 22.22.0
npm ci
npm run check
npm run build
```

`npm run build` must pass all of these stages:

- configuration, content-reference, fact, and page-type validation;
- Astro static generation;
- exact Inventory-to-HTML output reconciliation;
- Pagefind indexing;
- generated HTML, internal-link, schema, sitemap, robots, and asset-budget audit.

Treat the empty `meta` and `news` glob messages as expected only while those
features are disabled and the collections intentionally contain no articles.

## Content and data

- [ ] Every published route has one reviewed Page Inventory row.
- [ ] Every primary keyword is unique and matches the page's actual intent.
- [ ] Every entity/tool value is in one validated data file, not copied into prose.
- [ ] Sources are reachable, specific, dated, and support the visible claim.
- [ ] Patch/version labels agree across facts, tools, titles, and visible copy.
- [ ] `needsReview` and `needsUpdate` are cleared only after human review.
- [ ] Images, logos, screenshots, APIs, and third-party data have acceptable commercial-use rights.

## SEO and indexation

- [ ] The configured canonical URL is the real HTTPS production domain.
- [ ] Each indexable page has a unique title, description, one H1, canonical, and `index, follow` robots value.
- [ ] Noindex pages are absent from the XML sitemap and Pagefind body.
- [ ] Disabled modules are absent from routes, navigation, homepage, related links, sitemap, and search.
- [ ] Visible breadcrumbs and `BreadcrumbList` describe routes that actually exist.
- [ ] Article schema matches visible article content; add a reviewed image before targeting image-dependent rich results.
- [ ] Validate representative production URLs with Schema.org Validator and Google Rich Results Test after deployment.
- [ ] Inspect the live robots and sitemap URLs from outside the authenticated development environment.

## Interaction and accessibility

- [ ] Navigate every control using Tab, Shift+Tab, Enter, Space, and arrow keys where applicable.
- [ ] Skip link moves focus to `main#main-content`.
- [ ] Focus indicators remain visible against light, dark, and signal backgrounds.
- [ ] Search announces loading, result count, empty state, and failure through `aria-live`.
- [ ] Entity filtering preserves a complete SSR table before hydration.
- [ ] Tables can scroll horizontally at narrow widths without hiding columns.
- [ ] Calculator labels, bounds, units, formula sources, and divide-by-zero behavior are correct for the selected game patch.
- [ ] Planner required slots and fragment sharing work without transmitting selections.
- [ ] Meaningful images have descriptive alt text; decorative images use an empty alt value.
- [ ] With reduced motion enabled, content remains visible and usable.

## Responsive and browser review

Inspect all enabled routes at minimum:

- 390 × 844 mobile;
- 768 × 1024 tablet;
- 1440 × 1000 desktop.

At each size confirm:

- [ ] no page-level horizontal overflow;
- [ ] navigation and touch targets are usable;
- [ ] headings do not clip or collide;
- [ ] prose line length remains readable;
- [ ] cards, evidence ledgers, tables, and tool panels preserve all content;
- [ ] browser console has no warning or error;
- [ ] no unexpected third-party request is made.

Before commercial release, repeat the review in current stable Safari, Chrome,
and Firefox on real devices where practical.

## Performance and delivery

- [ ] Build audit reports remain below the documented starter budgets.
- [ ] Ordinary pages reference no client JavaScript.
- [ ] Search, filter, calculator, and planner scripts appear only on pages that use them.
- [ ] Record explicit authorization before any deployment upload.
- [ ] After deployment, inspect and record the provider-reported target and state; do not infer Preview or Production from the command name or CLI flags.
- [ ] Treat production aliases, production domains, and DNS changes as separately authorized external writes.
- [ ] Run a Lighthouse production audit on representative live URLs; record mobile results rather than assuming them from local bundle size.
- [ ] Verify caching, compression, redirects, custom 404 behavior, and HTTPS on the selected host.
- [ ] Verify analytics/cookie/legal requirements separately if the adopter adds those systems.
