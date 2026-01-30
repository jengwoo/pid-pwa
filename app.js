// app.js

// 0) 안전장치: DOM 다 뜬 뒤 실행
window.addEventListener("DOMContentLoaded", () => {
  // ===== 1) 화면 전환 =====
  const screenQR = document.getElementById("screenQR");
  const screenDetail = document.getElementById("screenDetail");
  const toDetailBtn = document.getElementById("toDetailBtn");
  const toQRBtn = document.getElementById("toQRBtn");

  function showScreen(which) {
    if (!screenQR || !screenDetail) return;
    if (which === "qr") {
      screenQR.style.display = "block";
      screenDetail.style.display = "none";
    } else if (which === "detail") {
      screenQR.style.display = "none";
      screenDetail.style.display = "block";
    }
  }

  if (toDetailBtn) {
    toDetailBtn.addEventListener("click", () => showScreen("detail"));
  }
  if (toQRBtn) {
    toQRBtn.addEventListener("click", () => showScreen("qr"));
  }

  // ===== 2) 상세정보 토글 =====
  const infoToggle = document.getElementById("infoToggle");
  const infoBox = document.getElementById("infoBox");

  if (infoToggle && infoBox) {
    // 초기 상태 반영
    infoBox.style.display = infoToggle.checked ? "block" : "none";

    infoToggle.addEventListener("change", () => {
      infoBox.style.display = infoToggle.checked ? "block" : "none";
    });
  }

  // ===== 3) 타이머 (30 -> 0 -> 30 반복, 화면전환과 무관) =====
  let time = 30;
  const timerEl = document.getElementById("timer");

  // timerEl이 없으면 타이머 표시만 안 될 뿐, 오류 안 나게 처리
  if (timerEl) timerEl.textContent = String(time);

  setInterval(() => {
    time -= 1;
    if (time < 0) time = 30;
    if (timerEl) timerEl.textContent = String(time);
  }, 1000);

  // ===== 4) 최초 화면 지정 (원하면 qr로 고정) =====
  showScreen("qr");

  // ===== 5) 서비스워커 (있으면 등록) =====
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
});
