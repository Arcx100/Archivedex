# ArchiveDex performance pass — July 2026

This documents the optimization work done on top of the visual/animation
upgrade. It covers what was actually wrong, what changed, the numbers
before and after, and what was deliberately left alone.

For context, this followed on from the three-option menu discussed earlier
(A: cap + load more, B: virtual scrolling, C: static per-category pages).
**A is what got built.** See "What wasn't done" at the bottom for B, C, and
a few other things that came up along the way.

## TL;DR

| Page | Before | After | Change |
|---|---|---|---|
| `/library` | 8.0 MB | 880 KB | **−89%** |
| `/` (home) | ~384 KB | 98 KB | **−74%** |
| `/compare` | ~388 KB | 15.7 KB | **−96%** |
| `/games/[id]` (detail) | ~84 KB | ~79 KB | −6% |
| Full `dist/` | 63 MB | ~53 MB | −16%* |

*\*The 642 individual game detail pages dominate total site weight and were
barely touched — see the [detail page](#detail-page-games-id) section.*

The library page was the one actually reported as broken (~8MB), and it
turned out to have **two** compounding causes, not one. Fixing both is why
the number moved this much.

---

## Root cause #1: all 642 cards were always in the DOM

`library.astro` rendered every game as a full `GameCard` at build time, and
"filtering" just hid/showed/reordered those 642 live DOM nodes with JS.
Typing in the search box meant re-scanning 642 elements on every keystroke,
and the page shipped every game's full data (including descriptions) as
literal HTML whether you'd ever scroll to it or not.

**Fix:** `library.astro` now server-renders only the first 48 cards (sorted
the same way the client defaults to — rating, high to low — so there's no
visual jump once JS takes over). The full dataset is fetched once from a
new static JSON endpoint and filtering/sorting happens against that
in-memory array instead of the DOM. More cards render on scroll ("Load
more" button + `IntersectionObserver` auto-trigger at 600px).

## Root cause #2 (the bigger one): view-transition CSS scales per-card, not per-component

This wasn't in the original menu of options — it only showed up once I
actually measured the built HTML. `GameCard.astro` sets three
`transition:name` attributes per card (cover, name, rating) to power the
shared-element morph into the detail page. Astro's View Transitions
implementation generates a dedicated `@layer astro { ::view-transition-... }`
CSS block **per unique name it encounters during a page's render** — it's
not a fixed cost per component, it scales linearly with instance count.

Each block is ~2.4KB. On the old library page: 642 cards × 3 names = 1,926
blocks = **4.6MB of pure boilerplate CSS**, on a page that was 8.3MB total.
That's more than half the page weight, and it's why the number was in the
megabytes instead of the hundreds-of-KB you'd expect from "642 fancy cards."

```
Before: library/index.html — 1,927 <style> blocks, 4,633,869 bytes of it
After:  library/index.html —   145 <style> blocks,   346,446 bytes of it
```

**Fix:** this one is mostly a side effect of fix #1 — capping SSR output to
48 cards means only 48×3=144 transition names get generated instead of
642×3. Cards added later via "Load more" are rendered by a plain JS
template (see below) that doesn't attempt shared-element transitions at
all, since Astro can't compile scoped CSS for elements it never built.
Clicking into a "load more" card still navigates fine — it just fades
instead of morphing. That's a deliberate trade: 92% less transition CSS on
the heaviest page, in exchange for the morph effect only applying to the
first screen or two of cards. Homepage (9 `GameCard` instances) and each
detail page's "related games" strip (≤4-6 instances) keep full morph
support — the cost only gets ugly at library-page scale.

If you want the morph back on every card, the lever is `PAGE_SIZE` in
`library.astro` (currently 48) — SSR-ing more cards restores transitions
for more of them, at a CSS cost of roughly 7KB per additional card (3
blocks × ~2.4KB).

---

## What changed, file by file

### New: `src/pages/data/games.json.ts`

A static JSON endpoint, built once, containing a trimmed version of the
642-game dataset — id, name, type, base, runtime, status, category,
rating, length, difficulty, grind, story, dex, sourceStatus, tags, mood,
description, creator. It deliberately excludes the long-form fields that
only ever get rendered server-side on the detail page (`whyItMatters`,
`bestFor`, `avoidIf`, `officialSource`, `linuxCompat`) since those never
need to reach the client as data.

This is now the single source of truth for client-side game data. It's
fetched by `library.astro`, `compare.astro`, and `index.astro` (the "I'm
Feeling Lucky" picker) instead of each page embedding its own copy. Because
it's one URL, the browser's HTTP cache means the second page that needs it
in a session effectively gets it for free.

### `src/pages/library.astro` — rewritten

- SSRs `PAGE_SIZE` (48) cards instead of all 642, pre-sorted to match the
  client's default sort.
- Client script fetches `/data/games.json` once, builds a search string
  per game up front, and filters/sorts that in-memory array. No more DOM
  scanning.
- Search input is debounced 140ms. Dropdowns (`type`/`category`/`runtime`/
  `status`/`sort`) still apply immediately on `change` — those aren't
  fired per-keystroke, so debouncing them would only add latency.
- A `cardHTML()` function in the client script renders the same markup as
  `GameCard.astro` for cards added via search/filter/"load more". It
  intentionally skips `transition:name` (see root cause #2).
- **New behavior:** the page stays in a "pristine" state (server-rendered
  DOM untouched) until either a URL param requests a non-default filter,
  or the person interacts with a control. The moment that happens, the
  grid is fully owned by client-side rendering for the rest of the visit.
  This is what keeps the entrance animation and card-morph transition
  intact on first paint without adding complexity to every subsequent
  render.
- Compare-toggle and tag-chip clicks use event delegation on `#game-grid`
  (one listener) instead of per-node binding, since cards now come and go.
  Tag-chips inside server-rendered cards are still bound by `GameCard`'s
  own script (unchanged); the delegated handler checks `data-bound` so
  those don't double-fire, and only handles chips on client-rendered cards.

### `src/components/GameCard.astro`

The category gradient, category icon-badge background, noise texture, and
status-dot color were previously computed as **inline `style` attributes,
per card**. Moved to shared classes in `global.css`
(`.cat-grad-*`, `.card-noise`, `.status-dot-*`) — same visual result, one
short class name per card instead of ~150-250 bytes of repeated CSS text.
This helps every page that uses `GameCard` (library, home, detail-page
related games), and the client-side card renderer in `library.astro` uses
the same class names, so there's one place to change a color, not two.

**If you add a new category:** update the icon map in both
`GameCard.astro` and `library.astro`'s `catIcon`, and add a matching
`.cat-grad-*` rule in `global.css`. Falls back to `.cat-grad-default` if
you forget, so it won't break, just look generic.

### `src/pages/index.astro`

The full 642-game dataset (with descriptions) was inlined via
`define:vars` purely to power the "I'm Feeling Lucky" scoring — a script
block on the order of ~300KB on every homepage load. Replaced with a fetch
to `/data/games.json`, kicked off as soon as the Lucky modal opens (so it
resolves well before the person finishes the 3-question flow — in
practice there's no visible wait). The tiny `featured` list (4 games, a
few fields) stays inlined; it's small enough that fetching it separately
wouldn't be worth a round trip.

### `src/pages/compare.astro`

Same story — the full dataset was inlined via `define:vars` for the
picker search and comparison table. Now fetched from `/data/games.json`
inside `initComparePage`, which became `async` to await it before the
picker and initial URL-restored selection run.

### `astro.config.mjs` + `src/layouts/BaseLayout.astro`

Added `prefetch: { defaultStrategy: 'hover' }`. This is opt-in per link
(`data-astro-prefetch`), not site-wide — with 642 game cards on the
library page, prefetching every link on hover would mean a burst of
requests just from moving the mouse across the grid. Applied to: the logo,
the four main nav links (Library/Collections/Compare/Source Notes), the
category quick-nav strip, and the mobile menu equivalents. Hovering a nav
link now fetches that page's HTML ~80ms later, before the click even
happens.

Left `/random` and the mobile 🎲 shortcut alone — it's a
redirect-to-a-different-page-every-time link, so there's nothing stable to
prefetch.

---

## What wasn't done

**Option B (virtual/windowed scrolling)** — not implemented. The plan
called this "overkill unless A still feels heavy," and A got the library
page from 8MB to 880KB, most of that drop from a real architectural fix
rather than a partial mitigation. Revisit only if 48-cards-at-a-time still
feels heavy in practice.

**Option C (static per-category pages, e.g. `/library/category/roguelike`)**
— not implemented. Category quick-nav links still go to
`/library?category=X` and filter client-side, same as before, just now
prefetched on hover (see above) so the click itself feels instant even
without a dedicated static route. This is the one item from the original
menu that's still genuinely on the table if crawlability or a zero-JS
category view matters — it wasn't done here to keep this pass scoped to
the page that was actually reported as broken.

**Font loading** — checked, not applicable. There's no `@font-face` or
Google Fonts `<link>` anywhere in the project; the site uses the system
font stack via Tailwind's font-weight utilities. Nothing to fix.

**Collections page** — checked, already fine. It imports `games` at build
time, filters and renders statically, no `GameCard`, no client-side
dataset. No action needed, matching the original suspicion.

**Detail page (`/games/[id]`)** — the "related games" computation was
already build-time-only (`const related = games.filter(...)` in the
frontmatter), so it was never shipping dataset-wide data to the client.
The only change it picks up here is the smaller `GameCard` markup from the
CSS-token extraction, which is why it only moved 84KB → 79KB. The bulk of
its remaining weight is legitimate — it's a real page of specific content
about one game — not a JS payload problem.

**Route-level code splitting** — already automatic per Astro's default
behavior; nothing to change.

---

## Testing performed

- `astro build` — clean build, 648 pages, no errors.
- Verified `/data/games.json` output: 642 entries, correct field set.
- Built a jsdom harness that loads the **actual bundled production
  script** (not a re-implementation) against a minimal DOM and a mocked
  `fetch`, then exercises it end to end: initial 48-card render, debounced
  search (verified against an independently-computed expected match set),
  category filtering, "Load more" pagination, and compare-toggle event
  delegation. All 13 assertions passed against the real shipped JS.
- Same syntax/sanity check (`node --check`) on the compiled `compare.astro`
  and `index.astro` script bundles, plus confirmed both reference
  `/data/games.json`.
- Manually confirmed via `curl` that `/`, `/library`, `/compare`, and
  `/data/games.json` all return 200 from `astro preview`.

## Environment note

Reinstalling `node_modules` from a clean `npm install` was necessary before
any of this — the checked-in install had a top-level `vite@8.0.16`
(rolldown-based) shadowing the `vite@7.x` that Astro and `@tailwindcss/vite`
actually expect, which broke `astro build` outright with a resolver error.
A clean install fixed the version resolution. `package.json` itself wasn't
changed; `package-lock.json` now reflects a working, consistent tree — keep
it if you don't want to re-hit this.

The `node node_modules/astro/bin/astro.mjs <command>` workaround for the
broken CLI symlink is still required and unrelated to the above.
