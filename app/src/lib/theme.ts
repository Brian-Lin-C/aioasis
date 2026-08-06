export type Theme = 'dark' | 'light'

import { celestialPosition } from '../components/canvas/celestial'

const KEY = 'oasis-theme'

export function getTheme(): Theme {
  try {
    const saved = localStorage.getItem(KEY)
    return saved === 'light' || saved === 'dark' ? saved : 'light'
  } catch {
    return 'light'
  }
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    /* 隐私模式下忽略 */
  }
  window.dispatchEvent(new CustomEvent<Theme>('oasis-theme', { detail: theme }))
}

/** 场景里太阳/月亮的视口坐标（随真实时间沿弧带移动，与 OasisScene 绘制共用同一函数）。
 *  场景不存在或已滚出视口时返回 null，调用方回退到按钮中心。 */
export function celestialPoint(): { x: number; y: number } | null {
  const c = document.querySelector<HTMLCanvasElement>('canvas[data-oasis-scene]')
  if (!c) return null
  const r = c.getBoundingClientRect()
  if (r.width === 0 || r.height === 0) return null
  const isDay = document.documentElement.dataset.theme === 'light'
  const cp = celestialPosition(r.width, r.height, isDay)
  const x = r.left + cp.x
  const y = r.top + cp.y
  if (y < -40 || y > window.innerHeight + 40 || x < -40 || x > window.innerWidth + 40) return null
  return { x, y }
}

/** 圆形涟漪切换：纯 DOM 遮盖层方案（不用 View Transitions）。
 *  原因：小数 DPR（如 175% 显示缩放）下 Chrome 渲染 VT 根快照会出现坐标映射 bug——
 *  传给 clip-path 的原点是对的，画出来却整体错位。遮盖层走普通 CSS 像素，任何环境都准。
 *  原理：apply() 瞬间切到新主题 → 全屏盖一层旧主题底色 → 从 (x,y) 烫出渐大的圆洞露出新世界。 */
export function transitionTheme(x: number, y: number, apply: () => void) {
  const reduced =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    apply()
    return
  }

  const oldBg = getComputedStyle(document.body).backgroundColor
  apply() // 页面立即变新主题，被遮盖层挡在下面

  const overlay = document.createElement('div')
  overlay.setAttribute('aria-hidden', 'true')
  overlay.style.cssText = `position:fixed;inset:0;z-index:2147483647;pointer-events:none;background:${oldBg};`
  document.body.appendChild(overlay)

  const R =
    Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) * 1.1
  const DURATION = 650
  const t0 = performance.now()
  const ease = (k: number) => 1 - Math.pow(1 - k, 3)

  const frame = (now: number) => {
    const k = Math.min(1, (now - t0) / DURATION)
    const r = Math.max(0, R * ease(k))
    const m =
      r < 0.5
        ? 'none'
        : `radial-gradient(circle ${r}px at ${x}px ${y}px, transparent 99%, black 100%)`
    overlay.style.webkitMaskImage = m
    overlay.style.maskImage = m
    if (k < 1) requestAnimationFrame(frame)
    else overlay.remove()
  }
  requestAnimationFrame(frame)
}
