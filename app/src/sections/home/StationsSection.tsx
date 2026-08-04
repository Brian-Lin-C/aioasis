import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { tools } from '../../data/tools'
import { SectionHeading } from './AboutSection'
import MaskReveal from '../../components/motion/MaskReveal'
import Magnetic from '../../components/motion/Magnetic'

export default function StationsSection() {
  const featured = tools.filter((t) => t.featured)
  return (
    <section className="mx-auto max-w-6xl px-6 py-28 md:py-40">
      <SectionHeading en="Stations" zh="绿洲驿站" />
      <div className="grid gap-px overflow-hidden rounded-xl bg-fg/10 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((t, i) => (
          <MaskReveal key={t.id} delay={0.06 * i} className="h-full [&>span]:block [&>span]:h-full">
            <a
              href={t.url}
              target="_blank"
              rel="noreferrer"
              data-cursor="进入"
              className="group flex h-full flex-col justify-between gap-8 bg-bg2 p-6 transition-colors duration-700 hover:bg-[#0d1512]"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono2 text-[10px] uppercase tracking-[0.3em] text-sand">
                  {t.category}
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
              </div>
            </a>
          </MaskReveal>
        ))}
      </div>
      <MaskReveal delay={0.2}>
        <div className="mt-12 text-center">
          <Magnetic>
            <Link
              to="/nav"
              data-cursor="查看全部"
              className="inline-block rounded-full border border-oasis/40 px-8 py-3 font-mono2 text-xs uppercase tracking-[0.3em] text-oasis transition-colors duration-500 hover:bg-oasis hover:text-bg"
            >
              全部驿站 →
            </Link>
          </Magnetic>
        </div>
      </MaskReveal>
    </section>
  )
}
