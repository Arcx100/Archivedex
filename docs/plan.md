# ArchiveDex Blueprint

## Project Summary

ArchiveDex is a premium curated archive for Pokémon ROM hacks, fangames, PMD hacks, side games, and preservation-worthy fan projects.

The goal is not to become a random download website. The goal is to create a high-quality discovery and documentation platform where each game is easy to understand, compare, filter, and safely archive.

ArchiveDex should help users answer:

* What should I play?
* Is this game complete?
* Is it safe to download?
* Does it work on Linux?
* Is it story-focused, difficult, open-world, Fakemon-based, roguelike, or experimental?
* Is it worth preserving?
* What version/source should I trust?

## Core Identity

ArchiveDex is a mix of:

* Pokédex-style game database
* Steam-like game library
* museum/archive
* safety/source verification index
* Linux-friendly fan-game guide

The project should feel premium, modern, clean, and visually strong.

## What ArchiveDex Is

ArchiveDex is:

* a curated game archive
* a documentation database
* a discovery tool
* a safety-aware source tracker
* a Linux-compatible play guide
* a collector-grade preservation index

## What ArchiveDex Is Not

ArchiveDex is not:

* a ROM download site
* a prepatched ROM mirror
* a random fangame dump
* a malware-risk mirror
* a low-quality quantity-only list
* a replacement for official creator threads

ArchiveDex should link to official sources where possible, but should not host copyrighted ROMs or unsafe files.

---

# MVP Goal

The first version should be simple but working.

## MVP Pages

1. Home page
2. Library/search page
3. Game detail page
4. Collections page
5. Safety/info page

The first version does not need advanced animations, login, accounts, comments, or a full 500-game database.

## MVP Features

* show game cards
* search games
* filter games by category/runtime/status
* open a game page
* show basic metadata
* show tags
* show safety status
* show Linux compatibility
* use 10–20 test games first

---

# Build Order

## Stage 1 — Simple Working Website

Goal: make ArchiveDex run locally.

Build:

* Astro project
* Tailwind styling
* home page
* library page
* game cards
* game detail pages
* simple game database file

Use only 10–20 games for testing.

## Stage 2 — Better UI

Improve:

* card design
* layout spacing
* color system
* badges
* search/filter panel
* game detail layout
* category colors
* visual hierarchy

Do not add full database yet.

## Stage 3 — Data Expansion

After the UI works, expand from 10–20 games to:

* 50 games
* 100 games
* 250 games
* full database

Keep the database clean and deduped.

## Stage 4 — Advanced Discovery

Add:

* advanced filters
* sorting
* compare page
* curated lists
* recommendation sections
* Linux-friendly list
* safety-first list
* hidden gems
* best story games
* best open-world games
* best roguelikes

## Stage 5 — Visual Polish

Add:

* cover images
* screenshots
* category illustrations
* platform icons
* animated card hover
* experience radar
* score meters
* polished game pages

---

# Core Pages

## 1. Home Page

Purpose: introduce ArchiveDex and make users want to explore.

Sections:

* hero banner
* search bar
* archive stats
* featured games
* browse by platform
* browse by experience
* safety-first note
* curated collections

Example hero text:

> Discover Pokémon ROM hacks, fangames, PMD hacks, and preservation-worthy fan projects by quality, safety, platform, story, difficulty, length, and uniqueness.

## 2. Library Page

Purpose: main browsing/search page.

Needs:

* search input
* game grid
* filters
* sort options
* game cards

Basic filters:

* Type
* Runtime
* Base Game / Engine
* Status
* Category
* Length
* Difficulty
* Safety Status
* Linux Compatibility

Later filters:

* Story Depth
* Grinding
* Dex Style
* Feature Tags
* Mood Tags
* Source Confidence

## 3. Game Detail Page

Purpose: explain one game properly.

Sections:

* title
* badges
* quick facts
* rating
* description
* tags
* safety status
* Linux notes
* why it matters
* best for
* avoid if
* version/dedup notes
* related games

## 4. Collections Page

Purpose: curated discovery.

Collections:

* Essential Collection
* Must Play
* Best Story Games
* Best GBA ROM Hacks
* Best Fan Games
* Best Open World Games
* Best Fakemon Games
* Best Roguelikes
* Best PMD Hacks
* Best Short Games
* Best Linux-Friendly Games
* Safest Patch-Only Games
* Historical Classics
* Hidden Gems
* Watchlist / WIP

## 5. Safety Page

Purpose: explain safe downloading rules.

Safety rules:

* use official sources first
* prefer patch files for ROM hacks
* avoid random prepatched ROMs
* scan fan games before running
* sandbox executables
* mark mirror-only entries as unsafe or unverified

Safety labels:

* Safe Patch Source
* Official EXE, Scan Needed
* Sandbox First
* Watchlist Only
* Historical Only
* Mirror Only, Hold
* Prepatched Only, Reject
* Unsafe / Skip

---

# Main Data Fields

Each game should eventually have these fields:

