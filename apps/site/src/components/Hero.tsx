import checkMarkSvg from '../assets/shapes/check-mark.svg?raw'
import chevronSingleSvg from '../assets/shapes/chevron-single.svg?raw'
import chevronTripleSvg from '../assets/shapes/chevron-triple.svg?raw'
import CopyIcon from '../assets/lucide/copy.svg?raw'
import IconCarousel from './IconCarousel'
import { RuunSVG } from 'getruun-react'
import { useState } from 'react'
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

  const handleClick = () => {
    navigator.clipboard.writeText(`npm install getruun`)
    setIsCopied(true)
    setMorph(true)
  }

  return (
    <section className="flex flex-col h-[85vh] w-full justify-center items-center pb-[16vh]">
      <div className="flex flex-col justify-center items-center gap-6">
        {/* Mobile layout */}
        <div className='md:hidden flex flex-col gap-3 items-center font-semibold'>
          <motion.div variants={line} className='whitespace-nowrap leading-none text-[20px]'>
            <span>Ruun Is an SVG Animation Library</span>
          </motion.div>
          <motion.div variants={line} className='whitespace-nowrap leading-none text-[12px]' style={{ color: '#D4D4D4' }}>
            <span>Powered by Spring Physics · Any Framework, Any SVG</span>
          </motion.div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:flex md:flex-col md:items-center gap-3 text-center font-semibold">
          <motion.div variants={line} className='text-[32px] leading-none'>
            <span>Ruun Is an SVG Animation Library</span>
          </motion.div>
          <motion.div variants={line} className='text-[16px] leading-none' style={{ color: '#D4D4D4' }}>
            <span>Powered by Spring Physics · Any Framework, Any SVG</span>
          </motion.div>
        </div>

        <motion.div className="flex flex-row gap-3" variants={buttons} initial="hidden" animate="visible">
          <button data-hover onMouseEnter={() => setFillHover(true)} onMouseLeave={() => setFillHover(false)} onClick={() => lenis?.scrollTo('#demo-section')} className="hidden md:flex relative overflow-hidden leading-none gap-1.5 justify-center items-center text-[10px] w-[96px] h-[28px] rounded-full" style={{ border: '1px solid transparent', background: 'linear-gradient(#f5f5f7, #f5f5f7) padding-box, radial-gradient(ellipse at 100% 85%, #b8b8b8 0%, #a4a4a4 30%, #a0a0a0 55%) border-box' }}>
            <div className="absolute bottom-0 left-0 right-0 bg-black" style={{ height: fillHover ? '100%' : '0%', transition: 'height 0.4s ease' }} />
            <div style={{ mixBlendMode: 'difference', color: 'white' }} className="relative z-10 flex items-center gap-1.5">
              Get Started <RuunSVG className="w-[8px] h-[8px] overflow-visible" from={chevronSingleSvg} to={chevronTripleSvg} active={fillHover} config={{ stiffness: 400, damping: 20, mass: 0.8 }} />
            </div>
          </button>
          <button data-hover onClick={handleClick} style={{ color: copied ? '#A3A3A3' : '#404040' }} className="flex leading-none gap-1.5 justify-center items-center text-[10px] px-4 h-[28px] rounded-full border border-gray-200">npm install ruun<RuunSVG className="hidden md:block w-[8px] h-[8px] overflow-visible" viewBox='0 0 24 24' from={CopyIcon} to={checkMarkSvg} active={morph} /></button>
        </motion.div>
        <IconCarousel />
      </div>
    </section>
  )
}
