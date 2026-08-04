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
    if (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
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
