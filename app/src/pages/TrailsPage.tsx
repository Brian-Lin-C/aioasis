import { Fragment, useMemo, useState } from 'react'
import { ArrowUpRight, ChevronDown, Footprints, Search } from 'lucide-react'
import { trails } from '../data/trails'
import { filterTrails } from '../lib/filter-trails'
import type { TrailLevel } from '../types/content'
import MaskReveal from '../components/motion/MaskReveal'

const LEVEL_ICON: Record<TrailLevel, string> = { 新手: '🌱', 进阶: '🌿', 硬核: '🌳' }
const LEVELS: Array<TrailLevel | '全部'> = ['全部', '新手', '进阶', '硬核']

export default function TrailsPage() {
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState<TrailLevel | '全部'>('全部')
  const [onlyCn, setOnlyCn] = useState(false)
  const [onlyDirect, setOnlyDirect] = useState(false)
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({})

  const filtered = useMemo(
    () => filterTrails(trails, { query, level, onlyCn, onlyDirect }),
    [query, level, onlyCn, onlyDirect]
  )
  const stepCount = filtered.reduce((n, t) => n + t.steps.length, 0)
  /** 搜索/筛选时强制展开，避免命中内容被折叠藏起来 */
  const filtersActive = query !== '' || level !== '全部' || onlyCn || onlyDirect
  const toggleTrail = (id: string) => setOpenIds((m) => ({ ...m, [id]: !m[id] }))

  const chip = (active: boolean) =>
    `rounded-full px-4 py-1.5 font-mono2 text-xs tracking-[0.2em] transition-colors duration-500 ${
      active
        ? 'border border-oasis bg-oasis text-bg'
        : 'glass text-muted hover:border-oasis/50 hover:text-fg'
    }`

  return (
    <div className="mx-auto max-w-4xl px-6 pb-32 pt-32 md:pt-40">
      <MaskReveal>
        <span className="font-mono2 text-[11px] uppercase tracking-[0.4em] text-sand">Trails</span>
      </MaskReveal>
      <MaskReveal delay={0.12}>
        <h1 className="mt-3 font-display text-[clamp(2rem,6vw,3.5rem)] font-bold text-fg">
          绿洲小径
        </h1>
      </MaskReveal>
      <MaskReveal delay={0.2}>
        <p className="mt-4 max-w-[32em] text-muted">
          沙漠里最好的路，是别人走过并做了记号的路。每条小径都是一串策展过的路标——官方文档优先、
          国内直连优先，每个路标只配一句话：为什么值得去。
        </p>
      </MaskReveal>

      <div className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {LEVELS.map((l) => (
            <button key={l} onClick={() => setLevel(l)} className={chip(level === l)}>
              {l === '全部' ? '全部' : `${LEVEL_ICON[l]} ${l}`}
            </button>
          ))}
          <button onClick={() => setOnlyCn((v) => !v)} className={chip(onlyCn)}>
            中文可读
          </button>
          <button onClick={() => setOnlyDirect((v) => !v)} className={chip(onlyDirect)}>
            国内直连
          </button>
        </div>
        <label className="glass flex items-center gap-2 rounded-full px-4 py-2 transition-colors duration-500 focus-within:border-oasis/50 lg:w-64">
          <Search size={16} className="shrink-0 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索路标…"
            className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-muted"
          />
        </label>
      </div>

      {(query || level !== '全部' || onlyCn || onlyDirect) && (
        <p className="mt-6 font-mono2 text-[11px] tracking-[0.2em] text-muted">
          筛出 {stepCount} 个路标 · {filtered.length} 条小径
        </p>
      )}

      {filtered.map((trail, ti) => {
        const isOpen = filtersActive || !!openIds[trail.id]
        return (
        <section key={trail.id} className="mt-20">
          <MaskReveal>
            <button
              onClick={() => toggleTrail(trail.id)}
              aria-expanded={isOpen}
              className="group w-full text-left"
            >
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <h2 className="font-display text-2xl font-bold text-fg transition-colors duration-500 group-hover:text-oasis md:text-3xl">
                  {trail.title}
                </h2>
                <span className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-sand">
                  {trail.en}
                </span>
                <span className="font-mono2 text-xs text-muted">
                  {LEVEL_ICON[trail.level]} {trail.level} · {trail.steps.length} 个路标
                </span>
                <span className="glass ml-auto flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono2 text-[10px] tracking-[0.2em] text-muted transition-colors duration-500 group-hover:border-oasis/50 group-hover:text-fg">
                  {isOpen ? '收起' : '展开路标'}
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </span>
              </div>
              <p className="mt-3 max-w-[34em] text-sm leading-relaxed text-muted">
                {trail.description}
              </p>
            </button>
          </MaskReveal>

          <div
            className={`grid transition-all duration-700 ease-out ${
              isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <ol className="relative mt-10 space-y-4 border-l border-dashed border-fg/15 pl-6 md:pl-8">
            {trail.steps.map((step, si) => {
              const showStage = step.stage && step.stage !== trail.steps[si - 1]?.stage
              return (
                <Fragment key={step.id}>
                  {showStage && (
                    <li className="relative pt-6 first:pt-0">
                      <span className="absolute -left-[29px] top-[30px] h-2.5 w-2.5 rotate-45 bg-sand first:top-1.5 md:-left-[37px]" />
                      <p className="font-mono2 text-[11px] font-medium uppercase tracking-[0.3em] text-sand">
                        {step.stage}
                      </p>
                      {step.stageGoal && (
                        <p className="mt-1.5 max-w-[36em] text-xs leading-relaxed text-muted">
                          产出：{step.stageGoal}
                        </p>
                      )}
                    </li>
                  )}
                  <li className="relative">
                    <span className="absolute -left-[31px] top-7 flex h-4 w-4 items-center justify-center rounded-full border border-oasis/50 bg-bg font-mono2 text-[8px] text-oasis md:-left-[39px]">
                      {si + 1}
                    </span>
                <MaskReveal delay={0.05 * si}>
                  <a
                    href={step.url}
                    target="_blank"
                    rel="noreferrer"
                    className="glass glass-hover group flex flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-center md:justify-between md:p-6"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-sand/40 px-2.5 py-0.5 font-mono2 text-[10px] tracking-[0.15em] text-sand">
                          {step.kind}
                        </span>
                        <h3 className="font-display text-base font-semibold text-fg transition-colors duration-500 group-hover:text-oasis">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{step.note}</p>
                    </div>
                    <div className="flex shrink-0 flex-wrap items-center gap-2 font-mono2 text-[10px] tracking-[0.15em]">
                      <span className="rounded-full border border-fg/15 px-2.5 py-0.5 text-muted">
                        {step.lang}
                      </span>
                      <span className="rounded-full border border-fg/15 px-2.5 py-0.5 text-muted">
                        {LEVEL_ICON[step.level]} {step.level}
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 ${
                          step.direct ? 'border-oasis/30 text-oasis' : 'border-fg/15 text-muted'
                        }`}
                      >
                        {step.direct ? '国内直连' : '需代理'}
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 ${
                          step.free ? 'border-oasis/30 text-oasis' : 'border-fg/15 text-muted'
                        }`}
                      >
                        {step.free ? '免费' : '付费'}
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-muted transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-oasis"
                      />
                    </div>
                  </a>
                </MaskReveal>
                  </li>
                </Fragment>
              )
            })}
              </ol>
            </div>
          </div>
          {ti < filtered.length - 1 && (
            <div className="mt-16 flex items-center gap-3 text-muted">
              <Footprints size={14} className="text-sand" />
              <span className="font-mono2 text-[10px] uppercase tracking-[0.35em]">
                Next Trail
              </span>
            </div>
          )}
        </section>
        )
      })}

      {filtered.length === 0 && (
        <p className="mt-16 text-center font-mono2 text-sm text-muted">
          这条路上暂时没有路标，换个条件试试。
        </p>
      )}

      <MaskReveal delay={0.1}>
        <p className="mt-24 text-center font-mono2 text-xs text-muted">
          更多小径正在开辟中 · 发现好资源？告诉我，一起插路标。
        </p>
      </MaskReveal>
    </div>
  )
}
