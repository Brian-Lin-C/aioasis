import MaskReveal from '../../components/motion/MaskReveal'

export function SectionHeading({ en, zh }: { en: string; zh: string }) {
  return (
    <div className="mb-14 md:mb-20">
      <MaskReveal>
        <span className="font-mono2 text-[11px] uppercase tracking-[0.4em] text-sand">{en}</span>
      </MaskReveal>
      <MaskReveal delay={0.12}>
        <h2 className="mt-3 font-display text-[clamp(1.8rem,5vw,3.2rem)] font-bold text-fg">{zh}</h2>
      </MaskReveal>
    </div>
  )
}

export default function AboutSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-28 md:py-40">
      <SectionHeading en="About" zh="关于这片绿洲" />
      <MaskReveal delay={0.15}>
        <p className="max-w-[30em] text-lg leading-loose text-fg/90 md:text-xl">
          我是一名 AI 探索者，也是一个喜欢动手造的创作者。
        </p>
      </MaskReveal>
      <MaskReveal delay={0.28}>
        <p className="mt-8 max-w-[30em] leading-loose text-muted">
          这里是我的数字营地：导航页「驿站」是我沿路标记的水源——那些真正好用的
          AI 工具；博客「观测」是我的行进日志——学到的、想到的、做出来的。
          沙漠很大，但绿洲可以自己种。
        </p>
      </MaskReveal>
      <MaskReveal delay={0.4}>
        <div className="mt-12 flex gap-10 font-mono2 text-[11px] uppercase tracking-[0.3em] text-muted">
          <span>Explorer × Creator</span>
          <span className="text-sand">Since 2026</span>
        </div>
      </MaskReveal>
    </section>
  )
}
