import "vite/modulepreload-polyfill";
import "@vitejs/plugin-react/preamble";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";
import AppRoutes from "./routes";
import "./global.less";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  </StrictMode>,
);
