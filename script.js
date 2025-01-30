function updateUTCTime() {
  const timeElement = document.getElementById("utc-time");
  const now = new Date();
  timeElement.textContent = now.toUTCString();
}

// Update time immediately and set up refresh
updateUTCTime();
setInterval(updateUTCTime, 1000);
