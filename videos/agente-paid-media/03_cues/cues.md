# Storyboard v1

Âncora = trecho exato do roteiro (`01_voice/script.md`), procurado em ordem. `tools/cues.py` gera `cues.json`.

## Tela

- **Esquerda (0–560 px): árvore de pastas.** Painel escuro, traço de tinta, fonte mono. Fica o vídeo inteiro depois de `pasta`. Arquivo em foco acende (ciano); arquivo já lido fica com brilho fraco.
- **A centelha:** luz fria pequena com rastro. É o agente. Nasce em `claude-md` e anda pela árvore na ordem que o mapa manda.
- **Direita (600–1900 px): a explicação** da etapa.
- **Avatar:** canto inferior direito, gesto nos beats marcados com ✋.
- **Legenda:** embaixo, centralizada na área da direita.
- **Mood:** azul-petróleo quase preto, névoa em camadas que deriva devagar, partículas, luz fria pontual. Títulos em serifa estreita. A pessoa aparece em âmbar (luz quente) para contrastar com o agente (luz fria).

Árvore final (os arquivos datados só nascem no exemplo):

```
agente-paid-media/
├── CLAUDE.md
├── contexto/
│   ├── areas/paid-media/  fontes-de-dados.md · metricas.md
│   └── agentes/otimizacao-google/
│       agentes.md · contratos/autorizacao.md · tools/ferramentas.md
│       workflows/rodada-diaria.md · estado.md
├── analises/  saturacao.py · keywords.py · seo.py
├── saidas/    (no exemplo: 2026-09-28/saturacao.csv)
└── decisoes/  (no exemplo: 2026-09-28.md)
```

## Beats

