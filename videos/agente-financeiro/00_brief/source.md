# Fonte

Extraído do repositório `Desktop/Projetos/Fluxo Financeiro` (remoto `github.com/livup/fluxo-financeiro`) em 2026-09-30. Só o que está escrito lá; nada inferido.

## Contexto do público (ata do Granola do 1º LTAA, 2026-09-29, no vault)

- LTAA ("Let's talk about Agents"): encontro semanal da frente de IA. Time de tech, mais growth e finanças.
- Decidido lá: o fechamento financeiro é o primeiro caso agêntico; mapear o que é determinístico e o que precisa de agente/LLM.
- Princípios citados: contextos versionados, com dono por área; "comportamento do agente muda editando o contexto, não o agente"; "determinístico ganha do generativo quando a resposta é conhecida"; LLM entra para insight, anomalia e sugestão.
- Tarefa do time de tech: rascunhar a arquitetura do repositório de contextos.

## O que o projeto é

- Agente de fechamento financeiro da Liv Up, em planejamento. Ainda não há agente nem pipeline implantado (`README.md`).
- Visão (`docs/visao/visao-agentica.md`, rascunho, não é decisão): "Pessoas definem o critério e decidem; o sistema calcula, confere e mostra o que falta; agentes investigam e preparam. O fechamento do mês é um corte sobre esse estado, não uma reconstrução."

## Os quatro passos do fechamento (`contexto/areas/financeiro/dinamico/fluxo-de-fechamento.md`)

1. Faturamento: primeira semana do mês seguinte. Arquivo real inspecionado.
2. Custeio: depois do faturamento fechado. Arquivo real inspecionado.
3. Lançamentos contábeis: depois do custeio. Não mapeado.
4. Fechamento contábil: encerra o ciclo. Não mapeado.

Hoje o passo seguinte abre a planilha do anterior e lê a célula que precisa. Com contrato de saída por passo, a implementação de uma etapa pode ser trocada sem quebrar as vizinhas, e dá para encaixar um agente na fronteira.

## Quem executa o quê (`contexto/agentes/README.md`)

Todo trabalho recorrente tem um executor só:

- **Rotina** (determinístico), quando existe passo a passo exato: extrair do Protheus, cruzar venda com NF, atribuir status, calcular receita e custo, rodar as conciliações. Número oficial vem daqui.
- **Agente**, quando existe objetivo e critério mas o caminho depende do que aparece: agrupar pendências por causa, achar os contribuintes de uma quebra, redigir a explicação de uma variação.
- **Pessoa**, quando é decisão: aprovar regra, aceitar exceção, liberar etapa, aprovar lançamento, homologar resultado.

Ciclo: fontes → rotina → sinal (pendência, quebra, insumo inapto) → agente → proposta com evidência → pessoa decide → estado do mês → rotina rechecha na próxima rodada. "Resolvido é observado, não declarado."

"Nenhum agente faz o fechamento. Cada um faz uma coisa, e o fechamento é a soma delas."

Os oito agentes desenhados (nenhum declarado na plataforma nem executado): triagem de pendências, classificação de canal (faturamento); conferência de insumos, investigação de quebra (custeio); proposta de lançamento (lançamentos, hipótese); explicação de variação (fechamento, hipótese); resposta a perguntas, curadoria do Cérebro (transversais).

Agentes não calculam número oficial, não escrevem em Protheus, BigQuery ou planilha, e se a verificação falha, param e escalam.

## Os planos: horizontes (`docs/visao/visao-agentica.md`, seção 4, sem datas)

- **H1 — Confiar no dado.** "Nenhum agente vale mais que a fonte que ele lê."
- **H2 — Fechamento contínuo.** Se o dado é confiável, o fechamento é acompanhado, não reconstruído.
- **H3 — Finanças assistida.** Agentes investigam quebras, explicam variação, propõem lançamentos.
- "O que está hoje na arquitetura e na Sprint 1 é o começo de H1."

## O problema de hoje (visão, seção 2)

- O resultado do mês é reconstruído a cada fechamento, não observado ao longo dele.
- Regra de negócio (alíquota por UF, taxa de marketplace, regra de canal) mora em célula, SQL embutido e Sheets: não é versionada, testada nem aprovada.
- O critério de quem fecha está na cabeça de quem fecha.
- Linha "de → para": regra em célula e script → regra como dado versionado, com dono e aprovação.

## Spec-driven development (`specs/README.md`)

- Regra do projeto desde 2026-09-30, inspirada no AI-Native SDLC Playbook.
- Toda capacidade nova passa por três artefatos versionados, cada um aprovado por uma pessoa antes do seguinte: `intent.md` → `spec.md` → `plan.md` → código + testes + eval → PR.
  - intent: problema, resultado esperado, sistemas, restrições. Aprova o dono da área (FP&A).
  - spec: contrato, regras, controles, gabarito, papéis agente × pessoa. Escreve o agente; aprova o dono da área (e Dados quando envolve dado).
  - plan: arquivos, ordem, riscos, como provar. Escreve o agente.
  - PR: diff, testes e resultado do eval. Escreve o agente; humano faz o merge.
- "Nenhum código, SQL de produção ou contexto de agente novo sem `spec.md` aprovada."
- Nem todo aprovador usa GitHub: a aprovação fica no cabeçalho do arquivo (status, data, quem, onde).
- Cada spec tem um gabarito executável em `evals/`, que roda a cada mudança de regra, SQL ou contexto do agente.
- Achado de produção vira nova `intent.md` e o ciclo recomeça.
- Regra de ordem: agente só entra sobre dado e controle que já existem.

## Exemplo real

- Intent 001, "Faturamento confiável no sandbox", aprovada em 2026-09-30 pelo dono da área (FP&A). Resultado esperado inclui: conferir o faturamento contra o livro fiscal do Protheus, competência fechada não muda, lacuna visível em vez de número silenciosamente errado, testes que rodam sozinhos.
- Sequência planejada: 001 faturamento → 002 conferência pré-fechamento → 003 agente de diagnóstico (só leitura) → 004/005 custeio.
