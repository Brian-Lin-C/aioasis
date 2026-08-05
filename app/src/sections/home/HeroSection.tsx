import OasisScene from '../../components/canvas/OasisScene'
import MaskReveal from '../../components/motion/MaskReveal'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const TITLE = 'AI OASIS'

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
          <span
            className="block text-[clamp(3.5rem,13vw,11rem)] text-fg"
            aria-label={TITLE}
          >
            {TITLE.split('').map((ch, i) => (
              <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{
                    delay: 0.25 + i * 0.055,
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {ch === 'O' ? <span className="oasis-mark" /> : ch === ' ' ? ' ' : ch}
                </motion.span>
              </span>
            ))}
          </span>
          <MaskReveal delay={0.85}>
            <span className="mt-4 block text-[clamp(1rem,2.6vw,1.7rem)] font-light tracking-[0.5em] text-fg">
              AI<span className="text-oasis">绿洲</span>
            </span>
          </MaskReveal>
        </h1>
        <MaskReveal delay={1.05}>
          <p className="mt-8 max-w-[30em] text-base text-muted md:text-lg">
            在数字沙漠里，种一片自己的绿洲
          </p>
        </MaskReveal>
        <MaskReveal delay={1.2}>
          <span className="mt-4 font-mono2 text-[10px] uppercase tracking-[0.35em] text-sand/70">
            Plant your own oasis in the digital desert
          </span>
        </MaskReveal>
      </div>
      <div className="absolute bottom-8 z-10 flex flex-col items-center gap-2 text-muted">
        <span className="font-mono2 text-[10px] uppercase tracking-[0.35em]">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  )
}
