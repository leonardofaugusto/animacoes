# Storyboard v1 (rascunho, tempos pendentes)

Formato: cada beat tem `id`, a frase âncora (trecho exato da fala que dispara o beat) e o que o espectador vê. `tools/cues.py` casa a âncora com `02_transcript/words.json` e gera `cues.json` com o segundo de início.

Cena base: fundo claro, trilho horizontal com os quatro passos na metade inferior, que fica na tela do beat `passos` até o fim. Três cores de executor: rotina, agente, pessoa.

| id | âncora | o que se vê | por quê |
|---|---|---|---|
| casa | "já tem casa" | card de repositório `livup/fluxo-financeiro` entra no centro | apresenta onde o projeto mora |
| pastas | "Contexto, agentes e planos" | três pastas saem do card, uma por palavra: `contexto/`, `contexto/agentes/`, `specs/` | mostra que é tudo no mesmo lugar |
| versionado | "tudo versionado" | as três pastas ganham um selo de commit | versionar é o ponto |
| passos | "quatro passos" | card sobe e encolhe; o trilho aparece com os quatro passos, um por palavra | a espinha do resto do vídeo |
| mapeados | "Os dois primeiros" | faturamento e custeio ficam sólidos com ✓ | estado real do mapeamento |
| nao-mapeados | "ainda não" | lançamentos e fechamento ficam tracejados | idem, lacuna visível |
| executor | "quem executa é um só" | acima do trilho, três rótulos vazios: rotina, agente, pessoa | prepara a divisão |
| rotina | "é rotina" | rótulo rotina acende; engrenagem sobre o trilho | determinístico |
| numero | "número oficial" | um número genérico `R$ ···` sai da engrenagem | número oficial vem da rotina (sem valor real) |
| agente | "é agente" | rótulo agente acende; lupa | não determinístico |
| tarefas | "triar pendência" | três etiquetas aparecem uma por verbo: triar, investigar, explicar | exemplos concretos |
| t-investigar | "investigar quebra" | segunda etiqueta | idem |
| t-explicar | "explicar variação" | terceira etiqueta | idem |
| pessoa | "é pessoa" | rótulo pessoa acende; carimbo de aprovação | decisão |
| ciclo | "O ciclo é simples" | os três ícones se arrumam em círculo sobre o faturamento | muda de estrutura para fluxo |
| acusa | "A rotina acusa" | seta da engrenagem até a lupa, com alerta | um passo do ciclo por frase |
| propoe | "O agente propõe" | seta da lupa até o carimbo, com documento anexado ("evidência") | idem |
| decide | "A pessoa decide" | carimbo bate | idem |
| confere | "confere de novo" | seta volta para a engrenagem; o círculo gira uma vez | fecha o loop |
| horizontes | "três horizontes" | ciclo sai; três faixas H1, H2, H3 entram da esquerda | o plano |
| h-nomes | "confiar no dado" | cada faixa recebe o nome quando é falado | idem |
| h2 | "fechamento contínuo" | nome da H2 | idem |
| h3 | "finanças assistida" | nome da H3 | idem |
| aqui | "começo do primeiro" | marcador "estamos aqui" no início da H1 | onde estamos |
| fecho | "Nenhum agente faz o fechamento" | volta o trilho dos quatro passos com um ícone diferente sobre cada um | a soma das partes |
| fim | "Cada um faz uma coisa" | título final; segura 1,5s depois da fala | respiro no fim |

## Revisar

- Densidade: 22 beats em ~60s dá um a cada ~2,7s. Os beats curtos (`pastas`, `h-nomes`, `tarefas`) são sequências dentro do mesmo beat, não cortes.
- `numero` usa `R$ ···` sem valor real, pela regra do brief.
- Pasta de "planos": mostrei `specs/`, que é onde intent/spec/plan moram. Os horizontes estão em `docs/visao/`. ⚠️ Escolher qual mostrar.
