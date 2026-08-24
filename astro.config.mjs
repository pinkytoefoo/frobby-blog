import { defineConfig, fontProviders } from "astro/config";

import mountain from "./src/styles/mountain-shiki.json";

import mdx from "@astrojs/mdx";

export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: mountain,
    },
  },

  integrations: [mdx()],

  fonts: [
    {
      provider: fontProviders.google(),
      name: "Geist",
      cssVariable: "--font-geist"
    },
    {
      provider: fontProviders.google(),
      name: "Geist Mono",
      cssVariable: "--font-geist-mono"
    }
  ]
});
