import OasisScene from '../../components/canvas/OasisScene'
import MaskReveal from '../../components/motion/MaskReveal'
import { ChevronDown } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative flex h-svh flex-col items-center justify-center overflow-hidden">
      <OasisScene />
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <MaskReveal delay={0.1}>
          <span className="font-mono2 text-[11px] uppercase tracking-[0.4em] text-sand">
            Personal Hub · Est. 2026
          </span>
        </MaskReveal>
        <h1 className="mt-6 font-display font-bold leading-none tracking-tight">
          <MaskReveal delay={0.25}>
            <span className="block text-[clamp(3.5rem,13vw,11rem)] text-fg">AI OASIS</span>
          </MaskReveal>
          <MaskReveal delay={0.4}>
            <span className="mt-2 block text-[clamp(1.4rem,4vw,2.6rem)] text-oasis">AI绿洲</span>
          </MaskReveal>
        </h1>
        <MaskReveal delay={0.6}>
          <p className="mt-8 max-w-[30em] text-base text-muted md:text-lg">
            在数字沙漠里，种一片自己的绿洲
          </p>
        </MaskReveal>
      </div>
      <div className="absolute bottom-8 z-10 flex flex-col items-center gap-2 text-muted">
        <span className="font-mono2 text-[10px] uppercase tracking-[0.35em]">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  )
}
