import { useEffect, useRef, useState } from 'react'

/** 夜间光标微光：像提着小灯在星野里走。
 *  仅 dark 主题 + 精细指针（鼠标）+ 非减弱动态时渲染；lerp 跟随保证丝滑。 */
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (reduced || !finePointer) return

    const sync = () =>
      setEnabled(document.documentElement.dataset.theme !== 'light')
    sync()
    const onTheme = () => sync()
    window.addEventListener('oasis-theme', onTheme)
    return () => window.removeEventListener('oasis-theme', onTheme)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!enabled || !el) return

    const target = { x: window.innerWidth / 2, y: window.innerHeight * 0.4 }
    const pos = { ...target }
    let raf = 0

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX
      target.y = e.clientY
    }
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.12
      pos.y += (target.y - pos.y) * 0.12
      el.style.background = `radial-gradient(34rem circle at ${pos.x}px ${pos.y}px, rgba(45,212,191,0.07), rgba(45,212,191,0.025) 42%, transparent 68%)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-700"
    />
  )
}
