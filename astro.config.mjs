import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://tejadosreformas.com",
  output: "static",
  adapter: cloudflare({
    platform: "static",
  }),
  build: {
    format: "file",
  },
});
