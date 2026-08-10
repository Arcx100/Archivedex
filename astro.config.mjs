import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
// https://astro.build/config
export default defineConfig({
  // Links with data-astro-prefetch get their target page's HTML fetched on
  // hover/focus, so the click feels instant. Applied selectively to the
  // main nav (see BaseLayout.astro) rather than site-wide — with 642 game
  // cards on the library page, prefetching every link on hover would mean
  // a burst of requests just from someone moving their mouse across the grid.
  prefetch: {
    defaultStrategy: 'hover',
  },
  vite: {
    plugins: [tailwindcss()]
  }
});