import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { EventCards } from "./components/EventCards.jsx";
import { EventPage } from "./pages/EventPage.jsx";
import { PrivacyPage } from "./pages/PrivacyPage.jsx";
import { listedEvents, resolvePage } from "./routes.js";
export function App({ pathname }) {
  const page = resolvePage(pathname);
  if (page.kind === "privacy") return <PrivacyPage />;
  if (page.kind === "notFound")
    return (
      <main className="privacy-main">
        <h1>Страница не найдена</h1>
        <a href="/">Вернуться к событиям</a>
      </main>
    );
  return (
    <>
      <div className="noise" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      <Header />
      {page.kind === "home" ? (
        <>
          <EventCards
            id="upcoming-events"
            title="БЛИЖАЙШИЕ СОБЫТИЯ"
            headingLevel={1}
            events={listedEvents("upcoming")}
          />
          <EventCards
            id="temnota-ii-photos"
            title="ПРОШЕДШИЕ СОБЫТИЯ"
            events={listedEvents("past")}
          />
        </>
      ) : (
        <EventPage event={page.event} />
      )}
      <Footer />
    </>
  );
}
