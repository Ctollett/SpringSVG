import ArrowIcon from '../assets/arrow.svg'
import CopyIcon from '../assets/lucide/copy.svg'
import { RuunSVG } from 'ruun-react'
import { heroIconPairs } from "../data/iconPairs"
import { useEffect, useState } from 'react'


export default function Hero() {

  const [Active, setActive] = useState(new Array(5).fill(false))
 

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => {
      if (prev.some(v => v === true)) return prev
      const next = [...prev]
      const randomIndex = Math.floor(Math.random() * prev.length)
      next[randomIndex] = true
  return next
})

    }, 500)

    return () => clearInterval(interval)
    
  }, [])

  return (
    <section className="flex flex-col h-[85vh] w-full justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="">
          <div className='flex flex-row justify-center items-center gap-2'>
            <p className='flex flex-row justify-center items-center gap-2 text-[20px]'>
            <span className='font-bold'>Ruun</span> <RuunSVG className="w-[24px] h-[24px]" from={heroIconPairs[0].from} to={heroIconPairs[0].to} active={Active[0]} onSettle={() => setTimeout(() => setActive(prev => { const next = [...prev]; next[0] = false; return next }), 1000)} config={heroIconPairs[0].config}/> 
            </p>
              <p className='flex flex-row justify-center items-center gap-2 text-[20px]'>
            <span>is an <span className='font-bold'>SVG animation library</span></span> <RuunSVG className="w-[24px] h-[24px]" from={heroIconPairs[1].from} to={heroIconPairs[1].to} active={Active[1]} onSettle={() => setTimeout(() => setActive(prev => { const next = [...prev]; next[1] = false; return next }), 1000)} config={heroIconPairs[1].config}/>
            </p>
               <p className='flex flex-row justify-center items-center gap-2 text-[20px]'>
            <span>powered by spring</span>
            </p>
          </div>
           <div className='flex flex-row justify-center items-center gap-2'>
           <p className='flex flex-row justify-center items-center gap-2 text-[20px]'>
            <span className='font-bold'>Physics</span> <RuunSVG className="w-[24px] h-[24px]" from={heroIconPairs[2].from} to={heroIconPairs[2].to} active={Active[2]} onSettle={() => setTimeout(() => setActive(prev => { const next = [...prev]; next[2] = false; return next }), 1000)} config={heroIconPairs[2].config}/>,
            </p>
            <p className='flex flex-row justify-center items-center gap-2 text-[20px]'>
            <span>built for <span className='font-bold'>any framework</span></span> <RuunSVG className="w-[24px] h-[24px]" from={heroIconPairs[3].from} to={heroIconPairs[3].to} active={Active[3]} onSettle={() => setTimeout(() => setActive(prev => { const next = [...prev]; next[3] = false; return next }), 1000)} config={heroIconPairs[3].config}/>
            </p>
            <p className='flex flex-row justify-center items-center gap-2 text-[20px]'>
            <span className='font-bold'>any SVG</span> <RuunSVG className="w-[24px] h-[24px]" from={heroIconPairs[4].from} to={heroIconPairs[4].to} active={Active[4]} onSettle={() => setTimeout(() => setActive(prev => { const next = [...prev]; next[4] = false; return next }), 1000)} config={heroIconPairs[4].config}/>
            </p>
        </div>
        </div>
        <div className="flex flex-row gap-4">
          <button className="flex leading-none gap-2 justify-center items-center text-[12px] border-1 w-[108px] h-[32px] rounded-full">Get Started <img className='w-[10px] h-[10px]' src={ArrowIcon} /></button>
          <button className="flex leading-none gap-2 justify-center items-center text-[12px] w-[116px] h-[32px] rounded-full">npm install ruun<img className='w-[10px] h-[10px]' src={CopyIcon} /></button>
        </div>
      </div>

    </section>
  )
}
