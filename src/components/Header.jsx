export function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="site-header-logo" href="/" aria-label="TMNT — на главную">
          <img src="/tmnt-logo.svg" alt="TMNT" />
        </a>
      </div>
    </header>
  );
}
export function BackLink() {
  return (
    <h2 className="past-events-section-title event-detail-section-title">
      <a href="/">
        <span aria-hidden="true">‹</span> ВСЕ СОБЫТИЯ
      </a>
    </h2>
  );
}
