import { useEffect, useRef } from 'react'

interface Star { x: number; y: number; r: number; phase: number; speed: number; gold: boolean }
interface Meteor { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }

/* 双主题调色板：夜=深空星野，昼=暖阳沙丘 */
const PALETTES = {
  dark: {
    star: '#eceae5',
    gold: '#e0b869',
    starAlpha: 1,
    glowRgb: '61,245,166',
    glowCore: 0.32,
    glowMid: 0.1,
    dunes: ['#0a0f0d', '#070c0a', '#050807'],
    meteorRgb: '236,234,229',
    meteorAlpha: 0.9,
    fadeTo: null as string | null,
    sun: false,
    sky: null as [string, string] | null,
    clouds: false,
  },
  light: {
    star: '#5c6b63',
    gold: '#a5761f',
    starAlpha: 0,
    glowRgb: '10,143,95',
    glowCore: 0.16,
    glowMid: 0.05,
    dunes: ['#e7dfc6', '#ddd1b0', '#d2c49c'],
    meteorRgb: '20,33,27',
    meteorAlpha: 0.4,
    fadeTo: '#f3efe4',
    sun: true,
    sky: ['#f9f5ec', '#f0ead9'] as [string, string],
    clouds: true,
  },
}

function palette() {
  return document.documentElement.dataset.theme === 'light' ? PALETTES.light : PALETTES.dark
}

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
      const P = palette()
      ctx!.clearRect(0, 0, w, h)

      // ⓪ 昼间天空渐变
      if (P.sky) {
        const sky = ctx!.createLinearGradient(0, 0, 0, h)
        sky.addColorStop(0, P.sky[0])
        sky.addColorStop(1, P.sky[1])
        ctx!.fillStyle = sky
        ctx!.fillRect(0, 0, w, h)
      }

      smooth.x += (mouse.x - smooth.x) * 0.04
      smooth.y += (mouse.y - smooth.y) * 0.04
      const drift = Math.sin(t * 0.0001) * 8
      const px = smooth.x + drift / w
      const py = smooth.y

      // ① 星尘（仅夜间；白昼清空）
      if (P.starAlpha > 0) {
        for (const s of stars) {
          const tw = (0.45 + 0.55 * Math.sin(s.phase + t * 0.001 * s.speed * 30)) * P.starAlpha
          const sx = s.x + px * 12
          const sy = ((s.y - t * s.speed * 0.02) % h + h) % h + py * 8
          ctx!.globalAlpha = tw
          ctx!.fillStyle = s.gold ? P.gold : P.star
          ctx!.beginPath()
          ctx!.arc(sx, sy, s.r, 0, Math.PI * 2)
          ctx!.fill()
        }
        ctx!.globalAlpha = 1
      }

      // ② 极光光晕（绿洲位：画面横向 50%、纵向 72%）
      const breathe = 1 + Math.sin(t * 0.0006) * 0.08
      const gx = w * 0.5 + px * 20
      const gy = h * 0.72 + py * 14
      const gr = Math.min(w, h) * 0.42 * breathe
      const glow = ctx!.createRadialGradient(gx, gy, 0, gx, gy, gr)
      glow.addColorStop(0, `rgba(${P.glowRgb},${P.glowCore})`)
      glow.addColorStop(0.45, `rgba(${P.glowRgb},${P.glowMid})`)
      glow.addColorStop(1, `rgba(${P.glowRgb},0)`)
      ctx!.fillStyle = glow
      ctx!.fillRect(0, 0, w, h)

      // ②b 昼间暖阳（右上）：光晕 + 可读的太阳圆盘
      if (P.sun) {
        const sx2 = w * 0.88 + px * 14
        const sy2 = h * 0.18 + py * 10
        const sr = Math.min(w, h) * 0.3
        const sun = ctx!.createRadialGradient(sx2, sy2, 0, sx2, sy2, sr)
        sun.addColorStop(0, 'rgba(224,184,105,0.4)')
        sun.addColorStop(0.5, 'rgba(224,184,105,0.12)')
        sun.addColorStop(1, 'rgba(224,184,105,0)')
        ctx!.fillStyle = sun
        ctx!.fillRect(0, 0, w, h)
        const discR = Math.min(w, h) * 0.055
        ctx!.beginPath()
        ctx!.arc(sx2, sy2, discR, 0, Math.PI * 2)
        ctx!.fillStyle = 'rgba(224,184,105,0.9)'
        ctx!.fill()
        ctx!.beginPath()
        ctx!.arc(sx2, sy2, discR * 0.62, 0, Math.PI * 2)
        ctx!.fillStyle = 'rgba(255,240,205,0.95)'
        ctx!.fill()
      }

      // ②c 昼间流云：大朵软云，每个云瓣用径向渐变做柔边
      if (P.clouds) {
        const defs = [
          { y: 0.16, r: 1, speed: 0.005, off: 0 },
          { y: 0.34, r: 0.75, speed: 0.0035, off: 0.55 },
          { y: 0.13, r: 0.55, speed: 0.008, off: 0.82 },
        ]
        // 云瓣：相对云心的偏移与半径系数
        const lobes: Array<[number, number, number]> = [
          [-1.15, 0.18, 0.62],
          [-0.45, -0.12, 0.85],
          [0.35, -0.2, 1],
          [1.15, 0.1, 0.7],
          [0, 0.22, 0.75],
        ]
        for (const c of defs) {
          const cx = ((t * c.speed + c.off * w) % (w + 900)) - 450 + px * 10
          const cy = h * c.y + py * 6 + Math.sin(t * 0.0004 + c.off * 9) * 6
          const R = Math.min(w, h) * 0.17 * c.r
          for (const [ox, oy, or_] of lobes) {
            const lx = cx + ox * R
            const ly = cy + oy * R
            const lr = R * or_
            // 云底灰影：让云在浅色天空下读出轮廓
            const sh = ctx!.createRadialGradient(lx, ly + lr * 0.35, 0, lx, ly + lr * 0.35, lr)
            sh.addColorStop(0, 'rgba(148,163,172,0.58)')
            sh.addColorStop(1, 'rgba(148,163,172,0)')
            ctx!.fillStyle = sh
            ctx!.beginPath()
            ctx!.arc(lx, ly + lr * 0.35, lr, 0, Math.PI * 2)
            ctx!.fill()
            // 云体：高浓度白
            const g = ctx!.createRadialGradient(lx, ly, 0, lx, ly, lr)
            g.addColorStop(0, 'rgba(255,255,255,1)')
            g.addColorStop(0.55, 'rgba(255,255,255,0.88)')
            g.addColorStop(1, 'rgba(255,255,255,0)')
            ctx!.fillStyle = g
            ctx!.beginPath()
            ctx!.arc(lx, ly, lr, 0, Math.PI * 2)
            ctx!.fill()
          }
        }
      }

      // ③ 沙丘三层：入场涌浪——流动速度按指数衰减到一成余速，呼吸振幅同步收敛
      const tau = 3500 * (1 - Math.exp(-t / 3500)) + 0.12 * t // 翘曲时间：开场快、渐慢
      const decay = 0.12 + 0.88 * Math.exp(-t / 3500)
      const flow1 = tau * 0.00012
      const flow2 = -tau * 0.00018
      const flow3 = tau * 0.00024
      const breathe1 = 1 + Math.sin(t * 0.00028) * 0.18 * decay
      const breathe2 = 1 + Math.sin(t * 0.00022 + 2) * 0.15 * decay
      const breathe3 = 1 + Math.sin(t * 0.00034 + 4) * 0.12 * decay
      ctx!.fillStyle = P.dunes[0]
      dunePath(h * 0.78, 26 * breathe1, 1.3 + flow1, px * 6)
      ctx!.fillStyle = P.dunes[1]
      dunePath(h * 0.86, 34 * breathe2, 4.1 + flow2, px * 10)
      ctx!.fillStyle = P.dunes[2]
      dunePath(h * 0.94, 42 * breathe3, 7.7 + flow3, px * 16)

      // ③b 昼间底部渐隐，与页面底色无缝衔接
      if (P.fadeTo) {
        const fade = ctx!.createLinearGradient(0, h * 0.82, 0, h)
        fade.addColorStop(0, 'rgba(243,239,228,0)')
        fade.addColorStop(1, P.fadeTo)
        ctx!.fillStyle = fade
        ctx!.fillRect(0, h * 0.82, w, h * 0.18)
      }

      // ④ 流星（仅夜间）
      if (P.starAlpha > 0 && !meteor && t > nextMeteorAt) {
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
      if (meteor && P.starAlpha > 0) {
        meteor.life++
        meteor.x += meteor.vx
        meteor.y += meteor.vy
        const fade = 1 - meteor.life / meteor.maxLife
        const tail = 22
        const grad = ctx!.createLinearGradient(
          meteor.x, meteor.y,
          meteor.x - meteor.vx * tail, meteor.y - meteor.vy * tail
        )
        grad.addColorStop(0, `rgba(${P.meteorRgb},${P.meteorAlpha * fade})`)
        grad.addColorStop(1, `rgba(${P.meteorRgb},0)`)
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
