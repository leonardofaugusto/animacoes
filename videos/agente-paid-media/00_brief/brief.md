# Brief v3

**Público:** Ste (CMO), Paô (Gerente de Growth) e Alegre. Sabem de mídia paga muito mais que de engenharia; conhecem a ideia de agente pelas conversas anteriores. Não precisa explicar Google Ads; precisa mostrar onde cada peça mora.

**Objetivo:** ensinar a construir. É um guia de como fazer, rodando no PC de um deles como rotina do Claude.

**Uma ideia:** um agente de Paid Media é uma pasta com quatro camadas, e só a terceira usa IA: o contexto diz onde olhar, a análise em Python calcula, o agente decide e recomenda, e a pessoa aprova antes de qualquer ação.

**Resultado esperado:** depois de assistir, eles sabem qual arquivo escrever primeiro, qual parte é determinística, onde o agente entra, o que precisa ser liberado para ele agir, e o que testar em cada camada antes de confiar nela.

**Narrador:** avatar em pixel art do Leonardo, corpo inteiro, com gestos.

**Duração:** ~3min (subiu com os testes). ~3.000 caracteres de roteiro, ~3.000 créditos ElevenLabs por take.

## O agente em movimento

O agente aparece como uma luz pequena (no mood do jogo: uma centelha fria com rastro) que anda pela árvore de pastas à esquerda. Ela é o "cursor" do agente:

- **Abre o `CLAUDE.md` primeiro.** O arquivo se expande no painel da direita e as linhas acendem uma a uma enquanto ele lê: "leia primeiro `estado.md`", "dados em `fontes-de-dados.md`", "rode `analises/` antes de decidir", "nunca execute sem aprovação".
- **Segue o mapa.** A centelha pula para cada arquivo na ordem que o `CLAUDE.md` mandou. Arquivo lido fica com brilho fraco; arquivo sendo lido, brilho forte.
- **Escreve.** Quando o agente gera algo (`saidas/`, `decisoes/`), o arquivo nasce na árvore com um traço de tinta se desenhando.
- **Para na frente da pessoa.** Antes de qualquer ação, a centelha para e espera; o avatar aprova (gesto) e só então a ação acontece.

O avatar do Leonardo narra e aponta; a centelha é o agente trabalhando. São dois personagens: quem explica e quem executa.

## O que testar, camada por camada

Cada etapa termina com uma linha "como testar", e o vídeo fecha com o checklist inteiro na tela:

1. **Contexto:** pergunte ao agente "onde estão os dados?", "o que você não faz?", "o que precisa de aprovação?". Se ele errar, o `CLAUDE.md` ou o contexto está incompleto, não o modelo.
2. **Análises:** rode o `.py` duas vezes: mesmo dado, mesmo resultado. Confira o número contra a fonte (Google Ads ou Metabase) numa campanha que vocês conhecem.
3. **Decisão:** monte um gabarito de casos conhecidos (uma campanha que vocês sabem que saturou, uma que está saudável) e veja se o agente recomenda certo. Toda recomendação tem que citar o número que a justifica, e dizer "não sei" quando falta dado (como o CAC no exemplo).
4. **Ação:** primeiro só recomendação, a pessoa executa. Depois, ação com aprovação, numa campanha pequena. Toda ação fica registrada.
5. **Rotina:** deixe rodar sozinha alguns dias. Confira se disparou no horário, se atualizou o `estado.md` e se avisa quando falha.

## Estrutura de tela

- **Esquerda (~30%):** árvore de pastas do agente, fixa o vídeo inteiro. O arquivo da etapa atual acende; no exemplo final, os arquivos vão sendo criados na ordem em que a rotina roda.
- **Direita (~70%):** a explicação da etapa.
- **Canto:** avatar.

Árvore no padrão das pastas de agente do Leonardo (mesma forma do `contexto/` do Fluxo Financeiro: área com conhecimento de domínio, agente com manifesto, contrato, ferramentas, workflows e estado). O `CLAUDE.md` da raiz é o mapa de navegação: diz ao agente o que ler, em que ordem, e onde cada coisa mora.

