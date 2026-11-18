import { useEffect, useId, useRef, useState } from "react";

let apiPromise;
function loadRadario() {
  if (window.radario?.Widgets?.Event) return Promise.resolve(window.radario);
  if (!apiPromise) {
    apiPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://radario.ru/frontend/src/api/openapi/openapi.js";
      script.async = true;
      script.onload = () => {
        if (window.radario?.Widgets?.Event) resolve(window.radario);
        else {
          apiPromise = undefined;
          script.remove();
          reject(new Error("Radario unavailable"));
        }
      };
      script.onerror = () => {
        apiPromise = undefined;
        script.remove();
        reject(new Error("Radario unavailable"));
      };
      document.head.append(script);
    });
  }
  return apiPromise;
}

export function TicketWidget({ eventId, params }) {
  const id = `tickets-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const container = useRef(null);
  const [status, setStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let disposed = false;
    const element = container.current;
    loadRadario()
      .then((radario) => {
        if (disposed) return;
        radario.Widgets.Event({
          params: { ...params },
          standalone: false,
          createButton: true,
          eventId,
          appendId: id,
          buttonText: "Купить билет",
        });
        setStatus("ready");
      })
      .catch(() => {
        if (!disposed) setStatus("error");
      });
    return () => {
      disposed = true;
      element.replaceChildren();
    };
  }, [eventId, params, id, attempt]);
  return (
    <div
      className="ticket-widget"
      style={{ "--ticket-text-color": params.textBtnColor }}
      aria-label="Покупка билетов"
    >
      <div id={id} ref={container} />
      {status === "loading" && <p role="status">Загрузка билетов…</p>}
      {status === "error" && (
        <p role="status">
          Не удалось загрузить билеты.{" "}
          <button
            type="button"
            onClick={() => {
              setStatus("loading");
              setAttempt((value) => value + 1);
            }}
          >
            Попробовать ещё раз
          </button>
        </p>
      )}
      <noscript>Для покупки билета включите JavaScript.</noscript>
    </div>
  );
}
