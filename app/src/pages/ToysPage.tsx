import { Link } from 'react-router-dom'
import { Gamepad2, Play } from 'lucide-react'
import { toys } from '../data/toys'
import MaskReveal from '../components/motion/MaskReveal'

export default function ToysPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pb-32 pt-32 md:pt-40">
      <MaskReveal>
        <span className="font-mono2 text-[11px] uppercase tracking-[0.4em] text-sand">Arcade</span>
      </MaskReveal>
      <MaskReveal delay={0.12}>
        <h1 className="mt-3 font-display text-[clamp(2rem,6vw,3.5rem)] font-bold text-fg">
          绿洲游戏厅
        </h1>
      </MaskReveal>
      <MaskReveal delay={0.2}>
        <p className="mt-4 max-w-[32em] text-muted">
          沙漠里也需要游乐场。这里收录站长和朋友们鼓捣的小玩意——点开即玩，
          无需注册，没有广告，玩完就走。
        </p>
      </MaskReveal>

      {toys.length > 0 ? (
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {toys.map((toy, i) => (
            <MaskReveal key={toy.slug} delay={0.06 * (i % 4)}>
              <Link
                to={`/toys/${toy.slug}`}
                className="glass glass-hover group flex h-full flex-col gap-3 rounded-2xl p-5 md:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h2 className="font-display text-lg font-semibold text-fg transition-colors duration-500 group-hover:text-oasis">
                      {toy.name}
                    </h2>
                    <span className="font-mono2 text-[11px] uppercase tracking-[0.2em] text-sand">
                      {toy.nameEn}
                    </span>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-oasis/40 text-oasis transition-all duration-500 group-hover:bg-oasis group-hover:text-bg">
                    <Play size={14} className="ml-0.5" />
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted">{toy.description}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-1 font-mono2 text-[10px] tracking-[0.15em]">
                  {toy.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-fg/15 px-2.5 py-0.5 text-muted">
                      {tag}
                    </span>
                  ))}
                  {toy.author && (
                    <span className="rounded-full border border-sand/40 px-2.5 py-0.5 text-sand">
                      by {toy.author}
                    </span>
                  )}
                </div>
              </Link>
            </MaskReveal>
          ))}
        </div>
      ) : (
        <MaskReveal delay={0.3}>
          <div className="mt-14 flex flex-col items-center gap-5 rounded-2xl border border-dashed border-fg/20 px-6 py-16 text-center">
            <Gamepad2 size={32} className="text-sand" />
            <p className="font-display text-lg text-fg">游戏厅正在进货中</p>
            <p className="max-w-[30em] text-sm leading-relaxed text-muted">
              第一批小玩意还在路上。如果你也做了个好玩的静态小游戏，
              欢迎投稿——点开即玩的那种。
            </p>
            <a
              href="https://github.com/Brian-Lin-C/aioasis/issues/new?title=%E6%8A%95%E7%A8%BF%E5%B0%8F%E6%B8%B8%E6%88%8F%EF%BC%9A"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-oasis/40 px-5 py-2 font-mono2 text-xs tracking-[0.2em] text-oasis transition-all duration-500 hover:bg-oasis hover:text-bg"
            >
              投稿小游戏
            </a>
          </div>
        </MaskReveal>
      )}

      {toys.length > 0 && (
        <MaskReveal delay={0.1}>
          <p className="mt-24 text-center font-mono2 text-xs text-muted">
            做了个好玩的静态小游戏？{' '}
            <a
              href="https://github.com/Brian-Lin-C/aioasis/issues/new?title=%E6%8A%95%E7%A8%BF%E5%B0%8F%E6%B8%B8%E6%88%8F%EF%BC%9A"
              target="_blank"
              rel="noreferrer"
              className="text-oasis underline decoration-oasis/30 underline-offset-4 transition-colors duration-500 hover:decoration-oasis"
            >
              投稿上架
            </a>
            。
          </p>
        </MaskReveal>
      )}
    </div>
  )
}
