# Render final — 2026-10-01

- `final.mp4`: 1920×1080, 30 fps, 4min18 (4min17 de fala + 1,5s de respiro), 32 MB. `final-phone.mp4`: 1280 px, 11 MB.
- Take: `take-03.wav` (ElevenLabs, voz "Leo", roteiro v2 com perguntas e pausas), normalizado -16 LUFS. Pico do MP4: -0,9 dB.
- Render levou 34 min nesta máquina (o primeiro vídeo: 2 min para 61s). Causa provável: névoa com `filter: blur` recalculada a cada quadro. Para o próximo: pré-renderizar a névoa como imagem.

## O que a revisão mudou antes do export

- Voz: voz "Leonardo Verdadeiro" descartada; entonação forçada por pergunta + `<break>` depois do teste A/B/C; "Ste" lido como "Esté"; volume normalizado.
- Transcrição: Whisper alucinava nos primeiros 30s com dica longa e pulava o começo com dica igual ao texto; passou a usar VAD e dica de vocabulário.
- Legenda e cues: alinhamento global (difflib) do roteiro com o Whisper; âncoras procuradas no roteiro alinhado.
- Cena: seções saem antes da próxima entrar; selos e carimbo do exemplo reposicionados.

## Ilustrativo na tela (não é dado consultado)

- Chat do teste 1, código do `saturacao.py` (resumo de poucas linhas), "mesmo CPC no Google Ads" do teste 2.
- Os números do exemplo são reais: BigQuery `livup_master.campaigns`, consultado em 2026-10-01.
