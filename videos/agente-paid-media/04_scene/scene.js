// Cena: agente de Paid Media. Tudo é função de t; tempos em ../03_cues/cues.js.
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const T = Object.fromEntries(CUES.cues.map((c) => [c.id, c.t]));
const vis = (t, a, b = Infinity, d = 0.5) => Math.min(ease(p(t, a, d)), 1 - ease(p(t, b, d)));
const rnd = (i) => { const x = Math.sin(i * 12.9898) * 43758.5453; return x - Math.floor(x); };

// ---------- fundo: névoa e partículas ----------
const PART = Array.from({ length: 48 }, (_, i) => {
  const el = document.createElement("span");
  $("#particulas").appendChild(el);
  return { el, x: rnd(i) * 1920, y: rnd(i + 99) * 1080, v: 8 + rnd(i + 7) * 18, a: 0.15 + rnd(i + 3) * 0.5 };
});
// silhuetas de rocha e torres finas, geradas uma vez (pseudoaleatório fixo: o mesmo desenho em todo quadro)
function silhueta(sel, n, h, base, torres, cor, semente) {
  let d = `M0 ${h}`;
  for (let i = 0; i <= n; i++) {
    const x = (i / n) * 2200, y = base + rnd(semente + i) * (h - base) * 0.55;
    d += ` L${x} ${y}`;
    if (rnd(semente + i * 3) < torres) d += ` L${x + 6} ${y - 60 - rnd(semente + i * 5) * 120} L${x + 12} ${y}`;
  }
  $(sel).innerHTML = `<path d="${d} L2200 ${h} Z" fill="${cor}"/>`;
}
silhueta("#sil-fundo", 46, 360, 120, 0.18, "#0a1824", 11);
silhueta("#sil-frente", 30, 300, 150, 0.12, "#050c12", 57);
function fundo(t) {
  $("#sil-fundo").style.transform = `translateX(${Math.sin(t * 0.03) * 40}px)`;
  $("#sil-frente").style.transform = `translateX(${Math.sin(t * 0.03) * 80}px)`;
  $("#f1").style.left = 900 + Math.sin(t * 0.07) * 60 + "px";
  $("#f2").style.left = 1400 + Math.sin(t * 0.05 + 2) * 50 + "px";
  $("#f1").style.opacity = 0.6 + 0.4 * Math.sin(t * 0.4);
  $("#f2").style.opacity = 0.5 + 0.4 * Math.sin(t * 0.3 + 1);
  [[-200, 120, 0], [700, 520, 2], [200, 760, 4]].forEach(([x, y, k], i) => {
    const el = $("#n" + (i + 1));
    el.style.left = x + Math.sin(t * 0.05 + k) * 90 + "px";
    el.style.top = y + Math.cos(t * 0.04 + k) * 40 + "px";
    el.style.opacity = 0.28;
  });
  PART.forEach((q, i) => {
    q.el.style.left = q.x + Math.sin(t * 0.3 + i) * 24 + "px";
    q.el.style.top = (((q.y - t * q.v) % 1120) + 1120) % 1120 - 20 + "px";
    q.el.style.opacity = q.a * (0.6 + 0.4 * Math.sin(t * 1.3 + i));
  });
}

