import { Link } from 'react-router-dom'
import { ArrowUpRight, Gamepad2, Github, GraduationCap, Mail, Palmtree } from 'lucide-react'
import MaskReveal from '../components/motion/MaskReveal'

const BUILDS = [
  {
    icon: Palmtree,
    name: 'AI绿洲（本站）',
    en: 'aioasis.top',
    desc: '你现在逛的这个。从设计、Canvas 沙漠场景到部署全自己动手，React + TypeScript + Vite。它既是我的主页，也是我学前端的练手作品。',
    href: null, // 就是本站，不跳
  },
  {
    icon: Gamepad2,
    name: '我在修仙界送外卖',
    en: 'Cultivation Express',
    desc: '一款纯文字浏览器小游戏：穿越修仙界重操旧业送外卖。零依赖纯手写，从 v1.1 慢慢磨到 v2.4——因果链、多结局、离线跑单，都是一条条加的。',
    href: '/toys/cultivation-express',
    internal: true,
  },
  {
    icon: Github,
    name: '数据科学项目集',
    en: 'MSc Data Science Portfolio',
    desc: '硕士期间的课程作品集：PySpark 跑 NYC 出租车大数据、Power BI 交互仪表盘、R 行为数据分析、PyTorch 深度学习……笔记本和报告都在。',
    href: 'https://github.com/Brian-Lin-C/ncl-msc-data-science-projects',
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pb-32 pt-32 md:pt-40">
      <MaskReveal>
        <span className="font-mono2 text-[11px] uppercase tracking-[0.4em] text-sand">About</span>
      </MaskReveal>
      <MaskReveal delay={0.12}>
        <h1 className="mt-3 font-display text-[clamp(2rem,6vw,3.5rem)] font-bold text-fg">
          你好，我是 Brian
        </h1>
      </MaskReveal>

      <MaskReveal delay={0.2}>
        <p className="mt-8 max-w-[32em] text-lg leading-loose text-fg/90">
          一个对数据和 AI 保持好奇、并且真的在动手学的记录者。
        </p>
      </MaskReveal>
      <MaskReveal delay={0.28}>
        <p className="mt-6 max-w-[34em] leading-loose text-muted">
          这个站是我的数字营地：「驿站」收录我觉得真正好用的 AI 工具，「小径」是我自己趟过、
          确认不会迷路的学习路线，「观测」是边走边写的行进日志。
          学到的东西不写下来很快就会还给沙漠，所以有了这个绿洲。
        </p>
      </MaskReveal>

      {/* 我在琢磨什么 */}
      <section className="mt-24">
        <MaskReveal>
          <h2 className="font-display text-xl font-bold text-fg md:text-2xl">
            最近在琢磨什么
            <span className="ml-3 font-mono2 text-[11px] font-normal uppercase tracking-[0.3em] text-sand">
              Lately
            </span>
          </h2>
        </MaskReveal>
        <MaskReveal delay={0.1}>
          <p className="mt-6 max-w-[34em] leading-loose text-muted">
            数据这一侧，我用 PySpark 在 Databricks 上跑过 NYC 出租车大数据，
            用 R 追过 MOOC 学习者弃课的原因，也用 Power BI 把英格兰的能耗数据做成过
            会讲故事的仪表盘；模型这一侧，PyTorch 是主力，毕业论文拿 CNN-Transformer
            做了 NILM 用电分解。前端是自学的副业——React 加 TypeScript，
            这个网站本身就是成果之一。
          </p>
        </MaskReveal>
        <MaskReveal delay={0.18}>
          <p className="mt-4 max-w-[34em] leading-loose text-muted">
            而现在，我的注意力越来越多地落在前沿 AI 上——大模型究竟能把活干到哪一步、
            vibecoding 能把一个想法多快变成现实，我都想亲手试一试，再写下自己的结论。
            这个网站和那个修仙小游戏，就是这么试出来的。进展和踩坑，都记在「观测」里。
          </p>
        </MaskReveal>
      </section>

      {/* 我搭的东西 */}
      <section className="mt-24">
        <MaskReveal>
          <h2 className="font-display text-xl font-bold text-fg md:text-2xl">
            我搭的东西
            <span className="ml-3 font-mono2 text-[11px] font-normal uppercase tracking-[0.3em] text-sand">
              Builds
            </span>
          </h2>
        </MaskReveal>
        <div className="mt-8 flex flex-col gap-4">
          {BUILDS.map((b, i) => {
            const Icon = b.icon
            const inner = (
              <>
                <div className="flex items-baseline gap-3">
                  <Icon size={18} className="translate-y-0.5 shrink-0 text-oasis" />
                  <h3 className="font-display text-lg font-semibold text-fg">{b.name}</h3>
                  <span className="font-mono2 text-[11px] uppercase tracking-[0.2em] text-sand">
                    {b.en}
                  </span>
                  {b.href && (
                    <ArrowUpRight
                      size={14}
                      className="ml-auto shrink-0 text-muted transition-colors duration-500 group-hover:text-oasis"
                    />
                  )}
                </div>
                <p className="mt-3 pl-[30px] text-sm leading-relaxed text-muted">{b.desc}</p>
              </>
            )
            const cls =
              'glass glass-hover group block rounded-2xl p-5 transition-colors duration-500 md:p-6'
            return (
              <MaskReveal key={b.name} delay={0.08 * i}>
                {b.href ? (
                  b.internal ? (
                    <Link to={b.href} className={cls} data-cursor="试玩">
                      {inner}
                    </Link>
                  ) : (
                    <a href={b.href} target="_blank" rel="noreferrer" className={cls}>
                      {inner}
                    </a>
                  )
                ) : (
                  <div className={cls}>{inner}</div>
                )}
              </MaskReveal>
            )
          })}
        </div>
      </section>

      {/* 学历 + 联系 */}
      <section className="mt-24">
        <MaskReveal>
          <p className="flex items-baseline gap-3 text-sm text-muted">
            <GraduationCap size={16} className="translate-y-0.5 shrink-0 text-sand" />
            <span>
              英国纽卡斯尔大学 · 数据科学硕士
              <span className="ml-2 font-mono2 text-[11px] uppercase tracking-[0.2em] text-oasis">
                with Distinction
              </span>
            </span>
          </p>
        </MaskReveal>

        <MaskReveal delay={0.12}>
          <div className="mt-12 border-t border-fg/10 pt-10">
            <p className="max-w-[34em] leading-loose text-fg/90">
              绿洲门口一直有灯。想聊聊数据、AI，或者只是想打个招呼——
              写信给我，我会回。
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="mailto:Brian_LC@foxmail.com"
                className="flex items-center gap-2 rounded-full border border-oasis/40 px-5 py-2.5 font-mono2 text-xs tracking-[0.15em] text-oasis transition-all duration-500 hover:bg-oasis hover:text-bg active:scale-95"
              >
                <Mail size={14} />
                Brian_LC@foxmail.com
              </a>
              <a
                href="https://github.com/Brian-Lin-C"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 font-mono2 text-xs uppercase tracking-[0.25em] text-muted transition-colors duration-500 hover:text-oasis"
              >
                <Github size={14} />
                GitHub
                <ArrowUpRight size={11} />
              </a>
            </div>
          </div>
        </MaskReveal>
      </section>
    </div>
  )
}
