"""预演棕榈剪影形状（复刻 OasisScene 的 palm 几何）"""
import math
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.path import Path
from matplotlib.patches import PathPatch, Circle

fig, ax = plt.subplots(figsize=(6, 6), dpi=100)
ax.set_xlim(-1.2, 1.6); ax.set_ylim(-1.5, 0.3)
ax.set_aspect('equal'); ax.axis('off')
fig.patch.set_facecolor('#0a0f0d'); ax.set_facecolor('#0a0f0d')

s, th = 1.0, 1.0
lean = th * 0.3
bx, by = 0.0, 0.0
tx, ty = bx + lean, by - th
color = '#3df5a6'

# 树干：细 S 弯（基宽 0.032 → 顶宽 0.013）
wb, wt = 0.032, 0.013
verts = [
    (bx - wb, by),
    (bx - wb * 0.3, by - th * 0.55), (tx - wt, ty),
    (tx + wt, ty),
    (bx + wb * 0.7, by - th * 0.45), (bx + wb, by),
    (bx - wb, by),
]
codes = [Path.MOVETO, Path.CURVE3, Path.CURVE3, Path.LINETO, Path.CURVE3, Path.CURVE3, Path.CLOSEPOLY]
ax.add_patch(PathPatch(Path(verts, codes), color=color, lw=0))

def blade(deg, lenK, widK, droopK):
    a = math.radians(deg)
    length = th * 0.62 * lenK
    wid = th * 0.1 * widK
    dx, dy = math.cos(a), math.sin(a)
    nx, ny = -dy, dx
    tipX = tx + dx*length
    tipY = ty + dy*length + length*droopK*0.5
    midX = tx + dx*length*0.5
    midY = ty + dy*length*0.5 + length*droopK*0.15
    v = [(tx, ty), (midX + nx*wid, midY + ny*wid), (tipX, tipY),
         (midX - nx*wid*0.7, midY - ny*wid*0.7), (tx, ty)]
    c = [Path.MOVETO, Path.CURVE3, Path.CURVE3, Path.CURVE3, Path.CURVE3]
    ax.add_patch(PathPatch(Path(v, c), color=color, lw=0))

for args in [(196,0.72,0.85,1),(224,0.9,0.95,0.85),(248,1,1,0.6),(270,1.02,1,0.45),(292,1,1,0.6),(316,0.9,0.95,0.85),(344,0.72,0.85,1)]:
    blade(*args)

ax.add_patch(Circle((tx-0.03, ty+0.04), 0.02, color=color))
ax.add_patch(Circle((tx+0.028, ty+0.05), 0.02, color=color))

# canvas y 轴向下，翻转以模拟
ax.invert_yaxis()
fig.savefig(r'E:\LC\Documents\Kimi\Workspaces\绿洲AI主页\_palm_preview.png', bbox_inches='tight', facecolor='#0a0f0d')
print('ok')