// ---------- árvore ----------
const ITENS = [ // id, rótulo, profundidade, quando aparece
  ["root", "agente-paid-media/", 0, () => T.pasta],
  ["claude", "CLAUDE.md", 1, () => T["claude-md"]],
  ["contexto", "contexto/", 1, () => T.camadas],
  ["areas", "areas/paid-media/", 2, () => T["c-titulo"] + 0.2],
  ["fontes", "fontes-de-dados.md", 3, () => T["c-titulo"] + 0.35],
  ["metricas", "metricas.md", 3, () => T["c-titulo"] + 0.5],
  ["agentes", "agentes/otimizacao-google/", 2, () => T["c-titulo"] + 0.65],
  ["agentes-md", "agentes.md", 3, () => T["c-titulo"] + 0.8],
  ["autoriz", "contratos/autorizacao.md", 3, () => T["c-titulo"] + 0.95],
  ["tools", "tools/ferramentas.md", 3, () => T["c-titulo"] + 1.1],
  ["workflow", "workflows/rodada-diaria.md", 3, () => T["c-titulo"] + 1.25],
  ["estado", "estado.md", 3, () => T["c-titulo"] + 1.4],
  ["analises", "analises/", 1, () => T.camadas + 0.3],
  ["sat", "saturacao.py", 2, () => T["a-titulo"] + 0.3],
  ["kw", "keywords.py", 2, () => T["a-titulo"] + 0.5],
  ["seo", "seo.py", 2, () => T["a-titulo"] + 0.7],
  ["saidas", "saidas/", 1, () => T.camadas + 0.6],
  ["saidas-f", "2026-09-28/saturacao.csv", 2, () => T["ex-roda"] + 1.5],
  ["decisoes", "decisoes/", 1, () => T.camadas + 0.9],
  ["decisoes-f", "2026-09-28.md", 2, () => T["ex-escreve"] + 0.3],
];
const SELOS = { contexto: ["1", "c-titulo"], analises: ["2", "a-titulo"], decisoes: ["3", "d-titulo"], tools: ["4", "x-titulo"] };
const FOCO = [ // cue, atraso, item: a centelha vai até o item
  ["claude-md", 0.3, "claude"], ["c-titulo", 0, "contexto"], ["c1", 0, "fontes"], ["c2", 0, "metricas"], ["c3", 0, "agentes-md"],
  ["c4", 0, "agentes-md"], ["c5", 0, "autoriz"], ["a-titulo", 0, "analises"], ["a-tipos", 0, "sat"], ["a-salva", 0, "saidas"],
  ["t1-erro", 0.8, "contexto"], ["d-titulo", 0, "decisoes"], ["x-titulo", 0, "tools"], ["rotina", 0, "root"], ["ex-dispara", 0, "root"], ["ex-le", 0, "claude"],
  ["ex-le", 1.4, "estado"], ["ex-roda", 0, "sat"], ["ex-roda", 1.5, "saidas-f"], ["ex-escreve", 0.3, "decisoes-f"], ["ex-acao", 0, "tools"],
];
const ARV = { x: 36 + 24, y0: 54 + 34 + 52, dy: 40, ind: 28 };
const linhas = Object.fromEntries(ITENS.map(([id, rot, prof]) => {
  const el = document.createElement("div");
  el.className = "item mono";
  el.innerHTML = rot + (SELOS[id] ? `<span class="selo">${SELOS[id][0]}</span>` : "");
  $("#arvore").appendChild(el);
  return [id, { el, prof }];
}));
function yItem(t, id) { // linhas novas empurram as de baixo, suavemente
  let y = 0;
  for (const [i] of ITENS) { if (i === id) break; y += ARV.dy * ease(p(t, ITENS.find((x) => x[0] === i)[3](), 0.4)); }
  return 54 + 34 + 52 + y;
}
function focoEm(t) {
  const ev = FOCO.map(([c, d, id]) => ({ t: T[c] + d, id })).filter((e) => !isNaN(e.t) && e.t <= t).sort((a, b) => a.t - b.t);
  return { atual: ev.at(-1), anterior: ev.at(-2), lidos: new Set(ev.map((e) => e.id)) };
}
function posCentelha(t) {
  const f = focoEm(t);
  if (!f.atual) return null;
  const alvo = (id) => ({ x: ARV.x - 22 + linhas[id].prof * ARV.ind, y: yItem(t, id) + 20 });
  const b = alvo(f.atual.id), a = f.anterior ? alvo(f.anterior.id) : b, k = ease(p(t, f.atual.t, 0.6));
  return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k + Math.sin(t * 3) * 3 };
}
const RASTRO = Array.from({ length: 7 }, () => { const el = document.createElement("div"); el.className = "rastro abs"; $("#rastros").appendChild(el); return el; });
function arvore(t) {
  $("#arvore").style.opacity = vis(t, T.pasta - 0.2);
  const f = focoEm(t);
  for (const [id, , prof, quando] of ITENS) {
    const { el } = linhas[id];
    const o = ease(p(t, quando(), 0.4));
    el.style.opacity = o;
    el.style.top = yItem(t, id) - 54 + "px";
    el.style.left = 24 + prof * ARV.ind + "px";
    const foco = f.atual && f.atual.id === id;
    el.style.color = foco ? "var(--frio)" : f.lidos.has(id) ? "var(--tinta)" : "var(--tinta-fraca)";
    el.style.textShadow = foco ? "0 0 16px rgba(141,232,255,.7)" : "none";
    const selo = el.querySelector(".selo");
    if (selo) selo.style.opacity = ease(p(t, T[SELOS[id][1]], 0.4));
  }
  // centelha: nasce no CLAUDE.md; quase apagada na camada sem IA
  const brilho = ease(p(t, T["claude-md"] + 0.3, 0.6)) * (t >= T["a-titulo"] && t < T["d-agente"] ? 0.18 : 1);
  const c = posCentelha(t);
  $("#centelha").style.opacity = c ? brilho : 0;
  if (c) { $("#centelha").style.left = c.x - 9 + "px"; $("#centelha").style.top = c.y - 9 + "px"; }
  RASTRO.forEach((el, k) => {
    const r = posCentelha(t - (k + 1) * 0.07);
    el.style.opacity = r ? brilho * 0.5 * (1 - k / 7) : 0;
    if (r) { el.style.left = r.x - 4 + "px"; el.style.top = r.y - 4 + "px"; }
  });
}

