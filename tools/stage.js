// Base comum das cenas. A cena define window.render(t) (t em segundos) e desenha
// dentro de #stage (1920x1080). Nada de timer ou clique: o quadro é função de t.
// Preview: abre index.html no navegador. Espaço toca/pausa, ← → voltam/avançam 1s,
// clique na barra pula para o ponto. Render: tools/render.py chama render(t) quadro a quadro.
(function () {
  const RENDER = new URLSearchParams(location.search).has("render");
  const stage = document.getElementById("stage");
  const audio = document.querySelector("audio");

  function fit() {
    const s = Math.min(innerWidth / 1920, (innerHeight - (RENDER ? 0 : 40)) / 1080);
    stage.style.transform = RENDER ? "none" : `scale(${s})`;
  }
  addEventListener("resize", fit);
  fit();
  if (RENDER) { document.body.classList.add("render"); return; }

  const bar = document.createElement("div");
  bar.id = "bar";
  bar.innerHTML = '<div id="fill"></div><span id="time"></span>';
  document.body.appendChild(bar);
  bar.onclick = (e) => { audio.currentTime = (e.offsetX / bar.clientWidth) * audio.duration; };
  addEventListener("keydown", (e) => {
    if (e.code === "Space") { e.preventDefault(); audio.paused ? audio.play() : audio.pause(); }
    if (e.code === "ArrowLeft") audio.currentTime -= 1;
    if (e.code === "ArrowRight") audio.currentTime += 1;
  });
  (function loop() {
    const t = audio.currentTime;
    window.render(t);
    document.getElementById("fill").style.width = (100 * t / (audio.duration || 1)) + "%";
    document.getElementById("time").textContent = t.toFixed(2) + "s";
    requestAnimationFrame(loop);
  })();
})();

// Utilidades para as cenas: progresso 0..1 entre a e b, com easing.
window.p = (t, a, dur = 0.5) => Math.max(0, Math.min(1, (t - a) / dur));
window.ease = (x) => 1 - Math.pow(1 - x, 3);
window.cue = (id) => { const c = (window.CUES.cues || []).find((c) => c.id === id); if (!c) throw new Error("cue ausente: " + id); return c.t; };
