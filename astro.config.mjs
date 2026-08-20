// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
// import partytown from "@astrojs/partytown";
import tailwindcss from "@tailwindcss/vite";
import astroLLMsGenerator from "astro-llms-generate";

import react from "@astrojs/react";

export default defineConfig({
  site: "https://pilotinstructionalcenter.com",

  integrations: [sitemap({
    filter: (page) => {
      const path = new URL(page).pathname;

      return (
        !path.includes("confirmation") &&
        !path.includes("404") &&
        !path.includes("500")
      );
    },

    serialize: (item) => {
      const path = new URL(item.url, "https://pilotinstructionalcenter.com")
        .pathname;

      if (path === "/") {
        item.priority = 1.0;
        item.changefreq = "daily";
      } else if (
        path.startsWith("/flight-training") ||
        path.startsWith("/blog")
      ) {
        item.priority = 0.9;
        item.changefreq = "weekly";
      } else if (path === "/about") {
        item.priority = 0.8;
        item.changefreq = "monthly";
      } else if (
        path.includes("privacy-policy") ||
        path.includes("terms-of-service")
      ) {
        item.priority = 0.3;
        item.changefreq = "yearly";
      } else {
        item.priority = 0.6;
        item.changefreq = "monthly";
      }

      return item;
    },
  }), // partytown(),
  astroLLMsGenerator(), react()],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["graphiql"],
    },
    server: {
      hmr: true,
    },
    esbuild: {
      jsx: "automatic",
    },
  },
});