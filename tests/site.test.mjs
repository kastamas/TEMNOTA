import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { events } from "../src/data/events.js";
import { eventUrl, listedEvents, paths, resolvePage } from "../src/routes.js";

test("Every event has a unique route, existing media and complete content", () => {
  assert.equal(new Set(events.map(eventUrl)).size, events.length);
  for (const event of events) {
    assert.ok(
      event.title && event.description && event.dateLabel && event.venue,
    );
    assert.ok(existsSync(`public${event.cover}`), event.cover);
    for (const photo of event.photos || [])
      assert.ok(existsSync(`public${photo.src}`), photo.src);
    if (event.layout === "detail") assert.ok(event.blocks?.length);
    if (event.layout === "gallery")
      assert.ok(event.photos?.length && event.credit);
    assert.equal(resolvePage(eventUrl(event)).event, event);
    assert.equal(resolvePage(eventUrl(event) + "index.html").event, event);
    assert.equal(resolvePage(eventUrl(event).slice(0, -1)).event, event);
  }
});

test("Archive uses the previous DRAM and excludes the unlisted vinyl workshop", () => {
  assert.deepEqual(
    listedEvents("past").map((event) => event.slug),
    ["drum+nuwei", "temnota-2", "temnota-1"],
  );
  assert.deepEqual(
    listedEvents("upcoming").map((event) => event.slug),
    ["dram-360", "temnota-3"],
  );
  assert.equal(resolvePage("/events/vinyl-practice/").kind, "event");
  assert.equal(resolvePage("/missing/").kind, "notFound");
});

test("Production pages include content and metadata before JavaScript runs", () => {
  for (const path of paths) {
    const html = readFileSync(`dist${path}index.html`, "utf8");
    const page = resolvePage(path);
    assert.ok(html.includes("<title>"), path);
    assert.ok(html.includes(`https://tmntptz.ru${path}`), path);
    assert.ok(html.includes("<h1"), path);
    assert.ok(html.includes('property="og:image"'), path);
    assert.ok(!html.includes("<!--app-html-->"), path);
    if (page.kind === "event") {
      const escapedTitle = page.event.title
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#x27;");
      assert.ok(html.includes(escapedTitle), path);
    }
    for (const [, url] of html.matchAll(/(?:src|href)="(\/[^"?#]*)/g)) {
      assert.ok(
        existsSync(`dist${url}`),
        `${path}: missing asset or route ${url}`,
      );
    }
  }
  assert.ok(readFileSync("dist/404.html", "utf8").includes("noindex"));
});
