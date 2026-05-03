import { useRef, useState } from 'react'
import { useLenis } from 'lenis/react'
import { RuunSVG } from 'ruun-react'
import textAlignJustifySvg from '../../assets/lucide/text-align-justify.svg?raw'
import textAlignLeftSvg from '../../assets/lucide/text-align-left.svg?raw'

export default function OnThisPage({ headings }: { headings: string[] }) {
  const [activeHeading, setActiveHeading] = useState<string | null>(null)
  const [morphActive, setMorphActive] = useState(false)
  const prevHeadingRef = useRef<string | null>(null)

  const toId = (heading: string) => heading.toLowerCase().replace(/\s+/g, '-')

  useLenis(() => {
    let current: string | null = null

    for (const heading of headings) {
      const el = document.getElementById(toId(heading))
      if (!el) continue
      const rect = el.getBoundingClientRect()
      if (rect.top <= window.innerHeight * 0.4) {
        current = heading
      }
    }

    if (current !== prevHeadingRef.current) {
      prevHeadingRef.current = current
      setActiveHeading(current)
      setMorphActive(prev => !prev)
    }
  })

  return (
    <div className="flex flex-col p-4 gap-4" style={{ minWidth: '160px', paddingTop: '112px' }}>
      <div className="flex flex-row items-center gap-2 mb-3">
        <RuunSVG
          className="w-[12px] h-[12px] overflow-visible"
          from={textAlignJustifySvg}
          to={textAlignLeftSvg}
          active={morphActive}
          config={{ stiffness: 300, damping: 20, mass: 0.8 }}
        />
        <p className="text-[8px] font-semibold text-gray-400 uppercase tracking-widest">On This Page</p>
      </div>
      {headings.map((heading) => (
        <a
          key={heading}
          href={`#${toId(heading)}`}
          className="text-[10px]"
          style={{ color: activeHeading === heading ? 'black' : '#6b7280' }}
        >
          {heading}
        </a>
      ))}
    </div>
  )
}
