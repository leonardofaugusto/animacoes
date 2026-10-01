# Fonte

## Pedido do Leonardo (2026-10-01)

Explicar para Alegre, Ste e Paô como construir o agente de Google para Paid Media, em quatro etapas:

1. **Contexto:** para um agente pequeno, só o necessário para a tarefa: (1) onde estão os dados, (2) quais dados são relevantes, (3) o que ele faz, (4) o que ele não faz, (5) quais acessos ele tem.
2. **Análises:** as análises determinísticas, arquivos `.py` salvos na máquina ou na nuvem, que consultam o banco, transformam e disponibilizam o dado para a análise.
3. **Decisão:** onde entra o agente. Com base no output da análise, define o que fazer e gera recomendações. Exemplos dele: campanha saturou → alterar campanha; oportunidade de SEO → como atacar; palavra-chave performando mal → diminuir budget.
4. **Ação:** as ferramentas liberadas para o agente usar: construir campanha, diminuir budget etc.

Roda, de início, no PC de um deles, como rotina do Claude. No fim, um exemplo de todos os passos numa análise real. Estrutura de pastas à esquerda mostrando o andamento do agente. Narrado pelo avatar em pixel art do Leonardo. Mood board inspirado em Hollow Knight (só o mood).

## Público (vault, `30-Pessoas/`)

- **Ste** (Stephanie Goes): CMO. Tem autoridade para aceitar número de experimento e realocar orçamento contra a leitura da plataforma (decisão de governança de 2026-09-18, projeto aquisição).
- **Paô** (Paola Dauscha): Gerente de Growth. Nomeou como trava principal tecnologia, dados e autonomia de execução.
- **Alegre** (Gabriel Alegre): squad de construção de aquisição com o Leonardo; time que produz leitura (BI, projeção). Já toca agentes de leitura (Laura, Nina). Caso de partida de Paid Media no LTAA.

## Dados e acessos (vault, `10-Projetos/aquisicao/estado.md`, conferido em 2026-09-18)

- BigQuery: `livup_master.campaigns` (pré-clique: investimento, impressão, clique por campanha/anúncio), `livup_master.sessions` (pós-clique), `ecom_master.daily_goals` (meta e projeção diária por CD).
- Metabase reflete o BigQuery; não é fonte independente.
- Contas de anúncio (Google, Meta, TikTok): **sem acesso confirmado**. As plataformas publicaram servidor MCP oficial em 2026; falta permissão, não caminho técnico.
- `campaigns` não tem dimensão geográfica.

## Decisões abertas que o vídeo encosta (mesma fonte)

- "Quem assina o risco de agente com acesso de escrita em conta de anúncio" está aberto.
- Atribuição: automatizar em cima de atribuição caixa-preta espalha o erro mais rápido.

## Referência externa (vault, nota da Lexter, benchmark de 2026-09-24)

- Três camadas: coleta no warehouse → estatística determinística filtra hipóteses → LLM interpreta só o que sobrou → sugestões.
- Decisão de alto impacto financeiro (aumentar investimento) passa por uma pessoa.
- Recomendação para quem começa: coletar, calcular estatística, gerar relatório; sem automatizar execução.
