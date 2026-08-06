# AI绿洲 · AI OASIS

> 在数字沙漠里，种一片自己的绿洲。

**🌐 线上地址：[aioasis.top](https://aioasis.top)**

个人品牌主页 × AI 工具导航 × 中文内容策展。为国内的 AI 爱好者、学习者和开发者而建。

## ✨ 有什么

- **首页 Home** — 沙漠绿洲动态场景：沙丘入场波浪、日夜双主题（默认白天）、太阳/月亮按真实时间东升西落、晨昏暖色、金色流星彩蛋（点它有惊喜）
- **绿洲驿站 Stations** — 策展的 AI 工具导航：对话、绘画、视频、编程、智能体等分类，国产主流工具优先
- **绿洲小径 Trails** — 分阶段的学习路线策展（AI 扫盲 / PostgreSQL / Agent 开发就业 / 雅思自学），每个路标都经过真实性与国内直连核查，官方文档优先
- **观测站 Writings** — 中文为主的博客手记

## 🛠 技术栈

- **前端**：React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **动效**：Canvas 手绘场景 + CSS transitions，无重型动画库
- **测试**：Vitest（39 个用例，含策展数据原则校验）
- **部署**：Vercel（push 自动部署），安全响应头（CSP / HSTS / X-Frame-Options）

## 📁 结构

```
app/            # 网站全部代码（Vercel Root Directory）
  src/data/     # 策展数据：工具导航、小径路标
  src/sections/ # 首页各区块（含 Canvas 绿洲场景）
  src/pages/    # 驿站 / 小径 / 博客页面
  tests/        # Vitest 测试
brand/          # 品牌资产（Logo SVG 等）
```

## 🚀 本地运行

```bash
cd app
npm install
npm run dev    # 开发
npm test       # 测试（npx vitest run）
npm run build  # 构建
```

---

*Designed & built with Kimi.*
