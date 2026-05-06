import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.matthewmincher.dev",
  integrations: [react(), icon(), sitemap()],
});
