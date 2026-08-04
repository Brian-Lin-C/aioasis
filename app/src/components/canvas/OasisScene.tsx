import { useEffect, useRef } from 'react'

interface Star { x: number; y: number; r: number; phase: number; speed: number; gold: boolean }
interface Meteor { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }

export default function OasisScene({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let stars: Star[] = []
    let meteor: Meteor | null = null
    let nextMeteorAt = 0
    let raf = 0
    const mouse = { x: 0, y: 0 }       // 归一化 -0.5..0.5
    const smooth = { x: 0, y: 0 }      // lerp 后

    const rand = (a: number, b: number) => a + Math.random() * (b - a)

    function resize() {
      if (!canvas) return
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round((w * h) / 6500)
      stars = Array.from({ length: Math.min(280, Math.max(200, count)) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(0.4, 1.6),
        phase: rand(0, Math.PI * 2),
        speed: rand(0.02, 0.08),
        gold: Math.random() < 0.18,
      }))
    }

    function dunePath(baseY: number, amp: number, offset: number, px: number) {
      ctx!.beginPath()
      ctx!.moveTo(-50, h + 50)
      for (let x = -50; x <= w + 50; x += 8) {
        const y =
          baseY +
          Math.sin(x * 0.004 + offset) * amp +
          Math.sin(x * 0.011 + offset * 1.7) * amp * 0.4 +
          px
        ctx!.lineTo(x, y)
      }
      ctx!.lineTo(w + 50, h + 50)
      ctx!.closePath()
      ctx!.fill()
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, w, h)
      smooth.x += (mouse.x - smooth.x) * 0.04
      smooth.y += (mouse.y - smooth.y) * 0.04
      const drift = Math.sin(t * 0.0001) * 8
      const px = smooth.x + drift / w
      const py = smooth.y

      // ① 星尘
      for (const s of stars) {
        const tw = 0.45 + 0.55 * Math.sin(s.phase + t * 0.001 * s.speed * 30)
        const sx = s.x + px * 12
        const sy = ((s.y - t * s.speed * 0.02) % h + h) % h + py * 8
        ctx!.globalAlpha = tw
        ctx!.fillStyle = s.gold ? '#e0b869' : '#eceae5'
        ctx!.beginPath()
        ctx!.arc(sx, sy, s.r, 0, Math.PI * 2)
        ctx!.fill()
      }
      ctx!.globalAlpha = 1

      // ② 极光光晕（绿洲位：画面横向 50%、纵向 72%）
      const breathe = 1 + Math.sin(t * 0.0006) * 0.08
      const gx = w * 0.5 + px * 20
      const gy = h * 0.72 + py * 14
      const gr = Math.min(w, h) * 0.42 * breathe
      const glow = ctx!.createRadialGradient(gx, gy, 0, gx, gy, gr)
      glow.addColorStop(0, 'rgba(61,245,166,0.32)')
      glow.addColorStop(0.45, 'rgba(61,245,166,0.10)')
      glow.addColorStop(1, 'rgba(61,245,166,0)')
      ctx!.fillStyle = glow
      ctx!.fillRect(0, 0, w, h)

      // ③ 沙丘三层
      ctx!.fillStyle = '#0a0f0d'
      dunePath(h * 0.78, 26, 1.3, px * 6)
      ctx!.fillStyle = '#070c0a'
      dunePath(h * 0.86, 34, 4.1, px * 10)
      ctx!.fillStyle = '#050807'
      dunePath(h * 0.94, 42, 7.7, px * 16)

      // ④ 流星
      if (!meteor && t > nextMeteorAt) {
        const fromLeft = Math.random() < 0.5
        meteor = {
          x: fromLeft ? rand(0, w * 0.5) : rand(w * 0.5, w),
          y: rand(0, h * 0.3),
          vx: (fromLeft ? 1 : -1) * rand(4, 7),
          vy: rand(1.5, 3),
          life: 0,
          maxLife: 60,
        }
      }
      if (meteor) {
        meteor.life++
        meteor.x += meteor.vx
        meteor.y += meteor.vy
        const fade = 1 - meteor.life / meteor.maxLife
        const tail = 22
        const grad = ctx!.createLinearGradient(
          meteor.x, meteor.y,
          meteor.x - meteor.vx * tail, meteor.y - meteor.vy * tail
        )
        grad.addColorStop(0, `rgba(236,234,229,${0.9 * fade})`)
        grad.addColorStop(1, 'rgba(236,234,229,0)')
        ctx!.strokeStyle = grad
        ctx!.lineWidth = 1.4
        ctx!.beginPath()
        ctx!.moveTo(meteor.x, meteor.y)
        ctx!.lineTo(meteor.x - meteor.vx * tail, meteor.y - meteor.vy * tail)
        ctx!.stroke()
        if (meteor.life >= meteor.maxLife) {
          meteor = null
          nextMeteorAt = t + rand(4000, 9000)
        }
      }
    }

    function loop(t: number) {
      draw(t)
      raf = requestAnimationFrame(loop)
    }

    function onPointer(e: PointerEvent) {
      mouse.x = e.clientX / window.innerWidth - 0.5
      mouse.y = e.clientY / window.innerHeight - 0.5
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    if (reduced) {
      draw(0) // 静态一帧
    } else {
      nextMeteorAt = performance.now() + 2500
      raf = requestAnimationFrame(loop)
      window.addEventListener('pointermove', onPointer)
    }
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onPointer)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  )
}
