export function LocationMap({ location }) {
  const coordinates = `${location.longitude},${location.latitude}`;
  const parameters = new URLSearchParams({
    ll: coordinates,
    pt: `${coordinates},pm2rdm`,
    z: "16",
    l: "map",
  });
  const mapUrl = `https://yandex.ru/maps/?${parameters}`;
  return (
    <section className="venue-map" aria-label={`Локация: ${location.name}`}>
      <div className="venue-map-heading">
        <div>
          <h2>{location.name}</h2>
          <p>{location.address}</p>
        </div>
        <a href={mapUrl} target="_blank" rel="noopener noreferrer">
          Открыть карту <span aria-hidden="true">↗</span>
        </a>
      </div>
      <iframe
        className="venue-map-frame"
        src={`https://yandex.ru/map-widget/v1/?${parameters}`}
        title={`Карта: ${location.name}, ${location.address}`}
        loading="lazy"
        allowFullScreen
      />
    </section>
  );
}
