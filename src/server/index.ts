import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { fileURLToPath } from "node:url";
import { createApp } from "./app.ts";

const clientDir = fileURLToPath(new URL("../client/", import.meta.url));
const app = createApp({
  script: "/assets/index.js",
  styles: ["/assets/style.css"],
});

app.use("*", async (c, next) => {
  if (c.req.path.split("/").some((part) => part.startsWith("."))) {
    return c.notFound();
  }
  await next();
});
app.use("*", serveStatic({ root: clientDir }));

const port = Number(process.env.PORT ?? 3000);
const server = serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => server.close());
}
