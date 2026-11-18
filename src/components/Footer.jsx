export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <span className="site-footer-about">
          TMNT — КАРЕЛЬСКАЯ ПРОМО-ГРУППА, СПЕЦИАЛИЗИРУЮЩАЯСЯ НА СОВРЕМЕННОМ
          АНДЕГРАУНДНОМ ЗВУКЕ
        </span>
        <span>ОРГАНИЗАТОР: ИП СИДОРОВ М.М.</span>
        <span>
          СВЯЗЬ:{" "}
          <a className="site-footer-contact" href="mailto:mikxsid@gmail.com">
            mikxsid@gmail.com
          </a>
        </span>
        <span>ИНН: 101602314369</span>
        <span>
          <a href="/privacy-policy/">ПОЛИТИКА ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ</a>
        </span>
        <span className="site-footer-socials">
          <a
            href="https://t.me/tmntptz"
            target="_blank"
            rel="noopener noreferrer"
          >
            TELEGRAM
          </a>
          <a
            href="https://www.instagram.com/tmntptz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            INSTAGRAM*
          </a>
        </span>
        <span className="site-footer-disclaimer">
          *ЯВЛЯЕТСЯ ПРОДУКТОМ КОМПАНИИ META, ПРИЗНАННОЙ ЭКСТРЕМИСТСКОЙ
          ОРГАНИЗАЦИЕЙ В РОССИИ
        </span>
        <span className="site-footer-copyright">© 2026 PETROZAVODSK</span>
      </div>
    </footer>
  );
}
