const dramLinks = [
  { label: "Telegram", icon: "telegram", url: "https://t.me/dram_ptz" },
  {
    label: "Instagram*",
    icon: "instagram",
    url: "https://www.instagram.com/dramptz/",
  },
  { label: "ВКонтакте", icon: "vk", url: "https://vk.ru/dramptz" },
];

const tmntLinks = [
  { label: "Telegram", icon: "telegram", url: "https://t.me/tmntptz" },
  {
    label: "Instagram*",
    icon: "instagram",
    url: "https://www.instagram.com/tmntptz/",
  },
  { label: "ВКонтакте", icon: "vk", url: "https://vk.ru/tmntptz" },
];

function SocialIcon({ name }) {
  if (name === "telegram")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="m21.4 3.5-3.2 16c-.2 1.1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.1-8.2c.4-.4-.1-.6-.6-.3L5.8 13.1 1 11.6c-1-.3-1-1 .2-1.5L20 2.9c.9-.3 1.6.2 1.4.6Z"
        />
      </svg>
    );
  if (name === "instagram")
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.8 20C4.6 20 .2 14.4 0 5h4.1c.2 6.9 3 9.8 5.2 10.4V5h3.9v5.9c2.2-.2 4.5-2.9 5.3-5.9h3.9c-.6 3.7-3.1 6.4-4.9 7.5 1.8.9 4.7 3.3 5.8 7.5H19c-.9-2.8-3.1-5-5.8-5.3V20h-.4Z"
      />
    </svg>
  );
}

export function EventSocialLinks({ group = "dram" }) {
  const links = group === "tmnt" ? tmntLinks : dramLinks;
  const name = group === "tmnt" ? "TMNT" : "DRAM";
  return (
    <nav className="event-social-links" aria-label={`Соцсети ${name}`}>
      {links.map(({ label, icon, url }) => (
        <a key={url} href={url} target="_blank" rel="noopener noreferrer">
          <SocialIcon name={icon} />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}
