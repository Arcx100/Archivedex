import type { APIRoute } from "astro";
import { tools } from "../../data/tools";

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(tools), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
