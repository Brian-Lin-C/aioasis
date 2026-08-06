import { Link } from 'react-router-dom'
import OasisMark from '../components/brand/OasisMark'

/** 极简线条骆驼：单峰 + 前伸长颈 + 小横头（离线多轮迭代定稿） */
function Camel({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 180" className={className} aria-hidden focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M48,96 C46,84 54,78 64,78 C70,58 90,50 102,60 C108,66 110,70 114,72 C122,76 130,76 136,73 C140,62 144,48 150,40 C153,34 160,30 166,31 C172,32 176,35 174,39 C172,42 168,43 164,43 C158,44 154,48 152,56 C148,66 147,76 147,86" />
        <path d="M68,94 L66,128" />
        <path d="M84,94 L86,128" />
        <path d="M124,92 L122,128" />
        <path d="M138,90 L140,128" />
        <path d="M48,92 C44,96 42,102 43,108" />
      </g>
    </svg>
  )
}

export default function NotFound() {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <span className="font-mono2 text-[11px] uppercase tracking-[0.4em] text-sand">
        Error 404 · Lost in the Desert
      </span>
      <h1 className="mt-6 flex items-center justify-center font-display text-[clamp(4rem,14vw,9rem)] font-bold leading-none text-fg">
        4<OasisMark className="mx-1 inline-block h-[0.82em] w-[0.82em]" />4
      </h1>
      <p className="mt-6 text-lg text-fg md:text-xl">你在沙漠里迷路了</p>
      <p className="mt-3 max-w-[28em] text-sm text-muted md:text-base">
        这里没有水，也没有信号，只有风沙。跟着骆驼往回走吧。
      </p>
      <Link
        to="/"
        className="mt-10 inline-block rounded-full border border-oasis/40 px-8 py-3 font-mono2 text-xs uppercase tracking-[0.3em] text-oasis transition-all duration-500 hover:bg-oasis hover:text-bg active:scale-95"
      >
        回到绿洲 →
      </Link>

      {/* 沙漠之舟：沿沙丘线慢慢走过 */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40">
        <svg
          className="absolute bottom-0 left-0 h-full w-full"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C240,84 480,132 720,108 C960,84 1200,124 1440,100 L1440,160 L0,160 Z"
            fill="var(--bg-2)"
          />
        </svg>
        <div className="camel-walk absolute bottom-[4.5rem] left-0">
          <Camel className="camel-bob h-14 w-24 text-muted/70 md:h-16 md:w-28" />
        </div>
      </div>
    </section>
  )
}
