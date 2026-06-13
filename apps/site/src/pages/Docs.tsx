import { useState, useEffect } from 'react'
import { useLenis } from 'lenis/react'
import { Link } from 'react-router-dom'
import DocsSidebar from '../components/docs/DocsSidebar'
import OnThisPage from '../components/docs/OnThisPage'
import Installation from '../components/docs/sections/Installation'
import QuickStart from '../components/docs/sections/QuickStart'
import LoadSvg from '../components/docs/sections/LoadSvg'
import MorphSvg from '../components/docs/sections/MorphSvg'
import InitMorphSvg from '../components/docs/sections/InitMorphSvg'
import SpringConfig from '../components/docs/sections/SpringConfig'
import RuunSVG from '../components/docs/sections/RuunSVG'
import ForDesigners from '../components/docs/sections/ForDesigners'
import { docsConfig } from '../components/docs/docsConfig'
import AnimatedNavLink from '../components/docs/AnimatedNavLink'
import type { ComponentType } from 'react'

const SIDEBAR_TOP = 112
const CONTENT_TOP = SIDEBAR_TOP + 18 + 48 + 39

const sectionComponents: Record<string, ComponentType> = {
  'installation':   Installation,
  'quick-start':    QuickStart,
  'for-designers':  ForDesigners,
  'load-svg':       LoadSvg,
  'morph-svg':      MorphSvg,
  'init-morph-svg': InitMorphSvg,
  'spring-config':  SpringConfig,
  'ruun-svg':       RuunSVG,
}

const allSections = docsConfig.flatMap(({ items }) => items)

function SectionNav({ prev, next, onSelect }: { prev: typeof allSections[0] | null, next: typeof allSections[0] | null, onSelect: (id: string) => void }) {
  return (
    <div className='flex flex-row justify-between w-full max-w-[640px] border-t border-dashed border-gray-200 pt-6 pb-16 mt-2'>
      {prev ? (
        <button onClick={() => onSelect(prev.id)} className='flex flex-col gap-1 text-left group'>
          <span className='text-[8px] uppercase tracking-widest text-gray-400'>Previous</span>
          <span className='text-[12px] font-medium text-gray-700 group-hover:text-black transition-colors'>← {prev.label}</span>
        </button>
      ) : <div />}
      {next ? (
        <button onClick={() => onSelect(next.id)} className='flex flex-col gap-1 text-right group'>
          <span className='text-[8px] uppercase tracking-widest text-gray-400'>Next</span>
          <span className='text-[12px] font-medium text-gray-700 group-hover:text-black transition-colors'>{next.label} →</span>
        </button>
      ) : <div />}
    </div>
  )
}

export default function Docs() {
  const [activeId, setActiveId] = useState('installation')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerClosing, setDrawerClosing] = useState(false)

  const closeDrawer = () => {
    setDrawerClosing(true)
    setTimeout(() => { setDrawerOpen(false); setDrawerClosing(false) }, 200)
  }
  const Section = sectionComponents[activeId]
  const activeHeadings = docsConfig.flatMap(({ items }) => items).find(({ id }) => id === activeId)?.headings ?? []

  const currentIndex = allSections.findIndex(({ id }) => id === activeId)
  const prev = currentIndex > 0 ? allSections[currentIndex - 1] : null
  const next = currentIndex < allSections.length - 1 ? allSections[currentIndex + 1] : null

  const lenis = useLenis()

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true })
  }, [activeId, lenis])

  const handleMobileSelect = (id: string) => {
    setActiveId(id)
    closeDrawer()
  }

  return (
    <main className='bg-[#f5f5f7] min-h-screen'>

      {/* Mobile top bar */}
      <div className='md:hidden sticky top-0 z-40 bg-[#f5f5f7] border-b border-dashed border-gray-300 flex items-center justify-between px-4 h-14'>
        <Link to="/"><p className='font-semibold text-[20px] leading-none'>Ruun.</p></Link>
        <button onClick={() => setDrawerOpen(true)} className='flex flex-col gap-[5px] justify-center items-end w-6'>
          <span className='block h-[1.5px] w-full bg-[#080808]' />
          <span className='block h-[1.5px] w-3/4 bg-[#080808]' />
          <span className='block h-[1.5px] w-1/2 bg-[#080808]' />
        </button>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className='md:hidden fixed inset-0 z-50 flex justify-end'>
          <div className='absolute inset-0 bg-[#080808]/20' onClick={closeDrawer} />
          <div className='relative bg-[#f5f5f7] w-[280px] h-full overflow-y-auto shadow-xl flex flex-col pt-8 px-4 gap-8'
               style={{ animation: `${drawerClosing ? 'slideOutRight' : 'slideInRight'} 0.2s ease` }}>
            <div className='flex flex-col pl-4 gap-3'>
              {docsConfig.flatMap(({ category, items }) => [
                <p key={category} className='text-[8px] font-semibold uppercase tracking-widest' style={{ color: '#c4c4c4', borderTop: '1px dashed #9ca3af', paddingTop: '12px', marginTop: '4px' }}>{category}</p>,
                ...items.map(({ id, label }) => (
                  <AnimatedNavLink key={id} id={id} label={label} isActive={activeId === id} dimmed={!!activeId && activeId !== id} onClick={handleMobileSelect} />
                ))
              ])}
            </div>
          </div>
        </div>
      )}

      {/* Desktop layout */}
      <div className='hidden md:flex flex-row'>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', flexShrink: 0 }}>
          <DocsSidebar activeId={activeId} onSelect={setActiveId} />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', paddingTop: CONTENT_TOP, gap: '48px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '640px', width: '100%', paddingBottom: '50vh' }}>
            {Section && <Section />}
            <SectionNav prev={prev} next={next} onSelect={setActiveId} />
          </div>
          <div style={{ position: 'sticky', top: CONTENT_TOP, flexShrink: 0 }}>
            <OnThisPage headings={activeHeadings} paddingTop={0} />
          </div>
        </div>
      </div>

      {/* Mobile content */}
      <div className='md:hidden px-4 py-8 max-w-[636px] mx-auto' style={{ paddingBottom: '50vh' }}>
        {Section && <Section />}
        <SectionNav prev={prev} next={next} onSelect={setActiveId} />
      </div>

    </main>
  )
}
