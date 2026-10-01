"""Take escolhido -> 02_transcript/volume.js (volume 0..1 por quadro, para a boca do avatar).

Uso: .venv\\Scripts\\python.exe tools\\volume.py videos\\<nome>
"""
import array
import json
import math
import re
import shutil
import subprocess
import sys
from pathlib import Path

FPS, SR = 30, 8000
video = Path(sys.argv[1])
take = video / "01_voice" / re.search(r"take:\s*(\S+)", (video / "01_voice" / "escolha.md").read_text(encoding="utf-8")).group(1)
raw = subprocess.run([shutil.which("ffmpeg") or "ffmpeg", "-loglevel", "error", "-i", str(take), "-ac", "1", "-ar", str(SR), "-f", "s16le", "-"],
                     capture_output=True, check=True).stdout
s = array.array("h", raw)
n = SR // FPS
rms = [math.sqrt(sum(x * x for x in s[i:i + n]) / n) for i in range(0, len(s) - n + 1, n)]
pico = sorted(rms)[int(len(rms) * 0.95)] or 1  # percentil 95, para um pico isolado não achatar o resto
v = [round(min(1, r / pico), 2) for r in rms]
(video / "02_transcript").mkdir(exist_ok=True)
(video / "02_transcript" / "volume.js").write_text("window.VOLUME = " + json.dumps({"fps": FPS, "v": v}) + ";\n", encoding="utf-8")
print(f"{len(v)} quadros, {sum(x > 0.35 for x in v) / len(v):.0%} com boca aberta")
