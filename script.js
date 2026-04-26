document.addEventListener("DOMContentLoaded", () => {
  const targetDate = new Date("2026-06-06T23:00:00+03:00");
  const targetTimestamp = Math.floor(targetDate.getTime() / 1000);

  if (typeof FlipDown !== "undefined") {
    new FlipDown(targetTimestamp, "flipdown", {
      theme: "dark",
      headings: ["", "", "", ""],
    }).start();
  }

  const slider = document.querySelector("[data-slider]");

  if (!slider) {
    return;
  }

  const slides = [...slider.querySelectorAll(".second-slide")];
  const dots = [...slider.querySelectorAll("[data-slider-dot]")];
  const prevButton = slider.querySelector("[data-slider-prev]");
  const nextButton = slider.querySelector("[data-slider-next]");
  let activeIndex = 0;
  let touchStartX = 0;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
    });
  };

  prevButton?.addEventListener("click", () => showSlide(activeIndex - 1));
  nextButton?.addEventListener("click", () => showSlide(activeIndex + 1));

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => showSlide(dotIndex));
  });

  slider.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].clientX;
    },
    { passive: true }
  );

  slider.addEventListener(
    "touchend",
    (event) => {
      const touchEndX = event.changedTouches[0].clientX;
      const swipeDistance = touchEndX - touchStartX;

      if (Math.abs(swipeDistance) < 48) {
        return;
      }

      showSlide(activeIndex + (swipeDistance < 0 ? 1 : -1));
    },
    { passive: true }
  );
});
