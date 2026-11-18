import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { render, paths } from "../.render/render.js";
const template = await readFile("dist/index.html", "utf8");
for (const path of [...paths, "/404/"]) {
  const page = render(path);
  const filename =
    path === "/404/" ? "dist/404.html" : join("dist", path, "index.html");
  await mkdir(dirname(filename), { recursive: true });
  await writeFile(
    filename,
    template
      .replace("<!--app-head-->", page.head)
      .replace("<body>", `<body class="${page.bodyClass}">`)
      .replace("<!--app-html-->", page.html),
  );
}
console.log(`Rendered ${paths.length} pages and 404.html`);
