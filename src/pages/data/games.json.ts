import type { APIRoute } from "astro";
import { games, getDifficultyPips, getPlaytime, getHexagonStats } from "../../data/games";

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
  pips: getDifficultyPips(g),
  playtime: getPlaytime(g),
  stats: getHexagonStats(g),
}));

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(trimmed), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
