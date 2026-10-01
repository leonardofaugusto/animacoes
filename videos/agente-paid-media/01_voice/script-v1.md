# Roteiro v1

~2.900 caracteres, alvo de ~3min.

Ste, Paô e Alegre: este vídeo é o passo a passo para a gente construir o agente de Google de Paid Media. Ele cabe numa pasta e tem quatro camadas.

Antes de mais nada, quem é o agente? O agente é o Claude, na versão code, que a gente usa todos os dias. Ele irá rodar na máquina de um de vocês e tudo irá começar com uma pasta no computador com um arquivo, o CLAUDE.md. Ele é o mapa. É o primeiro que o agente lê, e diz em que ordem ler o resto e onde está cada coisa.

A Primeira camada é uma pasta dentro dessa pasta, chamada contexto. Num agente pequeno, o contexto é só o necessário para a tarefa a ser executada. São cinco respostas: onde estão os dados, quais dados importam, o que ele faz, o que ele não faz e quais acessos que ele tem. Cada resposta mora num arquivo. Como testar: pergunte ao agente onde estão os dados e o que ele não faz. Se ele errar, o problema está no contexto.

A segunda camada são as análises. Aqui não tem IA. São arquivos em Python que consultam o banco, transformam o dado e salvam o resultado, no computador ou no BigQuery. Saturação de campanha, palavra-chave, SEO. Mesmo dado, mesmo resultado, sempre. O trabalho de vocês aqui é decidir quais análises rodam todo dia, e como: basta comparar um mês com o outro, ou precisa de um teste estatístico, como um modelo bayesiano? E por que isso fica fora do agente: quando a gente pede a análise direto para ele, ele calcula do jeito dele e não mostra como chegou no número. Com o Python, a conta fica num arquivo que qualquer um lê e roda de novo. Como testar: rode duas vezes e compare. Depois confira o número no Google Ads, numa campanha que vocês conhecem.

A Terceira camada: a decisão. É aqui que entra o agente. Ele lê o resultado das análises e decide o que recomendar. Campanha saturou? Ajustar a campanha. Apareceu oportunidade de SEO? Como atacar. Palavra-chave performando mal? Diminuir o budget. Quem decide é a pessoa. O agente sugere. Como testar: separem casos que vocês já conhecem, uma campanha que saturou e uma saudável, e vejam se ele acerta. Toda recomendação precisa citar o número. E quando faltar dado, ele tem que dizer que não sabe.

Quarta camada: ação. São as ferramentas que a gente libera para o agente: criar campanha, ajustar budget. Só vamos dar ao agente a opção de fazer quando confiarmos que ele é capaz. Até lá, ele recomenda e a gente executa. Como testar: primeiro, só recomendação. Depois, ação com aprovação, numa campanha pequena, com tudo registrado.

Tudo isso roda no computador de um de vocês, como uma rotina do Claude que dispara sozinha todo dia.

Agora, um exemplo real. A rotina dispara. O agente lê o mapa e o estado da última rodada. Roda a análise de saturação, comparando agosto com setembro. A campanha unbranded de aquisição gastou quase o mesmo: R$ 236 mil contra R$ 244 mil. Mas os cliques caíram 31%, e o custo por clique subiu 51%. O CTR ficou estável, então o anúncio continua funcionando. O que encareceu foi o leilão. O agente escreve a recomendação: olhar as palavras-chave mais caras e reduzir o lance nas que mais subiram. E avisa: sem conversão por campanha, ele não sabe se o CAC piorou. A recomendação para na frente da pessoa. O Alegre aprova, e só então a ação acontece.

Para fechar, o checklist: contexto, análise, decisão, ação e rotina, cada um com o seu teste. A IA só aparece na decisão. O resto é pasta, Python e permissão. E a gente só confia no que testou. Esse é o passo a passo para construirmos o início da nossa automação!! Entenderam? Então bora fazer!

## Fala

Trocas aplicadas só no texto enviado à voz (a legenda usa o texto acima).

* "CLAUDE.md" → "clóud ponto ême dê"
* "SEO" → "ésse é ó"
* "CTR" → "cê tê érre"
* "CAC" → "cáqui"
* "Ste," → "Esté,"

