import checkMarkSvg from '../assets/shapes/check-mark.svg?raw'
import chevronSingleSvg from '../assets/shapes/chevron-single.svg?raw'
import chevronTripleSvg from '../assets/shapes/chevron-triple.svg?raw'
import CopyIcon from '../assets/lucide/copy.svg?raw'
import { RuunSVG } from 'ruune-react'
import { heroIconPairs } from "../data/iconPairs"
import { useEffect, useRef, useState } from 'react'
import { useLenis } from 'lenis/react'


export default function Hero() {

  const [Active, setActive] = useState(new Array(5).fill(false))
  const [morph, setMorph] = useState(false)
  const [copied, setIsCopied] = useState(false)
  const cooldownsRef = useRef(new Array(5).fill(false))
  const [fillHover, setFillHover] = useState(false)
  const lenis = useLenis()


   const handleClick = () => {
      navigator.clipboard.writeText(`npm install ruune`)
      setIsCopied(true)
      setMorph(true)
      
    }



  useEffect(() => {
    const interval = setInterval(() => {
      const available = cooldownsRef.current
        .map((busy: boolean, i: number) => !busy ? i : -1)
        .filter((i: number) => i !== -1)

      if (available.length === 0) return

      const randomIndex = available[Math.floor(Math.random() * available.length)]
      cooldownsRef.current[randomIndex] = true

      setActive(prev => {
        const next = [...prev]
        next[randomIndex] = !prev[randomIndex]
        return next
      })

      setTimeout(() => { cooldownsRef.current[randomIndex] = false }, 2500)
    }, 600)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="flex flex-col h-[85vh] w-full justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-6">
        {/* Mobile layout */}
        <div className='md:hidden flex flex-col gap-0.5 items-center' style={{ fontSize: '3.8vw' }}>
          <div className='flex flex-row items-center gap-x-[1.5vw] whitespace-nowrap'>
            <span className='font-bold'>Ruun</span>
            <RuunSVG className="w-[5.5vw] h-[5.5vw] overflow-visible shrink-0" from={heroIconPairs[0].from} to={heroIconPairs[0].to} active={Active[0]} config={heroIconPairs[0].config}/>
            <span>is an</span>
            <span className='font-bold'>SVG animation library</span>
            <RuunSVG className="w-[5.5vw] h-[5.5vw] overflow-visible shrink-0" from={heroIconPairs[1].from} to={heroIconPairs[1].to} active={Active[1]} config={heroIconPairs[1].config}/>
          </div>
          <div className='flex flex-row items-center gap-x-[1.5vw] whitespace-nowrap'>
            <span>powered by spring</span>
            <RuunSVG className="w-[5.5vw] h-[5.5vw] overflow-visible shrink-0" from={heroIconPairs[2].from} to={heroIconPairs[2].to} active={Active[2]} config={heroIconPairs[2].config}/>
            <span className='font-bold'>physics,</span>
            <span>built</span>
          </div>
          <div className='flex flex-row items-center gap-x-[1.5vw] whitespace-nowrap'>
            <span>for</span>
            <span className='font-bold'>any framework</span>
            <RuunSVG className="w-[5.5vw] h-[5.5vw] overflow-visible shrink-0" from={heroIconPairs[3].from} to={heroIconPairs[3].to} active={Active[3]} config={heroIconPairs[3].config}/>
            <span className='font-bold'>any SVG</span>
            <RuunSVG className="w-[5.5vw] h-[5.5vw] overflow-visible shrink-0" from={heroIconPairs[4].from} to={heroIconPairs[4].to} active={Active[4]} config={heroIconPairs[4].config}/>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:block text-center">
          <div className='flex flex-row justify-center items-center gap-2'>
            <p className='flex flex-row justify-center items-center gap-2 text-[22px]'>
            <span className='font-bold'>Ruun</span> <RuunSVG className="w-[26px] h-[32px] overflow-visible" from={heroIconPairs[0].from} to={heroIconPairs[0].to} active={Active[0]} config={heroIconPairs[0].config}/>
            </p>
              <p className='flex flex-row justify-center items-center gap-2 text-[22px]'>
            <span>is an <span className='font-bold'>SVG animation library</span></span> <RuunSVG className="w-[32px] h-[32px] overflow-visible" from={heroIconPairs[1].from} to={heroIconPairs[1].to} active={Active[1]} config={heroIconPairs[1].config}/>
            </p>
               <p className='flex flex-row justify-center items-center gap-2 text-[22px]'>
            <span>powered by spring</span>
            </p>
          </div>
           <div className='flex flex-row justify-center items-center gap-2'>
           <p className='flex flex-row justify-center items-center gap-2 text-[22px]'>
            <span className='font-bold'>Physics</span> <RuunSVG className="w-[32px] h-[32px] overflow-visible" from={heroIconPairs[2].from} to={heroIconPairs[2].to} active={Active[2]} config={heroIconPairs[2].config}/>,
            </p>
            <p className='flex flex-row justify-center items-center gap-2 text-[24px]'>
            <span>built for <span className='font-bold'>any framework</span></span> <RuunSVG className="w-[24px] h-[24px] overflow-visible" from={heroIconPairs[3].from} to={heroIconPairs[3].to} active={Active[3]} config={heroIconPairs[3].config}/>
            </p>
            <p className='flex flex-row justify-center items-center gap-2 text-[24px]'>
            <span className='font-bold'>any SVG</span> <RuunSVG className="w-[32px] h-[32px] overflow-visible" from={heroIconPairs[4].from} to={heroIconPairs[4].to} active={Active[4]} config={heroIconPairs[4].config}/>
            </p>
        </div>
        </div>
        <div className="flex flex-row gap-4">
          <button data-hover onMouseEnter={() => setFillHover(true)} onMouseLeave={() => setFillHover(false)} onClick={() => lenis?.scrollTo('#demo-section')} className="hidden md:flex relative overflow-hidden leading-none gap-2 justify-center items-center text-[12px] border-1 w-[108px] h-[32px] rounded-full bg-white">
            <div className="absolute bottom-0 left-0 right-0 bg-black" style={{ height: fillHover ? '100%' : '0%', transition: 'height 0.4s ease' }} />
            <div style={{ mixBlendMode: 'difference', color: 'white' }} className="relative z-10 flex items-center gap-2">
              Get Started <RuunSVG className="w-[10px] h-[12px] overflow-visible" from={chevronSingleSvg} to={chevronTripleSvg} active={fillHover} config={{ stiffness: 400, damping: 20, mass: 0.8 }} />
            </div>
          </button>
          <button data-hover onClick={handleClick} style={{color: copied ? 'grey' : 'black'}} className="flex leading-none gap-2 justify-center items-center text-[12px] px-4 h-[32px] rounded-full border border-gray-200 md:border-0 md:w-[116px]">npm install ruun<RuunSVG className="hidden md:block w-[10px] h-[10px] overflow-visible" viewBox='0 0 24 24' from={CopyIcon} to={checkMarkSvg} active={morph} /></button>
        </div>
      </div>
    </section>
  )
}
