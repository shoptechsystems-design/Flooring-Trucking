import { useEffect } from 'react'
import Lenis from 'lenis'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Divisions, { Marquee } from './components/Divisions'
import FlooringSection from './components/FlooringSection'
import FreightSection from './components/FreightSection'
import { Why, Process } from './components/Why'
import { About } from './components/About'
import { ServiceArea } from './components/ServiceArea'
import { Reviews, FinalCTA, Contact, Footer, StickyBar } from './components/Closing'

export default function App() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let lenis
    let raf
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95 })
      const loop = (t) => {
        lenis.raf(t)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      const el = id.length > 1 ? document.querySelector(id) : null
      if (!el && id !== '#home') return
      e.preventDefault()
      const target = id === '#home' ? 0 : el
      if (lenis) lenis.scrollTo(target, { offset: id === '#home' ? 0 : -80, duration: 1.4 })
      else window.scrollTo({ top: id === '#home' ? 0 : el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
    }
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(raf)
      lenis?.destroy()
    }
  }, [])

  return (
    <>
      <Loader />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Divisions />
        <FlooringSection />
        <FreightSection />
        <Why />
        <Process />
        <About />
        <ServiceArea />
        <Reviews />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <StickyBar />
    </>
  )
}
