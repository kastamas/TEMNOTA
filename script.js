const countdownRoot = document.getElementById("countdown");
const eventDate = new Date("2026-06-06T23:00:00+03:00");

function getWord(value, words) {
  const abs = Math.abs(value) % 100;
  const last = abs % 10;

  if (abs > 10 && abs < 20) {
    return words[2];
  }

  if (last > 1 && last < 5) {
    return words[1];
  }

  if (last === 1) {
    return words[0];
  }

  return words[2];
}

function updateCountdown() {
  if (!countdownRoot) {
    return;
  }

  const diff = eventDate.getTime() - Date.now();

  if (diff <= 0) {
    countdownRoot.innerHTML =
      '<div><strong>00</strong><span>дней</span></div><div><strong>00</strong><span>часов</span></div><div><strong>00</strong><span>минут</span></div>';
    return;
  }

  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  countdownRoot.innerHTML = `
    <div><strong>${String(days).padStart(2, "0")}</strong><span>${getWord(days, ["день", "дня", "дней"])}</span></div>
    <div><strong>${String(hours).padStart(2, "0")}</strong><span>${getWord(hours, ["час", "часа", "часов"])}</span></div>
    <div><strong>${String(minutes).padStart(2, "0")}</strong><span>${getWord(minutes, ["минута", "минуты", "минут"])}</span></div>
  `;
}

updateCountdown();
window.setInterval(updateCountdown, 30000);
