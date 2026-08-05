import { useEffect, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { applyTheme, celestialPoint, getTheme, transitionTheme, type Theme } from '../../lib/theme'

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    setTheme(getTheme())
    // 订阅全局主题事件：场景里点击太阳/月亮切换后，按钮图标与状态保持同步
    const onTheme = (e: Event) => setTheme((e as CustomEvent<Theme>).detail)
    window.addEventListener('oasis-theme', onTheme)
    return () => window.removeEventListener('oasis-theme', onTheme)
  }, [])

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    // 以 localStorage 为准读取当前主题，避免本地状态与天体点击不同步
    const next: Theme = getTheme() === 'dark' ? 'light' : 'dark'
    // 涟漪固定在场景里太阳/月亮的位置荡开；场景不可见时回退到按钮中心
    const p = celestialPoint()
    let x: number, y: number
    if (p) {
      x = p.x
      y = p.y
    } else {
      const r = e.currentTarget.getBoundingClientRect()
      x = r.left + r.width / 2
      y = r.top + r.height / 2
    }
    transitionTheme(x, y, () => {
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
