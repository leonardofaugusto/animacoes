# Roteiro v2 (entonação do teste A)

~3.600 caracteres, alvo de ~4min. Versão anterior em script-v1.md.

Ste, Paô e Alegre: este vídeo é o passo a passo para a gente construir o agente de Google de Paid Media. <break time="0.4s" /> Ele cabe numa pasta. E tem quatro camadas.

Antes de mais nada... quem é o agente? <break time="0.4s" /> É o Claude, na versão Code, que a gente já usa todos os dias. Ele vai rodar na máquina de um de vocês. E tudo começa com uma pasta no computador, e um arquivo dentro dela: o CLAUDE.md. <break time="0.4s" /> Ele é o mapa. É o primeiro arquivo que o agente lê. Ele diz em que ordem ler o resto, e onde está cada coisa.

<break time="0.6s" /> A primeira camada é uma pasta dentro dessa pasta, chamada contexto. Num agente pequeno, o contexto é só o necessário para a tarefa. São cinco respostas: onde estão os dados. Quais dados importam. O que ele faz. O que ele não faz. E quais acessos ele tem. Cada resposta mora num arquivo.

<break time="0.5s" /> E como a gente testa isso? <break time="0.4s" /> Pergunta para o agente onde estão os dados, e o que ele não faz. Se ele errar... o problema está no contexto.

<break time="0.6s" /> A segunda camada são as análises. <break time="0.5s" /> E aqui... não tem IA. São arquivos em Python. Eles consultam o banco, transformam o dado e salvam o resultado, no computador ou no BigQuery. Saturação de campanha, palavra-chave, SEO. Mesmo dado, mesmo resultado. Sempre.

O trabalho de vocês aqui é decidir quais análises rodam todo dia, e como. Basta comparar um mês com o outro? Ou precisa de um teste estatístico, como um modelo bayesiano? <break time="0.4s" /> E por que isso fica fora do agente? Porque, quando a gente pede a análise direto para ele, ele calcula do jeito dele. E não mostra como chegou no número. Com o Python, a conta fica num arquivo que qualquer um lê e roda de novo.

<break time="0.5s" /> E como a gente testa isso? <break time="0.4s" /> Simples: roda duas vezes e compara. Depois, confere o número no Google Ads, numa campanha que vocês conhecem bem.

<break time="0.6s" /> A terceira camada é a decisão. <break time="0.4s" /> É aqui que entra o agente. Ele lê o resultado das análises e decide o que recomendar. Campanha saturou? Ajustar a campanha. Apareceu uma oportunidade de SEO? Como atacar. Palavra-chave performando mal? Diminuir o budget. <break time="0.4s" /> Mas quem decide é a pessoa. O agente sugere.

<break time="0.5s" /> E como a gente testa isso? <break time="0.4s" /> Separem casos que vocês já conhecem: uma campanha que saturou, e uma saudável. E vejam se ele acerta. Toda recomendação precisa citar o número. E quando faltar dado... ele tem que dizer que não sabe.

<break time="0.6s" /> A quarta camada é a ação. São as ferramentas que a gente libera para o agente: criar campanha, ajustar budget. <break time="0.4s" /> Só vamos dar ao agente a opção de fazer quando confiarmos que ele é capaz. Até lá, ele recomenda. E a gente executa.

<break time="0.5s" /> E como a gente testa isso? <break time="0.4s" /> Primeiro, só recomendação. Depois, ação com aprovação, numa campanha pequena. Com tudo registrado.

<break time="0.6s" /> Tudo isso roda no computador de um de vocês, como uma rotina do Claude que dispara sozinha, todo dia.

<break time="0.6s" /> Agora... um exemplo real. <break time="0.4s" /> A rotina dispara. O agente lê o mapa, e o estado da última rodada. Roda a análise de saturação, comparando agosto com setembro. A campanha unbranded de aquisição gastou quase o mesmo: R$ 236 mil contra R$ 244 mil. <break time="0.3s" /> Mas os cliques caíram 31%. E o custo por clique subiu 51%. O CTR ficou estável, então o anúncio continua funcionando. O que encareceu foi o leilão.

O agente escreve a recomendação: olhar as palavras-chave mais caras, e reduzir o lance nas que mais subiram. E avisa: sem conversão por campanha, ele não sabe se o CAC piorou. <break time="0.4s" /> A recomendação para na frente da pessoa. O Alegre aprova. E só então a ação acontece.

<break time="0.6s" /> Para fechar, o checklist: contexto, análise, decisão, ação e rotina. Cada um com o seu teste. <break time="0.4s" /> A IA só aparece na decisão. O resto é pasta, Python e permissão. E a gente só confia no que testou.

<break time="0.5s" /> Esse é o passo a passo para a gente construir o início da nossa automação. Entenderam? <break time="0.3s" /> Então bora fazer!

## Fala

Trocas aplicadas só no texto enviado à voz (a legenda usa o texto acima, sem as marcações de pausa).

* "CLAUDE.md" → "clóud ponto ême dê"
* "SEO" → "ésse é ó"
* "CTR" → "cê tê érre"
* "CAC" → "cáqui"
* "Ste," → "Esté,"
