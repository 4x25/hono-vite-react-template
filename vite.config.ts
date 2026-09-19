import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import devServer, { defaultOptions } from "@hono/vite-dev-server";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    devServer({
      entry: "src/index.tsx",
      exclude: [/\.(svg|png)(\?.*)?$/, ...defaultOptions.exclude],
    }),
  ],
});
