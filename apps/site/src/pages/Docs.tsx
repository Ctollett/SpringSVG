import { useState } from 'react'
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

  return (
    <main className='bg-white min-h-screen'>
      <div className='flex flex-row'>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', flexShrink: 0 }}>
          <DocsSidebar activeId={activeId} onSelect={setActiveId} />
        </div>
        <div className='flex-1 px-12' style={{ paddingTop: '112px' }}>
          {Section && <Section />}
        </div>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', flexShrink: 0 }}>
          <OnThisPage headings={activeHeadings} />
        </div>
      </div>
    </main>
  )
}
