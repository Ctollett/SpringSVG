import giFoxHeadSvg from '../assets/gi-fox-head.svg?raw'
import giOwlSvg from '../assets/gi-owl.svg?raw'
import { RuunSVG } from 'ruun-react'
import {useRef, useEffect, useState} from 'react'

const howData = [
  { num: '01', title: 'Any SVG. No Prep', description: 'Pass any SVG path directly, drawn in Figma, exported from Illustrator, or hand-coded. Ruun normalizes mismatched points automatically.'},
  { num: '02', title: 'One Function Call', description: 'morphSvg(element, fromSvg, toSvg) is the entire API. Trigger it on click, scroll, hover, or any event your UI already handles.'},
  { num: '03', title: 'Accessible by Default.', description: 'Detects  prefers-reduced-motion automatically. Users who need reduced motion get an instant swap. No animation, no jarring transitions.'},
  { num: '04', title: 'Real Spring Physics.', description: 'morphSvg(element, fromSvg, toSvg) is the entire API. Trigger it on click, scroll, hover, or any event your UI already handles.'}
]

function FeatureCard({num, title, description}) {
  const [isActive, setIsActive] = useState(false)
  const svgContainerRef = useRef<HTMLDivElement>(null)
  

  useEffect (() => {
    let timer: ReturnType<typeof setTimeout> | null = null
    const observer = new IntersectionObserver(
      ([entry]) => {
          clearTimeout(timer)
        timer = setTimeout(() => {
          setIsActive(entry.isIntersecting)
        }, 500)
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
        <RuunSVG className="w-[108px] h-[108px]" from={giFoxHeadSvg} to={giOwlSvg} active={isActive} />
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
        <FeatureCard {...howData[0]} />
      </div>
       <div className='grid grid-cols-3 gap-16'>
        {howData.slice(1).map((data ) => (
        <SmallCard key={data.num} {...data}/>
        ))}
        
       </div>
       </div>
    </section>
  )
}
