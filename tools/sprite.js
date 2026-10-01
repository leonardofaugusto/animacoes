// Desenha um sprite de texto (assets/<nome>/*.js) num <canvas>, pixel a pixel.
// drawSprite(canvas, sprite, { boca: true, pisca: false, gestoD: true, ... })
// Cada chave ligada em `estado` troca as linhas que o sprite define para ela; chave que o sprite não tem é ignorada.
window.drawSprite = function (canvas, sp, estado = {}) {
  // quadros de linha inteira (boca, pisca) primeiro; quadros com "_" (gestos) por cima, para não serem apagados
  const parcial = (k) => Object.values(sp[k]).some((r) => r.includes("_"));
  const ativos = Object.keys(estado).filter((k) => estado[k] && sp[k]).sort((a, b) => parcial(a) - parcial(b));
  // "_" no quadro alternativo = mantém o pixel que já estava (permite somar boca + gesto na mesma linha)
  const aplica = (linha, o) => (o ? [...o].map((c, x) => (c === "_" ? linha[x] : c)).join("") : linha);
  const rows = sp.base.map((r, i) => ativos.reduce((linha, k) => aplica(linha, sp[k][i]), r));
  canvas.width = Math.max(...rows.map((r) => r.length));
  canvas.height = rows.length;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  rows.forEach((r, y) => [...r].forEach((ch, x) => {
    if (ch === ".") return;
    ctx.fillStyle = sp.palette[ch] || "#f0f";
    ctx.fillRect(x, y, 1, 1);
  }));
};