```
agente-paid-media/
├── CLAUDE.md                   ← mapa: como navegar a pasta, ordem de leitura
├── contexto/
│   ├── areas/paid-media/
│   │   ├── fontes-de-dados.md  ← 1. onde estão os dados
│   │   └── metricas.md         ← 2. quais dados importam
│   └── agentes/otimizacao-google/
│       ├── agentes.md          ← 3. o que faz · 4. o que não faz
│       ├── contratos/autorizacao.md  ← 5. acessos, e o que exige aprovação
│       ├── tools/ferramentas.md     ← ferramentas liberadas (etapa 4)
│       ├── workflows/rodada-diaria.md
│       └── estado.md           ← o que ficou pendente da última rodada
├── analises/
│   ├── saturacao.py
│   ├── keywords.py
│   └── seo.py
├── saidas/2026-09-28/          ← o que os .py entregam
└── decisoes/2026-09-28.md      ← recomendações do agente, à espera da pessoa
```

## Arco

1. **Gancho:** o agente de Google para Paid Media cabe numa pasta. Quatro camadas.
2. **O mapa** (`CLAUDE.md` acende): o arquivo da raiz ensina o agente a navegar: o que ler primeiro e onde está cada coisa.
3. **Contexto** (`contexto/` acende, um arquivo por pergunta): só o necessário. Onde estão os dados, quais importam, o que ele faz, o que não faz, quais acessos tem.
4. **Análises** (`analises/*.py` acende): determinístico. O `.py` consulta o banco, transforma e entrega em `saidas/`. Mesmo dado, mesmo resultado, sem IA.
5. **Decisão** (`decisoes/` acende): aqui entra o agente. Lê a saída e decide o que recomendar. Campanha saturou → alterar campanha; oportunidade de SEO → como atacar; palavra-chave ruim → diminuir budget. A pessoa decide.
6. **Ação** (`tools/ferramentas.md` acende): as ferramentas que o agente pode usar, como construir campanha e ajustar budget. Disclaimer: só damos ao agente a opção de fazer quando confiarmos que ele é capaz. Até lá, ele recomenda e a pessoa executa.
7. **Onde roda:** no PC de um deles, como rotina do Claude que dispara sozinha todo dia.
8. **Exemplo real:** uma rodada completa, com a centelha percorrendo a árvore e os arquivos nascendo (dados abaixo).
9. **Checklist de testes:** as cinco linhas na tela, uma por camada.
10. **Fecho:** a IA só aparece na decisão; o resto é pasta, Python e permissão. E só se confia no que foi testado.

## Exemplo real (consultado em 2026-10-01)

Fonte: BigQuery `livup_master.campaigns`, Google, quatro semanas de agosto (03/08 a 30/08) contra as quatro seguintes (31/08 a 27/09). Pré-clique: a tabela não traz conversão para Google.

Campanha `_ec_pur_acq_ff_awon_unbranded_aon_web_` (Google unbranded, aquisição):

| | ago | set | variação |
|---|---|---|---|
| Investimento | R$ 235,6 mil | R$ 244,5 mil | +4% |
| Cliques | 65,6 mil | 45,0 mil | −31% |
| CPC | R$ 3,59 | R$ 5,43 | +51% |
| CTR | 7,87% | 8,21% | estável |

Rodada no vídeo:
1. Rotina dispara → agente lê `CLAUDE.md` e `estado.md`.
2. `saturacao.py` roda → `saidas/2026-09-28/saturacao.csv`: "unbranded: CPC +51%, cliques −31%, investimento estável".
3. Agente lê a saída e o contexto → hipótese: leilão mais caro ou termos saturados (CTR estável descarta anúncio cansado). Recomendação em `decisoes/2026-09-28.md`: abrir o `keywords.py` nos termos de maior CPC e propor redução de lance nos que mais subiram.
4. Pessoa (Alegre ou Ste) aprova ou recusa. Ferramenta só executa depois do aprovado.

⚠️ O exemplo para no que o pré-clique mostra. Se o CAC dessa campanha piorou, isso depende de conversão por campanha (pós-clique, `livup_master.sessions`), que não entrou nesta consulta. O agente do vídeo deve dizer isso como limite, não afirmar CAC.

## Mood board

Inspiração em Hollow Knight, só o clima: fundo azul-petróleo quase preto, névoa em camadas com paralaxe, traço de tinta fino e irregular, luz fria pontual (brilho ciano/branco) destacando o que importa, partículas lentas flutuando. Tipografia serifada estreita para títulos. Nada de personagem, logo, mapa ou asset do jogo.

O avatar mantém as cores dele (contraste proposital: ele é a luz da cena), com leve brilho ao redor.

## Não inventar nem mostrar

- Acesso que não existe: hoje não há acesso confirmado à conta do Google Ads. No vídeo, as ferramentas de ação aparecem como "a liberar".
- Agente em produção: o agente ainda não existe.
- CAC da campanha do exemplo (não consultado).
