import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        sourcemap: true,
      },

      manifest: {
        name: "Constology",
        short_name: "Constology",
        description: "Constology",

        icons: [
          {
            src: "/icons/pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "/icons/Screenshot wide.png",
            sizes: "1861x1210",
            type: "image/png",
            form_factor: "wide",
            label: "Application",
          },
          {
            src: "/icons/Screenshot.png",
            sizes: "510x1114",
            type: "image/png",
            label: "Application",
          },
        ],
        display: "standalone",
        start_url: "/",
        background_color: "#f7f7f7",
        theme_color: "#f7f7f7",
        id: "/",
      },
    }),
  ],
});
