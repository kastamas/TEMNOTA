document.addEventListener("DOMContentLoaded", () => {
  const targetDate = new Date("2026-06-06T23:00:00+03:00");
  const targetTimestamp = Math.floor(targetDate.getTime() / 1000);

  if (typeof FlipDown === "undefined") {
    return;
  }

  new FlipDown(targetTimestamp, "flipdown", {
    theme: "dark",
    headings: ["", "", "", ""],
  }).start();
});
