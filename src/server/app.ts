import { Hono } from "hono";
import api from "./routes/api.ts";
import { document, type ClientAssets } from "./document.ts";

export function createApp(assets: ClientAssets) {
  const app = new Hono();
  app.get("/", (c) => c.html(document(assets)));
  app.route("/api", api);
  return app;
}
