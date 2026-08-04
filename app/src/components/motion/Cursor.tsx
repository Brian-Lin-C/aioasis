import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(pointer: fine)').matches
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
