import AnimatedNavLink from '../components/docs/AnimatedNavLink'
import { useState } from 'react'
import navigationSvg from '../assets/lucide/navigation.svg?raw'
import { RuunSVG } from 'ruun-react'

const links = [
  { id: 'dashboard',  label: 'Dashboard'  },
  { id: 'projects',   label: 'Projects'   },
  { id: 'analytics',  label: 'Analytics'  },
  { id: 'settings',   label: 'Settings'   },
]

export default function Showcase() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const handleSelect = (id: string) => setActiveId(prev => prev === id ? null : id)

  return (
    <main className="min-h-screen flex items-center justify-center relative" style={{ backgroundColor: '#d4d4d4' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M 80 0 L 0 0 0 80' fill='none' stroke='%23bebebe' stroke-width='0.75' stroke-dasharray='4 4'/%3E%3C/svg%3E")`,
        backgroundPosition: 'center center',
        WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at center, black 30%, transparent 100%)',
        maskImage: 'radial-gradient(ellipse 50% 50% at center, black 30%, transparent 100%)',
      }} />
      <div
        style={{
          background: '#F5F5F5',
          borderRadius: '16px',
          padding: '56px 48px 20px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.18), inset 0 2px 0 rgba(255, 255, 255, 1), inset 0 -2px 0 rgba(0, 0, 0, 0.14), inset 2px 0 0 rgba(255, 255, 255, 0.6), inset -2px 0 0 rgba(255, 255, 255, 0.6)',
          minWidth: '240px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: '#1c1c1c', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <RuunSVG className="w-[10px] h-[10px] overflow-visible" from={navigationSvg} to={navigationSvg} active={false} />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[12px] font-light text-[#222222] uppercase tracking-widest" style={{ paddingTop: '3px', paddingBottom: '3px' }}>Navigation</p>
          <div className="flex flex-col gap-1">
            {links.map(({ id, label }) => (
              <AnimatedNavLink key={id} id={id} label={label} isActive={activeId === id} dimmed={activeId !== null && activeId !== id} onClick={handleSelect} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