| Field               | Purpose                                                    |
| ------------------- | ---------------------------------------------------------- |
| Name                | Game title                                                 |
| Type                | ROM Hack, Fan Game, PMD Hack, Side Game, Tool              |
| Base Game / Engine  | FireRed, Emerald, Crystal, RPG Maker XP, Unity, etc.       |
| Runtime             | GBA / mGBA, PC / Wine, NDS / melonDS, etc.                 |
| Status              | Complete, WIP, Demo, Hiatus, Historical                    |
| Version             | Current known version                                      |
| Creator             | Creator/team name                                          |
| Official Source     | Creator thread/site/GitHub                                 |
| Safety Status       | Patch only, EXE scan needed, mirror risk, etc.             |
| Linux Compatibility | mGBA ready, Wine needed, native Linux, unknown             |
| Category            | Essential, Must Play, Story Focused, etc.                  |
| Rating              | Archive value score                                        |
| Length              | Short, Medium, Long, Huge, Run-Based                       |
| Difficulty          | Casual, Normal, Hard, Kaizo, Competitive                   |
| Grinding            | Low, Normal, High, No Traditional Grind                    |
| Story Depth         | Minimal, Standard, Good, Story Heavy                       |
| Dex Style           | Full Dex, Expanded Dex, Regional Dex, Fakemon, No Catching |
| Feature Tags        | Open World, Fakemon, Mega Evolution, Fusion, etc.          |
| Mood Tags           | Cozy, Dark, Hardcore, Experimental, Nostalgic              |
| Description         | 1–2 sentence summary                                       |
| Why It Matters      | Archive reason                                             |
| Best For            | Who should play it                                         |
| Avoid If            | Who may dislike it                                         |
| Version Notes       | Variant/dedup info                                         |

---

# Primary Categories

Use one main category per game.

Categories:

* Essential Collection
* Must Play
* Story Focused
* Open World
* Fakemon
* Roguelike
* Difficulty
* Competitive
* Experimental
* Anime Inspired
* Historical Classic
* Hidden Gem
* Collector Only
* Watchlist
* Unsafe / Rejected

---

# Important Feature Tags

Use multiple tags per game.

Examples:

* New Region
* Open World
* Side Quests
* Mega Evolution
* Custom Megas
* Fakemon
* Regional Forms
* Fusion Pokémon
* Difficulty Options
* Nuzlocke Mode
* Randomizer
* Roguelike
* Dungeon Crawling
* PMD
* Shadow Pokémon
* Field Effects
* Crafting
* Contests
* Minigames
* Following Pokémon
* Battle Frontier
* Competitive AI
* Double Battles
* VGC Inspired
* Story Heavy
* Multiple Endings
* Playable Pokémon
* Anime Inspired
* Manga Inspired
* Historical Classic
* Low Grind
* Full Dex
* Linux Friendly

---

# Visual Direction

ArchiveDex should use a premium dark UI.

## Style

* dark background
* clean cards
* soft borders
* cyan/gold accents
* polished tag chips
* readable typography
* subtle gradients
* minimal but strong animation
* futuristic archive feeling

## Theme Keywords

* premium
* technical
* clean
* collector-grade
* futuristic
* Pokédex-like
* museum/archive
* polished

## Core Colors

| Role           | Color           |
| -------------- | --------------- |
| Background     | near black      |
| Cards          | dark blue-black |
| Primary Accent | cyan            |
| Premium Accent | gold            |
| Safe           | green           |
| Warning        | amber           |
| Danger         | red             |
| Watchlist      | purple          |
| Muted Text     | blue-gray       |

---

# First 20 Test Games

Use these to test the website because they cover many categories.

1. Pokémon Unbound
2. Pokémon Prism
3. Pokémon Crystal Clear
4. Pokémon Reborn
5. Pokémon Rejuvenation
6. Pokémon Infinite Fusion
7. Pokémon Uranium
8. Pokémon Insurgence
9. Pokémon Emerald Rogue
10. Pokémon Odyssey
11. Pokémon Emerald Seaglass
12. Pokémon Radical Red
13. Pokémon Gaia
14. Pokémon Xenoverse
15. Pokémon Fire Ash
16. Pokémon Reminiscencia
17. Pokémon Emerald Crest
18. Pokémon Tectonic
19. Pokémon Rocket Edition
20. Pokémon Brown

These cover:

* GBA ROM hacks
* GBC ROM hacks
* PC fangames
* story-heavy games
* open-world games
* roguelikes
* fusion games
* difficulty hacks
* historical classics
* anime-inspired games

---

# MVP File Structure

Astro project structure:

```text
archivedex/
├── docs/
├── public/
│   └── images/
├── src/
│   ├── components/
│   │   ├── GameCard.astro
│   │   ├── Badge.astro
│   │   ├── FilterPanel.astro
│   │   └── Layout.astro
│   ├── data/
│   │   └── games.ts
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── library.astro
│   │   ├── collections.astro
│   │   ├── safety.astro
│   │   └── games/
│   │       └── [id].astro
│   └── styles/
│       └── global.css
└── package.json
```

---

# Immediate Development Plan

## Step 1

Create Astro project and Tailwind.

## Step 2

Create `games.ts` with 10–20 games.

## Step 3

Create `GameCard.astro`.

## Step 4

Create homepage.

## Step 5

Create library page with search/filter.

## Step 6

Create dynamic game detail page.

## Step 7

Test locally.

## Step 8

Improve UI.

## Step 9

Add more data.

---

# Current Rule

Do not add all 500 games yet.

First build a good system with 10–20 entries. Once cards, search, filters, and game pages feel good, then scale the database.

Quality first. Quantity later.
