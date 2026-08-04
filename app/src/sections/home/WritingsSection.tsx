import { Link } from 'react-router-dom'
import { loadPosts } from '../../lib/blog'
import { SectionHeading } from './AboutSection'
import MaskReveal from '../../components/motion/MaskReveal'
import Magnetic from '../../components/motion/Magnetic'

export default function WritingsSection() {
  const posts = loadPosts().slice(0, 3)
  return (
    <section className="mx-auto max-w-4xl px-6 py-28 md:py-40">
      <SectionHeading en="Writings" zh="最新观测" />
      <div className="divide-y divide-fg/10">
        {posts.map((p, i) => (
          <MaskReveal key={p.slug} delay={0.08 * i}>
            <Link
              to={`/blog/${p.slug}`}
              data-cursor="阅读"
              className="group flex flex-col gap-2 py-8 transition-colors md:flex-row md:items-baseline md:justify-between"
            >
              <div>
                <h3 className="font-display text-xl font-semibold text-fg transition-colors duration-500 group-hover:text-oasis md:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-[34em] text-sm leading-relaxed text-muted">{p.excerpt}</p>
              </div>
              <span className="shrink-0 font-mono2 text-[11px] uppercase tracking-[0.25em] text-sand">
                {p.date} · {p.readingMinutes} min
              </span>
            </Link>
          </MaskReveal>
        ))}
      </div>
      <MaskReveal delay={0.2}>
        <div className="mt-12 text-center">
          <Magnetic>
            <Link
              to="/blog"
              className="inline-block rounded-full border border-fg/20 px-8 py-3 font-mono2 text-xs uppercase tracking-[0.3em] text-fg transition-colors duration-500 hover:border-oasis hover:text-oasis"
            >
              全部观测 →
            </Link>
          </Magnetic>
        </div>
      </MaskReveal>
    </section>
  )
}
