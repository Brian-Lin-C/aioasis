import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance: Lenis | null = null

export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate: true })
  }
  window.scrollTo(0, 0)
}

/** 锁定/解锁全站滚动（抽屉、弹层打开时用）：同时停掉 Lenis 与原生滚动 */
export function setScrollLocked(locked: boolean) {
  if (locked) {
    lenisInstance?.stop()
    document.body.style.overflow = 'hidden'
  } else {
    lenisInstance?.start()
    document.body.style.overflow = ''
  }
}

export function useLenis() {
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    lenisInstance = lenis
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}
