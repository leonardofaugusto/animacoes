// Pixel art do Leonardo, desenhada à mão a partir de foto (2026-09-30). Versão CORPO INTEIRO (v3).
// Cada letra é um pixel; "." é transparente. Quadros alternativos trocam só as linhas indicadas.
window.SPRITE_LEONARDO_CORPO = {
  palette: {
    K: "#2a1a14", // contorno
    H: "#3b2a20", h: "#5e4634", // cabelo
    S: "#e0a883", s: "#c28866", // pele
    B: "#9a8b7f", b: "#5f5048", // barba grisalha
    E: "#2a1a14", W: "#ffffff", M: "#8c2f35", // olho, dente/tênis, boca
    T: "#ffffff", t: "#dcd6ca", C: "#e50145", // camiseta, sombra, logo
    D: "#3f5f8a", d: "#2e4768", // jeans
    G: "#c9c6c0", // sola do tênis
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
    "......KKKKTTTTTttTTTTTKKKK......",
    ".....KTTTTTTTTTTTTTTTTTTTTK.....",
    "....KTTTTTTTTTTTTTTTTTCCTTTK....",
    "....KTTTTTTTTTTTTTTTTTCTTTTK....",
    "....KTTtKTTTTTTTTTTTTTTKtTTK....",
    "....KKKKKTTTTTTTTTTTTTTKKKKK....",
    ".....KSSKTTTTTTTTTTTTTTKSSK.....",
    ".....KSSKTTTTTTTTTTTTTTKSSK.....",
    ".....KSSKTTTTTTTTTTTTTTKSSK.....",
    ".....KSSKTTTTTTTTTTTTTTKSSK.....",
    ".....KSSKttttttttttttttKSSK.....",
    ".....KSSKDDDDDDDDDDDDDDKSSK.....",
    "....KSSSKDDDDDDDdDDDDDDKSSSK....",
    "....KSSSKDDDDDDDdDDDDDDKSSSK....",
    ".....KKKKDDDDDDKKDDDDDDKKKK.....",
    "........KDdDDDDKKDDDDdDK........",
    "........KDdDDDDKKDDDDdDK........",
    "........KDdDDDDKKDDDDdDK........",
    "........KDdDDDDKKDDDDdDK........",
    "........KDdDDDDKKDDDDdDK........",
    "........KDdDDDDKKDDDDdDK........",
    "........KDDDDDDKKDDDDDDK........",
    ".......KWWWWWWWKKWWWWWWWK.......",
    "......KWWWWWWWWKKWWWWWWWWK......",
    "......KGGGGGGGGKKGGGGGGGGK......",
    ".......KKKKKKKK..KKKKKKKK.......",
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
  // gesto: aceno com o braço direito da tela. "_" = mantém o pixel de baixo (boca e piscada continuam valendo).
  // Só as 12 colunas da direita (20-31) mudam; o braço que pendia (linhas 30-38) sai.
  gestoD: Object.fromEntries(Object.entries({
    14: "________KKK.",
    15: "_______KSSSK",
    16: "_______KSSSK",
    17: "_______KSSSK",
    18: "________KSSK",
    19: "________KSSK",
    20: "_______KSSK.",
    21: "_______KSSK.",
    22: "______KSSK..",
    23: "__KKKKTTK...",
    24: "__TTTTTTK...",
    25: "______TK....",
    30: "___K........",
    31: "___K........",
    32: "___K........",
    33: "___K........",
    34: "___K........",
    35: "___K........",
    36: "___K........",
    37: "___K........",
    38: "___K........",
  }).map(([linha, dir]) => [linha, "_".repeat(20) + dir])),
};

// gesto do outro lado: espelho do gestoD (o tronco é simétrico nessas linhas)
SPRITE_LEONARDO_CORPO.gestoE = Object.fromEntries(
  Object.entries(SPRITE_LEONARDO_CORPO.gestoD).map(([linha, r]) => [linha, [...r].reverse().join("")])
);
