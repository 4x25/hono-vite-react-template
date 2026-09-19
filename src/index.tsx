import { Hono } from "hono";
import { renderToString } from "react-dom/server";

const app = new Hono();

app.get("/", (c) => {
  const html = renderToString(
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>vite-app</title>
        <script type="module" src="/src/main.tsx"></script>
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>,
  );

  return c.html("<!DOCTYPE html>" + html);
});

export default app;
