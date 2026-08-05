import { useLayoutEffect, useRef, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
}

export default function MaskReveal({ children, delay = 0, className = '' }: Props) {
  const innerRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const inner = innerRef.current
    const box = boxRef.current
    if (!inner || !box) return
    if (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      inner.style.transform = 'translateY(0%)'
      box.style.overflow = 'visible'
      return
    }
    inner.style.transform = 'translateY(105%)'
    const show = () => {
      inner.style.transition = `transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`
      inner.style.transform = 'translateY(0%)'
      // 揭幕动画结束后放开裁切，避免悬停位移/光晕被 overflow-hidden 裁掉
      const release = () => {
        box.style.overflow = 'visible'
        inner.style.willChange = 'auto'
      }
      inner.addEventListener('transitionend', release, { once: true })
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
      <div ref={innerRef} className="will-change-transform">
        {children}
      </div>
    </div>
  )
}
