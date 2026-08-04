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
