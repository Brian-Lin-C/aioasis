import { useMemo, useState } from 'react'
import { ArrowUpRight, Search } from 'lucide-react'
import { tools } from '../data/tools'
import { CATEGORIES, type Category } from '../types/content'
import { filterTools } from '../lib/filter-tools'
import MaskReveal from '../components/motion/MaskReveal'

export default function NavPage() {
  const [category, setCategory] = useState<Category | '全部'>('全部')
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => filterTools(tools, category, query), [category, query])

  return (
    <div className="mx-auto max-w-6xl px-6 pb-32 pt-32 md:pt-40">
      <MaskReveal>
        <span className="font-mono2 text-[11px] uppercase tracking-[0.4em] text-sand">Stations</span>
      </MaskReveal>
      <MaskReveal delay={0.12}>
        <h1 className="mt-3 font-display text-[clamp(2rem,6vw,3.5rem)] font-bold text-fg">绿洲驿站</h1>
      </MaskReveal>
      <MaskReveal delay={0.2}>
        <p className="mt-4 max-w-[30em] text-muted">
          沿路标记的水源——{tools.length} 个真正好用的 AI 工具，持续更新。
        </p>
      </MaskReveal>

      <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {(['全部', ...CATEGORIES] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-4 py-1.5 font-mono2 text-xs tracking-[0.2em] transition-colors duration-500 ${
                category === c
                  ? 'border-oasis bg-oasis text-bg'
                  : 'border-fg/15 text-muted hover:border-oasis/50 hover:text-fg'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 border-b border-fg/15 pb-2 md:w-64">
          <Search size={16} className="shrink-0 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索工具…"
            className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-muted"
          />
        </label>
      </div>

      <div className="mt-12 grid gap-px overflow-hidden rounded-xl bg-fg/10 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <a
            key={t.id}
            href={t.url}
            target="_blank"
            rel="noreferrer"
            data-cursor="进入"
            className="group flex h-full flex-col justify-between gap-8 bg-bg2 p-6 transition-colors duration-700 hover:bg-[#0d1512]"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono2 text-[10px] uppercase tracking-[0.3em] text-sand">
                {t.category}
                {t.featured && <span className="ml-2 text-oasis">· 精选</span>}
              </span>
              <ArrowUpRight
                size={16}
                className="text-muted transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-oasis"
              />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-fg transition-colors duration-500 group-hover:text-oasis">
                {t.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.description}</p>
              <p className="mt-3 text-xs text-fg/70">适合：{t.bestFor}</p>
              <div className="mt-4 flex flex-wrap gap-2 font-mono2 text-[10px] tracking-[0.15em]">
                <span className="rounded-full border border-oasis/30 px-2.5 py-0.5 text-oasis">
                  {t.pricing}
                </span>
                <span className="rounded-full border border-fg/15 px-2.5 py-0.5 text-muted">
                  {t.origin}
                </span>
                <span
                  className={`rounded-full border px-2.5 py-0.5 ${
                    t.direct ? 'border-sand/40 text-sand' : 'border-fg/15 text-muted'
                  }`}
                >
                  {t.direct ? '国内直连' : '需代理'}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center font-mono2 text-sm text-muted">
          这片沙漠暂时没有水源，换个关键词试试。
        </p>
      )}
    </div>
  )
}
