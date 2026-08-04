# AI绿洲网站 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 按已确认规格搭建 AI绿洲（aioasis.top）个人品牌枢纽站：沉浸式首页 + AI 工具导航 + Markdown 博客。

**Architecture:** Vite + React + TypeScript 单页应用，React Router 四类路由；Canvas 2D 手绘星场 Hero；GSAP + Lenis 动效；内容层为结构化 TS 数据（工具）+ Markdown frontmatter 文件（博客），Vite glob 自动收录。

**Tech Stack:** React 18 / TypeScript / Vite / Tailwind CSS 3.4 / shadcn/ui / react-router-dom / GSAP(ScrollTrigger) / Lenis / framer-motion / marked / Vitest + Testing Library

**规格文档:** `docs/superpowers/specs/2026-08-05-aioasis-design.md`（所有视觉与动效数值以此为准）

## Global Constraints

- 项目目录：`E:\LC\Documents\Kimi\Workspaces\绿洲AI主页\app`（由 webapp-building 脚手架生成）
- 色彩基线：底 `#050807`/`#0A0F0D`；主强调 `#3DF5A6`；辅 `#E0B869`；主文字 `#ECEAE5`
- 字体栈：`'Space Grotesk', 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif`；元数据用 `'JetBrains Mono', monospace`；Google Fonts 一律 `font-display: swap`
- 中文禁止伪斜体；禁止 emoji 图标（用 Lucide）；禁止卡片套卡片；禁止蓝紫渐变
- 缓动统一 `cubic-bezier(0.16, 1, 0.3, 1)`，时长 0.6–1s
- 尊重 `prefers-reduced-motion`；自定义光标仅桌面（`pointer: fine`）
- 每个 Task 结束必须 `npm run build` 通过 + 相关 vitest 通过 + git commit
- 测试框架：Vitest + @testing-library/react + jsdom（Task 1 安装）
- 测试运行命令统一：`npx vitest run`（在 `app/` 目录下）

## 文件结构总览

```
app/
├── index.html                        # 字体 <link>、标题、favicon（Task 2）
├── vite.config.ts                    # + test 配置（Task 1）
├── public/favicon.svg                # 绿洲星点 SVG（Task 2）
├── src/
│   ├── index.css                     # 设计令牌、grain、selection、scrollbar（Task 2）
│   ├── types/content.ts              # Tool / BlogPost 类型（Task 3）
│   ├── data/tools.ts                 # CATEGORIES + ~30 工具条目（Task 3）
│   ├── lib/blog.ts                   # frontmatter 解析 + glob 收录 + 阅读时长（Task 3）
│   ├── content/blog/*.md             # 3 篇启动文章（Task 4）
│   ├── components/canvas/OasisScene.tsx   # 星场/沙丘/极光/流星（Task 5）
│   ├── components/motion/MaskReveal.tsx   # 遮罩上滑揭示（Task 6）
│   ├── components/motion/Magnetic.tsx     # 磁性吸附（Task 6）
│   ├── components/motion/Cursor.tsx       # 十字光标（Task 6）
│   ├── components/motion/Preloader.tsx    # 百分比加载（Task 6）
│   ├── hooks/useLenis.ts             # 平滑滚动（Task 6）
│   ├── components/layout/SiteHeader.tsx   # 编号导航（Task 7）
│   ├── components/layout/SiteFooter.tsx   # marquee + 链接（Task 7）
│   ├── sections/home/*.tsx           # Hero/About/Stations/Writings（Task 8）
│   ├── pages/Home.tsx                # （Task 8）
│   ├── pages/NavPage.tsx             # 筛选 + 搜索（Task 9）
│   ├── pages/BlogList.tsx            # （Task 10）
│   ├── pages/BlogPost.tsx            # Markdown 渲染 + prose（Task 10）
│   ├── App.tsx                       # 路由 + 转场（Task 7 建，Task 8-10 补页面）
│   └── test/setup.ts                 # jest-dom（Task 1）
└── tests/                            # vitest 测试（各 Task）
```

---

### Task 1: 脚手架与依赖

**Files:**
- Create: `app/`（整个项目，由脚本生成）
- Modify: `app/vite.config.ts`
- Create: `app/src/test/setup.ts`
- Create: `app/tests/smoke.test.ts`

**Interfaces:**
- Produces: `npm run dev` / `npm run build` / `npx vitest run` 三条命令可用；`@/` 路径别名（脚手架自带）

- [ ] **Step 1: 运行脚手架**

```bash
cd "E:\LC\Documents\Kimi\Workspaces\绿洲AI主页"
bash "C:\Users\LC\AppData\Roaming\kimi-desktop\daimon-share\daimon\skills\webapp-building\scripts\init-webapp.sh" ./app "AI绿洲"
```

Expected: 脚本成功结束，打印 `template-info.md`；`app/package.json` 存在。

- [ ] **Step 2: 安装业务依赖与测试依赖**

```bash
cd "E:\LC\Documents\Kimi\Workspaces\绿洲AI主页\app"
npm install --no-audit --no-fund react-router-dom gsap lenis framer-motion marked
npm install --no-audit --no-fund -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Expected: 全部安装成功，`package.json` 中出现上述依赖。（lucide-react 脚手架自带，若没有则一并 `npm install lucide-react`。）

- [ ] **Step 3: 配置 Vitest**

修改 `app/vite.config.ts`（保留脚手架原有 plugins/resolve/server 配置，仅追加 test 字段与 import）：

```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite'
// …脚手架原有 import 保持不变

export default defineConfig({
  // …脚手架原有配置保持不变（plugins, resolve, server 等）
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: false,
  },
})
```

新建 `app/src/test/setup.ts`：

```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 4: 写一个证明链路通畅的冒烟测试（先失败）**

新建 `app/tests/smoke.test.ts`：

```ts
import { describe, it, expect } from 'vitest'

describe('project smoke', () => {
  it('vitest 链路可用', () => {
    expect(1 + 1).toBe(2)
  })
})
```

- [ ] **Step 5: 运行验证**

```bash
cd "E:\LC\Documents\Kimi\Workspaces\绿洲AI主页\app"
npx vitest run
npm run build
```

Expected: vitest 1 passed；build 成功输出 `dist/`。

- [ ] **Step 6: Commit**

```bash
cd "E:\LC\Documents\Kimi\Workspaces\绿洲AI主页"
git add app
git commit -m "chore: 脚手架 + 路由/动效/测试依赖就位"
```

---

### Task 2: 设计令牌与全局样式

**Files:**
- Modify: `app/index.html`
- Modify: `app/src/index.css`
- Modify: `app/tailwind.config.js`
- Create: `app/public/favicon.svg`

**Interfaces:**
- Produces: CSS 变量 `--bg --bg-2 --fg --muted --oasis --sand`；Tailwind 颜色 `bg/bg2/fg/muted/oasis/sand` 与字体 `font-display font-mono2`；全局类 `.grain-overlay .prose-oasis`

- [ ] **Step 1: index.html —— 字体与 favicon**

在 `<head>` 中加入（标题改为 `AI绿洲 · AI OASIS`）：

```html
<title>AI绿洲 · AI OASIS</title>
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;500;700&display=swap"
  rel="stylesheet"
/>
```

- [ ] **Step 2: favicon**

新建 `app/public/favicon.svg`：

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#050807"/>
  <circle cx="16" cy="20" r="6" fill="#3DF5A6" opacity="0.9"/>
  <circle cx="16" cy="20" r="9" fill="none" stroke="#3DF5A6" stroke-opacity="0.35"/>
  <circle cx="10" cy="8" r="1.2" fill="#E0B869"/>
  <circle cx="22" cy="6" r="0.9" fill="#ECEAE5"/>
