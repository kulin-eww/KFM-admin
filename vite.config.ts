import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

// use env var for base
export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), svgr()],
    server: { allowedHosts: ["ea54a447-8284-4bfa-814f-84374900f5a9-00-2g27uxsvr8t4m.sisko.replit.dev"] },
  };
});
