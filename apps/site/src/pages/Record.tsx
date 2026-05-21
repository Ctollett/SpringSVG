import AnimatedNavLink from '../components/docs/AnimatedNavLink'
import { useState } from 'react'

const links = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'projects',  label: 'Projects'  },
  { id: 'analytics', label: 'Analytics' },
  { id: 'settings',  label: 'Settings'  },
]

export default function Record() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const handleSelect = (id: string) => setActiveId(prev => prev === id ? null : id)

  return (
    <main
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8E8E8',
      }}
    >
      <div
        style={{
          background: '#F5F5F5',
          borderRadius: '20px',
          padding: '56px 48px 20px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.18), inset 0 2px 0 rgba(255,255,255,1), inset 0 -2px 0 rgba(0,0,0,0.14), inset 2px 0 0 rgba(255,255,255,0.6), inset -2px 0 0 rgba(255,255,255,0.6)',
          minWidth: '260px',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: '#404040', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="3 11 22 2 13 21 11 13 3 11"/>
          </svg>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[12px] font-light text-[#222222] uppercase tracking-widest" style={{ paddingTop: '3px', paddingBottom: '3px' }}>Navigation</p>
          <div className="flex flex-col gap-1">
            {links.map(({ id, label }) => (
              <AnimatedNavLink
                key={id}
                id={id}
                label={label}
                isActive={activeId === id}
                dimmed={activeId !== null && activeId !== id}
                onClick={handleSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