</svg>
```

- [ ] **Step 3: index.css —— 设计令牌（完整替换脚手架生成的内容中 `:root`/body 部分；保留 `@tailwind` 三行指令在文件顶部）**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #050807;
  --bg-2: #0a0f0d;
  --fg: #eceae5;
  --muted: rgba(236, 234, 229, 0.55);
  --oasis: #3df5a6;
  --sand: #e0b869;
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
}

html {
  background: var(--bg);
  scrollbar-color: rgba(61, 245, 166, 0.35) var(--bg);
}

body {
  background: var(--bg);
  color: var(--fg);
  font-family: 'Space Grotesk', 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  overscroll-behavior: none;
}

.font-mono2 {
  font-family: 'JetBrains Mono', 'PingFang SC', 'Microsoft YaHei', monospace;
}

::selection {
  background: var(--oasis);
  color: #050807;
}

::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb {
  background: rgba(61, 245, 166, 0.25);
  border-radius: 5px;
  border: 2px solid var(--bg);
}
::-webkit-scrollbar-thumb:hover { background: rgba(61, 245, 166, 0.45); }

/* 胶片颗粒覆盖层：挂在 body::after，极淡 */
.grain-overlay::after {
  content: '';
  position: fixed;
  inset: -50%;
  width: 200%;
  height: 200%;
  pointer-events: none;
  z-index: 90;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
}

/* 博客正文排版：正文限宽 28-32 个汉字由容器 max-w-[32em] 控制 */
.prose-oasis {
  color: var(--fg);
  line-height: 1.9;
  letter-spacing: 0.015em;
  font-size: 1.0625rem;
}
.prose-oasis h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 2.5em 0 0.8em;
  color: var(--fg);
}
.prose-oasis h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 2em 0 0.6em;
}
.prose-oasis p { margin: 1.1em 0; }
.prose-oasis a { color: var(--oasis); text-decoration: underline; text-underline-offset: 4px; }
.prose-oasis strong { color: var(--oasis); font-weight: 600; }
.prose-oasis ul { margin: 1.1em 0; padding-left: 1.4em; list-style: disc; }
.prose-oasis li { margin: 0.4em 0; }
.prose-oasis blockquote {
  border-left: 2px solid var(--oasis);
  padding-left: 1em;
  color: var(--muted);
  margin: 1.5em 0;
}
.prose-oasis code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85em;
  background: rgba(61, 245, 166, 0.08);
  padding: 0.15em 0.4em;
  border-radius: 4px;
}
.prose-oasis pre {
  background: var(--bg-2);
  border: 1px solid rgba(236, 234, 229, 0.08);
  border-radius: 10px;
  padding: 1.2em;
  overflow-x: auto;
  margin: 1.5em 0;
}
.prose-oasis pre code { background: none; padding: 0; }
.prose-oasis img { border-radius: 10px; margin: 1.5em 0; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 4: tailwind.config.js —— 扩展颜色**

在 `theme.extend.colors` 中追加（保留脚手架原有 shadcn 颜色体系）：

```js
colors: {
  // …脚手架原有颜色保留
  bg: 'var(--bg)',
  bg2: 'var(--bg-2)',
  fg: 'var(--fg)',
  muted: 'var(--muted)',
  oasis: 'var(--oasis)',
  sand: 'var(--sand)',
}
```

- [ ] **Step 5: 验证**

```bash
cd "E:\LC\Documents\Kimi\Workspaces\绿洲AI主页\app"
npm run build
```

Expected: 构建成功。

- [ ] **Step 6: Commit**

```bash
git add app/index.html app/src/index.css app/tailwind.config.js app/public/favicon.svg
git commit -m "feat: 深空绿洲设计令牌与全局样式"
```

---

### Task 3: 内容层 —— 工具数据 + 博客加载器（TDD）

**Files:**
- Create: `app/src/types/content.ts`
- Create: `app/src/data/tools.ts`
- Create: `app/src/lib/blog.ts`
- Test: `app/tests/blog.test.ts`、`app/tests/tools.test.ts`

**Interfaces:**
- Produces:
  - `type Category = '对话' | '绘画' | '视频' | '音频' | '编程' | '办公效率' | '搜索研究' | '开源模型'`
  - `interface Tool { id: string; name: string; nameEn?: string; description: string; url: string; category: Category; featured: boolean }`
  - `const CATEGORIES: readonly Category[]`、`const tools: Tool[]`
  - `interface BlogPostMeta { slug: string; title: string; date: string; tags: string[]; excerpt: string; readingMinutes: number }`
  - `interface BlogPost extends BlogPostMeta { html: string }`
  - `parseFrontmatter(raw: string): { data: Record<string, unknown>; body: string }`
  - `computeReadingMinutes(text: string): number`（按 400 字/分钟，下限 1）
  - `loadPosts(): BlogPost[]`（按 date 降序）
  - `getPost(slug: string): BlogPost | undefined`

- [ ] **Step 1: 写失败测试 `app/tests/blog.test.ts`**

```ts
import { describe, it, expect } from 'vitest'
import { parseFrontmatter, computeReadingMinutes } from '../src/lib/blog'

describe('parseFrontmatter', () => {
  it('解析 title/date/tags/excerpt', () => {
    const raw = `---\ntitle: 测试标题\ndate: 2026-08-05\ntags: [AI, 随笔]\nexcerpt: 这是一段摘要\n---\n\n正文内容`
    const { data, body } = parseFrontmatter(raw)
    expect(data.title).toBe('测试标题')
    expect(data.date).toBe('2026-08-05')
    expect(data.tags).toEqual(['AI', '随笔'])
    expect(data.excerpt).toBe('这是一段摘要')
    expect(body.trim()).toBe('正文内容')
  })

  it('无 frontmatter 时返回空 data 与原文', () => {
    const { data, body } = parseFrontmatter('只有正文')
    expect(data).toEqual({})
    expect(body).toBe('只有正文')
  })
})

describe('computeReadingMinutes', () => {
  it('按 400 字/分钟且下限 1', () => {
    expect(computeReadingMinutes('短')).toBe(1)
    expect(computeReadingMinutes('字'.repeat(800))).toBe(2)
    expect(computeReadingMinutes('字'.repeat(1000))).toBe(3)
  })
})
```

新建 `app/tests/tools.test.ts`：

```ts
import { describe, it, expect } from 'vitest'
import { tools, CATEGORIES } from '../src/data/tools'

describe('tools 数据', () => {
  it('至少 24 个条目且 id 唯一', () => {
    expect(tools.length).toBeGreaterThanOrEqual(24)
    expect(new Set(tools.map((t) => t.id)).size).toBe(tools.length)
  })

  it('每条都有合法分类、名称、简介、https 链接', () => {
    for (const t of tools) {
      expect(CATEGORIES).toContain(t.category)
      expect(t.name.length).toBeGreaterThan(0)
      expect(t.description.length).toBeGreaterThan(0)
      expect(t.url).toMatch(/^https:\/\//)
    }
  })

  it('恰好 8 个精选条目', () => {
    expect(tools.filter((t) => t.featured).length).toBe(8)
  })
})
```

- [ ] **Step 2: 运行确认失败**

```bash
cd "E:\LC\Documents\Kimi\Workspaces\绿洲AI主页\app"
npx vitest run
```

Expected: FAIL，`../src/lib/blog` / `../src/data/tools` 模块不存在。

- [ ] **Step 3: 实现 `app/src/types/content.ts`**

```ts
export const CATEGORIES = [
  '对话',
  '绘画',
  '视频',
  '音频',
  '编程',
  '办公效率',
  '搜索研究',
  '开源模型',
] as const

export type Category = (typeof CATEGORIES)[number]

export interface Tool {
  id: string
  name: string
  nameEn?: string
  description: string
  url: string
  category: Category
  featured: boolean
}

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  readingMinutes: number
}

export interface BlogPost extends BlogPostMeta {
  html: string
}
```

- [ ] **Step 4: 实现 `app/src/lib/blog.ts`**

```ts
import { marked } from 'marked'
import type { BlogPost, BlogPostMeta } from '../types/content'

export function parseFrontmatter(raw: string): {
  data: Record<string, unknown>
  body: string
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, body: raw }
  const data: Record<string, unknown> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/)
    if (!kv) continue
    const [, key, value] = kv
    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    } else {
      data[key] = value.trim()
    }
  }
  return { data, body: match[2] }
}

export function computeReadingMinutes(text: string): number {
  const chars = text.replace(/\s/g, '').length
  return Math.max(1, Math.ceil(chars / 400))
}

const modules = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export function loadPosts(): BlogPost[] {
  const posts: BlogPost[] = Object.entries(modules).map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '')
    const { data, body } = parseFrontmatter(raw)
    const meta: BlogPostMeta = {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? '1970-01-01'),
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      excerpt: String(data.excerpt ?? ''),
      readingMinutes: computeReadingMinutes(body),
    }
    return { ...meta, html: marked.parse(body, { async: false }) as string }
  })
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPost(slug: string): BlogPost | undefined {
  return loadPosts().find((p) => p.slug === slug)
}
```

- [ ] **Step 5: 实现 `app/src/data/tools.ts`**（约 28 条；featured 恰好 8 个：chatgpt、claude、kimi、midjourney、cursor、perplexity、jimeng、huggingface）

```ts
import type { Tool } from '../types/content'
export { CATEGORIES } from '../types/content'

