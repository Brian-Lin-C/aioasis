import { useMemo, useState } from 'react'
import { Quote, Search } from 'lucide-react'
import { GLOSSARY_CATEGORIES, glossaryTerms } from '../data/glossary'
import type { GlossaryCategory } from '../types/content'
import MaskReveal from '../components/motion/MaskReveal'

type Filter = GlossaryCategory | '全部'

export default function GlossaryPage() {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<Filter>('全部')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return glossaryTerms.filter((t) => {
      if (cat !== '全部' && t.category !== cat) return false
      if (q && !`${t.term} ${t.en} ${t.plain} ${t.analogy}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [query, cat])

  const grouped = useMemo(() => {
    const cats = cat === '全部' ? GLOSSARY_CATEGORIES : [cat]
    return cats
      .map((c) => ({ category: c, terms: filtered.filter((t) => t.category === c) }))
      .filter((g) => g.terms.length > 0)
  }, [filtered, cat])

  const chip = (active: boolean) =>
    `rounded-full px-4 py-1.5 font-mono2 text-xs tracking-[0.2em] transition-colors duration-500 ${
      active
        ? 'border border-oasis bg-oasis text-bg'
        : 'glass text-muted hover:border-oasis/50 hover:text-fg'
    }`

  return (
    <div className="mx-auto max-w-4xl px-6 pb-32 pt-32 md:pt-40">
      <MaskReveal>
        <span className="font-mono2 text-[11px] uppercase tracking-[0.4em] text-sand">Lexicon</span>
      </MaskReveal>
      <MaskReveal delay={0.12}>
        <h1 className="mt-3 font-display text-[clamp(2rem,6vw,3.5rem)] font-bold text-fg">
          AI 黑话词典
        </h1>
      </MaskReveal>
      <MaskReveal delay={0.2}>
        <p className="mt-4 max-w-[32em] text-muted">
          每个术语只配两句人话：一句大白话讲清它是什么，一个生活类比让你忘不掉。
          不堆概念解释概念——看不懂的词典等于没有。
        </p>
      </MaskReveal>

      <div className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setCat('全部')} className={chip(cat === '全部')}>
            全部
          </button>
          {GLOSSARY_CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={chip(cat === c)}>
              {c}
            </button>
          ))}
        </div>
        <label className="glass flex items-center gap-2 rounded-full px-4 py-2 transition-colors duration-500 focus-within:border-oasis/50 lg:w-64">
          <Search size={16} className="shrink-0 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索术语…"
            className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-muted"
          />
        </label>
      </div>

      {(query || cat !== '全部') && (
        <p className="mt-6 font-mono2 text-[11px] tracking-[0.2em] text-muted">
          筛出 {filtered.length} 个术语
        </p>
      )}

      {grouped.map((g) => (
        <section key={g.category} className="mt-16">
          <MaskReveal>
            <h2 className="font-display text-xl font-bold text-fg md:text-2xl">
              {g.category}
              <span className="ml-3 font-mono2 text-[11px] font-normal uppercase tracking-[0.3em] text-sand">
                {g.terms.length} terms
              </span>
            </h2>
          </MaskReveal>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {g.terms.map((t, i) => (
              <MaskReveal key={t.id} delay={0.05 * (i % 4)}>
                <article className="glass glass-hover flex h-full flex-col gap-3 rounded-2xl p-5 md:p-6">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-lg font-semibold text-fg">{t.term}</h3>
                    <span className="font-mono2 text-[11px] uppercase tracking-[0.2em] text-sand">
                      {t.en}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-fg/85">{t.plain}</p>
                  <p className="mt-auto flex gap-2 border-t border-fg/10 pt-3 text-xs leading-relaxed text-muted">
                    <Quote size={12} className="mt-0.5 shrink-0 text-oasis" />
                    <span>{t.analogy}</span>
                  </p>
                </article>
              </MaskReveal>
            ))}
          </div>
        </section>
      ))}

      {filtered.length === 0 && (
        <p className="mt-16 text-center font-mono2 text-sm text-muted">
          词典里还没收录这个词，换个说法试试。
        </p>
      )}

      <MaskReveal delay={0.1}>
        <p className="mt-24 text-center font-mono2 text-xs text-muted">
          词典持续收录中 · 有看不懂的黑话？来{' '}
          <a
            href="https://github.com/Brian-Lin-C/aioasis/issues/new?title=%E8%AF%8D%E5%85%B8%E6%94%B6%E5%BD%95%EF%BC%9A"
            target="_blank"
            rel="noreferrer"
            className="text-oasis underline decoration-oasis/30 underline-offset-4 transition-colors duration-500 hover:decoration-oasis"
          >
            提一个词条
          </a>
          。
        </p>
      </MaskReveal>
    </div>
  )
}
