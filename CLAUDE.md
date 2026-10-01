# Animações narradas

Workspace pessoal do Leonardo. A ferramenta é pessoal; o conteúdo de alguns vídeos é da Liv Up (nesses, nada de número financeiro real nem nome de pessoa). Vídeos curtos (~30s) explicando uma ideia, feitos com IA, seguindo o método do curso "AI Animations & Workflows" da Clief Notes.

## Regra central

A voz vem antes da imagem. Cada estágio lê o arquivo do anterior, gera o seu e **para para revisão humana** antes do próximo. Não construir a cena antes de voz e storyboard aprovados.

## Estrutura

- `CLAUDE.md`: instruções reutilizáveis (este arquivo). Preferências que funcionaram vão na seção abaixo.
- `videos/<nome>/`: um vídeo por pasta. Nunca misturar dois vídeos, nunca apagar um vídeo terminado.

## Estágios

| Pasta | Entra | Sai | Ferramenta | Revisão humana |
|---|---|---|---|---|
| `00_brief` | fonte | `source.md`, `brief.md` | — | público, uma ideia, nada inventado além da fonte |
| `01_voice` | brief | `script.md`, `take-NN.wav`, `escolha.md` | ElevenLabs (`tools/eleven.py`, chave no `.env`). Voicebox local fica para o PC de casa | ouvir inteiro com o roteiro na frente |
| `02_transcript` | take escolhido | `transcript.md`, `words.json`; depois `legendas.js/.srt` (`tools/legendas.py`: texto do roteiro, tempo do Whisper) e `volume.js` (`tools/volume.py`: boca do avatar) | faster-whisper com `word_timestamps` (o `/transcribe` do Voicebox só devolve texto e duração, sem tempo por palavra) | conferir palavras e tempos suspeitos |
| `03_cues` | words.json | `cues.md` (storyboard) | — | cada beat tem frase, função visual e tempo no áudio |
| `04_scene` | cues + assets | `index.html`, `scene.js` | HTML/JS no navegador | frames parados (legível, sem sobreposição) e playback (imagem chega com a fala) |
| `05_render` | cena + áudio | `final.mp4`, `nota.md` | captura de frames + ffmpeg | assistir o MP4 fora do preview até o fim |

## Onde mora cada correção

- Mudou fala ou voz → refazer `01`, depois `02` e revisar `03`.
- Ênfase ou ordem errada → `03_cues`.
- Texto coberto, layout ruim → `04_scene/scene.js`.
- Destaque adiantado/atrasado → timing em `03_cues`.
- Erro de export → testar render curto antes de refazer o vídeo todo.

## Regras da cena

- A cena é função do tempo: `render(t)` desenha o quadro do instante `t`, sem timer de relógio nem clique. É isso que permite exportar igual ao preview.
- Uma ênfase por vez. Espaço livre para legenda.
- Texto importante fica na tela tempo suficiente para ser lido.

## Ambiente (verificado em 2026-09-30)

- Windows 11, AMD Radeon 780M (integrada), 14 GB RAM. Sem CUDA: Voicebox roda em DirectML ou CPU. Motores leves primeiro (Kokoro, Qwen3-TTS 0.6B).
- Python 3.14.7, Node instalado.
- Voicebox 0.5.0 em `%LOCALAPPDATA%\Voicebox\voicebox.exe`. Abrir o app sobe o servidor em `127.0.0.1:17493` (docs em `/docs`); **fechar o app derruba o servidor e mata a geração em andamento**, então ele fica aberto durante o estágio 01. Qwen 1.7B em CPU: vários minutos por take de ~60s. Backend detectado: `pytorch` / `cpu`, sem GPU.
- **Voz local não serve nesta máquina (2026-09-30):** Qwen 1.7B não cabe na RAM (servidor chegou a 13 GB, paginando em disco); Qwen 0.6B cabe (~50s por frase curta) mas a qualidade da voz clonada ficou ruim. Plano: rodar Voicebox no PC de casa (RTX 5060) no futuro. Por ora, ElevenLabs.
- ffmpeg 9.0.2 via winget (`Gyan.FFmpeg`). Shell aberto antes da instalação não enxerga no PATH: recarregar o PATH ou abrir shell novo.

## Preferências salvas

(vazio; preencher com o que funcionar ao longo dos vídeos)
