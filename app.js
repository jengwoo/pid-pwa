document.addEventListener("DOMContentLoaded", () => {
  const detail = document.getElementById("detail");
  const toggleBtn = document.getElementById("toggleBtn");
  const timerEl = document.getElementById("timer");

  if (!detail  !toggleBtn  !timerEl) return;

  // 상세정보 토글
  toggleBtn.addEventListener("click", () => {
    const isHidden = detail.style.display === "none" || detail.style.display === "";
    detail.style.display = isHidden ? "block" : "none";
    toggleBtn.textContent = isHidden ? "QR정보 표시" : "상세정보 표시";
  });

  // 타이머 (30 → 0 → 30 반복)
  let time = 30;
  timerEl.textContent = time;

  setInterval(() => {
    time--;
    if (time < 0) time = 30;
    timerEl.textContent = time;
  }, 1000);
});