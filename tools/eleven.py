"""Estágio 01 via ElevenLabs: script.md -> 01_voice/take-NN.wav (próximo número livre).

Uso: .venv\\Scripts\\python.exe tools\\eleven.py videos\\<nome> [opções]
  --arquivo teste.md   outro roteiro dentro de 01_voice/ (para testes curtos)
  --nome teste-A       nome do .wav de saída (padrão: take-NN)
  --modelo eleven_v3   sobrepõe ELEVENLABS_MODEL
  --stability 0.35     mais baixo = mais expressivo, menos previsível (v3 aceita 0.0, 0.5 ou 1.0)
  --so-texto           imprime o que vai para a voz, sem gastar crédito
Lê do .env na raiz do workspace (fora do git): ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID, ELEVENLABS_MODEL (opcional).
Cada take consome ~1 crédito por caractere.
"""
import argparse
import json
import re
import shutil
import subprocess
import urllib.request
from pathlib import Path

ap = argparse.ArgumentParser()
ap.add_argument("video")
ap.add_argument("--arquivo", default="script.md")
ap.add_argument("--nome")
ap.add_argument("--modelo")
ap.add_argument("--stability", type=float)
ap.add_argument("--so-texto", action="store_true")
a = ap.parse_args()

raiz = Path(__file__).resolve().parent.parent
env = dict(l.split("=", 1) for l in (raiz / ".env").read_text(encoding="utf-8").splitlines() if "=" in l and not l.startswith("#"))
env = {k.strip(): v.strip() for k, v in env.items()}

voz = Path(a.video) / "01_voice"
partes = re.split(r"\n## ", (voz / a.arquivo).read_text(encoding="utf-8"))
texto = "\n\n".join(l for l in partes[0].splitlines() if l.strip() and not l.startswith(("#", "~")))
# seção "## Fala": linhas - "escrito" → "falado", aplicadas só ao texto que vai para a voz
fala = next((x for x in partes[1:] if x.startswith("Fala")), "")
for escrito, falado in re.findall(r'"([^"]+)"\s*→\s*"([^"]+)"', fala):
    texto = texto.replace(escrito, falado)
if a.so_texto:
    print(texto)
    raise SystemExit

corpo = {"text": texto, "model_id": a.modelo or env.get("ELEVENLABS_MODEL", "eleven_multilingual_v2"), "language_code": "pt"}
if a.stability is not None:
    corpo["voice_settings"] = {"stability": a.stability, "similarity_boost": 0.75}
req = urllib.request.Request(
    f"https://api.elevenlabs.io/v1/text-to-speech/{env['ELEVENLABS_VOICE_ID']}?output_format=mp3_44100_128",
    data=json.dumps(corpo).encode(),
    headers={"xi-api-key": env["ELEVENLABS_API_KEY"], "Content-Type": "application/json"},
)
try:
    with urllib.request.urlopen(req, timeout=300) as r:
        mp3 = r.read()
except urllib.error.HTTPError as e:
    raise SystemExit(f"ElevenLabs {e.code}: {e.read().decode()[:500]}")

nome = a.nome or f"take-{1 + max([int(p.stem.split('-')[1]) for p in voz.glob('take-[0-9]*.wav')] or [0]):02d}"
tmp = voz / f"{nome}.mp3"
tmp.write_bytes(mp3)
# o ElevenLabs entrega baixo (pico ~-18 dB): normaliza para -16 LUFS, padrão de vídeo online
subprocess.run([shutil.which("ffmpeg") or "ffmpeg", "-y", "-loglevel", "error", "-i", str(tmp),
                "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-ar", "44100", str(voz / f"{nome}.wav")], check=True)
tmp.unlink()
print(f"{nome}.wav ({len(texto)} caracteres, {corpo['model_id']}, stability {a.stability if a.stability is not None else 'padrão'})")
