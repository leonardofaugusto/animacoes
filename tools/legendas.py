"""script.md + words.json -> 02_transcript/legendas.js (para a cena) + legendas.srt (para plataforma).

Uso: .venv\\Scripts\\python.exe tools\\legendas.py videos\\<nome>
O TEXTO vem do roteiro (grafia certa); o Whisper só dá os TEMPOS. Cada palavra do roteiro
casa com a próxima palavra igual do Whisper numa janela curta; sem par, herda o tempo da vizinha.
Quebra em blocos de até MAX caracteres, preferindo fechar em pontuação.
"""
import difflib
import json
import re
import sys
import unicodedata
from pathlib import Path

MAX = 42
video = Path(sys.argv[1])


def norm(s):
    s = unicodedata.normalize("NFKD", s.lower())
    return re.sub(r"[^a-z0-9]", "", "".join(c for c in s if not unicodedata.combining(c)))


md = re.split(r"\n## ", (video / "01_voice" / "script.md").read_text(encoding="utf-8"))[0]
md = re.sub(r"<break[^>]*/>", " ", md)  # marcação de pausa da voz não vai para a legenda
roteiro = " ".join(l for l in md.splitlines() if l.strip() and not l.startswith(("#", "~"))).split()

ws = []  # Whisper, com "-financeiro" grudado no token anterior
for w in json.loads((video / "02_transcript" / "words.json").read_text(encoding="utf-8")):
    if w["w"].startswith("-") and ws:
        ws[-1] = {**ws[-1], "w": ws[-1]["w"] + w["w"], "end": w["end"]}
    else:
        ws.append(dict(w))

# alinhamento global (difflib): uma palavra sem par não derruba as seguintes
tempos = [None] * len(roteiro)
sm = difflib.SequenceMatcher(None, [norm(p) for p in roteiro], [norm(w["w"]) for w in ws], autojunk=False)
for bloco in sm.get_matching_blocks():
    for k in range(bloco.size):
        w = ws[bloco.b + k]
        tempos[bloco.a + k] = (w["start"], w["end"])
sem_par = [p for p, t in zip(roteiro, tempos) if t is None]
for i, t in enumerate(tempos):  # sem par: interpola entre a vizinha anterior e a próxima com tempo
    if t is None:
        a = tempos[i - 1][1] if i else 0
        b = next((x[0] for x in tempos[i + 1:] if x), a)
        tempos[i] = (a, max(a, b))

blocos, atual = [], []
for i, palavra in enumerate(roteiro):
    if atual and len(" ".join(roteiro[k] for k in atual + [i])) > MAX:
        blocos.append(atual)
        atual = []
    atual.append(i)
    txt = " ".join(roteiro[k] for k in atual)
    if palavra[-1] in ".!?" or (palavra[-1] in ",:" and len(txt) > MAX * 0.6):
        blocos.append(atual)
        atual = []
if atual:
    blocos.append(atual)

leg = [{"t0": tempos[b[0]][0], "t1": tempos[b[-1]][1], "txt": " ".join(roteiro[k] for k in b)} for b in blocos]
for a, b in zip(leg, leg[1:]):  # segura a legenda até a próxima se a pausa for curta
    if b["t0"] - a["t1"] < 0.6:
        a["t1"] = b["t0"]

out = video / "02_transcript"
# roteiro palavra a palavra com tempo: base das âncoras do cues.py (texto do roteiro, não do Whisper)
(out / "alinhado.json").write_text(json.dumps([{"w": p, "start": t[0], "end": t[1]} for p, t in zip(roteiro, tempos)], ensure_ascii=False, indent=0), encoding="utf-8")
(out / "legendas.js").write_text("window.LEGENDAS = " + json.dumps(leg, ensure_ascii=False) + ";\n", encoding="utf-8")


def ts(s):
    return f"{int(s // 3600):02d}:{int(s % 3600 // 60):02d}:{int(s % 60):02d},{int(s * 1000 % 1000):03d}"


(out / "legendas.srt").write_text("\n".join(f"{i}\n{ts(l['t0'])} --> {ts(l['t1'])}\n{l['txt']}\n" for i, l in enumerate(leg, 1)), encoding="utf-8")
print(f"{len(leg)} legendas; maior: {max(len(l['txt']) for l in leg)} caracteres; palavras sem par no áudio: {sem_par or 'nenhuma'}")
