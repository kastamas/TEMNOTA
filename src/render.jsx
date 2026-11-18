import { renderToString } from "react-dom/server";
import { App } from "./App.jsx";
import { resolvePage, paths } from "./routes.js";
import { site } from "./data/site.js";
export { paths };
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
export function render(path) {
  const page = resolvePage(path);
  const url = site.origin + page.path;
  const image = site.origin + (page.image || site.image);
  const title = escape(page.title);
  const description = escape(page.description);
  return {
    html: renderToString(<App pathname={path} />),
    bodyClass: page.bodyClass,
    head: `<title>${title}</title>
<meta name="description" content="${description}" />
<link rel="canonical" href="${escape(url)}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="${escape(url)}" />
<meta property="og:image" content="${escape(image)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${escape(image)}" />${page.kind === "notFound" ? '<meta name="robots" content="noindex" />' : ""}`,
  };
}