| id | âncora | o que se vê |
|---|---|---|
| abertura | "Ste, Paô e Alegre" | névoa; título "Agente de Google · Paid Media" em serifa ✋ |
| pasta | "Ele cabe numa pasta" | título sobe e some; painel da árvore entra pela esquerda só com `agente-paid-media/` |
| camadas | "tem quatro camadas" | aparecem `contexto/`, `analises/`, `decisoes/`, `tools/ferramentas.md`, com selos 1·2·3·4 |
| quem | "quem é o agente?" | direita: janela de terminal desenhada a tinta, cursor piscando |
| claude | "É o Claude" | no terminal, "Claude Code"; legenda "o mesmo que a gente usa todo dia" |
| maquina | "rodar na máquina" | o terminal ganha a moldura de um notebook |
| claude-md | "o CLAUDE.md" | `CLAUDE.md` nasce na raiz; a centelha nasce e entra nele |
| mapa | "Ele é o mapa" | o CLAUDE.md abre à direita como pergaminho com 5 linhas |
| ordem | "em que ordem ler o resto" | as linhas acendem uma a uma: "1. leia `estado.md`", "2. contexto em `contexto/`", "3. rode `analises/`", "4. decida em `decisoes/`", "5. nada executa sem aprovação" |
| c-titulo | "A primeira camada" | título "1 · Contexto"; `contexto/` acende e expande |
| c-necessario | "só o necessário" | frase "só o necessário para a tarefa" |
| c1 | "onde estão os dados" | cartão 1; `fontes-de-dados.md` acende |
| c2 | "Quais dados importam" | cartão 2; `metricas.md` |
| c3 | "O que ele faz" | cartão 3; `agentes.md` |
| c4 | "O que ele não faz" | cartão 4; `agentes.md` (de novo, outra seção) |
| c5 | "quais acessos ele tem" | cartão 5; `contratos/autorizacao.md` |
| c-arquivo | "Cada resposta mora num arquivo" | linhas de tinta ligam cada cartão ao arquivo |
| t1 | "E como a gente testa isso?" | painel "Teste" (moldura âmbar) |
| t1-pergunta | "Pergunta para o agente" | chat: "Onde estão os dados?" → "BigQuery, livup_master.campaigns ✓"; "O que você não faz?" → "Não mexo em budget sem aprovação ✓" |
| t1-erro | "Se ele errar" | resposta errada em vermelho; seta para `contexto/`: "o problema está aqui" |
| a-titulo | "A segunda camada" | título "2 · Análises"; `analises/` acende ✋ |
| a-sem-ia | "não tem IA" | selo "sem IA": a centelha fica apagada nesta camada |
| a-python | "São arquivos em Python" | janela de código do `saturacao.py` (consulta → transforma → salva) |
| a-salva | "salvam o resultado" | seta do código para `saidas/`, que acende |
| a-tipos | "Saturação de campanha" | três chips: saturação, palavra-chave, SEO (os três `.py` acendem) |
| a-mesmo | "Mesmo dado, mesmo resultado" | duas rodadas lado a lado com o mesmo número e "=" |
| a-trabalho | "O trabalho de vocês aqui" | cartão de pergunta: "comparar mês a mês?" ou "teste estatístico?" |
| a-bayes | "modelo bayesiano" | o segundo chip ganha um sino de distribuição desenhado |
| a-fora | "por que isso fica fora do agente" | dois lados: caixa-preta (agente fazendo a conta escondida) e arquivo aberto (Python) |
| a-jeito | "ele calcula do jeito dele" | a caixa-preta solta um número sem rastro |
| a-arquivo | "a conta fica num arquivo" | o arquivo mostra cada linha da conta; "roda de novo ↻" |
| t2 | "E como a gente testa isso?" | painel "Teste" |
| t2-duas | "roda duas vezes" | 2 rodadas → ✓ igual |
| t2-ads | "confere o número no Google Ads" | número do `.py` ao lado do número do Google Ads → ✓ |
| d-titulo | "A terceira camada" | título "3 · Decisão"; `decisoes/` acende |
| d-agente | "É aqui que entra o agente" | a centelha acende forte pela primeira vez desde a análise ✋ |
| d-satur | "Campanha saturou?" | cartão: pergunta → "ajustar a campanha" |
| d-seo | "oportunidade de SEO" | cartão: "como atacar" |
| d-kw | "Palavra-chave performando mal" | cartão: "diminuir o budget" |
| d-pessoa | "quem decide é a pessoa" | os três cartões ganham uma moldura âmbar "pessoa decide"; avatar aponta ✋ |
| t3 | "E como a gente testa isso?" | painel "Teste" |
| t3-casos | "Separem casos" | duas campanhas: "saturou" e "saudável", e o agente acerta as duas ✓ |
| t3-numero | "citar o número" | recomendação com o número sublinhado |
| t3-nao-sabe | "dizer que não sabe" | balão do agente: "não sei: falta dado" ✓ |
| x-titulo | "A quarta camada" | título "4 · Ação"; `tools/ferramentas.md` acende |
| x-tools | "criar campanha" | chips "criar campanha" e "ajustar budget", com cadeado |
| x-disclaimer | "Só vamos dar ao agente" | faixa com a frase inteira, em destaque ✋ |
| x-recomenda | "Até lá, ele recomenda" | agente → recomendação → pessoa executa |
| t4 | "E como a gente testa isso?" | painel "Teste" |
| t4-passos | "Primeiro, só recomendação" | escada de 3 degraus: "só recomenda" → "ação com aprovação, campanha pequena" → "tudo registrado" |
| rotina | "Tudo isso roda no computador" | notebook com relógio; selo "rotina do Claude · todo dia" sobre a raiz da árvore |
| ex-titulo | "um exemplo real" | título "Exemplo real"; os destaques da árvore se apagam ✋ |
| ex-dispara | "A rotina dispara" | o relógio toca; a centelha nasce na raiz |
| ex-le | "O agente lê o mapa" | a centelha passa por `CLAUDE.md` e depois `estado.md` |
| ex-roda | "Roda a análise de saturação" | a centelha vai a `saturacao.py`; nasce `saidas/2026-09-28/saturacao.csv` |
| ex-gasto | "gastou quase o mesmo" | tabela: linha "Investimento R$ 236 mil → R$ 244 mil (+4%)" |
| ex-cliques | "os cliques caíram" | linha "Cliques 65,6 mil → 45,0 mil (−31%)" |
| ex-cpc | "o custo por clique subiu" | linha "CPC R$ 3,59 → R$ 5,43 (+51%)" |
| ex-ctr | "O CTR ficou estável" | linha "CTR 7,87% → 8,21% (estável)" |
| ex-leilao | "O que encareceu foi o leilão" | a linha do CPC brilha; conclusão "leilão mais caro" |
| ex-escreve | "O agente escreve a recomendação" | nasce `decisoes/2026-09-28.md`; texto: "revisar as palavras-chave de maior CPC; reduzir o lance nas que mais subiram" |
| ex-avisa | "E avisa" | nota: "não sei se o CAC piorou: falta conversão por campanha" |
| ex-para | "para na frente da pessoa" | a centelha para diante de um portão âmbar |
| ex-aprova | "O Alegre aprova" | carimbo "aprovado · Alegre" ✋ |
| ex-acao | "a ação acontece" | o portão abre; `ferramentas.md` pisca; "lance reduzido" |
| fim-check | "o checklist" | checklist com 5 linhas, cada uma com o seu teste |
| fim-c | "contexto, análise" | as linhas entram uma por palavra (contexto, análise, decisão, ação, rotina) |
| fim-ia | "A IA só aparece na decisão" | só a linha "decisão" fica com a luz da centelha |
| fim-confia | "só confia no que testou" | todas as linhas ganham ✓ |
| fim | "Entenderam?" | título final "bora fazer" ✋ |

## Revisar

- 70 beats em 4min17, um a cada ~3,7s. Os cartões e linhas que entram em sequência ficam dentro do mesmo beat.
- No teste 1 o chat mostra respostas de exemplo ("BigQuery, livup_master.campaigns"), coerentes com o contexto real; não é uma conversa que aconteceu.
- O código do `saturacao.py` na tela é ilustrativo (poucas linhas legíveis), não o script real.
- `fim-c` anima as cinco palavras com tempos fixos depois da âncora; se descolar da fala, viram cinco âncoras.
