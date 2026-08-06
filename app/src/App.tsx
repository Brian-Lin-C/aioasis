import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import SiteHeader from './components/layout/SiteHeader'
import SiteFooter from './components/layout/SiteFooter'
import Preloader from './components/motion/Preloader'
import { useLenis, scrollToTop } from './hooks/useLenis'
import Home from './pages/Home'
import NavPage from './pages/NavPage'
import TrailsPage from './pages/TrailsPage'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'
import NotFound from './pages/NotFound'
import CursorGlow from './components/motion/CursorGlow'

function AnimatedRoutes() {
  const location = useLocation()
  useEffect(() => {
    scrollToTop()
  }, [location.pathname])
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/nav" element={<NavPage />} />
          <Route path="/trails" element={<TrailsPage />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <SiteFooter />
      </motion.main>
    </AnimatePresence>
  )
}

/** 彩蛋：标签页挽留（切走时改标题）+ 控制台暗号（ASCII 绿洲） */
function useEasterEggs() {
  useEffect(() => {
    const original = document.title
    const onVis = () => {
      document.title = document.hidden ? '🏜️ 绿洲等你回来…' : original
    }
    document.addEventListener('visibilitychange', onVis)

    console.log(
      '%c        🌴🌴\n   ～ ～ ～ ～ ～\n      AI OASIS\n    AI绿洲 · aioasis.top',
      'color:#0d9488;font-weight:bold;line-height:1.6',
    )
    console.log(
      '%c能打开控制台的都是同类 → %chttps://github.com/brian-lin-c',
      'color:#a5761f;font-weight:bold',
      'color:#0d9488',
    )
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  useLenis()
  useEasterEggs()
  return (
    <HashRouter>
      <div className="grain-overlay min-h-screen bg-bg text-fg">
        {!loaded && <Preloader onDone={() => setLoaded(true)} />}
        {/* 环境光斑：给全站玻璃提供可折射的色彩，日夜迁徙 */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
          <div className="amb amb-a" />
          <div className="amb amb-b" />
          <div className="amb amb-c" />
        </div>
        <SiteHeader />
        <CursorGlow />
        <AnimatedRoutes />
      </div>
    </HashRouter>
  )
}