// ---------- seções da direita ----------
function secao(sel, a, b, t) {
  const el = $(sel);
  // sai antes de b, para a próxima seção entrar limpa (sem dois títulos sobrepostos)
  el.style.opacity = Math.min(ease(p(t, a, 0.6)), 1 - ease(p(t, b - 0.5, 0.5)));
  el.style.display = el.style.opacity > 0 ? "" : "none";
  const h = el.querySelector(".h");
  if (h) h.style.transform = `translateY(${16 * (1 - ease(p(t, a, 0.7)))}px)`;
}
function abertura(t) {
  const o = vis(t, 0, T.pasta, 0.8);
  $("#abertura").style.opacity = o;
  $("#abertura .linha").style.transform = `scaleX(${ease(p(t, 0.4, 1.2))})`;
}
function mapa(t) {
  secao("#s-mapa", T.mapa, T["c-titulo"], t);
  $$("#s-mapa .ln").forEach((el, i) => {
    const a = T.ordem + i * 0.65, on = ease(p(t, a, 0.3)), atual = t >= a && t < a + 0.65;
    el.style.color = on ? (atual ? "var(--frio)" : "var(--tinta)") : "var(--tinta-sombra)";
    el.style.textShadow = atual ? "0 0 18px rgba(141,232,255,.5)" : "none";
  });
}
function contexto(t) {
  secao("#s-contexto", T["c-titulo"], T.t1, t);
  const cues = ["c1", "c2", "c3", "c4", "c5"];
  let svg = "";
  $$("#s-contexto .cartao").forEach((el, i) => {
    const a = T[cues[i]], y = 230 + i * 130;
    el.style.top = y + "px";
    el.style.opacity = ease(p(t, a, 0.4));
    el.style.transform = `translateX(${30 * (1 - ease(p(t, a, 0.4)))}px)`;
    el.style.borderColor = t >= a && t < (T[cues[i + 1]] || T["c-arquivo"]) ? "var(--frio)" : "var(--tinta-sombra)";
    // ligação de tinta do cartão até o arquivo na árvore
    const k = ease(p(t, T["c-arquivo"] + i * 0.25, 0.7));
    if (k > 0) {
      const x1 = 650, y1 = y + 52, x2 = 580, y2 = yItem(t, el.dataset.arq) + 20;
      const len = Math.hypot(x1 - x2, y1 - y2) + 80;
      svg += `<path d="M${x1} ${y1} C ${x1 - 40} ${y1}, ${x2 + 40} ${y2}, ${x2} ${y2}" stroke="#8de8ff" stroke-width="2" fill="none"
        stroke-dasharray="${len}" stroke-dashoffset="${len * (1 - k)}" opacity="${0.75 * (1 - ease(p(t, T.t1 - 0.5, 0.5)))}"/>`;
    }
  });
  $("#ligacoes").innerHTML = svg;
}
function exemplo(t) {
  secao("#s-exemplo", T["ex-titulo"], T["fim-check"], t);
  $("#s-exemplo .tabela").style.opacity = ease(p(t, T["ex-roda"] + 1.5, 0.5));
  $$("#s-exemplo tr[data-cue]").forEach((tr) => {
    tr.style.opacity = ease(p(t, T[tr.dataset.cue], 0.4));
    tr.classList.toggle("quente", tr.dataset.cue === "ex-cpc" && t >= T["ex-leilao"]);
  });
  $("#s-exemplo .recomendacao").style.opacity = ease(p(t, T["ex-escreve"] + 0.3, 0.5));
  $("#s-exemplo .aviso").style.opacity = ease(p(t, T["ex-avisa"], 0.4));
  const c = $("#s-exemplo .carimbo"), k = ease(p(t, T["ex-aprova"], 0.35));
  c.style.opacity = k;
  c.style.transform = `rotate(-8deg) scale(${1.6 - 0.6 * k})`;
}

