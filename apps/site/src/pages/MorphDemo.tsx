import { useState } from 'react'
import { RuunSVG } from 'getruun-react'
import foxSvg from '../assets/gi-fox-head.svg?raw'
import owlSvg from '../assets/gi-owl.svg?raw'
import skullSvg from '../assets/gi-skull-crossed-bones.svg?raw'
import ghostSvg from '../assets/gi-ghost.svg?raw'

export default function MorphDemo() {
  const [lightActive, setLightActive] = useState(false)
  const [darkActive, setDarkActive] = useState(false)

  return (
    <main style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', backgroundColor: '#d4d4d4' }}>
      <div
        data-hover
        onClick={() => setLightActive(v => !v)}
        style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '48px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', color: '#404040' }}
      >
        <RuunSVG className="w-[80px] h-[80px]" from={foxSvg} to={owlSvg} active={lightActive} config={{ stiffness: 200, damping: 16, mass: 1.0 }} />
      </div>
      <div
        data-hover
        onClick={() => setDarkActive(v => !v)}
        style={{ backgroundColor: '#404040', borderRadius: '16px', padding: '48px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', color: '#ffffff' }}
      >
        <RuunSVG className="w-[80px] h-[80px]" from={skullSvg} to={ghostSvg} active={darkActive} config={{ stiffness: 200, damping: 16, mass: 1.0 }} />
      </div>
    </main>
  )
}
