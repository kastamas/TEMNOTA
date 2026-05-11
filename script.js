document.addEventListener("DOMContentLoaded", () => {
  const targetDate = new Date("2026-06-06T23:00:00+03:00");
  const targetTimestamp = Math.floor(targetDate.getTime() / 1000);

  if (typeof FlipDown !== "undefined") {
    new FlipDown(targetTimestamp, "flipdown", {
      theme: "dark",
      headings: ["", "", "", ""],
    }).start();
  }

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
  const galleryItems = [...document.querySelectorAll(".location-gallery-item")];
  const galleryPhotos = galleryItems
    .map((item) => item.querySelector("img"))
    .filter(Boolean);
  let activePhotoIndex = 0;
  let photoTouchStartX = 0;

  const showPhoto = (index) => {
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

  galleryItems.forEach((item, itemIndex) => {
    item.addEventListener("click", () => {
      if (!photoModal || !photoModalImage) {
        return;
      }

      showPhoto(itemIndex);
      photoModal.classList.add("is-open");
      photoModal.setAttribute("aria-hidden", "false");
      document.body.classList.add("is-modal-open");
      photoModal.focus();
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
