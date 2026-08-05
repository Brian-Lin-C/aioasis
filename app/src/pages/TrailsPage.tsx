import { ArrowUpRight, Footprints } from 'lucide-react'
import { trails } from '../data/trails'
import type { TrailLevel } from '../types/content'
import MaskReveal from '../components/motion/MaskReveal'

const LEVEL_ICON: Record<TrailLevel, string> = { 新手: '🌱', 进阶: '🌿', 硬核: '🌳' }

export default function TrailsPage() {
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
          沙漠里最好的路，是别人走过并做了记号的路。每条小径都是一串策展过的路标——官方文档优先，
          每个路标只配一句话：为什么值得去。
        </p>
      </MaskReveal>

      {trails.map((trail, ti) => (
        <section key={trail.id} className="mt-20">
          <MaskReveal>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <h2 className="font-display text-2xl font-bold text-fg md:text-3xl">{trail.title}</h2>
              <span className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-sand">
                {trail.en}
              </span>
              <span className="font-mono2 text-xs text-muted">
                {LEVEL_ICON[trail.level]} {trail.level} · {trail.steps.length} 个路标
              </span>
            </div>
            <p className="mt-3 max-w-[34em] text-sm leading-relaxed text-muted">
              {trail.description}
            </p>
          </MaskReveal>

          <ol className="relative mt-10 space-y-4 border-l border-dashed border-fg/15 pl-6 md:pl-8">
            {trail.steps.map((step, si) => (
              <li key={step.id} className="relative">
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
                    <div className="flex shrink-0 items-center gap-2 font-mono2 text-[10px] tracking-[0.15em]">
                      <span className="rounded-full border border-fg/15 px-2.5 py-0.5 text-muted">
                        {step.lang}
                      </span>
                      <span className="rounded-full border border-fg/15 px-2.5 py-0.5 text-muted">
                        {LEVEL_ICON[step.level]} {step.level}
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
            ))}
          </ol>
          {ti < trails.length - 1 && (
            <div className="mt-16 flex items-center gap-3 text-muted">
              <Footprints size={14} className="text-sand" />
              <span className="font-mono2 text-[10px] uppercase tracking-[0.35em]">
                Next Trail
              </span>
            </div>
          )}
        </section>
      ))}

      <MaskReveal delay={0.1}>
        <p className="mt-24 text-center font-mono2 text-xs text-muted">
          更多小径正在开辟中 · 发现好资源？告诉我，一起插路标。
        </p>
      </MaskReveal>
    </div>
  )
}
