import ArrowIcon from '../assets/arrow.svg'
import CopyIcon from '../assets/lucide/copy.svg'

export default function Hero() {
  return (
    <div className="flex flex-col h-[85vh] w-full justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="">
        <p className="text-[24px] text-center leading-[40px]">Ruun is an SVG animation library powered by spring physics, built for any framework, any SVG</p>
        </div>
        <div className="flex flex-row gap-4">
          <button className="flex leading-none gap-2 justify-center items-center text-[12px] border-1 w-[108px] h-[32px] rounded-full">Get Started <img className='w-[10px] h-[10px]' src={ArrowIcon} /></button>
          <button className="flex leading-none gap-2 justify-center items-center text-[12px] w-[116px] h-[32px] rounded-full">npm install ruun<img className='w-[10px] h-[10px]' src={CopyIcon} /></button>
        </div>
      </div>

    </div>
  )
}
