import { useEffect, useState } from 'react'

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setPct((p) => {
        const next = Math.min(100, p + Math.ceil(Math.random() * 9))
        if (next >= 100) clearInterval(timer)
        return next
      })
    }, 60)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (pct >= 100) {
      setLeaving(true)
      const t = setTimeout(onDone, 750)
      return () => clearTimeout(t)
    }
  }, [pct, onDone])

  return (
    <div
      className={`fixed inset-0 z-[110] flex flex-col items-center justify-center bg-bg transition-opacity duration-700 ${
        leaving ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      <div className="font-mono2 text-xs uppercase tracking-[0.35em] text-muted">
        LOCATING OASIS…
      </div>
      <div className="mt-4 font-mono2 text-6xl text-fg tabular-nums">
        {String(pct).padStart(2, '0')}%
      </div>
      <div className="mt-6 h-px w-40 bg-fg/10">
        <div
          className="h-px bg-oasis transition-[width] duration-150"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
