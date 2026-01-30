document.addEventListener("DOMContentLoaded", () => {
  const screenQR = document.getElementById("screenQR");
  const screenDetail = document.getElementById("screenDetail");
  const toDetailBtn = document.getElementById("toDetailBtn");
  const toQRBtn = document.getElementById("toQRBtn");
  const timerEl = document.getElementById("timer");

  if (!screenQR  !screenDetail  !toDetailBtn  !toQRBtn  !timerEl) {
    console.error("필수 요소 없음");
    return;
  }

  // 상세정보 보기
  toDetailBtn.addEventListener("click", () => {
    screenQR.style.display = "none";
    screenDetail.style.display = "block";
  });

  // QR 보기
  toQRBtn.addEventListener("click", () => {
    screenDetail.style.display = "none";
    screenQR.style.display = "block";
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
