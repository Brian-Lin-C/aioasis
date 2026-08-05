import { Github } from 'lucide-react'
import { useEffect, useState } from 'react'

const MARQUEE = 'AI OASIS · 在数字沙漠里种一片绿洲 · PLANT YOUR OASIS IN THE DIGITAL DESERT · '

/** 全球真实绿洲坐标，页脚轮换"扫描信号" */
const SIGNALS = [
  { coord: '40.09°N, 94.67°E', name: 'CRESCENT SPRING · 月牙泉' },
  { coord: '42.95°N, 89.18°E', name: 'TURPAN · 吐鲁番' },
  { coord: '29.20°N, 25.52°E', name: 'SIWA · 锡瓦' },
  { coord: '31.45°N, 35.39°E', name: 'EIN GEDI · 隐基底' },
  { coord: '14.09°S, 75.76°W', name: 'HUACACHINA · 瓦卡奇纳' },
]

function OasisSignal() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    let swap: ReturnType<typeof setTimeout>
    const t = setInterval(() => {
      setVisible(false)
      swap = setTimeout(() => {
        setIdx(i => (i + 1) % SIGNALS.length)
        setVisible(true)
      }, 450)
    }, 4200)
    return () => { clearInterval(t); clearTimeout(swap) }
  }, [])
  const s = SIGNALS[idx]
  return (
    <span
      className={`font-mono2 text-xs uppercase tracking-[0.25em] text-sand transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
      aria-live="off"
    >
      {s.coord} · {s.name}
    </span>
  )
}

export default function SiteFooter() {
  return (
    <footer className="border-t border-fg/10">
      <div className="overflow-hidden border-b border-fg/10 py-4">
        <div className="flex w-max animate-[oasis-marquee_28s_linear_infinite] whitespace-nowrap font-mono2 text-xs uppercase tracking-[0.3em] text-muted">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className="pr-2">{MARQUEE}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row md:px-10">
        <span className="font-mono2 text-xs text-muted">© 2026 AI绿洲</span>
        <a
          href="https://github.com/brian-lin-c"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 font-mono2 text-xs uppercase tracking-[0.25em] text-muted transition-colors duration-500 hover:text-oasis"
        >
          <Github size={14} /> GitHub
        </a>
        <OasisSignal />
      </div>
    </footer>
  )
}
