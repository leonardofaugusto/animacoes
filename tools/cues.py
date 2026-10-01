"""Estágio 03: cues.md + words.json -> cues.json (segundo de início de cada beat).

Uso: .venv\\Scripts\\python.exe tools\\cues.py videos\\<nome>
Cada linha da tabela de cues.md: | id | "âncora" | ... . A âncora é procurada em ordem,
sempre depois da anterior. Âncora não encontrada é erro, não chute.
"""
import json
import re
import sys
import unicodedata
from pathlib import Path


def norm(s):
    s = unicodedata.normalize("NFKD", s.lower())
    return re.sub(r"[^a-z0-9 ]", "", "".join(c for c in s if not unicodedata.combining(c)))


video = Path(sys.argv[1])
rows = re.findall(r'^\|\s*([\w-]+)\s*\|\s*"([^"]+)"', (video / "03_cues" / "cues.md").read_text(encoding="utf-8"), re.M)
words = json.loads((video / "02_transcript" / "words.json").read_text(encoding="utf-8"))
toks = [norm(w["w"]) for w in words]

cues, pos, erros = [], 0, []
for cid, anchor in rows:
    alvo = norm(anchor).split()
    hit = next((i for i in range(pos, len(toks) - len(alvo) + 1) if toks[i:i + len(alvo)] == alvo), None)
    if hit is None:
        erros.append(f"{cid}: \"{anchor}\" não encontrada depois de {words[pos]['start'] if pos < len(words) else 'fim'}s")
        continue
    cues.append({"id": cid, "t": words[hit]["start"], "fim_ancora": words[hit + len(alvo) - 1]["end"]})
    pos = hit + len(alvo)

out = {"duracao": words[-1]["end"], "cues": cues}
(video / "03_cues" / "cues.json").write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")
# cópia em JS: a cena abre via file://, onde o navegador não deixa ler JSON
(video / "03_cues" / "cues.js").write_text("window.CUES = " + json.dumps(out, ensure_ascii=False) + ";\n", encoding="utf-8")
for c in cues:
    print(f"{c['t']:6.2f}s  {c['id']}")
if erros:
    sys.exit("ERROS:\n" + "\n".join(erros))