export const tools: Tool[] = [
  // 对话
  { id: 'chatgpt', name: 'ChatGPT', description: 'OpenAI 的旗舰对话模型，生态最成熟的通用 AI 助手', url: 'https://chatgpt.com', category: '对话', featured: true },
  { id: 'claude', name: 'Claude', description: 'Anthropic 出品，长文本与写作质感著称', url: 'https://claude.ai', category: '对话', featured: true },
  { id: 'kimi', name: 'Kimi', description: '月之暗面出品，长上下文与中文体验出色', url: 'https://www.kimi.com', category: '对话', featured: true },
  { id: 'gemini', name: 'Gemini', description: 'Google 的多模态模型，与安卓/搜索深度整合', url: 'https://gemini.google.com', category: '对话', featured: false },
  { id: 'deepseek', name: 'DeepSeek', description: '国产开源模型之光，推理能力强且免费可用', url: 'https://chat.deepseek.com', category: '对话', featured: false },
  { id: 'doubao', name: '豆包', description: '字节跳动的 AI 助手，语音与多端体验完整', url: 'https://www.doubao.com', category: '对话', featured: false },
  { id: 'qwen', name: '通义千问', description: '阿里通义大模型，开源与商用双线并进', url: 'https://www.tongyi.com', category: '对话', featured: false },
  // 绘画
  { id: 'midjourney', name: 'Midjourney', description: '艺术感天花板的 AI 绘画工具，风格化能力极强', url: 'https://www.midjourney.com', category: '绘画', featured: true },
  { id: 'jimeng', name: '即梦', description: '字节跳动的一站式 AI 创作平台，中文提示词友好', url: 'https://jimeng.jianying.com', category: '绘画', featured: true },
  { id: 'sd', name: 'Stable Diffusion', description: '开源绘画模型生态，可本地部署、无限定制', url: 'https://stability.ai', category: '绘画', featured: false },
  { id: 'flux', name: 'FLUX', description: 'Black Forest Labs 的新一代文生图模型，细节惊人', url: 'https://blackforestlabs.ai', category: '绘画', featured: false },
  { id: 'ideogram', name: 'Ideogram', description: '以"图中文字渲染准确"出圈的绘画工具', url: 'https://ideogram.ai', category: '绘画', featured: false },
  { id: 'recraft', name: 'Recraft', description: '面向设计师的 AI 矢量与栅格图像生成', url: 'https://www.recraft.ai', category: '绘画', featured: false },
  // 视频
  { id: 'sora', name: 'Sora', description: 'OpenAI 的文生视频模型，物理一致性标杆', url: 'https://openai.com/sora', category: '视频', featured: false },
  { id: 'runway', name: 'Runway', description: 'AI 视频编辑与生成老牌强者，Gen 系列模型', url: 'https://runwayml.com', category: '视频', featured: false },
  { id: 'kling', name: '可灵', description: '快手出品的视频生成模型，长镜头表现优秀', url: 'https://klingai.com', category: '视频', featured: false },
  { id: 'pika', name: 'Pika', description: '玩法多样的 AI 视频工具，特效模板丰富', url: 'https://pika.art', category: '视频', featured: false },
  { id: 'veo', name: 'Veo', description: 'Google DeepMind 的视频生成模型', url: 'https://deepmind.google/technologies/veo', category: '视频', featured: false },
  // 音频
  { id: 'suno', name: 'Suno', description: '一句话生成完整歌曲，AI 音乐的现象级产品', url: 'https://suno.com', category: '音频', featured: false },
  { id: 'elevenlabs', name: 'ElevenLabs', description: '最自然的 AI 配音与声音克隆平台', url: 'https://elevenlabs.io', category: '音频', featured: false },
  { id: 'udio', name: 'Udio', description: 'Suno 的主要竞品，音乐细节见长', url: 'https://www.udio.com', category: '音频', featured: false },
  // 编程
  { id: 'cursor', name: 'Cursor', description: 'AI 原生代码编辑器，程序员的效率倍增器', url: 'https://www.cursor.com', category: '编程', featured: true },
  { id: 'copilot', name: 'GitHub Copilot', description: 'GitHub 官方的 AI 结对编程助手', url: 'https://github.com/features/copilot', category: '编程', featured: false },
  { id: 'trae', name: 'Trae', description: '字节跳动的 AI IDE，中文开发者友好', url: 'https://www.trae.ai', category: '编程', featured: false },
  { id: 'v0', name: 'v0', description: 'Vercel 出品的 UI 生成工具，一句话出界面', url: 'https://v0.dev', category: '编程', featured: false },
  // 办公效率
  { id: 'notion', name: 'Notion AI', description: '笔记 + AI 的一体化知识工作台', url: 'https://www.notion.com', category: '办公效率', featured: false },
  { id: 'gamma', name: 'Gamma', description: 'AI 一键生成 PPT/文档/网页，颜值在线', url: 'https://gamma.app', category: '办公效率', featured: false },
  { id: 'napkin', name: 'Napkin AI', description: '把文字一键变成信息图与示意图', url: 'https://www.napkin.ai', category: '办公效率', featured: false },
  // 搜索研究
  { id: 'perplexity', name: 'Perplexity', description: 'AI 答案引擎，带引用的实时联网搜索', url: 'https://www.perplexity.ai', category: '搜索研究', featured: true },
  { id: 'notebooklm', name: 'NotebookLM', description: 'Google 的文档研究助手，还能生成播客', url: 'https://notebooklm.google.com', category: '搜索研究', featured: false },
  // 开源模型
  { id: 'huggingface', name: 'Hugging Face', description: '开源模型与数据集的中心枢纽', url: 'https://huggingface.co', category: '开源模型', featured: true },
  { id: 'ollama', name: 'Ollama', description: '一条命令在本地跑开源大模型', url: 'https://ollama.com', category: '开源模型', featured: false },
]
```

- [ ] **Step 6: 运行确认通过 + 构建**

```bash
npx vitest run && npm run build
```

Expected: vitest 全部通过；build 成功。

- [ ] **Step 7: Commit**

```bash
git add app/src/types app/src/data app/src/lib app/tests
git commit -m "feat: 工具数据与博客加载器（内容层）"
```

---

### Task 4: 三篇启动博客文章

**Files:**
- Create: `app/src/content/blog/why-oasis.md`
- Create: `app/src/content/blog/ai-toolbox-2026.md`
- Create: `app/src/content/blog/learning-path.md`
- Test: `app/tests/posts-content.test.ts`

**Interfaces:**
- Consumes: `loadPosts()` from Task 3
- Produces: slug `why-oasis`、`ai-toolbox-2026`、`learning-path` 三篇文章可被 `loadPosts()` 收录

- [ ] **Step 1: 写失败测试 `app/tests/posts-content.test.ts`**

```ts
import { describe, it, expect } from 'vitest'
import { loadPosts } from '../src/lib/blog'

describe('启动文章', () => {
  it('收录 3 篇且按日期降序', () => {
    const posts = loadPosts()
    expect(posts.length).toBe(3)
    const slugs = posts.map((p) => p.slug)
    expect(slugs).toEqual(
      [...slugs].sort((a, b) => 0) // 占位防止误改，顺序断言在下一行
    )
    for (let i = 1; i < posts.length; i++) {
      expect(posts[i - 1].date >= posts[i].date).toBe(true)
    }
  })

  it('每篇有标题、摘要、标签和真实正文', () => {
    for (const p of loadPosts()) {
      expect(p.title.length).toBeGreaterThan(4)
      expect(p.excerpt.length).toBeGreaterThan(10)
      expect(p.tags.length).toBeGreaterThan(0)
      expect(p.html.length).toBeGreaterThan(500)
      expect(p.readingMinutes).toBeGreaterThanOrEqual(1)
    }
  })
})
```

- [ ] **Step 2: 运行确认失败**

```bash
cd "E:\LC\Documents\Kimi\Workspaces\绿洲AI主页\app"
npx vitest run tests/posts-content.test.ts
```

Expected: FAIL（`loadPosts()` 返回空数组，glob 目录为空）。

- [ ] **Step 3: 写三篇文章**（每篇 600–1000 字中文，口吻：第一人称、真诚、不端着；frontmatter 格式严格匹配 Task 3 解析器）

`app/src/content/blog/why-oasis.md`：

```markdown
---
title: 为什么我把这里叫作"绿洲"
date: 2026-08-05
tags: [随笔, 关于本站]
excerpt: AI 的信息洪流像一片沙漠，而我想在这里种一点真正属于自己的东西。
---

AI 行业每天产生的信息量是荒谬的。（正文展开：信息过载的感受 → 收藏夹里躺着的几百个链接 → 为什么决定建一个自己的站点而不是继续依赖算法推荐 → "绿洲"的隐喻：不是逃避沙漠，而是在里面找水 → 这个站的三块内容：导航是地图，博客是足迹，首页是营地。）
```

`app/src/content/blog/ai-toolbox-2026.md`：

```markdown
---
title: 我的 AI 工具箱 2026
date: 2026-08-04
tags: [工具, 效率]
excerpt: 从对话到绘画到编程，这是我目前每天真正在用的 AI 工具，以及它们各自擅长什么。
---

我的导航页里收录了三十多个工具，但真正高频使用的其实只有七八个。（正文展开：按"每天用/每周用/救急用"三档分类讲述真实使用场景 —— 对话类怎么选、写代码时 Cursor 与 Copilot 的分工、查资料为什么首选 Perplexity、画画为什么即梦和 Midjourney 都用 → 工具不在多，在于知道什么时候用哪个。）
```

`app/src/content/blog/learning-path.md`：

```markdown
---
title: 从爱好者到创作者：我的 AI 学习路线
date: 2026-08-03
tags: [学习, 成长]
excerpt: 不搞学术、不追论文，一个普通人把 AI 从"玩具"变成"工具"的实际路径。
---

