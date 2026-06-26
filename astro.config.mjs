import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.matthewmincher.dev",
  integrations: [react(), icon(), sitemap()],
  image: {
    domains: ["pxscdn.com", "bookwyrm-social.sfo3.digitaloceanspaces.com"],
  },
  vite: {
    optimizeDeps: {
      include: ["react-dom/client"],
    },
    server: {
      proxy: {
        "/api": {
          target: "https://www.matthewmincher.dev",
          changeOrigin: true,
        },
      },
    },
  },
});
