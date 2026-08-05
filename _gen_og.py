"""生成 AI绿洲 OG 分享卡片 1200x630"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1200, 630
BG = (5, 8, 7)
OASIS = (61, 245, 166)
SAND = (224, 184, 105)
FG = (236, 234, 229)

img = Image.new('RGB', (W, H), BG)

# 极光光晕（中心偏下）
glow = Image.new('RGB', (W, H), BG)
gd = ImageDraw.Draw(glow)
gd.ellipse([W * 0.5 - 420, H * 0.72 - 420, W * 0.5 + 420, H * 0.72 + 420], fill=(16, 66, 46))
glow = glow.filter(ImageFilter.GaussianBlur(180))
img = Image.blend(img, glow, 0.85)

# 右上暖金微光
glow2 = Image.new('RGB', (W, H), (0, 0, 0))
g2 = ImageDraw.Draw(glow2)
g2.ellipse([W - 260, -160, W + 160, 260], fill=(40, 32, 16))
glow2 = glow2.filter(ImageFilter.GaussianBlur(140))
img = Image.fromarray(
    __import__('numpy').clip(
        __import__('numpy').array(img, dtype=int) + __import__('numpy').array(glow2, dtype=int), 0, 255
    ).astype('uint8')
)

d = ImageDraw.Draw(img)

# 沙丘剪影（底部三层波浪）
import math
for layer, (base, amp, col) in enumerate([
    (H * 0.86, 18, (10, 15, 13)),
    (H * 0.92, 24, (7, 12, 10)),
    (H * 0.98, 30, (5, 8, 7)),
]):
    pts = [(x, base + math.sin(x * 0.004 + layer * 2.7) * amp + math.sin(x * 0.011 + layer) * amp * 0.4)
           for x in range(-10, W + 10, 6)]
    d.polygon(pts + [(W + 10, H + 10), (-10, H + 10)], fill=col)

# 星尘
import random
random.seed(7)
for _ in range(140):
    x, y = random.uniform(0, W), random.uniform(0, H * 0.7)
    r = random.uniform(0.5, 1.6)
    c = SAND if random.random() < 0.18 else FG
    a = random.uniform(0.25, 0.9)
    d.ellipse([x - r, y - r, x + r, y + r], fill=tuple(int(v * a) for v in c))

f_lat = ImageFont.truetype(r'C:\Windows\Fonts\msyhbd.ttc', 150)
f_zh = ImageFont.truetype(r'C:\Windows\Fonts\msyhbd.ttc', 64)
f_tag = ImageFont.truetype(r'C:\Windows\Fonts\msyh.ttc', 34)
f_mono = ImageFont.truetype(r'C:\Windows\Fonts\msyh.ttc', 26)

# 主标题（左侧排版）
d.text((90, 200), 'AI OASIS', font=f_lat, fill=FG)
d.text((94, 380), 'AI绿洲', font=f_zh, fill=OASIS)
d.text((96, 480), '在数字沙漠里，种一片自己的绿洲', font=f_tag, fill=(168, 166, 160))
d.text((96, 96), 'A I O A S I S . T O P', font=f_mono, fill=SAND)

img.save(r'E:\LC\Documents\Kimi\Workspaces\绿洲AI主页\app\public\og.png', optimize=True)
print('saved', img.size)
