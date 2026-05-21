import ArrowIcon from '../assets/arrow.svg?raw'
import CopyIcon from '../assets/lucide/copy.svg?raw'
import Logo from '../assets/colton-logo.svg?raw'
import '../App.css'


export default function Footer() {
  return (
     <section data-cursor-invert className="w-full self-stretch bg-[#1a1a1a] sticky bottom-0 z-0">
      <div className="flex flex-col gap-4 items-center text-white pt-10 px-4">
        <h3 className="text-[16px] font-medium">Start animating any SVG in minutes</h3>
        <div className="flex flex-row gap-3">
          <button data-hover className="hidden md:flex leading-none gap-2 justify-center items-center text-[12px] px-4 h-[30px] rounded-full">npm install ruun<span className='rotate-270' style={{color: 'white', cursor: 'pointer'}} dangerouslySetInnerHTML={{ __html: CopyIcon }} /></button>
          <button data-hover className="flex leading-none gap-2 justify-center items-center text-[12px] px-4 h-[30px] rounded-full">Read the docs <span className='rotate-270' style={{color: 'white', cursor: 'pointer'}} dangerouslySetInnerHTML={{ __html: ArrowIcon }} /></button>
        </div>
        <div className="flex flex-row items-end w-full max-w-[636px] md:px-0 border-t border-dashed border-white/30 pt-6 pb-10 text-[12px] text-white/50">
          <p className="flex-1">2026</p>
          <div className='flex flex-col items-center gap-3 flex-1'>
            <span id='arrow-icon' style={{color: 'white', cursor: 'pointer'}} dangerouslySetInnerHTML={{ __html: Logo }} />
            <p>Made by Colton Tollett</p>
          </div>
          <p className="flex-1 text-right">MIT License</p>
        </div>
      </div>
     </section>
  )
}