很多人问我怎么开始学 AI，我的答案可能让人失望：先玩，再用，最后才造。（正文展开：第一阶段"玩"——大量试用工具建立直觉；第二阶段"用"——把 AI 嵌进日常 workflow，写作、查资料、写代码；第三阶段"造"——开始用 API 和开源模型做自己的小东西，比如这个网站本身 → 给同路人的三条建议：别囤课、动手做丑东西、公开记录。）
```

注：上述括号内为写作指引，实现时须展开为完整正文（每篇 600–1000 字，保持第一人称口吻），不得保留括号原文。

- [ ] **Step 4: 运行确认通过**

```bash
npx vitest run tests/posts-content.test.ts
```

Expected: PASS（3 篇收录、html 非空）。

- [ ] **Step 5: Commit**

```bash
git add app/src/content app/tests/posts-content.test.ts
git commit -m "content: 三篇启动博客文章"
```

---

### Task 5: Hero Canvas —— 深空绿洲场景

**Files:**
- Create: `app/src/components/canvas/OasisScene.tsx`
- Test: `app/tests/oasis-scene.test.tsx`

**Interfaces:**
- Produces: `<OasisScene className?: string />` —— 绝对定位铺满父容器的 `<canvas>`（`pointer-events: none`），自管理动画循环与 resize；`prefers-reduced-motion` 时渲染一帧静态画面后停止

**实现规格（一次写全，勿降级）：**
- 图层从远到近：① 星尘（200–280 颗，大小 0.4–1.6px，米白/沙金随机，按正弦相位闪烁，整体极缓上飘）② 翡翠极光光晕（绿洲位：`radialGradient`，中心 `rgba(61,245,166,0.32)` → 透明，半径随 `sin(t)` 在 ±8% 间"呼吸"）③ 沙丘剪影 3 层（近黑绿 `#0A0F0D`/`#070C0A`/`#050807`，用正弦叠加生成起伏曲线，不同视差系数）④ 流星（每 4–9 秒随机触发一颗，带渐隐尾迹，寿命约 1s）
- 鼠标视差：监听 `pointermove`，归一化坐标 `(-0.5..0.5)` 经 lerp 平滑（系数 0.04），星层位移系数 12px、极光 20px、沙丘 6/10/16px；无鼠标时缓慢自动漂移（`sin(t*0.1)`）
- DPR 适配：`canvas.width = clientWidth * devicePixelRatio`，`ctx.scale(dpr, dpr)`；`ResizeObserver` 重建
- 卸载时 `cancelAnimationFrame`、移除监听

- [ ] **Step 1: 冒烟测试 `app/tests/oasis-scene.test.tsx`**

```tsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import OasisScene from '../src/components/canvas/OasisScene'

describe('OasisScene', () => {
  it('渲染 canvas 且不崩溃', () => {
    const { container } = render(<OasisScene />)
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })
})
```

注：jsdom 无 Canvas 2D 上下文，组件内部须 `const ctx = canvas.getContext('2d'); if (!ctx) return` 防御。

- [ ] **Step 2: 运行确认失败**（组件不存在）

```bash
cd "E:\LC\Documents\Kimi\Workspaces\绿洲AI主页\app"
npx vitest run tests/oasis-scene.test.tsx
```

Expected: FAIL（模块不存在）。

- [ ] **Step 3: 实现 `OasisScene.tsx`**——按上方"实现规格"逐条实现，关键结构：

```tsx
import { useEffect, useRef } from 'react'

interface Star { x: number; y: number; r: number; phase: number; speed: number; gold: boolean }
interface Meteor { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }

export default function OasisScene({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let stars: Star[] = []
    let meteor: Meteor | null = null
    let nextMeteorAt = 0
    let raf = 0
    const mouse = { x: 0, y: 0 }       // 归一化 -0.5..0.5
    const smooth = { x: 0, y: 0 }      // lerp 后

    const rand = (a: number, b: number) => a + Math.random() * (b - a)

    function resize() {
      if (!canvas) return
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round((w * h) / 6500)
      stars = Array.from({ length: Math.min(280, Math.max(200, count)) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(0.4, 1.6),
        phase: rand(0, Math.PI * 2),
        speed: rand(0.02, 0.08),
        gold: Math.random() < 0.18,
      }))
    }

    function dunePath(baseY: number, amp: number, offset: number, px: number) {
      ctx!.beginPath()
      ctx!.moveTo(-50, h + 50)
      for (let x = -50; x <= w + 50; x += 8) {
        const y =
          baseY +
          Math.sin(x * 0.004 + offset) * amp +
          Math.sin(x * 0.011 + offset * 1.7) * amp * 0.4 +
          px
        ctx!.lineTo(x, y)
      }
      ctx!.lineTo(w + 50, h + 50)
      ctx!.closePath()
      ctx!.fill()
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, w, h)
      smooth.x += (mouse.x - smooth.x) * 0.04
      smooth.y += (mouse.y - smooth.y) * 0.04
      const drift = Math.sin(t * 0.0001) * 8
      const px = smooth.x + drift / w
      const py = smooth.y

      // ① 星尘
      for (const s of stars) {
        const tw = 0.45 + 0.55 * Math.sin(s.phase + t * 0.001 * s.speed * 30)
        const sx = s.x + px * 12
        const sy = ((s.y - t * s.speed * 0.02) % h + h) % h + py * 8
        ctx!.globalAlpha = tw
        ctx!.fillStyle = s.gold ? '#e0b869' : '#eceae5'
        ctx!.beginPath()
        ctx!.arc(sx, sy, s.r, 0, Math.PI * 2)
        ctx!.fill()
      }
      ctx!.globalAlpha = 1

      // ② 极光光晕（绿洲位：画面横向 50%、纵向 72%）
      const breathe = 1 + Math.sin(t * 0.0006) * 0.08
      const gx = w * 0.5 + px * 20
      const gy = h * 0.72 + py * 14
      const gr = Math.min(w, h) * 0.42 * breathe
      const glow = ctx!.createRadialGradient(gx, gy, 0, gx, gy, gr)
      glow.addColorStop(0, 'rgba(61,245,166,0.32)')
      glow.addColorStop(0.45, 'rgba(61,245,166,0.10)')
      glow.addColorStop(1, 'rgba(61,245,166,0)')
      ctx!.fillStyle = glow
      ctx!.fillRect(0, 0, w, h)

      // ③ 沙丘三层
      ctx!.fillStyle = '#0a0f0d'
      dunePath(h * 0.78, 26, 1.3, px * 6)
      ctx!.fillStyle = '#070c0a'
      dunePath(h * 0.86, 34, 4.1, px * 10)
      ctx!.fillStyle = '#050807'
      dunePath(h * 0.94, 42, 7.7, px * 16)

      // ④ 流星
      if (!meteor && t > nextMeteorAt) {
        const fromLeft = Math.random() < 0.5
        meteor = {
          x: fromLeft ? rand(0, w * 0.5) : rand(w * 0.5, w),
          y: rand(0, h * 0.3),
          vx: (fromLeft ? 1 : -1) * rand(4, 7),
          vy: rand(1.5, 3),
          life: 0,
          maxLife: 60,
        }
      }
      if (meteor) {
        meteor.life++
        meteor.x += meteor.vx
        meteor.y += meteor.vy
        const fade = 1 - meteor.life / meteor.maxLife
        const tail = 22
        const grad = ctx!.createLinearGradient(
          meteor.x, meteor.y,
          meteor.x - meteor.vx * tail, meteor.y - meteor.vy * tail
        )
        grad.addColorStop(0, `rgba(236,234,229,${0.9 * fade})`)
        grad.addColorStop(1, 'rgba(236,234,229,0)')
        ctx!.strokeStyle = grad
        ctx!.lineWidth = 1.4
        ctx!.beginPath()
        ctx!.moveTo(meteor.x, meteor.y)
        ctx!.lineTo(meteor.x - meteor.vx * tail, meteor.y - meteor.vy * tail)
        ctx!.stroke()
        if (meteor.life >= meteor.maxLife) {
          meteor = null
          nextMeteorAt = t + rand(4000, 9000)
        }
      }
    }

    function loop(t: number) {
      draw(t)
      raf = requestAnimationFrame(loop)
    }

    function onPointer(e: PointerEvent) {
      mouse.x = e.clientX / window.innerWidth - 0.5
      mouse.y = e.clientY / window.innerHeight - 0.5
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    if (reduced) {
      draw(0) // 静态一帧
    } else {
      nextMeteorAt = performance.now() + 2500
      raf = requestAnimationFrame(loop)
      window.addEventListener('pointermove', onPointer)
    }
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onPointer)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  )
}
```

- [ ] **Step 4: 运行确认通过 + 构建**

```bash
npx vitest run tests/oasis-scene.test.tsx && npm run build
```

Expected: PASS + build 成功。

- [ ] **Step 5: Commit**

```bash
git add app/src/components/canvas app/tests/oasis-scene.test.tsx
git commit -m "feat: Hero 深空绿洲 Canvas 场景（星尘/极光/沙丘/流星）"
```

---

