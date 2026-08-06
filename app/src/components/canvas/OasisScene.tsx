import { useEffect, useRef } from 'react'

interface Star { x: number; y: number; r: number; phase: number; speed: number; gold: boolean }
interface Meteor { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; gold: boolean }
interface Wish { x: number; y: number; t0: number }

/* 双主题调色板：夜=深空星野，昼=暖阳沙丘 */
const PALETTES = {
  dark: {
    star: '#eceae5',
    gold: '#e0b869',
    starAlpha: 1,
    glowRgb: '45,212,191',
    glowCore: 0.32,
    glowMid: 0.1,
    dunes: ['#0a0f0d', '#070c0a', '#050807'],
    meteorRgb: '236,234,229',
    meteorAlpha: 0.9,
    fadeTo: null as string | null,
    sun: false,
    sky: null as [string, string] | null,
    clouds: false,
    poolDeep: '14,58,44',
    poolEdge: '5,18,14',
    poolReflect: '45,212,191',
    poolSky: '150,222,208',
    poolSkyA: 0.16,
    palm: '#1d4a40',
  },
  light: {
    star: '#5c6b63',
    gold: '#a5761f',
    starAlpha: 0,
    glowRgb: '13,148,136',
    glowCore: 0.16,
    glowMid: 0.05,
    dunes: ['#e7dfc6', '#ddd1b0', '#d2c49c'],
    meteorRgb: '20,33,27',
    meteorAlpha: 0.4,
    fadeTo: '#f3efe4',
    sun: true,
    sky: ['#f9f5ec', '#f0ead9'] as [string, string],
    clouds: true,
    poolDeep: '158,192,168',
    poolEdge: '118,152,132',
    poolReflect: '224,184,105',
    poolSky: '255,255,255',
    poolSkyA: 0.6,
    palm: '#5c5236',
  },
}

import { PALM_D, PALM_CONTENT_BOTTOM, PALM_CONTENT_CX, PALM_ISLAND_TOP, PALM_VIEWBOX } from './palmPath'
import { celestialPosition } from './celestial'

function palette() {
  return document.documentElement.dataset.theme === 'light' ? PALETTES.light : PALETTES.dark
}

