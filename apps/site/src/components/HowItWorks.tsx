import giFoxHeadSvg from '../assets/gi-fox-head.svg?raw'
import giOwlSvg from '../assets/gi-owl.svg?raw'
import { RuunSVG } from 'ruun-react'
import {useRef, useEffect, useState} from 'react'

function FeatureCard({num, title, description}) {
  const [isActive, setIsActive] = useState(false)
  const svgContainerRef = useRef<HTMLDivElement>(null)
  

  useEffect (() => {
    let timer: ReturnType<typeof setTimeout> | null = null
    const observer = new IntersectionObserver(
      ([entry]) => {
        timer = setTimeout(() => {
          setIsActive(entry.isIntersecting)
        }, 300)
      },
      { threshold: 0.1}
    )

    if(svgContainerRef.current) {
      observer.observe(svgContainerRef.current)
    }

    return () => {
         clearTimeout(timer)
      if(svgContainerRef.current) observer.unobserve(svgContainerRef.current)
    }


  }, [])


  return (
    <div className='grid grid-cols-2'>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col'>
          <p className='text-[8px]'>{num}</p>
          <h4 className='text-[12px]'>{title}</h4>
        </div>
        <p className='text-[12px] w-[218px]'>{description}</p>
      </div>
      <div ref={svgContainerRef}
        className="flex justify-center items-center h-full"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath d='M 24 0 L 0 0 0 24' fill='none' stroke='%239ca3af' stroke-width='1.5' stroke-dasharray='4 4'/%3E%3C/svg%3E")`,
          backgroundPosition: '12px 12px',
        }}
      >
        <RuunSVG className="w-[160px] h-[196px]" from={giFoxHeadSvg} to={giOwlSvg} active={isActive} />
      </div>
    </div>
  )
}

function SmallCard({num, title, description}) {
  return (
     <div className='flex flex-col gap-8'>
      <div className='flex flex-col'>
      <p className='text-[8px]'>{num}</p>
      <h4 className='text-[12px]'>{title}</h4>
      </div>
      <p className='text-[12px] w-[184px]'>{description}</p>
      </div>
  )
}



export default function HowItWorks() {
  return(
    <section className="">
      <div className="flex flex-col justify-center items-left h-84">
        <h3>How it Works</h3>
        <p>Lorem upsum dolor sit amet</p>
      </div>
      <div className='flex flex-col gap-16'>
      <div>
        <FeatureCard num="01" title="Any SVG. No Prep." description="Pass any SVG path directly, drawn in Figma, exported from Illustrator, or hand-coded. Ruun normalizes mismatched points automatically."/>
      </div>
       <div className='grid grid-cols-3 gap-16'>
        <SmallCard num="01" title="Any SVG. No Prep." description="Pass any SVG path directly, drawn in Figma, exported from Illustrator, or hand-coded. Ruun normalizes mismatched points automatically."/>
         <SmallCard num="01" title="Any SVG. No Prep." description="Pass any SVG path directly, drawn in Figma, exported from Illustrator, or hand-coded. Ruun normalizes mismatched points automatically."/>
          <SmallCard num="01" title="Any SVG. No Prep." description="Pass any SVG path directly, drawn in Figma, exported from Illustrator, or hand-coded. Ruun normalizes mismatched points automatically."/>
       </div>
       </div>
    </section>
  )
}
