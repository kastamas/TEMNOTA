import { EventCountdown } from "../components/EventCountdown.jsx";
import { BackLink } from "../components/Header.jsx";
import { EventCards } from "../components/EventCards.jsx";
import { EventDescription } from "../components/EventDescription.jsx";
import { EventSocialLinks } from "../components/EventSocialLinks.jsx";
import { LocationMap } from "../components/LocationMap.jsx";
import { PhotoGallery } from "../components/PhotoGallery.jsx";
import { listedEvents } from "../routes.js";
export function EventPage({ event }) {
  if (event.layout === "gallery")
    return (
      <>
        <div className="archive-events-back">
          <BackLink />
        </div>
        <main>
          <PhotoGallery event={event} />
        </main>
      </>
    );
  return (
    <>
      <main className="event-detail">
        <BackLink />
        <div className="event-detail-grid">
          <figure className="event-detail-poster">
            <img
              src={event.cover}
              alt={`Афиша ${event.title}`}
              fetchPriority="high"
            />
          </figure>
          <article className="event-detail-copy">
            <h1>{event.title}</h1>
            {event.status === "upcoming" && event.startsAt && (
              <EventCountdown startsAt={event.startsAt} />
            )}
            <EventDescription blocks={event.blocks} />
            {event.socialGroup === "dram" &&
              !event.blocks.some((block) => block.type === "ticketBatches") && (
                <EventSocialLinks />
              )}
            {event.map && <LocationMap location={event.map} />}
          </article>
        </div>
      </main>
      <EventCards
        id="upcoming-events"
        title="БЛИЖАЙШИЕ СОБЫТИЯ"
        preview
        events={listedEvents("upcoming").filter(
          (item) => item.slug !== event.slug,
        )}
      />
      <EventCards
        id="past-events-preview"
        title="ПРОШЕДШИЕ СОБЫТИЯ"
        preview
        events={listedEvents("past").filter((item) => item.slug !== event.slug)}
      />
    </>
  );
}
