# Transcrição de take-03.wav

[  0.00 –   5.96] Ste, Paô, Alegre, Este vídeo é o passo a passo para a gente construir o agente de Google, de Paid, Media.
[  6.56 –  11.72] Ele cabe numa pasta e tem quatro camadas. Antes de mais nada, quem é o agente?
[ 12.34 –  15.56] É o Claude, na versão Code, que a gente já usa todos os dias.
[ 16.00 –  23.60] Ele vai rodar na máquina de um de vocês e tudo começa com uma pasta no computador e um arquivo dentro dela, o cloud.md.
[ 24.16 –  26.94] Ele é o mapa. É o primeiro arquivo que o agente lê.
[ 26.94 –  30.50] ele dizem que ordem ler o resto e onde está cada coisa.
[ 31.14 –  35.08] A primeira camada é uma pasta dentro dessa pasta chamada Contesto.
[ 35.54 –  39.26] Num agente pequeno, o Contesto é só o necessário para a tarefa.
[ 39.68 –  40.90] São cinco respostas.
[ 41.36 –  42.16] Onde estão os dados?
[ 42.62 –  43.70] Quais dados importam?
[ 43.94 –  44.54] O que ele faz?
[ 45.00 –  45.70] O que ele não faz?
[ 46.10 –  47.36] E quais acessos ele tem?
[ 47.66 –  49.54] Cada resposta mora num arquivo.
[ 50.18 –  51.62] E como a gente testa isso?
[ 52.24 –  55.24] Pergunta para o agente onde estão os dados e o que ele não faz.
[ 55.24 –  57.72] Mas se ele errar, o problema está no contexto.
[ 58.54 –  60.40] A segunda camada são as análises.
[ 61.24 –  62.76] E aqui não tem IA.
[ 63.26 –  68.88] São arquivos em Python, eles consultam o banco, transformam o dado e salvam o resultado,
[ 69.36 –  70.78] no computador ou no BigQuery.
[ 71.68 –  77.26] Saturação de campanha, palavra-chave, SEO, mesmo dado, mesmo resultado.
[ 77.84 –  78.34] Sempre.
[ 78.82 –  83.86] O trabalho de vocês aqui é decidir quais análises rodam todo dia e como.
[ 83.86 –  89.26] como? Basta comparar um mês com o outro ou precisa de um teste estatístico como um modelo
[ 89.26 –  94.92] baiesiano? E por que isso fica fora do agente? Porque, quando a gente pede a análise direto
[ 94.92 –  99.98] para ele, ele calcula do jeito dele e não mostra como chegou no número. Com o Python,
[100.24 – 103.40] a conta fica num arquivo que qualquer um lê e roda de novo.
[104.00 – 110.90] E como a gente testa isso? Simples, roda duas vezes e compara. Depois, confere o
[110.90 – 116.92] número no Google Ads, numa campanha que vocês conhecem bem. A terceira camada é a decisão.
[117.46 – 122.66] É aqui que entra o agente. Ele lê o resultado das análises e decide o que recomendar.
[122.98 – 130.34] Campanha saturou? Ajustar a campanha. Apareceu uma oportunidade de SEO, como atacar palavra-chave
[130.34 – 136.14] performando mal, diminuir o budget? Mas quem decide é a pessoa, o agente sugere.
[136.14 – 142.74] E como a gente testa isso? Separem casos que vocês já conhecem, uma campanha que saturou
[142.74 – 149.12] e uma saudável. E vejam se ele acerta. Toda recomendação precisa citar o número. E quando
[149.12 – 155.84] faltar dado, ele tem que dizer que não sabe. A quarta camada é a ação. São as ferramentas
[155.84 – 161.54] que a gente libera para o agente. Criar campanha, ajustar budget. Só vamos dar
[161.54 – 164.72] ao agente a opção de fazer quando confiarmos que ele é capaz.
[165.44 – 167.98] Até lá ele recomenda e a gente executa.
[168.62 – 170.04] E como a gente testa isso?
[170.86 – 172.48] Primeiro, só recomendação.
[173.06 – 178.02] Depois, ação com aprovação, numa campanha pequena, com tudo registrado.
[178.80 – 183.60] Tudo isso roda no computador de um de vocês, como uma rotina do Claude que dispara sozinha
[183.60 – 184.30] todo dia.
[184.96 – 186.66] Agora, um exemplo real.
[186.66 – 194.36] a rotina dispara, o agente leu mapa e o estado da última rodada. Roda a análise de saturação
[194.36 – 199.86] comparando a agosto com setembro. A campanha Unbranded de Acquisição gastou quase o mesmo,
[200.68 – 211.62] 236 mil foi a eles contra 244 mil, mas os cliques caíram 31% e o custo por clica subiu 51%. O C,
[211.62 – 215.16] IR ficou estável, então o anúncio continua funcionando.
[215.48 – 216.84] O que encareceu foi o leilão.
[217.18 – 222.16] O agente escreve a recomendação, olhar as palavras-chave mais caras e reduzir o lance
[222.16 – 223.38] nas que mais subiram.
[223.72 – 227.80] E avisa, sem conversão por campanha, ele não sabe se o caque piorou.
[228.40 – 231.40] A recomendação para na frente da pessoa, o alegre a prova.
[231.82 – 233.24] E só então a ação acontece.
[234.16 – 240.62] Para fechar o checklist, contexto, análise, decisão, ação e rotina.
[240.62 – 248.26] cada um com o seu teste. A IA só aparece na decisão. O resto é pasta, Python e permissão.
[248.62 – 252.92] E a gente só confia no que testou. Esse é o passo a passo para a gente construir o
[252.92 – 256.54] início da nossa automação. Entenderam? Então bora fazer!

## Palavras com baixa confiança (conferir no áudio)

- 0.00s "Ste," (p=0.04)
- 0.40s "Paô," (p=0.02)
- 1.28s "Este" (p=0.15)
- 5.32s "Paid," (p=0.54)
- 5.66s "Media." (p=0.29)
- 12.60s "Claude," (p=0.58)
- 13.54s "Code," (p=0.35)
- 26.94s "ele" (p=0.24)
- 34.36s "Contesto." (p=0.54)
- 35.54s "Num" (p=0.52)
- 41.36s "Onde" (p=0.56)
- 55.24s "Mas" (p=0.04)
- 61.56s "não" (p=0.51)
- 83.86s "como?" (p=0.08)
- 86.30s "ou" (p=0.23)
- 94.92s "para" (p=0.45)
- 110.90s "número" (p=0.22)
- 129.44s "palavra" (p=0.3)
- 136.14s "E" (p=0.2)
- 161.54s "ao" (p=0.04)
- 166.60s "e" (p=0.51)
- 182.16s "Claude" (p=0.59)
- 186.66s "a" (p=0.04)
- 194.96s "a" (p=0.56)
- 201.58s "foi" (p=0.15)
- 206.34s "%" (p=0.58)
- 208.10s "clica" (p=0.37)
- 210.90s "C," (p=0.52)
- 211.62s "IR" (p=0.01)
- 231.00s "a" (p=0.46)
- 234.98s "checklist," (p=0.46)
- 236.14s "contexto," (p=0.53)
- 240.62s "cada" (p=0.22)
- 246.80s "Python" (p=0.49)
- 251.90s "para" (p=0.57)
