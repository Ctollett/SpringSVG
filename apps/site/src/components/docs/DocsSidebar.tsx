import { docsConfig } from './docsConfig'
import { Link } from 'react-router-dom'
import chevronLeftSvg from '../../assets/lucide/chevron-left.svg?raw'
import chevronsLeftSvg from '../../assets/lucide/chevrons-left.svg?raw'
import { RuunSVG } from 'ruun-react'
import { useState } from 'react'
import AnimatedNavLink from './AnimatedNavLink'

export default function DocsSidebar({ activeId, onSelect }: { activeId: string, onSelect: (id: string) => void }) {
  const [hover, setHover] = useState(false)

  return (
    <div className="flex flex-col p-4 gap-12" style={{ paddingTop: '112px' }}>
      <Link to="/">
        <button data-hover onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="text-[18px] leading-none font-semibold">
          <div className='flex flex-row items-center gap-2'>
            <RuunSVG className="w-[16px] h-[16px] overflow-visible" from={chevronLeftSvg} to={chevronsLeftSvg} active={hover} config={{ stiffness: 400, damping: 20, mass: 0.8 }} />
            <span>Ruun.</span>
          </div>
        </button>
      </Link>

      <div className="flex flex-col pl-[24px] gap-3">
        {docsConfig.flatMap(({ category, items }) => [
          <p key={category} className="text-[8px] font-semibold uppercase tracking-widest" style={{ color: '#c4c4c4', borderTop: '1px dashed #9ca3af', paddingTop: '12px', marginTop: '4px' }}>{category}</p>,
          ...items.map(({ id, label }) => (
            <AnimatedNavLink key={id} id={id} label={label} isActive={activeId === id} dimmed={!!activeId && activeId !== id} onClick={onSelect} />
          ))
        ])}
      </div>
    </div>
  )
}
