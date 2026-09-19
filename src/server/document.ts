import { html } from "hono/html";

export interface ClientAssets {
  script: string;
  styles: string[];
}

// Only the document shell lives on the server. React renders in the browser.
export function document({ script, styles }: ClientAssets) {
  return html`<!DOCTYPE html>
    <html lang="zh-CN">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>LLM Gallery</title>
        ${styles.map((href) => html`<link rel="stylesheet" href="${href}" />`)}
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="${script}"></script>
      </body>
    </html>`;
}
