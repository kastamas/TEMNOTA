// Единственный источник данных для карточек, страниц и метаданных событий.
export const events = [
  {
    slug: "dram-360",
    startsAt: "2026-12-12T23:00:00+03:00",
    title: "FUTURE FIRE & DRAM 360°",
    dateLabel: "12 декабря",
    status: "upcoming",
    listed: true,
    index: "05",
    venue: "КЛУБ «РЯДОМ»",
    cover: "/dram-360-future-fire.webp",
    socialImage: "/dram-360-future-fire.png",
    description:
      "FUTURE FIRE & DRAM 360° — дабстеп и драм-энд-бэйс 12 декабря, 23:00 — 05:00, клуб «Рядом», Литейная, 1, Петрозаводск.",
    layout: "detail",
    time: "23:00 — 05:00",
    address: "ЛИТЕЙНАЯ, 1",
    map: {
      latitude: 61.784531,
      longitude: 34.369229,
      name: "Клуб «Рядом»",
      address: "Петрозаводск, Литейная площадь, 1",
    },
    socialGroup: "dram",
    blocks: [
      {
        type: "paragraph",
        text: "FUTURE FIRE & DRAM 360°",
        bold: true,
      },
      {
        type: "paragraph",
        text: "12 декабря бетонные стены бункера содрогнутся под натиском мощного дабстепа и драм-энд-бэйса в формате 360°! 💥",
        italic: true,
      },
      {
        type: "paragraph",
        text: "→ хедлайнер ночи — диджей, саунд-продюсер и основатель СЛУЖБЫ БЕЗОПАСНОСТИ ДАБСТЕПА: ",
        link: { label: "FUTURE FIRE", url: "https://t.me/futurefire" },
        italic: true,
      },
      {
        type: "paragraph",
        text: "MISHA SIDEX · SWAMP CAKE · FUTURE FIRE · DAYPE · VILAEV",
      },
      {
        type: "ticketBatches",
        batches: [
          { label: "Первая партия билетов", value: "SOLD OUT" },
          { label: "Вторая партия билетов", value: "SOLD OUT" },
          { label: "Третья партия билетов", value: "9 НОЯБРЯ" },
          { label: "Четвертая партия билетов", value: "30 НОЯБРЯ" },
        ],
      },
      {
        type: "ticketWidget",
        eventId: 2877223,
        params: {
          accentColor: "rgba(193, 22, 22, 1)",
          textBtnColor: "#FFFFFF",
        },
      },
      {
        type: "paragraph",
        text: "12 декабря, 23:00 — 05:00\nклуб «Рядом»: Литейная, 1\nгород Петрозаводск",
      },
      {
        type: "paragraph",
        text: "★★★★★",
        italic: true,
      },
    ],
  },
  {
    slug: "temnota-3",
    startsAt: "2026-12-26T23:00:00+03:00",
    title: "TEMNOTA III",
    dateLabel: "26 декабря",
    status: "upcoming",
    listed: true,
    index: "06",
    venue: "КЛУБ «РЯДОМ»",
    cover: "/temnota-3-winter.webp",
    description:
      "26 декабря город накроет мощь и тьма ударных, а клуб «Рядом» станет ледяным дворцом 🗡",
    layout: "detail",
    time: "23:00 — 05:00",
    address: "ЛИТЕЙНАЯ, 1",
    map: {
      latitude: 61.784531,
      longitude: 34.369229,
      name: "Клуб «Рядом»",
      address: "Петрозаводск, Литейная площадь, 1",
    },
    blocks: [
      {
        type: "paragraph",
        narrowOnDesktop: true,
        text: "26 декабря город накроет мощь и тьма ударных, а клуб «Рядом» станет ледяным дворцом 🗡",
        italic: true,
      },
      {
        type: "paragraph",
        narrowOnDesktop: true,
        text: "→ хедлайнер ночи — диджей и соосновательница промо-группы BLOOM: ",
        link: {
          label: "PEACH TOUCH",
          url: "https://www.instagram.com/peach_touch",
        },
        italic: true,
      },
      {
        type: "paragraph",
        text: "DJANCO · KIRILLE · NVL VLM · MISHA SIDEX & BOLSHOE UHO",
        italic: true,
      },
      {
        type: "ticketWidget",
        eventId: 2916817,
        params: {
          accentColor: "rgba(223, 227, 227, 1)",
          textBtnColor: "#080607",
        },
      },
      {
        type: "ticketBatches",
        socialGroup: "tmnt",
        batches: [
          { label: "Первая партия билетов", value: "16 НОЯБРЯ" },
          { label: "Вторая партия билетов", value: "30 НОЯБРЯ" },
          { label: "Третья партия билетов", value: "7 ДЕКАБРЯ", hidden: true },
          {
            label: "Четвертая партия билетов",
            value: "21 ДЕКАБРЯ",
            hidden: true,
          },
        ],
      },
      {
        type: "paragraph",
        text: "26 декабря, 23:00 — 05:00\nклуб «Рядом»: Литейная, 1\nгород Петрозаводск",
      },
      {
        type: "paragraph",
        text: "★★★★★",
        italic: true,
      },
    ],
  },
  {
    slug: "drum+nuwei",
    title: "DRAM + NUWEI",
    dateLabel: "12.09.2026",
    status: "past",
    listed: true,
    index: "03",
    venue: "КЛУБ «РЯДОМ»",
    cover: "/dram-nuwei-poster-vertical.webp",
    description: "12 сентября, 23:00, клуб «Рядом», Литейная, 1.",
    layout: "detail",
    time: "23:00 — 05:00",
    address: "ЛИТЕЙНАЯ, 1",
    map: {
      latitude: 61.784531,
      longitude: 34.369229,
      name: "Клуб «Рядом»",
      address: "Петрозаводск, Литейная площадь, 1",
    },
    socialGroup: "dram",
    blocks: [
      {
        type: "paragraph",
        text: "12 сентября в клубе «Рядом» встретятся два направления электронной музыки",
      },
      {
        type: "direction",
        label: "01 / DRAM",
        title: "ЭНЕРГИЧНЫЙ ДАБСТЕП И ДРАМ-ЭНД-БЭЙС",
        text: "Во главе с московским продюсером NUWEI — резидентом лейбла ELEPHANT TRUNK, участником вечеринок и фестивалей Найт Вайб, Пиратская станция, Neuropunk, We Love D’n’B и WODB",
        lineup: "SWAMP CAKE · VILAEV · DAYPE · NUWEI · RUNN!NG BUNNY",
      },
      {
        type: "direction",
        label: "02 / TMNT",
        title: "ТЁМНОЕ ТЕХНО И ЭЛЕКТРО",
        text: "От резидентов объединения и новых артистов",
        lineup: "NVLVLM · KIRILLE · ШЕЛОНЯ · DJANCO · MISHA SIDEX · ALEX ESTET",
      },
    ],
  },
  {
    slug: "temnota-2",
    title: "TEMNOTA II: SIXXXSEVEN",
    dateLabel: "06.06.2026",
    status: "past",
    listed: true,
    index: "02",
    venue: "КЛУБ «РЯДОМ»",
    cover: "/temnota-ii-photo-01.webp",
    description:
      "TEMNOTA II: SIXXXSEVEN — техно-рейв в Петрозаводске. 6 июня, 23:00. Две сцены, одна ночь и бесконечная TEMNOTA.",
    layout: "gallery",
    photos: [
      {
        src: "/temnota-ii-photo-03.webp",
        alt: "Танцпол TEMNOTA II в красном свете",
        tall: false,
      },
      {
        src: "/temnota-ii-photo-04.webp",
        alt: "Свет на танцполе TEMNOTA II",
        tall: false,
      },
      {
        src: "/temnota-ii-photo-05.webp",
        alt: "Гости у сцены TEMNOTA II",
        tall: false,
      },
      {
        src: "/temnota-ii-photo-06.webp",
        alt: "Артист за пультом TEMNOTA II",
        tall: false,
      },
      {
        src: "/temnota-ii-photo-02.webp",
        alt: "Диджей и оборудование на TEMNOTA II",
        tall: true,
      },
      {
        src: "/temnota-ii-photo-09.webp",
        alt: "Диджей в цветном свете TEMNOTA II",
        tall: true,
      },
      {
        src: "/temnota-ii-photo-11.webp",
        alt: "Диджей под синим навесом TEMNOTA II",
        tall: true,
      },
      {
        src: "/temnota-ii-photo-07.webp",
        alt: "Артист в оранжевом свете TEMNOTA II",
        tall: false,
      },
      {
        src: "/temnota-ii-photo-08.webp",
        alt: "Диджей за пультом у стены TEMNOTA II",
        tall: false,
      },
    ],
    credit: {
      name: "ROMA FLORAL",
      url: "https://t.me/romafloral",
    },
  },
  {
    slug: "temnota-1",
    title: "TEMNOTA I: BOHEMIUM",
    dateLabel: "08.11.2025",
    status: "past",
    listed: true,
    index: "01",
    venue: "КЛУБ «ПРОГРЕСС»",
    cover: "/temnota-i-bohemium-cover-v2.webp",
    description:
      "Фоторепортаж с TEMNOTA I: BOHEMIUM — 8 ноября 2025 года, клуб «Прогресс».",
    layout: "gallery",
    photos: [
      {
        src: "/temnota-i-photo-01.webp",
        alt: "TEMNOTA I: фотография 1",
        tall: false,
      },
      {
        src: "/temnota-i-photo-02.webp",
        alt: "TEMNOTA I: фотография 2",
        tall: false,
      },
      {
        src: "/temnota-i-photo-03.webp",
        alt: "TEMNOTA I: фотография 3",
        tall: false,
      },
      {
        src: "/temnota-i-photo-04.webp",
        alt: "TEMNOTA I: фотография 4",
        tall: false,
      },
      {
        src: "/temnota-i-photo-05.webp",
        alt: "TEMNOTA I: фотография 5",
        tall: false,
      },
      {
        src: "/temnota-i-photo-06.webp",
        alt: "TEMNOTA I: фотография 6",
        tall: false,
      },
    ],
    credit: {
      name: "STASYA",
      url: "https://www.instagram.com/confusingyourmind/",
    },
  },
  {
    slug: "vinyl-practice",
    title: "ВИНИЛ + ПРАКТИКА",
    dateLabel: "04.09.2026",
    status: "past",
    listed: false,
    index: "04",
    venue: "ФАБРИКА ДИДЖЕЕВ",
    cover: "/vinyl-practice-03.jpg",
    description:
      "4 сентября, 19:00–21:00, практическая лекция по виниловому диджеингу в «Фабрике Диджеев».",
    layout: "gallery",
    photos: [
      {
        src: "/vinyl-practice-01.jpg",
        alt: "Диджей за проигрывателем на виниловой практике",
        tall: false,
      },
      {
        src: "/vinyl-practice-02.jpg",
        alt: "Участник виниловой практики за пультом",
        tall: false,
      },
      {
        src: "/vinyl-practice-03.jpg",
        alt: "Участник виниловой практики с пластинкой",
        tall: false,
      },
    ],
    credit: {
      name: "DJ PRIME",
      url: "https://www.instagram.com/primedeejay/",
    },
  },
];
