import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getPost } from '../lib/blog'
import MaskReveal from '../components/motion/MaskReveal'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPost(slug) : undefined

  if (!post) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 pt-24 text-center">
        <p className="font-mono2 text-sm text-muted">迷失在沙漠里 · 404</p>
        <Link to="/blog" className="font-mono2 text-xs uppercase tracking-[0.3em] text-oasis">
          ← 返回观测日志
        </Link>
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-2xl px-6 pb-32 pt-32 md:pt-40">
      <MaskReveal>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 font-mono2 text-xs uppercase tracking-[0.3em] text-muted transition-colors duration-500 hover:text-oasis"
        >
          <ArrowLeft size={14} /> 观测日志
        </Link>
      </MaskReveal>
      <MaskReveal delay={0.1}>
        <h1 className="mt-8 font-display text-[clamp(1.8rem,5vw,3rem)] font-bold leading-tight text-fg">
          {post.title}
        </h1>
      </MaskReveal>
      <MaskReveal delay={0.2}>
        <div className="mt-6 flex flex-wrap items-center gap-4 font-mono2 text-[11px] uppercase tracking-[0.25em] text-muted">
          <span className="text-sand">{post.date}</span>
          <span>{post.readingMinutes} min read</span>
          {post.tags.map((t) => (
            <span key={t} className="text-oasis">{t}</span>
          ))}
        </div>
      </MaskReveal>
      <div
        className="prose-oasis mt-12 max-w-[32em]"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  )
}
