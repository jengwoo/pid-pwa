// app.js (index.html용) : pidpwa_profile_v1 읽어서 화면에 표시

window.addEventListener("DOMContentLoaded", () => {
  // 1) 화면 전환 버튼/영역
  const screenQR = document.getElementById("screenQR");
  const screenDetail = document.getElementById("screenDetail");
  const toDetailBtn = document.getElementById("toDetailBtn");
  const toQRBtn = document.getElementById("toQRBtn");

  function showScreen(which) {
    if (!screenQR || !screenDetail) return;
    if (which === "qr") {
      screenQR.style.display = "block";
      screenDetail.style.display = "none";
    } else {
      screenQR.style.display = "none";
      screenDetail.style.display = "block";
    }
  }

  if (toDetailBtn) toDetailBtn.addEventListener("click", () => showScreen("detail"));
  if (toQRBtn) toQRBtn.addEventListener("click", () => showScreen("qr"));

  // 2) 상세정보 토글(레버)
  const infoToggle = document.getElementById("infoToggle");
  const infoBox = document.getElementById("infoBox");

  if (infoToggle && infoBox) {
    const apply = () => {
      infoBox.style.display = infoToggle.checked ? "block" : "none";
    };
    apply();
    infoToggle.addEventListener("change", apply);
  }

  // 3) 타이머(30 -> 0 -> 30 반복, 화면전환과 무관)
  let time = 30;
  const timerEl = document.getElementById("timer");
  if (timerEl) timerEl.textContent = String(time);

  setInterval(() => {
    time -= 1;
    if (time < 0) time = 30;
    if (timerEl) timerEl.textContent = String(time);
  }, 1000);

  // 4) ✅ 관리자 설정에서 저장한 값(LocalStorage) 읽어서 표시
  // admin.html이 저장한 키: pidpwa_profile_v1
  let profile = null;
  try {
    const raw = localStorage.getItem("pidpwa_profile_v1");
    profile = raw ? JSON.parse(raw) : null;
  } catch (e) {
    profile = null;
  }

  // 표시 대상 엘리먼트
  const nameEl = document.getElementById("name");
  const birthEl = document.getElementById("birth");
  const addrEl = document.getElementById("addr");
  const photoEl = document.getElementById("photo");

  if (profile) {
    if (nameEl) nameEl.textContent = profile.name ?? "";
    if (birthEl) birthEl.textContent = profile.birth ?? "";
    if (addrEl) addrEl.textContent = profile.addr ?? "";

    if (photoEl) {
      const url = profile.photo ?? "";
      if (url.trim()) {
        photoEl.src = url;
        photoEl.style.display = "block";
      } else {
        photoEl.style.display = "none";
      }
    }
  } else {
    // 저장값 없으면 빈칸 유지
    if (photoEl) photoEl.style.display = "none";
  }

  // 5) 첫 화면은 QR 화면
  showScreen("qr");

  // 6) 서비스워커(있으면)
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
});
