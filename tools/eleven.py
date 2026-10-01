"""Estágio 01 via ElevenLabs: script.md -> 01_voice/take-NN.wav (próximo número livre).

Uso: .venv\\Scripts\\python.exe tools\\eleven.py videos\\<nome>
Lê do .env na raiz do workspace (fora do git):
  ELEVENLABS_API_KEY=...
  ELEVENLABS_VOICE_ID=...          # id da voz clonada, em My Voices
  ELEVENLABS_MODEL=eleven_multilingual_v2   # opcional
Cada take consome ~1 crédito por caractere do roteiro.
"""
import json
import shutil
import subprocess
import sys
import urllib.request
from pathlib import Path

raiz = Path(__file__).resolve().parent.parent
env = dict(l.split("=", 1) for l in (raiz / ".env").read_text(encoding="utf-8").splitlines() if "=" in l and not l.startswith("#"))
env = {k.strip(): v.strip() for k, v in env.items()}

video = Path(sys.argv[1])
md = (video / "01_voice" / "script.md").read_text(encoding="utf-8").split("## Pronúncia")[0]
texto = "\n\n".join(l for l in md.splitlines() if l.strip() and not l.startswith(("#", "~")))

req = urllib.request.Request(
    f"https://api.elevenlabs.io/v1/text-to-speech/{env['ELEVENLABS_VOICE_ID']}?output_format=mp3_44100_128",
    data=json.dumps({"text": texto, "model_id": env.get("ELEVENLABS_MODEL", "eleven_multilingual_v2"), "language_code": "pt"}).encode(),
    headers={"xi-api-key": env["ELEVENLABS_API_KEY"], "Content-Type": "application/json"},
)
with urllib.request.urlopen(req, timeout=300) as r:
    mp3 = r.read()

voz = video / "01_voice"
n = 1 + max([int(p.stem.split("-")[1]) for p in voz.glob("take-*.wav")] or [0])
tmp = voz / f"take-{n:02d}.mp3"
tmp.write_bytes(mp3)
subprocess.run([shutil.which("ffmpeg") or "ffmpeg", "-y", "-loglevel", "error", "-i", str(tmp), str(voz / f"take-{n:02d}.wav")], check=True)
tmp.unlink()
print(f"take-{n:02d}.wav ({len(texto)} caracteres)")
