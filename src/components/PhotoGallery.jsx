import { useEffect, useRef, useState } from "react";
function Lightbox({ photos, index, setIndex, onClose }) {
  const dialog = useRef(null);
  const touchX = useRef(null);
  const change = (delta) =>
    setIndex((current) => (current + delta + photos.length) % photos.length);
  useEffect(() => {
    const previous = document.activeElement;
    document.body.classList.add("is-modal-open");
    dialog.current.focus();
    return () => {
      document.body.classList.remove("is-modal-open");
      previous?.focus();
    };
  }, []);
  const photo = photos[index];
  return (
    <div
      ref={dialog}
      className="photo-modal is-open"
      role="dialog"
      aria-modal="true"
      aria-label="Просмотр фотографии"
      tabIndex={-1}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          change(-1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          change(1);
        }
        if (event.key === "Tab") {
          const buttons = [...dialog.current.querySelectorAll("button")];
          const current = buttons.indexOf(document.activeElement);
          event.preventDefault();
          buttons[
            (current + (event.shiftKey ? -1 : 1) + buttons.length) %
              buttons.length
          ].focus();
        }
      }}
      onTouchStart={(event) => {
        touchX.current = event.changedTouches[0].clientX;
      }}
      onTouchEnd={(event) => {
        const distance = event.changedTouches[0].clientX - touchX.current;
        if (touchX.current !== null && Math.abs(distance) >= 48)
          change(distance < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <button
        className="photo-modal-close"
        type="button"
        aria-label="Закрыть фотографию"
        onClick={onClose}
      >
        ×
      </button>
      <button
        className="photo-modal-nav photo-modal-prev"
        type="button"
        aria-label="Предыдущая фотография"
        onClick={() => change(-1)}
      >
        ‹
      </button>
      <img className="photo-modal-image" src={photo.src} alt={photo.alt} />
      <button
        className="photo-modal-nav photo-modal-next"
        type="button"
        aria-label="Следующая фотография"
        onClick={() => change(1)}
      >
        ›
      </button>
      <span className="photo-modal-counter" aria-live="polite">
        {index + 1} / {photos.length}
      </span>
    </div>
  );
}
export function PhotoGallery({ event }) {
  const [index, setIndex] = useState(null);
  const vinyl = event.slug === "vinyl-practice";
  return (
    <>
      <section
        id={
          event.slug === "temnota-2"
            ? "temnota-ii-photos"
            : `${event.slug}-photos`
        }
        className="temnota-ii-screen"
        aria-label={`Фотографии ${event.title}`}
      >
        <div className="temnota-ii-gallery">
          {!vinyl && (
            <div className="temnota-ii-photo temnota-ii-photo-featured">
              <img src={event.cover} alt={event.title} fetchPriority="high" />
              <div className="temnota-ii-heading">
                <div className="temnota-ii-heading-copy">
                  <h1
                    className={`temnota-ii-title ${event.slug === "temnota-1" ? "temnota-i-title" : ""}`}
                  >
                    {event.title}
                  </h1>
                  <span className="temnota-ii-kicker">
                    {event.dateLabel} · {event.venue}
                  </span>
                  <span className="temnota-ii-credit">
                    PHOTO REPORT BY{" "}
                    <a href={event.credit.url} target="_blank" rel="noreferrer">
                      {event.credit.name}
                    </a>
                  </span>
                </div>
              </div>
            </div>
          )}
          <div
            id="temnota-ii-photo-list"
            className={`temnota-ii-photo-list ${vinyl ? "vinyl-practice-photo-list" : ""}`}
          >
            {event.photos.map((photo, i) => (
              <button
                key={photo.src}
                className={`temnota-ii-photo ${photo.tall ? "temnota-ii-photo-tall" : ""}`}
                type="button"
                aria-label={`Открыть фотографию ${i + 1}`}
                onClick={() => setIndex(i)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
            {vinyl && (
              <div className="vinyl-practice-photo-credit">
                <h1>
                  {event.title} · {event.dateLabel}
                </h1>
                PHOTO REPORT BY{" "}
                <a href={event.credit.url} target="_blank" rel="noreferrer">
                  {event.credit.name}
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
      {index !== null && (
        <Lightbox
          photos={event.photos}
          index={index}
          setIndex={setIndex}
          onClose={() => setIndex(null)}
        />
      )}
    </>
  );
}
