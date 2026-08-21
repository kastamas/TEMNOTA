document.addEventListener("DOMContentLoaded", () => {
  const posterFrame = document.querySelector(".event-poster-frame");
  const posterReveal = document.querySelector(".event-poster-reveal");
  const mobilePosterQuery = window.matchMedia("(max-width: 620px)");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (posterFrame && posterReveal) {
    let posterTicking = false;

    const updatePosterReveal = () => {
      posterTicking = false;

      if (!mobilePosterQuery.matches || reducedMotionQuery.matches) {
        posterReveal.style.removeProperty("--reveal-progress");
        return;
      }

      const frameTop = posterFrame.getBoundingClientRect().top;
      const travel = Math.max(240, posterFrame.offsetHeight * 0.58);
      const progress = Math.min(1, Math.max(0, -frameTop / travel));
      posterReveal.style.setProperty("--reveal-progress", progress.toFixed(3));
    };

    const requestPosterUpdate = () => {
      if (posterTicking) return;
      posterTicking = true;
      window.requestAnimationFrame(updatePosterReveal);
    };

    updatePosterReveal();
    window.addEventListener("scroll", requestPosterUpdate, { passive: true });
    window.addEventListener("resize", requestPosterUpdate);
  }

  const targetDate = new Date("2026-06-06T23:00:00+03:00");
  const targetTimestamp = Math.floor(targetDate.getTime() / 1000);

  if (typeof FlipDown !== "undefined") {
    new FlipDown(targetTimestamp, "flipdown", {
      theme: "dark",
      headings: ["", "", "", ""],
    }).start();
  }

  const eventCountdown = document.querySelector("[data-countdown-date]");

  if (eventCountdown) {
    const eventDate = new Date(eventCountdown.dataset.countdownDate);
    const days = eventCountdown.querySelector("[data-countdown-days]");
    const hours = eventCountdown.querySelector("[data-countdown-hours]");
    const minutes = eventCountdown.querySelector("[data-countdown-minutes]");
    const seconds = eventCountdown.querySelector("[data-countdown-seconds]");
    const daysLabel = eventCountdown.querySelector("[data-countdown-days-label]");
    const hoursLabel = eventCountdown.querySelector("[data-countdown-hours-label]");
    const minutesLabel = eventCountdown.querySelector("[data-countdown-minutes-label]");
    const secondsLabel = eventCountdown.querySelector("[data-countdown-seconds-label]");

    const pluralize = (value, one, few, many) => {
      const modulo10 = value % 10;
      const modulo100 = value % 100;

      if (modulo10 === 1 && modulo100 !== 11) return one;
      if (modulo10 >= 2 && modulo10 <= 4 && (modulo100 < 12 || modulo100 > 14)) return few;
      return many;
    };

    const updateEventCountdown = () => {
      const remaining = Math.max(0, eventDate.getTime() - Date.now());
      const totalSeconds = Math.floor(remaining / 1000);
      const values = {
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
      };

      days.textContent = String(values.days).padStart(2, "0");
      hours.textContent = String(values.hours).padStart(2, "0");
      minutes.textContent = String(values.minutes).padStart(2, "0");
      seconds.textContent = String(values.seconds).padStart(2, "0");
      daysLabel.textContent = pluralize(values.days, "день", "дня", "дней");
      hoursLabel.textContent = pluralize(values.hours, "час", "часа", "часов");
      minutesLabel.textContent = pluralize(values.minutes, "минута", "минуты", "минут");
      secondsLabel.textContent = pluralize(values.seconds, "секунда", "секунды", "секунд");
    };

    updateEventCountdown();
    window.setInterval(updateEventCountdown, 1000);
  }

  const interviewSection = document.getElementById("interview");
  const interviewOpenButton = document.querySelector(".second-screen-interview-action");
  const interviewHideButton = document.querySelector(".interview-hide");

  const showInterview = () => {
    if (!interviewSection || !interviewOpenButton) {
      return;
    }

    interviewSection.hidden = false;
    interviewOpenButton.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => {
      interviewSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const hideInterview = () => {
    if (!interviewSection || !interviewOpenButton) {
      return;
    }

    interviewSection.hidden = true;
    interviewOpenButton.setAttribute("aria-expanded", "false");
    interviewOpenButton.scrollIntoView({ behavior: "smooth", block: "center" });
    interviewOpenButton.focus();
  };

  interviewOpenButton?.addEventListener("click", (event) => {
    event.preventDefault();
    showInterview();
  });

  interviewHideButton?.addEventListener("click", hideInterview);

  const mapElement = document.getElementById("location-map");

  if (mapElement && typeof ymaps !== "undefined") {
    ymaps.ready(() => {
      const locationCoordinates = [61.784531, 34.369229];
      const locationMap = new ymaps.Map(
        mapElement,
        {
          center: locationCoordinates,
          zoom: 16,
          controls: ["fullscreenControl"],
        },
        {
          suppressMapOpenBlock: true,
        }
      );

      locationMap.behaviors.disable(["drag", "scrollZoom", "dblClickZoom", "multiTouch", "rightMouseButtonMagnifier"]);
      const locationPlacemark = new ymaps.Placemark(
        locationCoordinates,
        {
          balloonContentHeader: "Клуб «Рядом»",
          balloonContentBody: "Петрозаводск, Литейная площадь, 1",
        },
        {
          preset: "islands#redDotIcon",
        }
      );

      locationMap.geoObjects.add(locationPlacemark);
      locationPlacemark.balloon.open();
    });
  }

  const photoModal = document.querySelector(".photo-modal");
  const photoModalImage = document.querySelector(".photo-modal-image");
  const photoModalClose = document.querySelector(".photo-modal-close");
  const photoModalPrev = document.querySelector(".photo-modal-prev");
  const photoModalNext = document.querySelector(".photo-modal-next");
  const galleryGroups = [
    [...document.querySelectorAll("#temnota-ii-photo-list button.temnota-ii-photo")],
    [...document.querySelectorAll(".location-gallery-item")],
    [...document.querySelectorAll(".past-event-photo")],
  ].filter((group) => group.length > 0);
  let activePhotoGroup = [];
  let activePhotoIndex = 0;
  let photoTouchStartX = 0;

  const getVisibleGalleryPhotos = (group) =>
    group
      .filter((item) => item.offsetParent !== null)
      .map((item) => item.querySelector("img"))
      .filter(Boolean);

  const showPhoto = (index) => {
    const galleryPhotos = getVisibleGalleryPhotos(activePhotoGroup);

    if (!photoModalImage || galleryPhotos.length === 0) {
      return;
    }

    activePhotoIndex = (index + galleryPhotos.length) % galleryPhotos.length;
    const image = galleryPhotos[activePhotoIndex];

    photoModalImage.src = image.currentSrc || image.src;
    photoModalImage.alt = image.alt;
  };

  const closePhotoModal = () => {
    if (!photoModal || !photoModalImage) {
      return;
    }

    photoModal.classList.remove("is-open");
    photoModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-modal-open");
    photoModalImage.src = "";
    photoModalImage.alt = "";
  };

  const changePhoto = (step) => {
    showPhoto(activePhotoIndex + step);
  };

  galleryGroups.forEach((group) => {
    group.forEach((item) => {
      item.addEventListener("click", () => {
        if (!photoModal || !photoModalImage) {
          return;
        }

        const image = item.querySelector("img");
        const visiblePhotos = getVisibleGalleryPhotos(group);
        const visibleIndex = visiblePhotos.indexOf(image);

        if (visibleIndex < 0) {
          return;
        }

        activePhotoGroup = group;
        showPhoto(visibleIndex);
        photoModal.classList.add("is-open");
        photoModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("is-modal-open");
        photoModal.focus();
      });
    });
  });

  photoModalClose?.addEventListener("click", closePhotoModal);
  photoModalPrev?.addEventListener("click", () => changePhoto(-1));
  photoModalNext?.addEventListener("click", () => changePhoto(1));

  photoModal?.addEventListener("click", (event) => {
    if (event.target === photoModal) {
      closePhotoModal();
    }
  });

  photoModal?.addEventListener(
    "touchstart",
    (event) => {
      photoTouchStartX = event.changedTouches[0].clientX;
    },
    { passive: true }
  );

  photoModal?.addEventListener(
    "touchend",
    (event) => {
      const photoTouchEndX = event.changedTouches[0].clientX;
      const swipeDistance = photoTouchEndX - photoTouchStartX;

      if (Math.abs(swipeDistance) < 48) {
        return;
      }

      changePhoto(swipeDistance < 0 ? 1 : -1);
    },
    { passive: true }
  );

  document.addEventListener("keydown", (event) => {
    if (!photoModal?.classList.contains("is-open")) {
      return;
    }

    if (event.key === "Escape") {
      closePhotoModal();
    }

    if (event.key === "ArrowLeft") {
      changePhoto(-1);
    }

    if (event.key === "ArrowRight") {
      changePhoto(1);
    }
  });

  const slider = document.querySelector("[data-slider]");

  if (!slider) {
    return;
  }

  const slides = [...slider.querySelectorAll(".second-slide")];
  const dots = [...slider.querySelectorAll("[data-slider-dot]")];
  const stageButtons = [...slider.querySelectorAll("[data-stage-jump]")];
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

    stageButtons.forEach((button) => {
      const isActiveStage = button.dataset.stageJump === slides[activeIndex]?.dataset.stage;

      button.classList.toggle("is-active", isActiveStage);
      button.setAttribute("aria-pressed", String(isActiveStage));
    });
  };

  prevButton?.addEventListener("click", () => showSlide(activeIndex - 1));
  nextButton?.addEventListener("click", () => showSlide(activeIndex + 1));

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => showSlide(dotIndex));
  });

  stageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetStage = button.dataset.stageJump;
      const targetIndex = slides.findIndex((slide) => slide.dataset.stage === targetStage);

      if (targetIndex >= 0) {
        showSlide(targetIndex);
      }
    });
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
