# 小游戏接入 AI绿洲（aioasis.top）说明书

> 这份文件是给负责开发小游戏的 Agent 看的接入规范。照做即可无缝融入本站。
> 有任何一条做不到，先在交付说明里写明，不要静默绕开。

## 0. 一句话背景

本站是一个 Vite + React 19 单页应用（SPA），静态部署在 Vercel，**没有后端**。
你要交付的小游戏会成为站点的一个页面（如 `/game`）或首页的一个区块。

## 1. 技术栈（必须遵守）

- **React 19 + TypeScript（strict）**：函数组件 + hooks，禁止 `any` 泛滥、禁止类组件
- **Tailwind CSS**：样式优先用 Tailwind 类；自定义 CSS 仅在必要时添加
- **framer-motion** 已在依赖中，需要动画可以直接用
- 路由是 **HashRouter**（URL 形如 `aioasis.top/#/game`），页面跳转用 `react-router-dom` 的 `<Link>`，不要用 `<a href>` 做站内跳转
- **不要引入大型游戏引擎**（phaser、three.js 等）。原生 Canvas 2D 或 DOM/CSS 足够。确实需要新依赖时，先说明理由

## 2. 交付形态

- 代码放在 `app/src/pages/GamePage.tsx`（或 `app/src/components/game/` 目录）
- 默认导出页面组件；**路由和导航由站长注册**（你也可以顺手在 `App.tsx` 的 `<Routes>` 里加 `<Route path="/game" element={<GamePage />} />`）
- 主 bundle 已超 500KB。游戏代码/资源较大时，用 `React.lazy` 分包，避免拖慢全站首屏

## 3. 日/夜双主题兼容（本站最容易翻车的点）

本站有日/夜主题切换，**禁止硬编码任何颜色**（`#000`、`white`、`rgb(...)` 都不行）。

- DOM/Tailwind：用语义类——`bg-bg`、`text-fg`、`text-muted`、`text-oasis`（主强调色）、`text-sand`（次强调色）、`border-fg/10`、`glass`（毛玻璃卡片）、`glass-hover`
- Canvas 绘制：颜色从 CSS 变量读，并监听主题事件实时换色：

```ts
const css = getComputedStyle(document.documentElement)
const fg = css.getPropertyValue('--fg').trim()      // 前景色
const oasis = css.getPropertyValue('--oasis').trim() // 主强调色
const sand = css.getPropertyValue('--sand').trim()   // 次强调色
const bg = css.getPropertyValue('--bg').trim()       // 背景色

// 主题切换时会广播这个事件，游戏必须重绘
useEffect(() => {
  const onTheme = () => { /* 重新读变量并重绘 */ }
  window.addEventListener('oasis-theme', onTheme)
  return () => window.removeEventListener('oasis-theme', onTheme)
}, [])
```

- 主题状态在 `document.documentElement.dataset.theme`（`'light' | 'dark'`）

## 4. 工程纪律

- **资源清理**：`requestAnimationFrame`、`setInterval`、事件监听器，全部在 `useEffect` 的 cleanup 里取消/移除（页面是 SPA，组件卸载后泄漏的 RAF 会一直在后台跑）
- **尊重 `prefers-reduced-motion`**：用户系统开了减弱动效时，非必要动画要关闭（参考站内 `MaskReveal` 的写法）
- **localStorage 键名必须加 `oasis-` 前缀**（如 `oasis-game-highscore`），读写都包 `try/catch`（隐私模式会抛异常）
- **移动端必须可玩**：支持触摸操作，不依赖 hover；布局自适应窄屏（站内页面容器约定：`mx-auto max-w-4xl px-6 pb-32 pt-32 md:pt-40`）
- **站内滚动由 Lenis 平滑滚动接管**：如果游戏有自己的滚动区域或需要拦截 wheel/touchmove，给该容器加 `data-lenis-prevent` 属性
- 文案**中文为主**，标题可以中英混排（站内风格：中文大标题 + 英文小标，如 `绿洲游戏厅` / `ARCADE`）

## 5. 视觉规范（融入而不是突兀）

- 字体类：标题用 `font-display`，标签/徽章用 `font-mono2`（等宽，配 `uppercase tracking-[0.xem]`）
- 卡片/面板用 `glass rounded-2xl`，hover 加 `glass-hover`
- 页面顶部结构参考其他页面：英文小标（`font-mono2 text-[11px] uppercase tracking-[0.4em] text-sand`）→ 中文大标题（`font-display text-[clamp(2rem,6vw,3.5rem)] font-bold`）→ 一段 `text-muted` 简介
- 不要用站外图片/字体/CDN 资源（国内可直连原则）；视觉元素优先 SVG / CSS / Canvas 自绘

## 6. 验收清单（交付前自检）

- [ ] `npm run build` 通过（在 `app/` 目录下执行）
- [ ] `npx vitest run` 全绿（现有 39 个用例不能挂；注意 jsdom 不支持 canvas `getContext`，如果新测试要渲染游戏页面，需 mock canvas 或只测逻辑层）
- [ ] 日/夜主题切换后游戏颜色立即正确变化
- [ ] 手机上能玩（Chrome DevTools 设备模拟过一遍）
- [ ] 组件卸载后无 RAF/定时器/监听器残留
- [ ] 无硬编码颜色、无站外资源请求
