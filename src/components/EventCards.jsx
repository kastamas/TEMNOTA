import { eventUrl } from "../routes.js";
export function EventCard({ event }) {
  return (
    <a
      className={`temnota-ii-photo temnota-ii-photo-featured past-event-card-link ${event.slug === "temnota-1" ? "past-event-card past-event-card-temnota-i" : ""}`}
      data-event-status={event.status}
      href={eventUrl(event)}
      aria-label={`Открыть ${event.title}`}
    >
      <img
        src={event.cover}
        alt={`Афиша ${event.title}`}
        loading="lazy"
        decoding="async"
      />
      <div className="past-events-banner-link past-events-photo-link">
        <span className="past-events-banner-event">
          <strong>{event.title}</strong>
          <small>
            {event.dateLabel}
            {event.status === "upcoming" &&
              event.time &&
              ` · ${event.time.split(" — ")[0]}`}
            {" · "}
            {event.venue}
          </small>
        </span>
        <span className="past-events-banner-action">
          <svg className="corner-arrow" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M6.4 18 5 16.6 14.6 7H6V5h12v12h-2V8.4z" />
          </svg>
        </span>
      </div>
    </a>
  );
}
export function EventCards({
  events,
  title,
  id,
  preview = false,
  headingLevel = 2,
}) {
  if (!events.length) return null;
  const Heading = `h${headingLevel}`;
  return (
    <section
      id={id}
      className={`temnota-ii-screen ${preview ? "past-events-preview" : ""}`}
      aria-labelledby={`${id}-title`}
    >
      <Heading id={`${id}-title`} className="past-events-section-title">
        {title}
      </Heading>
      <div className="temnota-ii-gallery" aria-label={title}>
        {events.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>
    </section>
  );
}
