import type { APIRoute } from "astro";
import { games } from "../../data/games";

// Fields needed by client-side code: card rendering (library "load more" /
// filtering), the compare table, and the homepage "I'm Feeling Lucky" picker.
// Deliberately excludes the long-form fields that are only ever rendered at
// build time on the game detail page (whyItMatters, bestFor, avoidIf,
// officialSource, linuxCompat) — those never need to reach the client as
// data, only as pre-rendered HTML, so shipping them here would be pure waste.
const trimmed = games.map((g) => ({
  id: g.id,
  name: g.name,
  type: g.type,
  base: g.base,
  runtime: g.runtime,
  status: g.status,
  category: g.category,
  rating: g.rating,
  length: g.length,
  difficulty: g.difficulty,
  grind: g.grind,
  story: g.story,
  dex: g.dex,
  sourceStatus: g.sourceStatus,
  tags: g.tags,
  mood: g.mood,
  description: g.description,
  creator: g.creator,
}));

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(trimmed), {
    headers: {
      "Content-Type": "application/json",
      // This file only changes when the dataset is rebuilt, so it's safe to
      // cache aggressively client-side. Astro writes this as a static file
      // at build time; hosts that respect Cache-Control on static assets
      // (or a CDN in front of the site) will honor this.
      "Cache-Control": "public, max-age=3600",
    },
  });
};
