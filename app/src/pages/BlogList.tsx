import { Link } from 'react-router-dom'
import { loadPosts } from '../lib/blog'
import MaskReveal from '../components/motion/MaskReveal'

export default function BlogList() {
  const posts = loadPosts()
  return (
    <div className="mx-auto max-w-4xl px-6 pb-32 pt-32 md:pt-40">
      <MaskReveal>
        <span className="font-mono2 text-[11px] uppercase tracking-[0.4em] text-sand">Writings</span>
      </MaskReveal>
      <MaskReveal delay={0.12}>
        <h1 className="mt-3 font-display text-[clamp(2rem,6vw,3.5rem)] font-bold text-fg">观测日志</h1>
      </MaskReveal>
      <div className="mt-14 divide-y divide-fg/10">
        {posts.map((p, i) => (
          <MaskReveal key={p.slug} delay={0.08 * i}>
            <Link
              to={`/blog/${p.slug}`}
              data-cursor="阅读"
              className="group flex flex-col gap-3 py-10 md:flex-row md:items-baseline md:justify-between"
            >
              <div>
                <div className="flex gap-3 font-mono2 text-[10px] uppercase tracking-[0.25em] text-oasis">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <h2 className="mt-3 font-display text-2xl font-semibold text-fg transition-colors duration-500 group-hover:text-oasis">
                  {p.title}
                </h2>
                <p className="mt-3 max-w-[34em] text-sm leading-relaxed text-muted">{p.excerpt}</p>
              </div>
              <span className="shrink-0 font-mono2 text-[11px] tracking-[0.25em] text-sand">
                {p.date} · {p.readingMinutes} min
              </span>
            </Link>
          </MaskReveal>
        ))}
      </div>
    </div>
  )
}
