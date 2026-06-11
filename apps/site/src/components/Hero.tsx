import checkMarkSvg from '../assets/shapes/check-mark.svg?raw'
import chevronSingleSvg from '../assets/shapes/chevron-single.svg?raw'
import chevronTripleSvg from '../assets/shapes/chevron-triple.svg?raw'
import CopyIcon from '../assets/lucide/copy.svg?raw'
import IconCarousel from './IconCarousel'
import { RuunSVG } from 'getruun-react'
import { useState, useRef, useLayoutEffect } from 'react'
import { useLenis } from 'lenis/react'
import { motion, type Variants } from 'framer-motion'

const line: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
}

const buttons: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 } },
}


export default function Hero() {
  const [morph, setMorph] = useState(false)
  const [copied, setIsCopied] = useState(false)
  const [fillHover, setFillHover] = useState(false)
  const lenis = useLenis()
  const titleRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const el = titleRef.current
    if (!el) return
    const fit = () => {
      const parent = el.parentElement
      if (!parent) return
      const available = parent.clientWidth
      if (available === 0) return
      el.style.transform = 'none'
      el.style.fontSize = '512px'
      const probeW = el.offsetWidth
      if (probeW === 0) return
      el.style.fontSize = Math.floor((available / probeW) * 512) + 'px'
      const actualW = el.offsetWidth
      if (actualW > 0) {
        el.style.transform = `scaleX(${available / actualW})`
        el.style.transformOrigin = 'center'
      }
    }
    fit()
    // Retry after fonts and after the first paint — catches cases where
    // Vite injects CSS async so the md:flex display is not yet applied at mount
    document.fonts.ready.then(() => requestAnimationFrame(fit))
    window.addEventListener('resize', fit)
    // ResizeObserver fires when the parent goes from display:none to flex
    const ro = new ResizeObserver(fit)
    if (el.parentElement) ro.observe(el.parentElement)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', fit)
    }
  }, [])

  const handleClick = () => {
    navigator.clipboard.writeText(`npm install getruun`)
    setIsCopied(true)
    setMorph(true)
  }

  return (
    <section className="flex flex-col h-[85vh] w-full justify-center items-center pb-[16vh]">
      <div className="flex flex-col justify-center items-center gap-8 w-full">
        {/* Mobile layout */}
        <div className='md:hidden flex flex-col gap-4 items-center font-semibold text-center'>
          <motion.div variants={line} className='leading-tight text-[28px]'>
            <span>Ruun Is an SVG Animation Library</span>
          </motion.div>
          <motion.div variants={line} className='leading-snug text-[14px]' style={{ color: '#D4D4D4' }}>
            <span>Powered by Spring Physics · Any Framework, Any SVG</span>
          </motion.div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:flex md:flex-col md:items-center gap-4 text-center font-semibold w-full">
          <motion.div variants={line} className='leading-none w-full'>
            <span ref={titleRef} className='whitespace-nowrap font-semibold' style={{ fontSize: '48px', display: 'inline-block' }}>Ruun Is an SVG Animation Library</span>
          </motion.div>
          <motion.div variants={line} className='text-[20px] leading-none' style={{ color: '#D4D4D4' }}>
            <span>Powered by Spring Physics · Any Framework, Any SVG</span>
          </motion.div>
        </div>

        <motion.div className="flex flex-row gap-4" variants={buttons} initial="hidden" animate="visible">
          <button data-hover onMouseEnter={() => setFillHover(true)} onMouseLeave={() => setFillHover(false)} onClick={() => lenis?.scrollTo('#demo-section')} className="flex relative overflow-hidden leading-none justify-center items-center text-[12px] w-[128px] h-[40px] rounded-full" style={{ border: fillHover ? '1px solid #080808' : '1px solid transparent', background: 'linear-gradient(#f5f5f7, #f5f5f7) padding-box, radial-gradient(ellipse at 100% 85%, #b8b8b8 0%, #a4a4a4 30%, #a0a0a0 55%) border-box' }}>
            <div className="absolute bottom-0 left-0 right-0 bg-[#080808]" style={{ height: fillHover ? '100%' : '0%', transition: 'height 0.4s ease' }} />
            <div style={{ mixBlendMode: 'difference', color: 'white' }} className="relative z-10 flex items-center gap-2">
              Get Started <RuunSVG className="w-[10px] h-[10px] overflow-visible" from={chevronSingleSvg} to={chevronTripleSvg} active={fillHover} config={{ stiffness: 400, damping: 20, mass: 0.8 }} />
            </div>
          </button>
          <button data-hover onClick={handleClick} style={{ color: copied ? '#A3A3A3' : '#404040' }} className="flex leading-none gap-2 justify-center items-center text-[12px] px-6 h-[40px] rounded-full bg-[#f0f0f0]">npm install ruun<RuunSVG className="hidden md:block w-[10px] h-[10px] overflow-visible" viewBox='0 0 24 24' from={CopyIcon} to={checkMarkSvg} active={morph} /></button>
        </motion.div>
        <IconCarousel />
      </div>
    </section>
  )
}
