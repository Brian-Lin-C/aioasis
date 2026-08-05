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
