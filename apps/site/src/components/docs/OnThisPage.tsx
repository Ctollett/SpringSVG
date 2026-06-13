import { useRef, useState, useEffect, useCallback } from 'react'
import { useLenis } from 'lenis/react'
import { RuunSVG } from 'getruun-react'
import textAlignJustifySvg from '../../assets/lucide/text-align-justify.svg?raw'
import textAlignLeftSvg from '../../assets/lucide/text-align-left.svg?raw'

export default function OnThisPage({ headings, paddingTop }: { headings: string[], paddingTop: number }) {
  const [activeHeading, setActiveHeading] = useState<string | null>(null)
  const [morphActive, setMorphActive] = useState(false)
  const prevHeadingRef = useRef<string | null>(null)
  const headingsRef = useRef(headings)

  useEffect(() => { headingsRef.current = headings }, [headings])

  const toId = (heading: string) => heading.toLowerCase().replace(/\s+/g, '-')

  const detectActive = useCallback(() => {
    const current_headings = headingsRef.current
    let current: string | null = current_headings[0] ?? null

    if (window.scrollY > 50) {
      for (const heading of current_headings) {
        const el = document.getElementById(toId(heading))
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.4) current = heading
      }

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll > 10 && window.scrollY >= maxScroll - 50) {
        current = current_headings[current_headings.length - 1] ?? current
      }
    }

    if (current !== prevHeadingRef.current) {
      prevHeadingRef.current = current
      setActiveHeading(current)
      setMorphActive(prev => !prev)
    }
  }, [])

  useEffect(() => {
    prevHeadingRef.current = null
    setActiveHeading(headings[0] ?? null)
    requestAnimationFrame(() => requestAnimationFrame(detectActive))
  }, [headings])

  useLenis(detectActive)

  return (
    <div className="flex flex-col p-4 gap-2" style={{ minWidth: '160px', paddingTop }}>
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
          className="text-[12px]"
          style={{ color: activeHeading === heading ? '#404040' : '#c4c4c4' }}
        >
          {heading}
        </a>
      ))}
    </div>
  )
}
