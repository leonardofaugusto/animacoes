"""Estágio 05: 04_scene/index.html + take escolhido -> 05_render/final.mp4 (+ final-phone.mp4).

Uso: .venv\\Scripts\\python.exe tools\\render.py videos\\<nome> [--de 10 --ate 15] [--fps 30]
Com --de/--ate gera 05_render/teste.mp4 só daquele trecho (teste curto antes do vídeo inteiro).
"""
import argparse
import json
import re
import shutil
import subprocess
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

ap = argparse.ArgumentParser()
ap.add_argument("video")
ap.add_argument("--de", type=float, default=0)
ap.add_argument("--ate", type=float)
ap.add_argument("--fps", type=int, default=30)
ap.add_argument("--quadros", help="só tira PNGs nesses segundos, ex.: 12,25.5,40 (revisão de layout)")
a = ap.parse_args()

if a.quadros:
    video = Path(a.video).resolve()
    (video / "04_scene" / "quadros").mkdir(exist_ok=True)
    with sync_playwright() as pw:
        browser = pw.chromium.launch(channel="msedge")
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        page.on("pageerror", lambda e: print("ERRO NA CENA:", e))
        page.goto((video / "04_scene" / "index.html").as_uri() + "?render=1")
        page.wait_for_function("typeof window.render === 'function'")
        page.evaluate("document.fonts.ready")
        for t in [float(x) for x in a.quadros.split(",")]:
            page.evaluate("t => window.render(t)", t)
            page.screenshot(path=str(video / "04_scene" / "quadros" / f"{t:06.2f}.png"))
            print("quadro", t)
        browser.close()
    raise SystemExit

video = Path(a.video).resolve()
take = video / "01_voice" / re.search(r"take:\s*(\S+)", (video / "01_voice" / "escolha.md").read_text(encoding="utf-8")).group(1)
duracao = json.loads((video / "03_cues" / "cues.json").read_text(encoding="utf-8"))["duracao"] + 1.5  # respiro no fim
fim = a.ate if a.ate is not None else duracao
teste = a.ate is not None or a.de > 0
out = video / "05_render"
out.mkdir(exist_ok=True)
mp4 = out / ("teste.mp4" if teste else "final.mp4")
ffmpeg = shutil.which("ffmpeg") or "ffmpeg"

enc = subprocess.Popen(
    [ffmpeg, "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", str(a.fps), "-i", "-",
     "-ss", str(a.de), "-t", str(fim - a.de), "-i", str(take),
     "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-c:a", "aac", "-b:a", "192k",
     "-af", "apad", "-shortest", str(mp4)],
    stdin=subprocess.PIPE,
)
with sync_playwright() as pw:
    browser = pw.chromium.launch(channel="msedge")
    page = browser.new_page(viewport={"width": 1920, "height": 1080})
    page.goto((video / "04_scene" / "index.html").as_uri() + "?render=1")
    page.wait_for_function("typeof window.render === 'function' && document.fonts.status === 'loaded'")
    n = round((fim - a.de) * a.fps)
    inicio = time.time()
    for i in range(n):
        page.evaluate("t => window.render(t)", a.de + i / a.fps)
        enc.stdin.write(page.screenshot(type="png"))
        if i % (a.fps * 5) == 0 and i:
            # progresso em arquivo: dá para consultar no meio do render, mesmo rodando em segundo plano
            gasto = time.time() - inicio
            resta = gasto / i * (n - i)
            linha = f"{100 * i / n:5.1f}%  quadro {i}/{n}  vídeo {a.de + i / a.fps:.0f}s/{fim:.0f}s  termina em ~{resta / 60:.0f} min ({time.strftime('%H:%M', time.localtime(time.time() + resta))})"
            (out / "progresso.txt").write_text(linha + "\n", encoding="utf-8")
            print(linha, flush=True)
    browser.close()
enc.stdin.close()
if enc.wait():
    raise SystemExit("ffmpeg falhou")

if not teste:  # cópia menor para celular
    subprocess.run([ffmpeg, "-y", "-loglevel", "error", "-i", str(mp4), "-vf", "scale=1280:-2",
                    "-c:v", "libx264", "-crf", "26", "-c:a", "copy", str(out / "final-phone.mp4")], check=True)
print("ok:", mp4)
