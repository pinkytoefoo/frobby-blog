
import { defineConfig } from "astro/config";

import mountain from "./src/styles/mountain-shiki.json";

export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: mountain,
    },
  },
});