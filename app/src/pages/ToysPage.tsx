import { Link } from 'react-router-dom'
import { ArrowUpRight, Fish, Gamepad2, Play } from 'lucide-react'
import { toys } from '../data/toys'
import { gameLinks, LINK_SECTIONS } from '../data/links'
import type { GameLink } from '../types/content'
import MaskReveal from '../components/motion/MaskReveal'

function LinkCard({ link }: { link: GameLink }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className="glass glass-hover group flex h-full flex-col gap-3 rounded-2xl p-5 md:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-fg transition-colors duration-500 group-hover:text-oasis">
          {link.name}
        </h3>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-oasis/40 text-oasis transition-all duration-500 group-hover:bg-oasis group-hover:text-bg">
          <ArrowUpRight size={14} />
        </span>
      </div>
      <p className="text-sm leading-relaxed text-muted">{link.pitch}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-1 font-mono2 text-[10px] tracking-[0.15em]">
        <span className="rounded-full border border-oasis/40 px-2.5 py-0.5 text-oasis">纯中文</span>
        {link.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-fg/15 px-2.5 py-0.5 text-muted">
            {tag}
          </span>
        ))}
      </div>
    </a>
  )
}

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
          沙漠里也需要游乐场。上半层是「摸鱼直通车」——策展过的中文游戏网站，
          每个都实测过国内秒开、点开即玩、不用注册；下半层是「本机珍藏」——
          收在站里的离线小游戏，断网也能玩。工作再累，也要记得给自己留一扇窗。
        </p>
      </MaskReveal>

      {/* 摸鱼直通车：外链游戏网站 */}
      <MaskReveal delay={0.25}>
        <div className="mt-16 flex items-baseline gap-3">
          <Fish size={18} className="translate-y-0.5 text-oasis" />
          <h2 className="font-display text-xl font-bold text-fg md:text-2xl">摸鱼直通车</h2>
          <span className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-sand">
            {gameLinks.length} links
          </span>
        </div>
      </MaskReveal>

      {LINK_SECTIONS.map((section) => {
        const links = gameLinks.filter((l) => l.section === section)
        if (links.length === 0) return null
        return (
          <section key={section} className="mt-12">
            <MaskReveal>
              <h3 className="font-mono2 text-xs uppercase tracking-[0.35em] text-sand">
                {section}
                <span className="ml-3 text-muted">{links.length}</span>
              </h3>
            </MaskReveal>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {links.map((l, i) => (
                <MaskReveal key={l.id} delay={0.05 * (i % 4)}>
                  <LinkCard link={l} />
                </MaskReveal>
              ))}
            </div>
          </section>
        )
      })}

      {/* 本机珍藏：本地离线小游戏 */}
      <MaskReveal delay={0.15}>
        <div className="mt-24 flex items-baseline gap-3">
          <Gamepad2 size={18} className="translate-y-0.5 text-oasis" />
          <h2 className="font-display text-xl font-bold text-fg md:text-2xl">本机珍藏</h2>
          <span className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-sand">
            {toys.length} offline
          </span>
        </div>
        <p className="mt-3 max-w-[32em] text-sm leading-relaxed text-muted">
          收在绿洲站内的离线小游戏——外链挂了、公司网抽风了，这里永远能玩。
          每台机器都查验过许可证、标明了原作者。
        </p>
      </MaskReveal>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {toys.map((toy, i) => (
          <MaskReveal key={toy.slug} delay={0.06 * (i % 4)}>
            <Link
              to={`/toys/${toy.slug}`}
              className="glass glass-hover group flex h-full flex-col gap-3 rounded-2xl p-5 md:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-lg font-semibold text-fg transition-colors duration-500 group-hover:text-oasis">
                    {toy.name}
                  </h3>
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
                {toy.license && (
                  <span className="rounded-full border border-fg/15 px-2.5 py-0.5 text-muted">
                    {toy.license}
                  </span>
                )}
              </div>
            </Link>
          </MaskReveal>
        ))}
      </div>

      <MaskReveal delay={0.1}>
        <p className="mt-24 text-center font-mono2 text-xs text-muted">
          发现好玩的纯中文游戏站？{' '}
          <a
            href="https://github.com/Brian-Lin-C/aioasis/issues/new?title=%E6%91%B8%E9%B1%BC%E7%9B%B4%E9%80%9A%E8%BD%A6%E6%8E%A8%E8%8D%90%EF%BC%9A"
            target="_blank"
            rel="noreferrer"
            className="text-oasis underline decoration-oasis/30 underline-offset-4 transition-colors duration-500 hover:decoration-oasis"
          >
            推荐上架
          </a>
          。
        </p>
      </MaskReveal>
    </div>
  )
}
