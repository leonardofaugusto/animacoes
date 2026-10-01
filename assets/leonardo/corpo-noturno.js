// Pixel art do Leonardo, versão NOTURNA (clima Hollow Knight: luar frio, contorno quase preto). 2026-10-01.
// Mesmo desenho do corpo-inteiro.js (carregar ele antes), com outra paleta e um quadro de sobrancelha levantada.
window.SPRITE_LEONARDO_NOTURNO = {
  ...SPRITE_LEONARDO_CORPO,
  palette: {
    K: "#0a1017", // contorno
    H: "#1b2531", h: "#33465a", // cabelo
    S: "#cdb2a3", s: "#9a8174", // pele ao luar
    B: "#727b86", b: "#4a525d", // barba
    E: "#0a1017", W: "#eaf6fb", M: "#5c2732",
    T: "#d3dfe7", t: "#93a7b6", C: "#e8506e", // camiseta, sombra, logo
    D: "#26364d", d: "#1a2738", // jeans
    G: "#7f8c97", // sola
  },
  // sobrancelhas sobem uma linha (pergunta, ênfase)
  sobrancelha: {
    8: "........KHSKKKSSSSKKKSHK........",
    9: "........KSSSSSSSSSSSSSSK........",
  },
};
