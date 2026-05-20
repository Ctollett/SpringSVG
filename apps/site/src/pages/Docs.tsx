import { useState, useEffect } from 'react'
import { useLenis } from 'lenis/react'
import DocsSidebar from '../components/docs/DocsSidebar'
import OnThisPage from '../components/docs/OnThisPage'
import Installation from '../components/docs/sections/Installation'
import QuickStart from '../components/docs/sections/QuickStart'
import MorphSvg from '../components/docs/sections/MorphSvg'
import InitMorphSvg from '../components/docs/sections/InitMorphSvg'
import SpringConfig from '../components/docs/sections/SpringConfig'
import RuunSVG from '../components/docs/sections/RuunSVG'
import { docsConfig } from '../components/docs/docsConfig'
import type { ComponentType } from 'react'

// Sidebar: 112px top padding + 18px Ruun. button + 48px gap + ~39px Getting Started section = ~217px to first nav link
const SIDEBAR_TOP = 112
const CONTENT_TOP = SIDEBAR_TOP + 18 + 48 + 39 // = 217

const sectionComponents: Record<string, ComponentType> = {
  'installation':   Installation,
  'quick-start':    QuickStart,
  'morph-svg':      MorphSvg,
  'init-morph-svg': InitMorphSvg,
  'spring-config':  SpringConfig,
  'ruun-svg':       RuunSVG,
}

export default function Docs() {
  const [activeId, setActiveId] = useState('installation')
  const Section = sectionComponents[activeId]
  const activeHeadings = docsConfig.flatMap(({ items }) => items).find(({ id }) => id === activeId)?.headings ?? []

  const lenis = useLenis()

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true })
  }, [activeId, lenis])

  return (
    <main className='bg-white min-h-screen'>
      <div className='flex flex-row'>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', flexShrink: 0 }}>
          <DocsSidebar activeId={activeId} onSelect={setActiveId} />
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', paddingTop: CONTENT_TOP }}>
          {Section && <Section />}
        </div>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', flexShrink: 0 }}>
          <OnThisPage headings={activeHeadings} paddingTop={CONTENT_TOP} />
        </div>
      </div>
    </main>
  )
}
