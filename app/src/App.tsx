import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import SiteHeader from './components/layout/SiteHeader'
import SiteFooter from './components/layout/SiteFooter'
import Preloader from './components/motion/Preloader'
import { useLenis, scrollToTop } from './hooks/useLenis'
import Home from './pages/Home'
import NavPage from './pages/NavPage'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'

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
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
        <SiteFooter />
      </motion.main>
    </AnimatePresence>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  useLenis()
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
        <AnimatedRoutes />
      </div>
    </HashRouter>
  )
}