### Task 6: 动效基座 —— Lenis / 遮罩揭示 / 磁性 / 十字光标 / Preloader

**Files:**
- Create: `app/src/hooks/useLenis.ts`
- Create: `app/src/components/motion/MaskReveal.tsx`
- Create: `app/src/components/motion/Magnetic.tsx`
- Create: `app/src/components/motion/Cursor.tsx`
- Create: `app/src/components/motion/Preloader.tsx`
- Test: `app/tests/motion.test.tsx`

**Interfaces:**
- Produces:
  - `useLenis(): void`（App 顶层调用一次）
  - `<MaskReveal delay?: number; as?: 'h1'|'h2'|'div'|'p'; className?; children>` —— 进入视口时文字从 `translateY(105%)` 滑入，缓动 `cubic-bezier(0.16,1,0.3,1)` 0.9s
  - `<Magnetic strength?: number; className?; children>` —— 鼠标靠近吸附，离开回弹
  - `<Cursor />` —— 全局十字光标，读取 `[data-cursor]` 属性显示上下文文字（如 `data-cursor="进入"`）；仅 `pointer: fine` 渲染
  - `<Preloader onDone: () => void />` —— 00%→100% 等宽体计数 + "LOCATING OASIS…"，完成后淡出并回调

- [ ] **Step 1: 冒烟测试 `app/tests/motion.test.tsx`**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MaskReveal from '../src/components/motion/MaskReveal'
import Magnetic from '../src/components/motion/Magnetic'
import Preloader from '../src/components/motion/Preloader'

describe('motion 组件', () => {
  it('MaskReveal 渲染子内容', () => {
    render(<MaskReveal>绿洲</MaskReveal>)
    expect(screen.getByText('绿洲')).toBeInTheDocument()
  })
  it('Magnetic 渲染子内容', () => {
    render(<Magnetic><button>进入</button></Magnetic>)
    expect(screen.getByText('进入')).toBeInTheDocument()
  })
  it('Preloader 显示 LOCATING OASIS', () => {
    render(<Preloader onDone={() => {}} />)
    expect(screen.getByText(/LOCATING OASIS/)).toBeInTheDocument()
  })
})
```

注：jsdom 无 GSAP ScrollTrigger 真实环境，`MaskReveal` 内须防御：`if (typeof window === 'undefined') return`，且 `IntersectionObserver` 不存在时降级为直接显示（`catch`/特性检测）；Preloader 用 `setInterval` 模拟计数，jsdom 可跑。

- [ ] **Step 2: 运行确认失败**

```bash
cd "E:\LC\Documents\Kimi\Workspaces\绿洲AI主页\app"
npx vitest run tests/motion.test.tsx
```

Expected: FAIL（模块不存在）。

- [ ] **Step 3: 实现 `app/src/hooks/useLenis.ts`**

```ts
import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])
}
```

- [ ] **Step 4: 实现 `MaskReveal.tsx`**

```tsx
import { useEffect, useRef, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
}

export default function MaskReveal({ children, delay = 0, className = '' }: Props) {
  const innerRef = useRef<HTMLSpanElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const inner = innerRef.current
    const box = boxRef.current
    if (!inner || !box) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      inner.style.transform = 'translateY(0%)'
      return
    }
    inner.style.transform = 'translateY(105%)'
    const show = () => {
      inner.style.transition = `transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`
      inner.style.transform = 'translateY(0%)'
    }
    if (!('IntersectionObserver' in window)) {
      show()
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          show()
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(box)
    return () => io.disconnect()
  }, [delay])

  return (
    <div ref={boxRef} className={`overflow-hidden ${className}`}>
      <span ref={innerRef} className="inline-block will-change-transform">
        {children}
      </span>
    </div>
  )
}
```

- [ ] **Step 5: 实现 `Magnetic.tsx`**

```tsx
import { useRef, type ReactNode, type PointerEvent } from 'react'

interface Props {
  children: ReactNode
  strength?: number
  className?: string
}

