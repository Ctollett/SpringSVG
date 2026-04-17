import ArrowIcon from '../assets/arrow.svg?raw'
import CopyIcon from '../assets/lucide/copy.svg?raw'

export default function Footer() {
  return (
     <section className="h-[416px] w-full self-stretch bg-black sticky bottom-0 z-0">
      <div className="flex flex-col gap-4 justify-center items-center h-full text-white">
        <h3 className="text-[24px]">Start animating any SVG in minutes</h3>
         <div className="flex flex-row gap-4">
          <button className="flex leading-none gap-2 justify-center items-center text-[12px] w-[116px] h-[32px] rounded-full">npm install ruun<span className='rotate-270' style={{color: 'white', cursor: 'pointer'}} dangerouslySetInnerHTML={{ __html: CopyIcon }} /></button>
          <button className="flex leading-none gap-2 justify-center items-center text-[12px] w-[108px] h-[32px] rounded-full">Read the docs <span className='rotate-270' style={{color: 'white', cursor: 'pointer'}} dangerouslySetInnerHTML={{ __html: ArrowIcon }} /></button>
        </div>
        <div className="w-[636px] border-t border-dashed border-white/30">
  {/* nav links */}
</div>

      </div>


     </section>
  )
}
