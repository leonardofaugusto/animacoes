"""Estágio 02: take escolhido -> transcript.md + words.json (tempo por palavra).

Uso: .venv\\Scripts\\python.exe tools\\transcribe.py videos\\<nome>
Lê o take indicado em 01_voice/escolha.md (linha "take: take-NN.wav").
"""
import json
import re
import shutil
import subprocess
import sys

import numpy
from pathlib import Path

from faster_whisper import WhisperModel

video = Path(sys.argv[1])
escolha = (video / "01_voice" / "escolha.md").read_text(encoding="utf-8")
take = video / "01_voice" / re.search(r"take:\s*(\S+)", escolha).group(1)
script = re.sub(r"<break[^>]*/>", " ", (video / "01_voice" / "script.md").read_text(encoding="utf-8"))

model = WhisperModel("small", device="cpu", compute_type="int8")
# decodifica com o ffmpeg: o PyAV desta instalação é incompatível com o decode_audio do faster-whisper
pcm = subprocess.run([shutil.which("ffmpeg") or "ffmpeg", "-loglevel", "error", "-i", str(take), "-ac", "1", "-ar", "16000", "-f", "f32le", "-"],
                     capture_output=True, check=True).stdout
audio = numpy.frombuffer(pcm, dtype=numpy.float32)
# initial_prompt com o roteiro ajuda a acertar grafia de termos (GitHub, custeio)
# vad_filter + sem condicionar no trecho anterior: evita a alucinação em áudio longo (lixo multilíngue nos primeiros 30s)
# dica = vocabulário (nomes e siglas do roteiro), não o começo do texto: o trecho longo fazia o Whisper alucinar,
# e o começo da fala como dica fazia ele pular esse começo
fala = " ".join(l for l in re.split(r"\n## ", script)[0].splitlines() if l.strip() and not l.startswith(("#", "~")))
termos = dict.fromkeys(re.findall(r"\b\w*[A-ZÀ-Ý][\w.\-]*", fala))
dica = ", ".join(t for t in termos if len(t) > 1)[:200]
segments, _ = model.transcribe(audio, language="pt", word_timestamps=True, initial_prompt=dica,
                               vad_filter=True, condition_on_previous_text=False)

words, lines = [], []
for seg in segments:
    lines.append(f"[{seg.start:6.2f} – {seg.end:6.2f}] {seg.text.strip()}")
    words += [{"w": w.word.strip(), "start": round(w.start, 2), "end": round(w.end, 2), "p": round(w.probability, 2)} for w in seg.words]

out = video / "02_transcript"
out.mkdir(exist_ok=True)
(out / "words.json").write_text(json.dumps(words, ensure_ascii=False, indent=1), encoding="utf-8")
duvidosas = [f"- {w['start']:.2f}s \"{w['w']}\" (p={w['p']})" for w in words if w["p"] < 0.6]
(out / "transcript.md").write_text(
    f"# Transcrição de {take.name}\n\n" + "\n".join(lines)
    + "\n\n## Palavras com baixa confiança (conferir no áudio)\n\n" + ("\n".join(duvidosas) or "nenhuma") + "\n",
    encoding="utf-8",
)
print(f"{len(words)} palavras, {len(duvidosas)} duvidosas, fim em {words[-1]['end']}s")
