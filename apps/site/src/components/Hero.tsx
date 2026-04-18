import ArrowIcon from '../assets/arrow.svg'
import CopyIcon from '../assets/lucide/copy.svg'
import ruunLogoSvg from '../assets/ruun-logo.svg?raw'
import animationSvg from '../assets/animation.svg?raw'
import springSvg from '../assets/Spring.svg?raw'
import codeSvg from '../assets/code.svg?raw'
import svgSvg from '../assets/Svg.svg?raw'


export default function Hero() {
  return (
    <section className="flex flex-col h-[85vh] w-full justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="">
          <div className='flex flex-row justify-center items-center gap-2'>
            <p className='flex flex-row justify-center items-center gap-2 text-[20px]'>
            <span className='font-bold'>Ruun</span> <span style={{color: 'black', cursor: 'pointer'}} dangerouslySetInnerHTML={{ __html: ruunLogoSvg }} />
            </p>
              <p className='flex flex-row justify-center items-center gap-2 text-[20px]'>
            <span>is an <span className='font-bold'>SVG animation library</span></span> <span style={{color: 'black', cursor: 'pointer'}} dangerouslySetInnerHTML={{ __html: animationSvg }} />
            </p>
               <p className='flex flex-row justify-center items-center gap-2 text-[20px]'>
            <span>powered by spring</span>
            </p>
          </div>
           <div className='flex flex-row justify-center items-center gap-2'>
           <p className='flex flex-row justify-center items-center gap-2 text-[20px]'>
            <span className='font-bold'>Physics</span> <span style={{color: 'black', cursor: 'pointer'}} dangerouslySetInnerHTML={{ __html: springSvg }} />,
            </p>
            <p className='flex flex-row justify-center items-center gap-2 text-[20px]'>
            <span>built for <span className='font-bold'>any framework</span></span> <span style={{color: 'black', cursor: 'pointer'}} dangerouslySetInnerHTML={{ __html: codeSvg }} />
            </p>
            <p className='flex flex-row justify-center items-center gap-2 text-[20px]'>
            <span className='font-bold'>any SVG</span> <span style={{color: 'black', cursor: 'pointer'}} dangerouslySetInnerHTML={{ __html: svgSvg }} />
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
