import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import devServer from "@hono/vite-dev-server";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  if (mode === "server") {
    return {
      ssr: { noExternal: true },
      build: {
        ssr: "src/server/index.ts",
        outDir: "dist/server",
        copyPublicDir: false,
        rolldownOptions: {
          output: {
            entryFileNames: "index.mjs",
            chunkFileNames: "[name].mjs",
          },
        },
      },
    };
  }

  return {
    appType: "custom",
    plugins: [
      tailwindcss(),
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      devServer({
        entry: "src/server/dev.ts",
        // Vite owns source modules, internal endpoints and public assets.
        exclude: [/^\/(?:src\/|@|node_modules\/)/, /^\/(?!api(?:\/|$))[^?]*\.[^/?]+(?:\?.*)?$/],
      }),
    ],
    build: {
      outDir: "dist/client",
      // Keep all styles in one file for the server's fixed stylesheet URL.
      cssCodeSplit: false,
      rolldownOptions: {
        input: "src/client/index.tsx",
        output: {
          entryFileNames: "assets/index.js",
          chunkFileNames: "assets/[name].js",
          assetFileNames: "assets/[name][extname]",
        },
      },
    },
  };
});
