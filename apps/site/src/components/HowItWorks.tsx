import hiw1Svg from '../assets/hiw/hiw1.svg?raw'
import hiw2Svg from '../assets/hiw/hiw2.svg?raw'
import hiw3Svg from '../assets/hiw/hiw3.svg?raw'
import hiw4Svg from '../assets/hiw/hiw4.svg?raw'
import { initMorphSvg, morphSvg } from 'getruun'
import { useRef, useEffect, useState } from 'react'
import { useLenis } from 'lenis/react'
import { motion, AnimatePresence } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Any SVG. No Prep',
    description: 'Pass any SVG path directly — drawn in Figma, exported from Illustrator, or hand-coded. Ruun normalizes mismatched points automatically.',
    svg: hiw1Svg
  },
  {
    num: '02',
    title: 'One Function Call',
    description: 'morphSvg(element, fromSvg, toSvg) is the entire API. Trigger it on click, scroll, hover, or any event your UI already handles.',
    svg: hiw2Svg
  },
  {
    num: '03',
    title: 'Accessible by Default',
    description: 'Detects prefers-reduced-motion automatically. Users who need reduced motion get an instant swap — no animation, no jarring transitions.',
    svg: hiw3Svg
  },
  {
    num: '04',
    title: 'Real Spring Physics',
    description: 'Control feel with stiffness, damping, and mass. Springs overshoot, settle, and react naturally — no easing curves to tweak.',
    svg: hiw4Svg
  }
]

export default function HowItWorks() {
  const sectionRef   = useRef<HTMLDivElement>(null)
  const svgRef       = useRef<SVGSVGElement>(null)
  const initRef      = useRef(false)
  const activeStepRef = useRef(0)
  const morphTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (!svgRef.current || initRef.current) return
    initMorphSvg(svgRef.current, steps[0].svg)
    initRef.current = true
    return () => {
      initRef.current = false
      if (morphTimerRef.current) clearTimeout(morphTimerRef.current)
    }
  }, [])

  useLenis(() => {
    if (!sectionRef.current || !svgRef.current || !initRef.current) return
    const rect        = sectionRef.current.getBoundingClientRect()
    const scrolled    = -rect.top
    const scrollableH = rect.height - window.innerHeight
    if (scrollableH <= 0) return
    const progress = Math.min(1, Math.max(0, scrolled / scrollableH))
    const step = Math.min(steps.length - 1, Math.floor(progress * steps.length))
    if (step === activeStepRef.current) return
    activeStepRef.current = step
    setActiveStep(step)
    if (morphTimerRef.current) clearTimeout(morphTimerRef.current)
    morphTimerRef.current = setTimeout(() => {
      if (svgRef.current) morphSvg(svgRef.current, steps[activeStepRef.current].svg, 'smooth')
    }, 60)
  })

  return (
    <section ref={sectionRef} style={{ height: '300vh' }}>
      <div style={{ position: 'sticky', top: '50%', transform: 'translateY(-50%)' }} className="flex flex-col gap-8">
        <p className="text-[20px] font-semibold leading-none">How it Works</p>

        {/* Card + tab */}
        <div className="relative w-full">
          <div className="w-full rounded-xl flex flex-col" style={{ backgroundColor: '#DCDCDC', height: '420px' }}>
            {/* White SVG frame */}
            <div className="flex-1" style={{ padding: '20px 20px 0' }}>
              <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                <svg ref={svgRef} viewBox="0 0 256 256" className="w-[200px] h-[200px] overflow-visible" />
              </div>
            </div>

            {/* Text area */}
            <div className="relative" style={{ height: '140px', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ position: 'absolute', inset: 0, padding: '0 20px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
                >
                  <p className="text-[8px] leading-none uppercase tracking-widest mb-2" style={{ color: '#C0C0C0' }}>{steps[activeStep].num}</p>
                  <h4 className="text-[16px] font-semibold leading-snug mb-1">{steps[activeStep].title}</h4>
                  <p className="text-[12px] leading-relaxed" style={{ color: '#A3A3A3' }}>{steps[activeStep].description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Vertical progress tab */}
          <div style={{ position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)', backgroundColor: '#DCDCDC', borderRadius: '99px', padding: '10px 6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {steps.map((_, i) => (
              <div
                key={i}
                className="rounded-full bg-black transition-opacity duration-300"
                style={{ width: '4px', height: '4px', opacity: i === activeStep ? 1 : 0.15 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
