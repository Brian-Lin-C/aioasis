import { Github } from 'lucide-react'

const MARQUEE = 'AI OASIS · 在数字沙漠里种一片绿洲 · '

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
        <span className="font-mono2 text-xs uppercase tracking-[0.25em] text-sand">
          24.4°N · Oasis Station
        </span>
      </div>
    </footer>
  )
}
