import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Magnetic from '../motion/Magnetic'

const NAV = [
  { no: '01', zh: '首页', to: '/' },
  { no: '02', zh: '驿站', to: '/nav' },
  { no: '03', zh: '观测', to: '/blog' },
]

export default function SiteHeader() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `font-mono2 text-xs uppercase tracking-[0.25em] transition-colors duration-500 ${
      isActive ? 'text-oasis' : 'text-muted hover:text-fg'
    }`

  return (
    <header className="fixed inset-x-0 top-0 z-[80] flex items-center justify-between px-6 py-5 md:px-10">
      <Magnetic>
        <Link to="/" className="font-mono2 text-sm tracking-[0.2em] text-fg">
          AI OASIS <span className="text-muted">· AI绿洲</span>
        </Link>
      </Magnetic>

      <nav className="hidden items-center gap-8 md:flex">
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} className={linkCls} end={n.to === '/'}>
            <span className="mr-2 text-sand">{n.no}</span>
            {n.zh}
          </NavLink>
        ))}
      </nav>

      <button
        className="text-fg md:hidden"
        onClick={() => setOpen(true)}
        aria-label="打开菜单"
        aria-expanded={open}
      >
        <Menu size={22} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[95] flex flex-col bg-bg/95 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex justify-end px-6 py-5">
              <button onClick={() => setOpen(false)} aria-label="关闭菜单" className="text-fg">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-10">
              {NAV.map((n, i) => (
                <motion.div
                  key={n.to}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.08 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={n.to}
                    end={n.to === '/'}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl text-fg"
                  >
                    <span className="mr-3 font-mono2 text-sm text-sand">{n.no}</span>
                    {n.zh}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
