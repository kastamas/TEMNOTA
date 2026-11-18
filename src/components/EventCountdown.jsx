import { useEffect, useState } from "react";

export function EventCountdown({ startsAt }) {
  const [now, setNow] = useState(null);
  useEffect(() => {
    const update = () => setNow(Date.now());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [startsAt]);
  const remaining =
    now === null
      ? null
      : Math.max(0, Math.floor((Date.parse(startsAt) - now) / 1000));
  const values =
    remaining === null
      ? [null, null, null, null]
      : [
          Math.floor(remaining / 86400),
          Math.floor(remaining / 3600) % 24,
          Math.floor(remaining / 60) % 60,
          remaining % 60,
        ];
  return (
    <section
      className="event-countdown"
      aria-label="Обратный отсчёт до начала события"
    >
      <p className="event-countdown-label">
        {remaining === 0 ? "Событие началось" : "До начала"}
      </p>
      {remaining !== 0 && (
        <div className="event-countdown-values" role="timer" aria-live="off">
          {["Дней", "Часов", "Минут", "Секунд"].map((label, index) => (
            <div key={label}>
              <strong>
                {values[index] === null
                  ? "—"
                  : String(values[index]).padStart(2, "0")}
              </strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
