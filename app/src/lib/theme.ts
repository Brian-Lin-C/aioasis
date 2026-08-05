export type Theme = 'dark' | 'light'

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

/** 场景里太阳/月亮的视口坐标（画布横向 88%、纵向 18% 处，与 OasisScene 绘制一致）。
 *  场景不存在或已滚出视口时返回 null，调用方回退到按钮中心。 */
export function celestialPoint(): { x: number; y: number } | null {
  const c = document.querySelector<HTMLCanvasElement>('canvas[data-oasis-scene]')
  if (!c) return null
  const r = c.getBoundingClientRect()
  if (r.width === 0 || r.height === 0) return null
  const x = r.left + r.width * 0.88
  const y = r.top + r.height * 0.18
  if (y < -40 || y > window.innerHeight + 40 || x < -40 || x > window.innerWidth + 40) return null
  return { x, y }
}

/** 从点击位置荡开的圆形涟漪切换；不支持的浏览器/减弱动态时直接切换 */
export function transitionTheme(x: number, y: number, apply: () => void) {
  const reduced =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const startVT = (document as Document & {
    startViewTransition?: (cb: () => void) => { ready: Promise<void> }
  }).startViewTransition

  if (!startVT || reduced) {
    apply()
    return
  }

  const vt = startVT.call(document, apply)
  vt.ready
    .then(() => {
      // 半径加 20% 过冲 + 平缓收尾的缓动：避免最远处角落残留细边在快照销毁时跳变
      const r =
        Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) * 1.2
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`],
        },
        {
          duration: 650,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      )
    })
    .catch(() => {})
}
