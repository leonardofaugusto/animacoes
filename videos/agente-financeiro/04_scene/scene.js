// Cena: agente financeiro. Tudo é função de t; os tempos vêm de ../03_cues/cues.js.
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

// opacidade de um elemento que entra em a e sai em b (fade de d segundos)
const vis = (t, a, b = Infinity, d = 0.4) => Math.min(ease(p(t, a, d)), 1 - ease(p(t, b, d)));

function put(el, { x, y, o = 1, s = 1, dy = 0 }) {
  if (x !== undefined) el.style.left = x + "px";
  if (y !== undefined) el.style.top = y + "px";
  el.style.opacity = o;
  el.style.transform = `translate(-50%, -50%) translateY(${dy}px) scale(${s})`;
}

window.render = function (t) {
  const T = Object.fromEntries(CUES.cues.map((c) => [c.id, c.t]));

  // repositório: entra no centro, depois vira cabeçalho
  const sobe = ease(p(t, T.passos, 0.8));
  put($("#repo"), {
    x: 960, y: 400 - sobe * 310,
    o: ease(p(t, T.casa - 0.3, 0.5)),
    s: (0.85 + 0.15 * ease(p(t, T.casa - 0.3, 0.5))) * (1 - 0.45 * sobe),
  });

  // pastas: uma por palavra, selo em "versionado", somem quando os passos entram
  $$(".pasta").forEach((el, i) => {
    const a = T.pastas + i * 0.45;
    put(el, { x: [380, 960, 1540][i], y: 600, o: vis(t, a, T.passos), dy: 30 * (1 - ease(p(t, a, 0.4))) });
    el.querySelector(".selo").style.opacity = ease(p(t, T.versionado + i * 0.25, 0.3));
  });

  // trilho: fica do beat "passos" até o fim
  $$(".passo").forEach((el, i) => {
    const a = T.passos + 0.4 + i * 0.35;
    put(el, { x: +el.dataset.x, o: ease(p(t, a, 0.4)), dy: 40 * (1 - ease(p(t, a, 0.4))) });
    const revelado = i < 2 ? t >= T.mapeados : t >= T["nao-mapeados"];
    el.classList.toggle("mapeado", i < 2 && revelado);
    el.classList.toggle("aberto", i >= 2 && revelado);
    el.style.borderColor = revelado ? "" : "var(--cinza-cl)";
    el.querySelector(".s").style.opacity = revelado ? 1 : 0;
  });
  $$(".seta-trilho").forEach((el, i) => put(el, { x: +el.dataset.x, o: ease(p(t, T.passos + 0.6 + i * 0.35, 0.4)) }));

  // executores: aparecem apagados, acendem um por vez, saem nos horizontes
  const acende = { "#ex-rotina": T.rotina, "#ex-agente": T.agente, "#ex-pessoa": T.pessoa };
  for (const [sel, a] of Object.entries(acende)) {
    const el = $(sel), on = ease(p(t, a, 0.35));
    put(el, { x: +el.dataset.x, o: vis(t, T.executor, T.horizontes) * (0.3 + 0.7 * on), s: 1 + 0.08 * Math.sin(Math.PI * p(t, a, 0.5)) });
    el.style.filter = `grayscale(${1 - on})`;
  }
  put($("#numero"), { o: vis(t, T.numero, T.ciclo), dy: 20 * (1 - ease(p(t, T.numero, 0.4))) });
  const tarefas = [T.tarefas, T["t-investigar"], T["t-explicar"]];
  $$(".tarefa-ag").forEach((el, i) => put(el, { y: +el.dataset.y, o: vis(t, tarefas[i], T.ciclo) }));

  // ciclo: setas entre executores, uma por frase
  put($("#f-acusa"), { y: 230, o: vis(t, T.acusa, T.horizontes), dy: -10 * (1 - ease(p(t, T.acusa, 0.4))) });
  put($("#f-propoe"), { y: 230, o: vis(t, T.propoe, T.horizontes), dy: -10 * (1 - ease(p(t, T.propoe, 0.4))) });
  put($("#decidido"), { o: vis(t, T.decide, T.horizontes), s: 1.3 - 0.3 * ease(p(t, T.decide, 0.3)) });
  const volta = $("#volta");
  volta.style.opacity = vis(t, T.confere, T.horizontes);
  volta.style.transform = `translateX(-50%) scaleX(${ease(p(t, T.confere, 0.6))})`;
  put($("#volta-txt"), { o: vis(t, T.confere + 0.3, T.horizontes) });

  // horizontes: faixas entram juntas, cada nome quando é falado
  const nomes = [T["h-nomes"], T.h2, T.h3];
  $$(".hz").forEach((el, i) => {
    const a = T.horizontes + i * 0.25;
    put(el, { x: +el.dataset.x, o: vis(t, a, T.fecho), dy: 0 });
    el.style.transform = `translate(-50%, -50%) translateX(${-60 * (1 - ease(p(t, a, 0.5)))}px)`;
    el.querySelector(".t").style.opacity = ease(p(t, nomes[i], 0.3));
  });
  put($("#aqui"), { o: vis(t, T.aqui, T.fecho), dy: 20 * (1 - ease(p(t, T.aqui, 0.4))) });

  // fecho: um agente com uma tarefa sobre cada passo, depois o título
  $$(".tarefa").forEach((el, i) => put(el, { x: +el.dataset.x, o: ease(p(t, T.fecho + i * 0.3, 0.4)) }));
  // avatar: troque aqui entre SPRITE_LEONARDO_CORPO e SPRITE_LEONARDO_BUSTO
  const AVATAR = SPRITE_LEONARDO_CORPO;
  $("#avatar").style.width = (AVATAR === SPRITE_LEONARDO_CORPO ? 160 : 192) + "px";
  // pisca a cada ~3,7s por 0,12s. Boca: volume do take, quando existir (volume.js)
  const vol = window.VOLUME ? VOLUME.v[Math.floor(t * VOLUME.fps)] || 0 : 0;
  // gesto: levanta um braço por 1,4s quando entra um conceito novo, alternando os lados
  const gestos = ["casa", "passos", "rotina", "agente", "pessoa", "ciclo", "horizontes", "fim"].map((id) => T[id]);
  const g = gestos.findIndex((a) => t >= a && t < a + 1.4);
  const falando = vol > 0.35;
  drawSprite($("#avatar"), AVATAR, { pisca: (t % 3.7) > 3.58, boca: falando, gestoD: g >= 0 && g % 2 === 0, gestoE: g >= 0 && g % 2 === 1 });
  $("#avatar").style.opacity = ease(p(t, 0, 0.4));
  $("#avatar").style.transform = `translateY(${falando ? -5 : 0}px)`; // balanço de 1 pixel do sprite (escala 5)

  // legenda: texto do roteiro, tempo do Whisper (02_transcript/legendas.js)
  const leg = (window.LEGENDAS || []).find((l) => t >= l.t0 && t < l.t1);
  const lg = $("#legenda");
  if (lg.dataset.txt !== (leg ? leg.txt : "")) {
    lg.dataset.txt = leg ? leg.txt : "";
    lg.innerHTML = leg ? `<span>${leg.txt}</span>` : "";
  }

  put($("#titulo"), { o: ease(p(t, T.fim, 0.5)), s: 0.95 + 0.05 * ease(p(t, T.fim, 0.5)) });
};
