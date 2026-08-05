import { useEffect, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { applyTheme, getTheme, transitionTheme, type Theme } from '../../lib/theme'

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    setTheme(getTheme())
  }, [])

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    transitionTheme(e.clientX, e.clientY, () => {
      applyTheme(next)
      setTheme(next)
    })
  }

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? '切换到日间模式' : '切换到夜间模式'}
      title={theme === 'dark' ? '日出' : '夜幕'}
      className={`glass flex h-9 w-9 items-center justify-center rounded-full text-fg transition-all duration-500 hover:border-oasis/50 hover:text-oasis active:scale-90 ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -120, opacity: 0, scale: 0.4 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 120, opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
