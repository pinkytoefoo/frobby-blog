import { defineConfig } from "astro/config";

import mountain from "./src/styles/mountain-shiki.json";

import mdx from "@astrojs/mdx";

export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: mountain,
    },
  },

  integrations: [mdx()],
});