// Pixel art do Leonardo, versão BUSTO (v2), desenhada à mão a partir de foto (2026-09-30).
// Cada letra é um pixel; "." é transparente. Quadros alternativos trocam só as linhas indicadas.
window.SPRITE_LEONARDO_BUSTO = {
  palette: {
    K: "#2a1a14", // contorno
    H: "#3b2a20", h: "#5e4634", // cabelo
    S: "#e0a883", s: "#c28866", // pele
    B: "#9a8b7f", b: "#5f5048", // barba grisalha
    E: "#2a1a14", W: "#ffffff", M: "#8c2f35", // olho, dente, boca
    T: "#ffffff", t: "#dcd6ca", C: "#e50145", // camiseta, sombra, logo
  },
  base: [
    "................................",
    "............KK.KKK.K............",
    "..........KKHHKHHHKHK...........",
    ".........KHHhHHHhHHHHK..........",
    "........KHHHHhHHHHhHHHHK........",
    "........KHHHHHHHHHHHHHHK........",
    "........KHHHSSSSSSSSHHHK........",
    "........KHHSSSSSSSSSSHHK........",
    "........KHSSSSSSSSSSSSHK........",
    "........KSSKKKSSSSKKKSSK........",
    ".......KSSSSSSSSSSSSSSSSK.......",
    ".......KSSSWESSSSSSEWSSSK.......",
    ".......KsSSSSSSSsSSSSSSsK.......",
    "........KSSSSSSSssSSSSSK........",
    "........KSSSSSSSSSSSSSSK........",
    "........KSBSKWWWWWWKSBSK........",
    "........KBSBSKWWWWKSBSBK........",
    "........KBBSBBKKKKBBSBBK........",
    ".........KBBBBBBBBBBBBK.........",
    "..........KKBBBBBBBBKK..........",
    "............KKKKKKKK............",
    ".............KSSSSK.............",
    ".............KsSSsK.............",
    "...........KKTTSSTTKK...........",
    ".......KKKKTTTTtttTTTTKKKK......",
    ".....KKTTTTTTTTTTTTTTTTTTTKK....",
    "....KTTTTTTTTTTTTTTTTTTTTTTTK...",
    "...KTTTTTTTTTTTTTTTTTTCCTTTTTK..",
    "...KTTTTTTTTTTTTTTTTTTCTTTTTTK..",
    "...KTTtTTTTTTTTTTTTTTTTTTTtTTK..",
    "...KTTtTTTTTTTTTTTTTTTTTTTtTTK..",
    "...KSSKTTTTTTTTTTTTTTTTTTTKSSK..",
    "...KSSKTTTTTTTTTTTTTTTTTTTKSSK..",
  ],
  // boca aberta (fala): linhas 15-17
  boca: {
    15: "........KSBSKWWWWWWKSBSK........",
    16: "........KBSBSKMMMMKSBSBK........",
    17: "........KBBSBBKWWKBBSBBK........",
  },
  // piscada: linha 11
  pisca: {
    11: ".......KSSSSSSSSSSSSSSSSK.......",
  },
};