export default function Magnetic({ children, strength = 0.35, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    const rect = el.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    el.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
    el.style.transform = 'translate(0, 0)'
  }

  return (
    <div ref={ref} className={`inline-block ${className}`} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </div>
  )
}
```

- [ ] **Step 6: 实现 `Cursor.tsx`**

```tsx
import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const [enabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  )
  const rootRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (!enabled) return
    let raf = 0
    const pos = { x: -100, y: -100 }
    const smooth = { x: -100, y: -100 }
    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      const target = (e.target as HTMLElement)?.closest?.('[data-cursor]')
      setLabel(target ? target.getAttribute('data-cursor') ?? '' : '')
    }
    const loop = () => {
      smooth.x += (pos.x - smooth.x) * 0.18
      smooth.y += (pos.y - smooth.y) * 0.18
      const el = rootRef.current
      if (el) el.style.transform = `translate(${smooth.x}px, ${smooth.y}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <div ref={rootRef} className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference">
      <div className="relative flex h-10 w-10 items-center justify-center">
        <span className="absolute h-px w-6 bg-fg opacity-80" />
        <span className="absolute h-6 w-px bg-fg opacity-80" />
        {label && (
          <span className="absolute left-12 whitespace-nowrap font-mono2 text-[11px] uppercase tracking-widest text-fg">
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 7: 实现 `Preloader.tsx`**

```tsx
import { useEffect, useState } from 'react'

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setPct((p) => {
        const next = Math.min(100, p + Math.ceil(Math.random() * 9))
        if (next >= 100) clearInterval(timer)
        return next
      })
    }, 60)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (pct >= 100) {
      setLeaving(true)
      const t = setTimeout(onDone, 750)
      return () => clearTimeout(t)
    }
  }, [pct, onDone])

  return (
    <div
      className={`fixed inset-0 z-[110] flex flex-col items-center justify-center bg-bg transition-opacity duration-700 ${
        leaving ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      <div className="font-mono2 text-xs uppercase tracking-[0.35em] text-muted">
        Locating Oasis…
      </div>
      <div className="mt-4 font-mono2 text-6xl text-fg tabular-nums">
        {String(pct).padStart(2, '0')}%
      </div>
      <div className="mt-6 h-px w-40 bg-fg/10">
        <div
          className="h-px bg-oasis transition-[width] duration-150"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 8: 运行确认通过 + 构建**

```bash
npx vitest run tests/motion.test.tsx && npm run build
```

Expected: PASS + build 成功。

- [ ] **Step 9: Commit**

```bash
git add app/src/hooks app/src/components/motion app/tests/motion.test.tsx
git commit -m "feat: 动效基座（Lenis/遮罩揭示/磁性/十字光标/Preloader）"
```

---

### Task 7: 布局骨架 —— 编号导航 + 页脚 + 路由 + 页面转场

**Files:**
- Create: `app/src/components/layout/SiteHeader.tsx`
- Create: `app/src/components/layout/SiteFooter.tsx`
- Modify: `app/src/App.tsx`（替换脚手架默认内容）
- Create: `app/src/pages/Home.tsx`（占位，Task 8 充实）
- Create: `app/src/pages/NavPage.tsx`（占位，Task 9 充实）
- Create: `app/src/pages/BlogList.tsx`、`app/src/pages/BlogPost.tsx`（占位，Task 10 充实）
- Test: `app/tests/layout.test.tsx`

**Interfaces:**
- Produces:
  - `<SiteHeader />`：固定顶栏，左 `AI OASIS · AI绿洲`，右等宽体编号菜单 `01 首页 02 驿站 03 观测`（NavLink 激活态翡翠绿）；移动端汉堡全屏抽屉（framer-motion 滑入）
  - `<SiteFooter />`：marquee 灯带（`AI OASIS · 在数字沙漠里种一片绿洲 · ` 循环）+ GitHub 链接 `https://github.com/brian-lin-c` + `© 2026 AI绿洲`
  - App 路由：`/` `/nav` `/blog` `/blog/:slug`，`AnimatePresence` 擦除转场；`<Cursor />`、`<Preloader />`、`useLenis()` 挂载于 App

- [ ] **Step 1: 测试 `app/tests/layout.test.tsx`**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SiteHeader from '../src/components/layout/SiteHeader'
import SiteFooter from '../src/components/layout/SiteFooter'

describe('布局', () => {
  it('Header 含品牌与三个编号导航项', () => {
    render(<MemoryRouter><SiteHeader /></MemoryRouter>)
    expect(screen.getByText(/AI绿洲/)).toBeInTheDocument()
    expect(screen.getByText('首页')).toBeInTheDocument()
    expect(screen.getByText('驿站')).toBeInTheDocument()
    expect(screen.getByText('观测')).toBeInTheDocument()
  })
  it('Footer 含 GitHub 链接与版权', () => {
    render(<MemoryRouter><SiteFooter /></MemoryRouter>)
    const link = screen.getByRole('link', { name: /GitHub/i })
    expect(link).toHaveAttribute('href', 'https://github.com/brian-lin-c')
    expect(screen.getByText(/© 2026 AI绿洲/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: 运行确认失败**

```bash
cd "E:\LC\Documents\Kimi\Workspaces\绿洲AI主页\app"
npx vitest run tests/layout.test.tsx
```

Expected: FAIL（模块不存在）。

- [ ] **Step 3: 实现 `SiteHeader.tsx`**

```tsx
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Magnetic from '../motion/Magnetic'

const NAV = [
  { no: '01', zh: '首页', to: '/' },
  { no: '02', zh: '驿站', to: '/nav' },
  { no: '03', zh: '观测', to: '/blog' },
]

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `font-mono2 text-xs uppercase tracking-[0.25em] transition-colors duration-500 ${
      isActive ? 'text-oasis' : 'text-muted hover:text-fg'
    }`

  return (
    <header className="fixed inset-x-0 top-0 z-[80] flex items-center justify-between px-6 py-5 md:px-10">
      <Magnetic>
        <Link to="/" className="font-mono2 text-sm tracking-[0.2em] text-fg">
          AI OASIS <span className="text-muted">· AI绿洲</span>
        </Link>
      </Magnetic>

      <nav className="hidden items-center gap-8 md:flex">
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} className={linkCls} end={n.to === '/'}>
            <span className="mr-2 text-sand">{n.no}</span>
            {n.zh}
          </NavLink>
        ))}
      </nav>

      <button
        className="text-fg md:hidden"
        onClick={() => setOpen(true)}
        aria-label="打开菜单"
      >
        <Menu size={22} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[95] flex flex-col bg-bg/95 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex justify-end px-6 py-5">
              <button onClick={() => setOpen(false)} aria-label="关闭菜单" className="text-fg">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-10">
              {NAV.map((n, i) => (
                <motion.div
                  key={n.to}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.08 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={n.to}
                    end={n.to === '/'}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl text-fg"
                  >
                    <span className="mr-3 font-mono2 text-sm text-sand">{n.no}</span>
                    {n.zh}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
```

- [ ] **Step 4: 实现 `SiteFooter.tsx`**

```tsx
import { Github } from 'lucide-react'

const MARQUEE = 'AI OASIS · 在数字沙漠里种一片绿洲 · '

export default function SiteFooter() {
  return (
    <footer className="border-t border-fg/10">
      <div className="overflow-hidden border-b border-fg/10 py-4">
        <div className="flex w-max animate-[oasis-marquee_28s_linear_infinite] whitespace-nowrap font-mono2 text-xs uppercase tracking-[0.3em] text-muted">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className="pr-2">{MARQUEE}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row md:px-10">
        <span className="font-mono2 text-xs text-muted">© 2026 AI绿洲</span>
        <a
          href="https://github.com/brian-lin-c"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 font-mono2 text-xs uppercase tracking-[0.25em] text-muted transition-colors duration-500 hover:text-oasis"
        >
          <Github size={14} /> GitHub
        </a>
        <span className="font-mono2 text-xs uppercase tracking-[0.25em] text-sand">
          24.4°N · Oasis Station
        </span>
      </div>
    </footer>
  )
}
```

在 `app/src/index.css` 末尾追加 marquee keyframes：

```css
@keyframes oasis-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```

- [ ] **Step 5: 实现 `App.tsx`**（完整替换脚手架默认导出；pages 占位组件随本任务创建，内容写"建设中"占位 div 即可，Task 8–10 逐个替换）

```tsx
import { useState } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import SiteHeader from './components/layout/SiteHeader'
import SiteFooter from './components/layout/SiteFooter'
import Cursor from './components/motion/Cursor'
import Preloader from './components/motion/Preloader'
import { useLenis } from './hooks/useLenis'
import Home from './pages/Home'
import NavPage from './pages/NavPage'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/nav" element={<NavPage />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
        <SiteFooter />
      </motion.main>
    </AnimatePresence>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  useLenis()
  return (
    <HashRouter>
      <div className="grain-overlay min-h-screen bg-bg text-fg">
        {!loaded && <Preloader onDone={() => setLoaded(true)} />}
        <Cursor />
        <SiteHeader />
        <AnimatedRoutes />
      </div>
    </HashRouter>
  )
}
```

注：用 `HashRouter` 而非 `BrowserRouter`——静态托管（Vercel 静态站）下 HashRouter 无需配置 rewrite，/blog/:slug 刷新不会 404。占位 pages 示例（四个文件结构相同，换文案即可）：

```tsx
export default function Home() {
  return <div className="flex min-h-screen items-center justify-center font-mono2 text-muted">HOME · 建设中</div>
}
```

- [ ] **Step 6: 运行确认通过 + 构建**

```bash
npx vitest run && npm run build
```

Expected: 全部 PASS + build 成功。

- [ ] **Step 7: Commit**

```bash
git add app/src/components/layout app/src/pages app/src/App.tsx app/src/index.css app/tests/layout.test.tsx
git commit -m "feat: 布局骨架（编号导航/页脚灯带/路由/转场）"
```

---

### Task 8: 首页四区块（Hero / About / Stations / Writings）

**Files:**
- Create: `app/src/sections/home/HeroSection.tsx`
- Create: `app/src/sections/home/AboutSection.tsx`
- Create: `app/src/sections/home/StationsSection.tsx`
- Create: `app/src/sections/home/WritingsSection.tsx`
- Modify: `app/src/pages/Home.tsx`（替换占位）
- Test: `app/tests/home.test.tsx`

**Interfaces:**
- Consumes: `OasisScene`、`MaskReveal`、`Magnetic`、`tools`（取 `featured`）、`loadPosts()`（取前 3）
- Produces: 首页完整长滚动；区块标题组件约定：`<SectionHeading en="ABOUT" zh="关于这片绿洲" />`（定义在 `AboutSection.tsx` 内导出复用）

- [ ] **Step 1: 测试 `app/tests/home.test.tsx`**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from '../src/pages/Home'

describe('首页', () => {
  it('含 Hero 标语与四个区块', () => {
    render(<MemoryRouter><Home /></MemoryRouter>)
    expect(screen.getByText('AI OASIS')).toBeInTheDocument()
    expect(screen.getByText(/在数字沙漠里/)).toBeInTheDocument()
    expect(screen.getByText('关于这片绿洲')).toBeInTheDocument()
    expect(screen.getByText('绿洲驿站')).toBeInTheDocument()
    expect(screen.getByText('最新观测')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: 运行确认失败**（Home 为占位组件）

```bash
cd "E:\LC\Documents\Kimi\Workspaces\绿洲AI主页\app"
npx vitest run tests/home.test.tsx
```

Expected: FAIL。

- [ ] **Step 3: 实现 `HeroSection.tsx`**

```tsx
import OasisScene from '../../components/canvas/OasisScene'
import MaskReveal from '../../components/motion/MaskReveal'
import { ChevronDown } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden">
      <OasisScene />
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <MaskReveal delay={0.1}>
          <span className="font-mono2 text-[11px] uppercase tracking-[0.4em] text-sand">
            Personal Hub · Est. 2026
          </span>
        </MaskReveal>
        <h1 className="mt-6 font-display font-bold leading-none tracking-tight">
          <MaskReveal delay={0.25}>
            <span className="block text-[clamp(3.5rem,13vw,11rem)] text-fg">AI OASIS</span>
          </MaskReveal>
          <MaskReveal delay={0.4}>
            <span className="mt-2 block text-[clamp(1.4rem,4vw,2.6rem)] text-oasis">AI绿洲</span>
          </MaskReveal>
        </h1>
        <MaskReveal delay={0.6}>
          <p className="mt-8 max-w-[30em] text-base text-muted md:text-lg">
            在数字沙漠里，种一片自己的绿洲
          </p>
        </MaskReveal>
      </div>
      <div className="absolute bottom-8 z-10 flex flex-col items-center gap-2 text-muted">
        <span className="font-mono2 text-[10px] uppercase tracking-[0.35em]">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  )
}
```

- [ ] **Step 4: 实现 `AboutSection.tsx`**（含 SectionHeading 导出）

```tsx
import MaskReveal from '../../components/motion/MaskReveal'

export function SectionHeading({ en, zh }: { en: string; zh: string }) {
  return (
    <div className="mb-14 md:mb-20">
      <MaskReveal>
        <span className="font-mono2 text-[11px] uppercase tracking-[0.4em] text-sand">{en}</span>
      </MaskReveal>
      <MaskReveal delay={0.12}>
        <h2 className="mt-3 font-display text-[clamp(1.8rem,5vw,3.2rem)] font-bold text-fg">{zh}</h2>
      </MaskReveal>
    </div>
  )
}

export default function AboutSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-28 md:py-40">
      <SectionHeading en="About" zh="关于这片绿洲" />
      <MaskReveal delay={0.15}>
        <p className="max-w-[30em] text-lg leading-loose text-fg/90 md:text-xl">
          我是一名 AI 探索者，也是一个喜欢动手造的创作者。
        </p>
      </MaskReveal>
      <MaskReveal delay={0.28}>
        <p className="mt-8 max-w-[30em] leading-loose text-muted">
          这里是我的数字营地：导航页「驿站」是我沿路标记的水源——那些真正好用的
          AI 工具；博客「观测」是我的行进日志——学到的、想到的、做出来的。
          沙漠很大，但绿洲可以自己种。
        </p>
      </MaskReveal>
      <MaskReveal delay={0.4}>
        <div className="mt-12 flex gap-10 font-mono2 text-[11px] uppercase tracking-[0.3em] text-muted">
          <span>Explorer × Creator</span>
          <span className="text-sand">Since 2026</span>
        </div>
      </MaskReveal>
    </section>
  )
}
```

- [ ] **Step 5: 实现 `StationsSection.tsx`**

```tsx
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { tools } from '../../data/tools'
import { SectionHeading } from './AboutSection'
import MaskReveal from '../../components/motion/MaskReveal'
import Magnetic from '../../components/motion/Magnetic'

export default function StationsSection() {
  const featured = tools.filter((t) => t.featured)
  return (
    <section className="mx-auto max-w-6xl px-6 py-28 md:py-40">
      <SectionHeading en="Stations" zh="绿洲驿站" />
      <div className="grid gap-px overflow-hidden rounded-xl bg-fg/10 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((t, i) => (
          <MaskReveal key={t.id} delay={0.06 * i}>
            <a
              href={t.url}
              target="_blank"
              rel="noreferrer"
              data-cursor="进入"
              className="group flex h-full flex-col justify-between gap-8 bg-bg2 p-6 transition-colors duration-700 hover:bg-[#0d1512]"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono2 text-[10px] uppercase tracking-[0.3em] text-sand">
                  {t.category}
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-muted transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-oasis"
                />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-fg transition-colors duration-500 group-hover:text-oasis">
                  {t.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t.description}</p>
              </div>
            </a>
          </MaskReveal>
        ))}
      </div>
      <MaskReveal delay={0.2}>
        <div className="mt-12 text-center">
          <Magnetic>
            <Link
              to="/nav"
              data-cursor="查看全部"
              className="inline-block rounded-full border border-oasis/40 px-8 py-3 font-mono2 text-xs uppercase tracking-[0.3em] text-oasis transition-colors duration-500 hover:bg-oasis hover:text-bg"
            >
              全部驿站 →
            </Link>
          </Magnetic>
        </div>
      </MaskReveal>
    </section>
  )
}
```

- [ ] **Step 6: 实现 `WritingsSection.tsx`**

```tsx
import { Link } from 'react-router-dom'
import { loadPosts } from '../../lib/blog'
import { SectionHeading } from './AboutSection'
import MaskReveal from '../../components/motion/MaskReveal'
import Magnetic from '../../components/motion/Magnetic'

export default function WritingsSection() {
  const posts = loadPosts().slice(0, 3)
  return (
    <section className="mx-auto max-w-4xl px-6 py-28 md:py-40">
      <SectionHeading en="Writings" zh="最新观测" />
      <div className="divide-y divide-fg/10">
        {posts.map((p, i) => (
          <MaskReveal key={p.slug} delay={0.08 * i}>
            <Link
              to={`/blog/${p.slug}`}
              data-cursor="阅读"
              className="group flex flex-col gap-2 py-8 transition-colors md:flex-row md:items-baseline md:justify-between"
            >
              <div>
                <h3 className="font-display text-xl font-semibold text-fg transition-colors duration-500 group-hover:text-oasis md:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-[34em] text-sm leading-relaxed text-muted">{p.excerpt}</p>
              </div>
              <span className="shrink-0 font-mono2 text-[11px] uppercase tracking-[0.25em] text-sand">
                {p.date} · {p.readingMinutes} min
              </span>
            </Link>
          </MaskReveal>
        ))}
      </div>
      <MaskReveal delay={0.2}>
        <div className="mt-12 text-center">
          <Magnetic>
            <Link
              to="/blog"
              className="inline-block rounded-full border border-fg/20 px-8 py-3 font-mono2 text-xs uppercase tracking-[0.3em] text-fg transition-colors duration-500 hover:border-oasis hover:text-oasis"
            >
              全部观测 →
            </Link>
          </Magnetic>
        </div>
      </MaskReveal>
    </section>
  )
}
```

- [ ] **Step 7: 组装 `Home.tsx`**

```tsx
import HeroSection from '../sections/home/HeroSection'
import AboutSection from '../sections/home/AboutSection'
import StationsSection from '../sections/home/StationsSection'
import WritingsSection from '../sections/home/WritingsSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StationsSection />
      <WritingsSection />
    </>
  )
}
```

- [ ] **Step 8: 运行确认通过 + 构建**

```bash
npx vitest run && npm run build
```

Expected: 全部 PASS + build 成功。

- [ ] **Step 9: Commit**

```bash
git add app/src/sections app/src/pages/Home.tsx app/tests/home.test.tsx
git commit -m "feat: 首页四区块（Hero/About/驿站精选/观测精选）"
```

---

### Task 9: 导航页 `/nav` —— 筛选 + 搜索

**Files:**
- Create: `app/src/lib/filter-tools.ts`（纯函数，便于测试）
- Modify: `app/src/pages/NavPage.tsx`（替换占位）
- Test: `app/tests/nav.test.tsx`、`app/tests/filter-tools.test.ts`

**Interfaces:**
- Produces: `filterTools(tools: Tool[], category: Category | '全部', query: string): Tool[]`（名称/简介/英文名不区分大小写匹配）

- [ ] **Step 1: 测试 `app/tests/filter-tools.test.ts`**

```ts
import { describe, it, expect } from 'vitest'
import { filterTools } from '../src/lib/filter-tools'
import { tools } from '../src/data/tools'

describe('filterTools', () => {
  it('全部 + 空查询 = 全量', () => {
    expect(filterTools(tools, '全部', '')).toHaveLength(tools.length)
  })
  it('按分类过滤', () => {
    const r = filterTools(tools, '绘画', '')
    expect(r.length).toBeGreaterThan(0)
    expect(r.every((t) => t.category === '绘画')).toBe(true)
  })
  it('按关键词匹配名称与简介（大小写不敏感）', () => {
    const r = filterTools(tools, '全部', 'cursor')
    expect(r.some((t) => t.id === 'cursor')).toBe(true)
  })
  it('分类与关键词叠加', () => {
    const r = filterTools(tools, '对话', 'deepseek')
    expect(r).toHaveLength(1)
    expect(r[0].id).toBe('deepseek')
  })
  it('无命中返回空数组', () => {
    expect(filterTools(tools, '全部', '不存在的工具xyz')).toHaveLength(0)
  })
})
```

`app/tests/nav.test.tsx`：

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NavPage from '../src/pages/NavPage'

describe('导航页', () => {
  it('渲染全部工具与分类按钮', () => {
    render(<MemoryRouter><NavPage /></MemoryRouter>)
    expect(screen.getByText('全部')).toBeInTheDocument()
    expect(screen.getByText('绿洲驿站')).toBeInTheDocument()
    expect(screen.getAllByRole('link').length).toBeGreaterThanOrEqual(24)
  })
})
```

- [ ] **Step 2: 运行确认失败**

```bash
cd "E:\LC\Documents\Kimi\Workspaces\绿洲AI主页\app"
npx vitest run tests/filter-tools.test.ts tests/nav.test.tsx
```

Expected: FAIL（`filter-tools` 不存在）。

- [ ] **Step 3: 实现 `app/src/lib/filter-tools.ts`**

```ts
import type { Tool, Category } from '../types/content'

export function filterTools(
  list: Tool[],
  category: Category | '全部',
  query: string
): Tool[] {
  const q = query.trim().toLowerCase()
  return list.filter((t) => {
    if (category !== '全部' && t.category !== category) return false
    if (!q) return true
    return [t.name, t.nameEn ?? '', t.description]
      .join(' ')
      .toLowerCase()
      .includes(q)
  })
}
```

- [ ] **Step 4: 实现 `NavPage.tsx`**

```tsx
import { useMemo, useState } from 'react'
import { ArrowUpRight, Search } from 'lucide-react'
import { tools } from '../data/tools'
import { CATEGORIES, type Category } from '../types/content'
import { filterTools } from '../lib/filter-tools'
import MaskReveal from '../components/motion/MaskReveal'

export default function NavPage() {
  const [category, setCategory] = useState<Category | '全部'>('全部')
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => filterTools(tools, category, query), [category, query])

  return (
    <div className="mx-auto max-w-6xl px-6 pb-32 pt-32 md:pt-40">
      <MaskReveal>
        <span className="font-mono2 text-[11px] uppercase tracking-[0.4em] text-sand">Stations</span>
      </MaskReveal>
      <MaskReveal delay={0.12}>
        <h1 className="mt-3 font-display text-[clamp(2rem,6vw,3.5rem)] font-bold text-fg">绿洲驿站</h1>
      </MaskReveal>
      <MaskReveal delay={0.2}>
        <p className="mt-4 max-w-[30em] text-muted">
          沿路标记的水源——{tools.length} 个真正好用的 AI 工具，持续更新。
        </p>
      </MaskReveal>

      <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {(['全部', ...CATEGORIES] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-4 py-1.5 font-mono2 text-xs tracking-[0.2em] transition-colors duration-500 ${
                category === c
                  ? 'border-oasis bg-oasis text-bg'
                  : 'border-fg/15 text-muted hover:border-oasis/50 hover:text-fg'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 border-b border-fg/15 pb-2 md:w-64">
          <Search size={16} className="shrink-0 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索工具…"
            className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-muted"
          />
        </label>
      </div>

      <div className="mt-12 grid gap-px overflow-hidden rounded-xl bg-fg/10 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <a
            key={t.id}
            href={t.url}
            target="_blank"
            rel="noreferrer"
            data-cursor="进入"
            className="group flex h-full flex-col justify-between gap-8 bg-bg2 p-6 transition-colors duration-700 hover:bg-[#0d1512]"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono2 text-[10px] uppercase tracking-[0.3em] text-sand">
                {t.category}
                {t.featured && <span className="ml-2 text-oasis">· 精选</span>}
              </span>
              <ArrowUpRight
                size={16}
                className="text-muted transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-oasis"
              />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-fg transition-colors duration-500 group-hover:text-oasis">
                {t.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.description}</p>
            </div>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center font-mono2 text-sm text-muted">
          这片沙漠暂时没有水源，换个关键词试试。
        </p>
      )}
    </div>
  )
}
```

- [ ] **Step 5: 运行确认通过 + 构建**

```bash
npx vitest run && npm run build
```

Expected: 全部 PASS + build 成功。

- [ ] **Step 6: Commit**

```bash
git add app/src/lib/filter-tools.ts app/src/pages/NavPage.tsx app/tests/filter-tools.test.ts app/tests/nav.test.tsx
git commit -m "feat: 导航页（分类筛选 + 关键词搜索）"
```

---

### Task 10: 博客列表与文章详情

**Files:**
- Modify: `app/src/pages/BlogList.tsx`、`app/src/pages/BlogPost.tsx`（替换占位）
- Test: `app/tests/blog-pages.test.tsx`

**Interfaces:**
- Consumes: `loadPosts()`、`getPost(slug)` from Task 3

- [ ] **Step 1: 测试 `app/tests/blog-pages.test.tsx`**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import BlogList from '../src/pages/BlogList'
import BlogPost from '../src/pages/BlogPost'

describe('博客页', () => {
  it('列表页显示 3 篇文章标题', () => {
    render(<MemoryRouter><BlogList /></MemoryRouter>)
    expect(screen.getByText(/我的 AI 工具箱/)).toBeInTheDocument()
    expect(screen.getByText(/为什么我把这里叫作/)).toBeInTheDocument()
    expect(screen.getByText(/从爱好者到创作者/)).toBeInTheDocument()
  })

  it('详情页渲染文章正文', () => {
    render(
      <MemoryRouter initialEntries={['/blog/why-oasis']}>
        <Routes>
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByText(/为什么我把这里叫作/)).toBeInTheDocument()
  })

  it('未知 slug 显示 404 提示', () => {
    render(
      <MemoryRouter initialEntries={['/blog/not-exist']}>
        <Routes>
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByText(/迷失在沙漠里/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: 运行确认失败**

```bash
cd "E:\LC\Documents\Kimi\Workspaces\绿洲AI主页\app"
npx vitest run tests/blog-pages.test.tsx
```

Expected: FAIL（占位组件无对应文案）。

- [ ] **Step 3: 实现 `BlogList.tsx`**

```tsx
import { Link } from 'react-router-dom'
import { loadPosts } from '../lib/blog'
import MaskReveal from '../components/motion/MaskReveal'

export default function BlogList() {
  const posts = loadPosts()
  return (
    <div className="mx-auto max-w-4xl px-6 pb-32 pt-32 md:pt-40">
      <MaskReveal>
        <span className="font-mono2 text-[11px] uppercase tracking-[0.4em] text-sand">Writings</span>
      </MaskReveal>
      <MaskReveal delay={0.12}>
        <h1 className="mt-3 font-display text-[clamp(2rem,6vw,3.5rem)] font-bold text-fg">观测日志</h1>
      </MaskReveal>
      <div className="mt-14 divide-y divide-fg/10">
        {posts.map((p, i) => (
          <MaskReveal key={p.slug} delay={0.08 * i}>
            <Link
              to={`/blog/${p.slug}`}
              data-cursor="阅读"
              className="group flex flex-col gap-3 py-10 md:flex-row md:items-baseline md:justify-between"
            >
              <div>
                <div className="flex gap-3 font-mono2 text-[10px] uppercase tracking-[0.25em] text-oasis">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <h2 className="mt-3 font-display text-2xl font-semibold text-fg transition-colors duration-500 group-hover:text-oasis">
                  {p.title}
                </h2>
                <p className="mt-3 max-w-[34em] text-sm leading-relaxed text-muted">{p.excerpt}</p>
              </div>
              <span className="shrink-0 font-mono2 text-[11px] tracking-[0.25em] text-sand">
                {p.date} · {p.readingMinutes} min
              </span>
            </Link>
          </MaskReveal>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: 实现 `BlogPost.tsx`**

```tsx
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getPost } from '../lib/blog'
import MaskReveal from '../components/motion/MaskReveal'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPost(slug) : undefined

  if (!post) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 pt-24 text-center">
        <p className="font-mono2 text-sm text-muted">迷失在沙漠里 · 404</p>
        <Link to="/blog" className="font-mono2 text-xs uppercase tracking-[0.3em] text-oasis">
          ← 返回观测日志
        </Link>
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-2xl px-6 pb-32 pt-32 md:pt-40">
      <MaskReveal>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 font-mono2 text-xs uppercase tracking-[0.3em] text-muted transition-colors duration-500 hover:text-oasis"
        >
          <ArrowLeft size={14} /> 观测日志
        </Link>
      </MaskReveal>
      <MaskReveal delay={0.1}>
        <h1 className="mt-8 font-display text-[clamp(1.8rem,5vw,3rem)] font-bold leading-tight text-fg">
          {post.title}
        </h1>
      </MaskReveal>
      <MaskReveal delay={0.2}>
        <div className="mt-6 flex flex-wrap items-center gap-4 font-mono2 text-[11px] uppercase tracking-[0.25em] text-muted">
          <span className="text-sand">{post.date}</span>
          <span>{post.readingMinutes} min read</span>
          {post.tags.map((t) => (
            <span key={t} className="text-oasis">{t}</span>
          ))}
        </div>
      </MaskReveal>
      <div
        className="prose-oasis mt-12 max-w-[32em]"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  )
}
```

注：正文来自本站自有 Markdown 文件，非用户输入，`dangerouslySetInnerHTML` 无 XSS 面。

- [ ] **Step 5: 运行确认通过 + 构建**

```bash
npx vitest run && npm run build
```

Expected: 全部 PASS + build 成功。

- [ ] **Step 6: Commit**

```bash
git add app/src/pages/BlogList.tsx app/src/pages/BlogPost.tsx app/tests/blog-pages.test.tsx
git commit -m "feat: 博客列表与文章详情页"
```

---

### Task 11: 集成验收与预览

**Files:**
- Modify: 视检查结果修补

- [ ] **Step 1: 全量检查**

```bash
cd "E:\LC\Documents\Kimi\Workspaces\绿洲AI主页\app"
npx vitest run
npm run build
```

Expected: 测试全过；build 成功且产物在 `dist/`。

- [ ] **Step 2: 视觉走查**（临时启动 dev server 验证后立即停止）

```bash
cd "E:\LC\Documents\Kimi\Workspaces\绿洲AI主页\app"
npm run dev -- --port 5199 &
sleep 4
curl -s http://localhost:5199/ | head -20
kill %1
```

对照规格 §8 验收要点逐项检查：Hero 星场/极光/沙丘/流星工作；Preloader 计数后擦除；四路由可达；筛选/搜索可用；文章渲染；中文无字体穿帮；无蓝紫渐变/emoji 图标/卡片套卡片。

- [ ] **Step 3: 修复走查发现的问题并 Commit**

```bash
cd "E:\LC\Documents\Kimi\Workspaces\绿洲AI主页"
git add -A
git commit -m "polish: 集成验收修复"
```

---

## Self-Review 结论

- **Spec coverage**：视觉系统 → Task 2；四类页面 → Task 7-10；动效系统 → Task 5-6；放大器（极端字号/缓动/磁性/排版）→ Task 2/6/8；内容（30 工具/3 文章）→ Task 3/4；验收要点 → Task 11。Vercel 部署不在本计划内（规格 §7 列为后续）。
- **类型一致性**：`Tool/BlogPost/BlogPostMeta/Category`、`loadPosts/getPost/filterTools`、各 motion 组件 props 在消费任务中均与定义一致。
- **已知留白**：Task 4 Step 3 的文章正文以写作指引形式给出，执行时须按指引扩写为 600–1000 字全文（属内容创作，非代码占位）。
