import copySvg from '../assets/lucide/copy.svg?raw'
import triangleSvg from '../assets/shapes/triangle.svg?raw'
import { HorizontalSlider } from './HorizontalSlider'
import circleSvg from '../assets/shapes/circle.svg?raw'
import { RuunSVG } from 'ruun-react'
import { useState } from 'react'
import type { SpringConfig } from 'ruun'
import type { Spring } from 'framer-motion'




  function Shape({ config }: { config: SpringConfig }) {
    const [isActive, setIsActive] = useState(false)

    const handleClick = () => {
      setIsActive(prev => !prev)
    }

    return (
      <div>
        <div
          className="relative w-full flex justify-center items-center overflow-visible"
          style={{
            height: '520px',
            backgroundColor: '#e5e7eb',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cpath d='M 160 0 L 0 0 0 160' fill='none' stroke='%23b0b7c3' stroke-width='1' stroke-dasharray='6 6'/%3E%3C/svg%3E")`,
            backgroundPosition: 'center center',
          }}
        >
          <RuunSVG className="w-[420px] h-[420px] overflow-visible" from={triangleSvg} to={circleSvg} config={config} active={isActive} />
        </div>
        <div className="mt-3 flex flex-col gap-2 items-start">
          <p style={{ fontSize: '6px', display: 'flex', alignItems: 'center', gap: '6px', color: '#6b7280', userSelect: 'none' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: isActive ? 'green' : '#6b7280', display: 'inline-block' }} />
            {isActive ? 'ANIMATING' : 'AT REST'}
          </p>
          <button
            onClick={handleClick}
            style={{
              border: '1px solid #9ca3af',
              borderRadius: '9999px',
              width: '64px', 
              height: '18px',
              fontSize: '8px',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              color: '#111827',
            }}
          >
            Trigger
          </button>
        </div>
      </div>
    )

  }

  function ControlPanel({ config, onUpdate }: { config: SpringConfig, onUpdate: (config: SpringConfig) => void }) {

    return (
        <div className='flex flex-row justify-between items-center'>
          <HorizontalSlider value={config.stiffness / 1000} label='Stiffness' onChange={(val) => onUpdate({...config, stiffness: val * 1000})}/>
          <HorizontalSlider value={(config.mass - 0.1) / 9.9} label='Mass' onChange={(val) => onUpdate({...config, mass: val * 9.9 + 0.1})}/>
          <HorizontalSlider value={config.damping / 100} label='Damping' onChange={(val) => onUpdate({...config, damping: val * 100})}/>
        </div>
    )
  }

  function CodeSnippet({ config }: { config: SpringConfig }) {

    const stiffness = Math.round((config.stiffness / 1000) * 100)
    const mass = Math.round(((config.mass - 0.1) / 9.9) * 100)
    const damping = Math.round((config.damping / 100) * 100)
    const [isCopied, setIsCopied] = useState(false)

    const handleClick = () => {
      navigator.clipboard.writeText(`morphSvg(element, toSvg, {\n  stiffness: ${stiffness},\n  damping: ${damping},\n  mass: ${mass}\n})`)
      setIsCopied(true)
    }


    return (
      <div className='flex flex-col gap-8 border 1 grey border-dashed p-4 w-1/2 rounded-xl justify-center items-center'>
        <div className='flex w-full justify-end'>
          <button onClick={handleClick}>
              <span style={{color: isCopied ? 'grey' : 'black', cursor: 'pointer'}} dangerouslySetInnerHTML={{ __html: copySvg }} />
          </button>

        </div>
        <pre>
  <span style={{ color: '#6b7280' }}>morphSvg</span>
  <span>(element, toSvg, {'{'}</span>
  {'\n  '}<span style={{ color: '#6b7280' }}>stiffness:</span> <span style={{ color: '#000' }}>{stiffness}</span>
  {'\n  '}<span style={{ color: '#6b7280' }}>damping:</span> <span style={{ color: '#000' }}>{damping}</span>
  {'\n  '}<span style={{ color: '#6b7280' }}>mass:</span> <span style={{ color: '#000' }}>{mass}</span>
  {'\n'}{'})'}
</pre>

      </div>
    )
  }


export default function Playground() {
const [springConfig, setSpringConfig] = useState({stiffness: 200, damping: 20, mass: 1})

  return (
    <section>
       <div className="flex flex-col justify-center items-center h-84">
        <h3>Try it Out</h3>
        <p>Lorem upsum dolor sit amet</p>
      </div>
      <div className='flex flex-col gap-16'>
      <Shape config={springConfig} />
      <ControlPanel config={springConfig} onUpdate={setSpringConfig} />
      <CodeSnippet config={springConfig} />
      </div>
    </section>
  )
}