let palmPath: Path2D | null = null

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
    const wishes: Wish[] = [] // 点中金色流星后的许愿文案
    let raf = 0
    let lastT = 0 // 上一帧时间戳：流星按真实时间推进，高刷屏不掉时长
    const pool = { x: 0, y: 0, rx: 0, ry: 0 } // 每帧更新的水潭位置
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

    function dunePath(
      baseY: number,
      amp: number,
      offset: number,
      px: number,
      basinCx = 0,
      basinRx = 0,
    ) {
      ctx!.beginPath()
      ctx!.moveTo(-50, h + 50)
      for (let x = -50; x <= w + 50; x += 8) {
        let wave = Math.sin(x * 0.004 + offset) * amp + Math.sin(x * 0.011 + offset * 1.7) * amp * 0.4
        // 盆地：水潭周围波幅收敛并局部下凹，保证绿洲主体不被沙浪淹没
        if (basinRx > 0) {
          const d = Math.abs(x - basinCx) / basinRx
          if (d < 1) {
            const k = Math.cos(d * Math.PI * 0.5) ** 2
            wave = wave * (1 - 0.7 * k) + h * 0.022 * k
          }
        }
        ctx!.lineTo(x, baseY + wave + px)
      }
      ctx!.lineTo(w + 50, h + 50)
      ctx!.closePath()
      ctx!.fill()
    }

    function draw(t: number) {
      const P = palette()
      ctx!.clearRect(0, 0, w, h)
      // 等效帧步长（以 60fps 为基准）：高刷新率屏幕上流星速度/寿命不缩水
      const dtF = lastT === 0 ? 1 : Math.min(4, Math.max(0, (t - lastT) / 16.667))
      lastT = t

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

      // ② 极光光晕（绿洲位：画面横向 50%、纵向 90%，沉入水潭）
      const breathe = 1 + Math.sin(t * 0.0006) * 0.08
      const gx = w * 0.5 + px * 20
      const gy = h * 0.9 + py * 14
      const gr = Math.min(w, h) * 0.42 * breathe
      const glow = ctx!.createRadialGradient(gx, gy, 0, gx, gy, gr)
      glow.addColorStop(0, `rgba(${P.glowRgb},${P.glowCore})`)
      glow.addColorStop(0.45, `rgba(${P.glowRgb},${P.glowMid})`)
      glow.addColorStop(1, `rgba(${P.glowRgb},0)`)
      ctx!.fillStyle = glow
      ctx!.fillRect(0, 0, w, h)

      // ②b 昼间暖阳：位置随真实时间沿顶部弧带东升西落，晨昏染暖意橙调
      if (P.sun) {
        const cp = celestialPosition(w, h, true)
        const sx2 = cp.x + px * 14
        const sy2 = cp.y + py * 10
        const k = cp.warm
        const lerpC = (a: number, b: number) => Math.round(a + (b - a) * k)
        const haloRgb = `${lerpC(224, 233)},${lerpC(184, 150)},${lerpC(105, 88)}`
        const sr = Math.min(w, h) * 0.3
        const sun = ctx!.createRadialGradient(sx2, sy2, 0, sx2, sy2, sr)
        sun.addColorStop(0, `rgba(${haloRgb},${0.4 + k * 0.1})`)
        sun.addColorStop(0.5, `rgba(${haloRgb},${0.12 + k * 0.05})`)
        sun.addColorStop(1, `rgba(${haloRgb},0)`)
        ctx!.fillStyle = sun
        ctx!.fillRect(0, 0, w, h)
        const discR = Math.min(w, h) * 0.055
        ctx!.beginPath()
        ctx!.arc(sx2, sy2, discR, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${haloRgb},0.9)`
        ctx!.fill()
        ctx!.beginPath()
        ctx!.arc(sx2, sy2, discR * 0.62, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(255,${lerpC(240, 224)},${lerpC(205, 190)},0.95)`
        ctx!.fill()
      }

      // ②b2 夜间月亮：同样随真实时间沿弧带月升月落，一体成型的明暗月盘
      if (!P.sun) {
        const cp = celestialPosition(w, h, false)
        const mx = cp.x + px * 14
        const my = cp.y + py * 10
        const mr = Math.min(w, h) * 0.26
        const halo = ctx!.createRadialGradient(mx, my, 0, mx, my, mr)
        halo.addColorStop(0, 'rgba(236,234,229,0.14)')
        halo.addColorStop(1, 'rgba(236,234,229,0)')
        ctx!.fillStyle = halo
        ctx!.fillRect(0, 0, w, h)
        const discR = Math.min(w, h) * 0.045
        const mg = ctx!.createRadialGradient(
          mx - discR * 0.4, my - discR * 0.4, discR * 0.1,
          mx, my, discR
        )
        mg.addColorStop(0, 'rgba(255,252,240,0.98)')
        mg.addColorStop(0.55, 'rgba(226,224,215,0.9)')
        mg.addColorStop(1, 'rgba(176,178,172,0.7)')
        ctx!.beginPath()
        ctx!.arc(mx, my, discR, 0, Math.PI * 2)
        ctx!.fillStyle = mg
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

      // 远层沙丘
      ctx!.fillStyle = P.dunes[0]
      dunePath(h * 0.78, 26 * breathe1, 1.3 + flow1, px * 6)

      // 中层沙丘：垫在水潭之后，沙浪再大也淹不到绿洲
      ctx!.fillStyle = P.dunes[1]
      dunePath(h * 0.86, 34 * breathe2, 4.1 + flow2, px * 10)

      // ③a 绿洲水潭：湿沙岸线 + 天色反光 + 环岛涟漪，绘制在中层沙丘之上保证主体常显
      pool.x = w * 0.5 + px * 8
      pool.y = h * 0.845 + py * 5
      pool.rx = Math.min(w, h) * 0.17
      pool.ry = pool.rx * 0.16
      {
        const { x: cx, y: cy, rx, ry } = pool
        // 湿沙岸线：水面外一圈浸水暗沙，让水潭嵌进沙地而非浮在表面
        ctx!.beginPath()
        ctx!.ellipse(cx, cy, rx * 1.1, ry * 1.35, 0, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${P.poolEdge},0.5)`
        ctx!.fill()
        // 水体：顶缘映天色（昼映暖白、夜映微光）→ 中心深碧 → 底缘渐沉
        const body = ctx!.createLinearGradient(0, cy - ry, 0, cy + ry * 1.1)
        body.addColorStop(0, `rgba(${P.poolSky},${P.poolSkyA})`)
        body.addColorStop(0.32, `rgba(${P.poolDeep},0.92)`)
        body.addColorStop(1, `rgba(${P.poolEdge},0.85)`)
        ctx!.fillStyle = body
        ctx!.beginPath()
        ctx!.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2)
        ctx!.fill()
        // 环岛涟漪：从小岛根部扩散的圆环，渐远渐淡
        ctx!.save()
        ctx!.beginPath()
        ctx!.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2)
        ctx!.clip()
        for (let i = 0; i < 3; i++) {
          const phase = (t * 0.00022 + i / 3) % 1
          const rr = 0.22 + phase * 0.72
          ctx!.beginPath()
          ctx!.ellipse(cx, cy + ry * 0.1, rx * rr, ry * rr, 0, 0, Math.PI * 2)
          ctx!.strokeStyle = `rgba(${P.poolReflect},${(1 - phase) * 0.3})`
          ctx!.lineWidth = 1.2
          ctx!.stroke()
        }
        ctx!.restore()
      }

      // ③a2 双树棕榈小岛剪影（用户选定素材），Path2D 绘制，立在水潭中央
      // 小岛底部单独上色为沙丘色系，像从沙里长出；树本体用剪影色
      if (typeof Path2D !== 'undefined') {
        palmPath ??= new Path2D(PALM_D)
        const s = (Math.min(w, h) * 0.22) / PALM_VIEWBOX
        const bx = pool.x - PALM_CONTENT_CX * s // 内容中心对齐水潭中心
        const by = pool.y + pool.ry * 0.55 - PALM_CONTENT_BOTTOM * s // 岛底没入水面
        ctx!.save()
        ctx!.translate(bx, by)
        ctx!.scale(s, s)
        ctx!.fillStyle = P.palm
        ctx!.fill(palmPath)
        // 小岛区域（源坐标 y≥760）覆盖沙丘色
        ctx!.save()
        ctx!.beginPath()
        ctx!.rect(-1, PALM_ISLAND_TOP, PALM_VIEWBOX + 2, PALM_VIEWBOX - PALM_ISLAND_TOP + 1)
        ctx!.clip()
        ctx!.fillStyle = P.dunes[2]
        ctx!.fill(palmPath)
        ctx!.restore()
        ctx!.restore()
      }

      // 近层沙丘：前景沙丘带盆地下凹，只会轻掩水潭下缘，绿洲主体始终可见
      ctx!.fillStyle = P.dunes[2]
      dunePath(h * 0.94, 42 * breathe3, 7.7 + flow3, px * 16, pool.x, pool.rx * 2.4)

      // ③b 昼间底部渐隐，与页面底色无缝衔接
      if (P.fadeTo) {
        const fade = ctx!.createLinearGradient(0, h * 0.82, 0, h)
        fade.addColorStop(0, 'rgba(243,239,228,0)')
        fade.addColorStop(1, P.fadeTo)
        ctx!.fillStyle = fade
        ctx!.fillRect(0, h * 0.82, w, h * 0.18)
      }

      // ④ 流星（仅夜间；约三成为金色许愿流星——约 4 秒航程翻倍，点中可得一句好运）
      if (P.starAlpha > 0 && !meteor && t > nextMeteorAt) {
        const fromLeft = Math.random() < 0.5
        const gold = Math.random() < 0.3
        meteor = {
          x: fromLeft ? rand(0, w * 0.5) : rand(w * 0.5, w),
          y: rand(0, h * 0.3),
          vx: (fromLeft ? 1 : -1) * rand(4, 7) * (gold ? 0.55 : 1),
          vy: rand(1.5, 3) * (gold ? 0.55 : 1),
          life: 0,
          maxLife: gold ? 240 : 60,
          gold,
        }
      }
      if (meteor && P.starAlpha > 0) {
        meteor.life += dtF
        meteor.x += meteor.vx * dtF
        meteor.y += meteor.vy * dtF
        const fade = 1 - meteor.life / meteor.maxLife
        const tail = meteor.gold ? 30 : 22
        const rgb = meteor.gold ? '224,184,105' : P.meteorRgb
        const alpha = meteor.gold ? 1 : P.meteorAlpha
        const grad = ctx!.createLinearGradient(
          meteor.x, meteor.y,
          meteor.x - meteor.vx * tail, meteor.y - meteor.vy * tail
        )
        grad.addColorStop(0, `rgba(${rgb},${alpha * fade})`)
        grad.addColorStop(1, `rgba(${rgb},0)`)
        ctx!.strokeStyle = grad
        ctx!.lineWidth = meteor.gold ? 3.2 : 1.4
        ctx!.beginPath()
        ctx!.moveTo(meteor.x, meteor.y)
        ctx!.lineTo(meteor.x - meteor.vx * tail, meteor.y - meteor.vy * tail)
        ctx!.stroke()
        // 金色流星头部亮点加大 + 柔光晕：提示它可以点
        if (meteor.gold) {
          const halo = ctx!.createRadialGradient(meteor.x, meteor.y, 0, meteor.x, meteor.y, 9)
          halo.addColorStop(0, `rgba(255,232,170,${0.55 * fade})`)
          halo.addColorStop(1, 'rgba(255,232,170,0)')
          ctx!.fillStyle = halo
          ctx!.beginPath()
          ctx!.arc(meteor.x, meteor.y, 9, 0, Math.PI * 2)
          ctx!.fill()
          ctx!.beginPath()
          ctx!.arc(meteor.x, meteor.y, 3.6, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(255,232,170,${fade})`
          ctx!.fill()
        }
        if (meteor.life >= meteor.maxLife) {
          meteor = null
          nextMeteorAt = t + rand(4000, 9000)
        }
      }

      // ⑤ 许愿文案：点中金色流星后浮现"好运将会发生"，上浮渐隐
      for (let i = wishes.length - 1; i >= 0; i--) {
        const ws = wishes[i]
        const age = t - ws.t0
        if (age > 2600) { wishes.splice(i, 1); continue }
        const k = age / 2600
        ctx!.save()
        ctx!.globalAlpha = k < 0.12 ? k / 0.12 : 1 - (k - 0.12) / 0.88
        ctx!.font = '600 15px ui-sans-serif, system-ui, "PingFang SC", "Microsoft YaHei", sans-serif'
        ctx!.textAlign = 'center'
        ctx!.fillStyle = P.gold
        ctx!.shadowColor = `rgba(${P.glowRgb},0.8)`
        ctx!.shadowBlur = 12
        ctx!.fillText('好运将会发生', ws.x, ws.y - 14 - k * 30)
        ctx!.restore()
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

    /** 彩蛋：点中金色流星 → 浮现"好运将会发生" */
    function onClick(e: MouseEvent) {
      if ((e.target as Element | null)?.closest?.('a,button,[role="button"],input,select,textarea')) return
      if (!meteor || !meteor.gold || !canvas) return
      const rect = canvas.getBoundingClientRect()
      const cx = e.clientX - rect.left
      const cy = e.clientY - rect.top
      if (Math.hypot(cx - meteor.x, cy - meteor.y) < 36) {
        wishes.push({ x: meteor.x, y: meteor.y, t0: performance.now() })
        meteor = null
        nextMeteorAt = performance.now() + rand(3000, 7000)
      }
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    window.addEventListener('click', onClick)
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
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      data-oasis-scene
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  )
}
