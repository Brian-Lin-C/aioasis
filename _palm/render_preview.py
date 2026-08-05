# 极简 SVG path 光栅化：仅支持 M/C/c/H/z（两个候选素材只用到这些命令）
import re
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.path import Path
from matplotlib.patches import PathPatch

TOKEN = re.compile(r"([MCcHz])|(-?\d+\.?\d*)")

def parse(d):
    toks = [m.group(0) for m in TOKEN.finditer(d)]
    verts, codes = [], []
    x = y = x0 = y0 = 0.0
    i = 0
    cmd = None
    def num():
        nonlocal i
        v = float(toks[i]); i += 1; return v
    while i < len(toks):
        if re.fullmatch(r"[MCcHz]", toks[i]):
            cmd = toks[i]; i += 1
        if cmd == "M":
            x, y = num(), num()
            verts.append((x, y)); codes.append(Path.MOVETO)
            x0, y0 = x, y
            cmd = "C"  # 本素材后续隐式命令按 C 处理（实际不会出现）
        elif cmd == "C":
            while i < len(toks) and not re.fullmatch(r"[MCcHz]", toks[i]):
                c1 = (num(), num()); c2 = (num(), num()); p = (num(), num())
                pts = sample_cubic((x, y), c1, c2, p)
                verts.extend(pts); codes.extend([Path.LINETO] * len(pts))
                x, y = p
        elif cmd == "c":
            while i < len(toks) and not re.fullmatch(r"[MCcHz]", toks[i]):
                c1 = (x + num(), y + num()); c2 = (x + num(), y + num()); p = (x + num(), y + num())
                pts = sample_cubic((x, y), c1, c2, p)
                verts.extend(pts); codes.extend([Path.LINETO] * len(pts))
                x, y = p
        elif cmd == "H":
            x = num()
            verts.append((x, y)); codes.append(Path.LINETO)
        elif cmd == "z":
            verts.append((x0, y0)); codes.append(Path.CLOSEPOLY)
            cmd = None
    return verts, codes

def sample_cubic(p0, c1, c2, p1, n=24):
    t = np.linspace(0, 1, n)[1:]
    mt = 1 - t
    xs = mt**3 * p0[0] + 3 * mt**2 * t * c1[0] + 3 * mt * t**2 * c2[0] + t**3 * p1[0]
    ys = mt**3 * p0[1] + 3 * mt**2 * t * c1[1] + 3 * mt * t**2 * c2[1] + t**3 * p1[1]
    return list(zip(xs, ys))

def load_paths(fp):
    src = open(fp, encoding="utf-8", errors="ignore").read()
    return re.findall(r'\bd="([^"]+)"', src)

fig, axes = plt.subplots(2, 2, figsize=(10, 9))
files = [("A · Palm tree symbol (300×246)", "_palm/palm_symbol.svg"),
         ("B · Simple Icons palm + island (485×485)", "_palm/simpleicons.svg")]
bgs = [("#0a0e1a", "#e8f5e9", "夜晚深色底"), ("#f5efe0", "#4a3f2a", "白天浅色底")]

for col, (title, fp) in enumerate(files):
    for row, (bg, fg, bgt) in enumerate(bgs):
        ax = axes[row][col]
        ax.set_facecolor(bg)
        for d in load_paths(fp):
            verts, codes = parse(d)
            ax.add_patch(PathPatch(Path(verts, codes), facecolor=fg, edgecolor="none"))
        ax.autoscale_view()
        ax.invert_yaxis()
        ax.set_aspect("equal")
        ax.axis("off")
        ax.set_title(f"{title} · {bgt}", color=("#ddd" if row == 0 else "#333"), fontsize=10)

fig.patch.set_facecolor("#888")
fig.tight_layout()
fig.savefig("_palm/preview.png", dpi=110, bbox_inches="tight", facecolor=fig.get_facecolor())
print("saved _palm/preview.png")
