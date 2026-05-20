import hiw1Svg from '../assets/phosphor/ph-ghost-fill.svg?raw'
import hiw2Svg from '../assets/phosphor/ph-function-fill.svg?raw'
import hiw3Svg from '../assets/phosphor/ph-person-simple-circle-fill.svg?raw'
import hiw4Svg from '../assets/phosphor/ph-atom-fill.svg?raw'
import { initMorphSvg, morphSvg } from 'ruune'
import { useRef, useEffect, useState, useCallback } from 'react'
import { useLenis } from 'lenis/react'

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
  const sectionRef    = useRef<HTMLDivElement>(null)
  const svgRef        = useRef<SVGSVGElement>(null)
  const initRef       = useRef(false)
  const activeStepRef = useRef(-1)
  const morphTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [activeStep, setActiveStep] = useState(0)

  const mobileSvgRef     = useRef<SVGSVGElement>(null)
  const mobileInitRef    = useRef(false)
  const mobileFirstRender = useRef(true)
  const swipeRef         = useRef<HTMLDivElement>(null)
  const [mobileStep, setMobileStep] = useState(0)

  useEffect(() => {
    if (!mobileSvgRef.current || mobileInitRef.current) return
    initMorphSvg(mobileSvgRef.current, steps[0].svg)
    mobileInitRef.current = true
  }, [])

  useEffect(() => {
    if (mobileFirstRender.current) { mobileFirstRender.current = false; return }
    if (!mobileSvgRef.current) return
    morphSvg(mobileSvgRef.current, steps[mobileStep].svg, 'smooth')
  }, [mobileStep])

  const advanceMobile = useCallback((dir: 1 | -1) => {
    setMobileStep(prev => (prev + dir + steps.length) % steps.length)
  }, [])

  useEffect(() => {
    const el = swipeRef.current
    if (!el) return
    let startX = 0
    const onDown = (e: PointerEvent) => { startX = e.clientX }
    const onUp   = (e: PointerEvent) => {
      const delta = startX - e.clientX
      if (Math.abs(delta) < 50) return
      advanceMobile(delta > 0 ? 1 : -1)
    }
    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointerup', onUp)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointerup', onUp)
    }
  }, [advanceMobile])

  useEffect(() => {
    if (!svgRef.current || initRef.current) return
    initMorphSvg(svgRef.current, steps[0].svg)
    initRef.current = true
    activeStepRef.current = 0
    return () => {
      initRef.current = false
      activeStepRef.current = -1
      if (morphTimerRef.current) clearTimeout(morphTimerRef.current)
    }
  }, [])

  useLenis(() => {
    if (!sectionRef.current || !svgRef.current || !initRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const scrolled = -rect.top
    const scrollableHeight = rect.height - window.innerHeight
    if (scrollableHeight <= 0) return
    const progress = Math.min(1, Math.max(0, scrolled / scrollableHeight))
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
    <>
    {/* Mobile: tap-to-advance */}
    <section className="md:hidden flex flex-col border-t-1 border-dashed border-gray-600 pb-16 pt-8">
      <div className="flex flex-col justify-center items-center p-[16px] gap-2 mb-4">
        <h3>How it Works</h3>
      </div>
      <div
        ref={swipeRef}
        className="flex flex-col items-center gap-6 px-4 select-none"
      >
        <div
          className="flex items-center justify-center w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%236b7280' stroke-width='1.5' stroke-dasharray='4 4'/%3E%3C/svg%3E")`,
            backgroundPosition: '20px 20px',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 55%, transparent 90%)',
            maskImage: 'radial-gradient(ellipse at center, black 55%, transparent 90%)',
            height: '220px',
          }}
        >
          <svg ref={mobileSvgRef} viewBox="0 0 256 256" className="w-[160px] h-[160px] overflow-visible" />
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-[9px] text-gray-400">{steps[mobileStep].num}</p>
          <h4 className="text-[15px] font-bold">{steps[mobileStep].title}</h4>
          <p className="text-[11px] leading-relaxed max-w-[280px] text-gray-600">{steps[mobileStep].description}</p>
        </div>
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div key={i} className="w-[6px] h-[6px] rounded-full bg-black transition-opacity duration-300" style={{ opacity: i === mobileStep ? 1 : 0.2 }} />
          ))}
        </div>
        <p className="text-[9px] text-gray-400">swipe to continue</p>
      </div>
    </section>

    {/* Desktop: sticky scroll */}
    <section ref={sectionRef} style={{ height: '290vh' }} className="hidden md:block">
      <div style={{ position: 'sticky', top: '15vh', height: '70vh' }} className="flex items-center">
        <div className="flex items-stretch gap-10 w-full">
        <div className="flex flex-col justify-center gap-8" style={{ maxWidth: '260px', flexShrink: 0 }}>
          <h3 className="text-[18px] font-bold">How it Works</h3>
          {steps.map((step, i) => (
            <div
              key={step.num}
              style={{
                transform: `translateX(${activeStep === i ? 0 : -8}px)`,
                transition: 'transform 0.4s ease'
              }}
            >
              <div className='flex flex-col gap-3'>
                <div style={{ opacity: activeStep === i ? 1 : 0.2, transition: 'opacity 0.4s ease' }}>
                  <p className="text-[9px] text-gray-400 mb-1">{step.num}</p>
                  <h4 className="text-[13px] font-bold mb-1">{step.title}</h4>
                </div>
                <p className="text-[10px] leading-relaxed max-w-[220px]" style={{ opacity: activeStep === i ? 1 : 0.45, transition: 'opacity 0.4s ease' }}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div
          className="flex items-center justify-center"
          style={{
            flex: 1,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%236b7280' stroke-width='1.5' stroke-dasharray='4 4'/%3E%3C/svg%3E")`,
            backgroundPosition: '20px 20px',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 55%, transparent 90%)',
            maskImage: 'radial-gradient(ellipse at center, black 55%, transparent 90%)',
          }}
        >
          <svg
            ref={svgRef}
            viewBox="0 0 256 256"
            className="w-[160px] h-[160px] overflow-visible"
          />
        </div>
        </div>
      </div>
    </section>
    </>
  )
}
