import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { toys } from '../data/toys'

/** 全屏游玩页：顶部一条返回栏，其余全部留给游戏 iframe（沙盒隔离） */
export default function ToyPlayPage() {
  const { slug } = useParams<{ slug: string }>()
  const toy = toys.find((t) => t.slug === slug)

  if (!toy) {
    return (
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-5 px-6 text-center">
        <p className="font-display text-2xl font-bold text-fg">游戏厅里没这台机器</p>
        <Link
          to="/toys"
          className="rounded-full border border-oasis/40 px-5 py-2 font-mono2 text-xs tracking-[0.2em] text-oasis transition-all duration-500 hover:bg-oasis hover:text-bg"
        >
          返回游戏厅
        </Link>
      </div>
    )
  }

  const src = `${import.meta.env.BASE_URL}toys/${toy.slug}/${toy.entry ?? 'index.html'}`

  return (
    <div className="flex h-screen flex-col pt-16 md:pt-20">
      <div className="flex items-center justify-between gap-4 border-b border-fg/10 px-4 py-2.5 md:px-6">
        <Link
          to="/toys"
          className="flex items-center gap-2 font-mono2 text-xs tracking-[0.2em] text-muted transition-colors duration-500 hover:text-fg"
        >
          <ArrowLeft size={14} />
          游戏厅
        </Link>
        <div className="flex min-w-0 items-baseline gap-2">
          <h1 className="truncate font-display text-sm font-semibold text-fg">{toy.name}</h1>
          <span className="hidden font-mono2 text-[10px] uppercase tracking-[0.2em] text-sand sm:inline">
            {toy.nameEn}
          </span>
        </div>
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 font-mono2 text-xs tracking-[0.15em] text-muted transition-colors duration-500 hover:text-oasis"
        >
          <ExternalLink size={13} />
          <span className="hidden sm:inline">新窗口</span>
        </a>
      </div>
      <iframe
        src={src}
        title={toy.name}
        data-lenis-prevent
        allow="autoplay; fullscreen; gamepad"
        className="w-full flex-1 border-0 bg-bg"
      />
    </div>
  )
}
