import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { trails } from '../../data/trails'
import type { TrailLevel } from '../../types/content'
import { SectionHeading } from './AboutSection'
import MaskReveal from '../../components/motion/MaskReveal'
import Magnetic from '../../components/motion/Magnetic'

const LEVEL_ICON: Record<TrailLevel, string> = { 新手: '🌱', 进阶: '🌿', 硬核: '🌳' }

export default function TrailsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28 md:py-40">
      <SectionHeading en="Trails" zh="绿洲小径" />
      <div className="grid gap-4 sm:grid-cols-2">
        {trails.map((trail, i) => (
          <MaskReveal key={trail.id} delay={0.08 * i} className="h-full [&>div]:h-full">
            <Link
              to="/trails"
              className="glass glass-hover group flex h-full flex-col justify-between gap-10 rounded-2xl p-6 md:p-8"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono2 text-[10px] uppercase tracking-[0.3em] text-sand">
                    {trail.en}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-muted transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-oasis"
                  />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-fg transition-colors duration-500 group-hover:text-oasis">
                  {trail.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{trail.description}</p>
              </div>
              <div className="flex items-center gap-2 font-mono2 text-[10px] tracking-[0.15em]">
                <span className="rounded-full border border-fg/15 px-2.5 py-0.5 text-muted">
                  {LEVEL_ICON[trail.level]} {trail.level}
                </span>
                <span className="rounded-full border border-oasis/30 px-2.5 py-0.5 text-oasis">
                  {trail.steps.length} 个路标
                </span>
              </div>
            </Link>
          </MaskReveal>
        ))}
      </div>
      <MaskReveal delay={0.2}>
        <p className="mt-10 text-center text-sm text-muted">
          每条小径都是策展过的第三方路标——官方文档优先，一句话告诉你为什么值得去。
        </p>
        <div className="mt-8 text-center">
          <Magnetic>
            <Link
              to="/trails"
              className="inline-block rounded-full border border-oasis/40 px-8 py-3 font-mono2 text-xs uppercase tracking-[0.3em] text-oasis transition-all duration-500 hover:bg-oasis hover:text-bg active:scale-95"
            >
              全部小径 →
            </Link>
          </Magnetic>
        </div>
      </MaskReveal>
    </section>
  )
}
