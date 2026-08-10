# ArchiveDex bug-fix pass — July 2026

Full pass over the project as it stood in the handed-off archive. Covers
what was actually wrong, per file, and why. Two categories: bugs that
change behavior, and a `latest`-everywhere `package.json` that's the root
cause of the recurring environment breakage.

---

## Behavioral bugs

### `src/pages/library.astro` — tag cloud had no threshold filter

The "Browse by Tags" cloud rendered **all 1,052 distinct tags** as buttons,
unfiltered. Confirmed against the shipped `dist/library/index.html` in the
handoff — 1,052 `data-filter-tag` buttons, not a theoretical issue. ~800 of
those tags are used by exactly one game out of 642, so this was mostly a
wall of one-off labels, not a usable filter.

**Fix:** added a `MIN_TAG_COUNT` threshold (currently `4`) — a tag only
makes the cloud if at least 4 games use it. Cuts it to 106 tags. Moods
weren't touched (33 total already, no noise problem there). This also
shrank `/library` further on top of the existing performance pass: 900KB →
636KB, since fewer buttons means less server-rendered HTML.

If 106 still feels like too many or too few, `MIN_TAG_COUNT` is the one
number to change — count scales roughly as: `>=3` → 147, `>=5` → 78, `>=6` → 63.

### `src/pages/games/[id].astro` — missing category in the gradient map

`catGradient` here had 13 entries; the same map in `collections.astro` (and
the `.cat-grad-*` classes in `global.css`) has 14 — both were missing
**"PMD Inspired"** except this file. Only one game currently carries that
category (`heritage` / *Pokémon Heritage*), and its detail page was falling
back to the generic gray gradient instead of the teal used everywhere else
that category shows up. Added the missing entry; confirmed the built page
now emits the teal gradient.

### `src/pages/games/[id].astro` — script ran on every page, not just detail pages

`initDetailPage()` had no guard, unlike every other page script in the
project (`library.astro`, `compare.astro`, `index.astro` all bail out early
if their page-specific marker element isn't present). Once bound via
`astro:page-load`, a listener stays bound for the rest of the session
regardless of which page you're on — so after visiting one game's detail
page, this function ran again on *every subsequent navigation anywhere on
the site*. Its DOM queries (`.tab-btn`, `.tab-panel`, `.spotlight-active`)
aren't unique to this page — `library.astro`'s tag/mood tabs and
`index.astro`'s hero panel reuse those same class names for unrelated UI —
so it was quietly attaching extra listeners to elements on other pages.
Added the same early-return guard the other pages already use.

### `src/pages/compare.astro` — wrong column count with exactly 1 game selected

`colClass` only special-cased `cols === 2`; anything else (including
`cols === 1`) fell through to the 4-column class meant for 3 games,
leaving two blank trailing columns. Reachable in practice: hitting
"Compare" on a game's detail page when nothing else is queued in
`sessionStorage` sends you to `/compare?games=<id>` with a single game,
which hits this exact path. Fixed to a proper 3-way switch (1/2/3 → 2/3/4
columns).

### `src/pages/index.astro` — "Random Game" button didn't do that

`#open-lucky` was labeled "🎲 Random Game" but is wired to the same handler
as the text link below it ("I'm Feeling Lucky — find my next game") — both
open the 3-question personalization quiz, not a random pick. An actual
random pick already exists as its own feature (`/random`, linked from the
header). Renamed the button to "🎲 I'm Feeling Lucky" to match what it
actually does and stop it colliding with the real random-pick feature.
Also dropped an unused `luckyQuestions` array in the frontmatter — dead
leftover from before the (now emoji-labeled) `QUESTIONS` array in the
client script; flagged by the type checker as unused.

### `src/layouts/BaseLayout.astro` — mobile menu stayed open across navigation

The header uses `transition:persist`, so it survives ClientRouter page
swaps instead of being torn down and recreated. Nothing reset the mobile
dropdown's open/closed state on navigation, so tapping a link *inside* the
open menu would land you on the new page with the menu still open over the
content. Pulled the close logic into `closeMobileMenu()` and call it at the
top of `initAll()`, which already runs on every `astro:page-load`.

---

## Type errors (`astro check`)

61 diagnostics in `src/`, 54 of them in `compare.astro` — it was the one
page script never given the typed-DOM treatment the others got (no
generics on `querySelector`/`getElementById`, no type on `selected`/
`gameData`, implicit-`any` callback params, `window.showToast` accessed
without the `(window as any)` cast used everywhere else). Retyped it to
match `library.astro`'s conventions (`type CompareGame`, generics on every
DOM query, the same `toast` cast pattern). Also picked up a handful of
one-line implicit-`any` fixes in `games/[id].astro` and `GameCard.astro`,
and silenced an `is:inline` hint on `random.astro` per Astro's own
suggestion.

`node node_modules/.bin/astro-check` now reports 0 errors / 0 warnings / 0
hints.

---

## Environment: `package.json` had every dependency on `latest`

This is almost certainly *why* the vite-version-mismatch problem
documented in `PERFORMANCE.md` happened at all, and why it's the kind of
thing that could resurface — `latest` on every dependency means a plain
`npm install` has no anchor and can resolve to whatever shipped upstream
that day, including a newer major version of a transitive dependency (like
vite) that the pinned-in-spirit-but-not-in-practice `astro`/
`@tailwindcss/vite` versions weren't built against.

**Fix:** pinned exact versions matching the last known-good
`package-lock.json` in the handoff — `astro@7.0.6`, `tailwindcss@4.3.2`,
`@tailwindcss/vite@4.3.2`, `typescript@6.0.3`, `@astrojs/check@0.9.9`. Also
added `name`/`version`/`private` fields (npm was warning about their
absence) — no functional effect, just quiets `npm install`.

Verified with a full clean-slate run (`rm -rf node_modules dist && npm
install && npm run build && astro-check`): 648 pages, 0 build errors, 0
type errors.

## Environment: no `.gitignore` anywhere in the project

Not in the current version, not in "old version" — nowhere. That's why the
handed-off archive was 553MB / 30,487 files: `node_modules` (208MB),
`dist` (50MB), and "old version" (264MB, almost entirely *its own*
`node_modules`) were all along for the ride. Added a `.gitignore` covering
`dist/`, `.astro/`, `node_modules/`, env files, and OS/editor cruft.

Worth doing yourself: **"old version" can probably just go.** It predates
`library.astro`, `collections.astro`, the game detail pages, and
`source-notes.astro` entirely — it's a snapshot from before most of the
site existed, and it's 99.7% its own stale `node_modules`.