// ---------- avatar ----------
const AVATAR = SPRITE_LEONARDO_NOTURNO;
const GESTOS = ["abertura", "a-titulo", "d-agente", "d-pessoa", "x-disclaimer", "ex-titulo", "ex-aprova", "fim"];
const ENFASE = ["camadas", "c-titulo", "a-titulo", "d-titulo", "x-titulo", "ex-leilao", "fim-ia"];
function avatar(t) {
  const vol = window.VOLUME ? VOLUME.v[Math.floor(t * VOLUME.fps)] || 0 : 0;
  const g = GESTOS.map((id) => T[id]).findIndex((a) => t >= a && t < a + 1.4);
  const leg = (window.LEGENDAS || []).find((l) => t >= l.t0 && t < l.t1);
  const pergunta = leg && leg.txt.trim().endsWith("?");
  const enfase = ENFASE.some((id) => t >= T[id] && t < T[id] + 1);
  const falando = vol > 0.35;
  drawSprite($("#avatar"), AVATAR, {
    pisca: (t % 3.7) > 3.58, boca: falando, sobrancelha: pergunta || enfase,
    gestoD: g >= 0 && g % 2 === 0, gestoE: g >= 0 && g % 2 === 1,
  });
  $("#avatar").style.transform = `translateY(${falando ? -5 : 0}px)`;
  $("#avatar").style.opacity = ease(p(t, 0, 0.6));
  $("#halo").style.opacity = 0.8 + 0.2 * Math.sin(t * 1.7);
}

function legenda(t) {
  const leg = (window.LEGENDAS || []).find((l) => t >= l.t0 && t < l.t1);
  const lg = $("#legenda");
  if (lg.dataset.txt !== (leg ? leg.txt : "")) {
    lg.dataset.txt = leg ? leg.txt : "";
    lg.innerHTML = leg ? `<span>${leg.txt}</span>` : "";
  }
}

// ---------- genérico: data-sec="início|fim" na seção, data-in="cue+atraso" em qualquer elemento ----------
const quando = (s) => { const [id, d] = s.split("+"); return (id in T ? T[id] : +id) + (+d || 0); };
const SECOES = $$("[data-sec]").map((el) => { const [a, b] = el.dataset.sec.split("|"); return { el, a: quando(a), b: quando(b) }; });
const ENTRAM = $$("[data-in]").map((el) => ({ el, a: quando(el.dataset.in), b: el.dataset.out ? quando(el.dataset.out) : Infinity }));
function genericos(t) {
  for (const s of SECOES) {
    const o = Math.min(ease(p(t, s.a, 0.6)), 1 - ease(p(t, s.b - 0.5, 0.5)));
    s.el.style.opacity = o;
    s.el.style.display = o > 0 ? "" : "none";
    const h = s.el.querySelector(".h");
    if (h) h.style.transform = `translateY(${16 * (1 - ease(p(t, s.a, 0.7)))}px)`;
  }
  for (const { el, a, b } of ENTRAM) {
    const k = Math.min(ease(p(t, a, 0.45)), 1 - ease(p(t, b, 0.3)));
    el.style.opacity = k;
    if (!el.closest("svg") && el.tagName !== "TR") el.style.translate = `0 ${14 * (1 - k)}px`;
  }
  // decisão: cartões ficam âmbar quando a fala diz que a pessoa decide
  $$("#s-decisao .dec").forEach((el) => (el.style.borderColor = t >= T["d-pessoa"] ? "var(--quente)" : ""));
  // checklist: só a decisão leva a luz do agente; no fim, tudo testado
  $$("#s-check .chk").forEach((el, i) => {
    const ia = t >= T["fim-ia"] && t < T["fim-confia"];
    el.classList.toggle("ia", ia && i === 2);
    el.style.opacity = ia && i !== 2 ? 0.45 : el.style.opacity;
    const n = el.querySelector(".n");
    n.textContent = t >= T["fim-confia"] + i * 0.2 ? "✓" : String(i + 1);
  });
}

window.render = function (t) {
  fundo(t);
  genericos(t);
  abertura(t);
  arvore(t);
  mapa(t);
  contexto(t);
  exemplo(t);
  avatar(t);
  legenda(t);
};
