import { TicketWidget } from "./TicketWidget.jsx";
import { EventSocialLinks } from "./EventSocialLinks.jsx";

export function EventDescription({ blocks }) {
  return (
    <div className="event-detail-description">
      {blocks.map((block, index) => {
        if (block.type === "ticketBatches")
          return (
            <section
              className="ticket-batches"
              data-social-group={block.socialGroup}
              aria-label="Партии билетов"
              key={index}
            >
              <ul>
                {block.batches
                  .filter((batch) => !batch.hidden)
                  .map(({ label, value }) => (
                    <li key={label}>
                      {label} — <strong>{value}</strong>
                    </li>
                  ))}
              </ul>
              <p className="ticket-batches-social-label">
                Актуальная информация в соцсетях:
              </p>
              <EventSocialLinks group={block.socialGroup} />
            </section>
          );
        if (block.type === "quote")
          return (
            <blockquote key={index}>
              {block.lines.map((line, i) => (
                <span
                  key={i}
                  style={{ display: "block", paddingLeft: `${i}em` }}
                >
                  {line}
                </span>
              ))}
            </blockquote>
          );
        if (block.type === "ticketWidget")
          return (
            <TicketWidget
              key={index}
              eventId={block.eventId}
              params={block.params}
            />
          );
        if (block.type === "tickets")
          return (
            <p key={index}>
              🎟 БИЛЕТЫ: <a href={block.url}>{block.label}</a>
            </p>
          );
        if (block.type === "direction")
          return (
            <section className="event-detail-direction" key={index}>
              <span>{block.label}</span>
              <h2>{block.title}</h2>
              <p>{block.text}</p>
              <div className="event-detail-direction-lineup">
                <span>LINE-UP</span>
                <p>{block.lineup}</p>
              </div>
            </section>
          );
        const content = (
          <>
            {block.text}
            {block.link && (
              <a href={block.link.url}>
                <strong>{block.link.label}</strong>
              </a>
            )}
          </>
        );
        const text = block.bold ? (
          <strong>{content}</strong>
        ) : block.italic ? (
          <em>{content}</em>
        ) : (
          content
        );
        return (
          <p
            key={index}
            className={
              block.narrowOnDesktop ? "event-description-narrow" : undefined
            }
            style={{ whiteSpace: "pre-line" }}
          >
            {text}
          </p>
        );
      })}
    </div>
  );
}
