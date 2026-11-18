import { events } from "./data/events.js";
import { site } from "./data/site.js";
export const eventUrl = (event) => `/events/${event.slug}/`;
export const listedEvents = (status) =>
  events.filter((event) => event.listed && event.status === status);
export function resolvePage(pathname) {
  const path = pathname.replace(/\/index\.html$/, "/").replace(/\/*$/, "/");
  if (path === "/")
    return {
      kind: "home",
      path,
      title: site.title,
      description: site.description,
      image: site.image,
      bodyClass: "poster-only past-events-page",
    };
  if (path === "/privacy-policy/")
    return {
      kind: "privacy",
      path,
      title: "Политика обработки персональных данных — TMNT",
      description:
        "Политика ИП Сидорова М. М. в отношении обработки персональных данных.",
      bodyClass: "privacy-page",
    };
  const event = events.find((item) => eventUrl(item) === path);
  if (event)
    return {
      kind: "event",
      event,
      path,
      title: event.title + (event.status === "past" ? " — архив" : ""),
      description: event.description,
      image: event.socialImage || event.cover,
      bodyClass:
        event.layout === "detail"
          ? "event-detail-page"
          : event.slug === "temnota-2"
            ? "archive-photos-only"
            : "temnota-i-archive" +
              (event.slug === "vinyl-practice"
                ? " vinyl-practice-archive"
                : ""),
    };
  return {
    kind: "notFound",
    path,
    title: "Страница не найдена — TMNT",
    description: "Эта страница не найдена.",
    bodyClass: "privacy-page",
  };
}
export const paths = ["/", ...events.map(eventUrl), "/privacy-policy/"];
