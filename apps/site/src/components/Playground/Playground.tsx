import copySvg from '../../assets/lucide/copy.svg?raw'
import arrowLeftRightSvg from '../../assets/lucide/arrow-left-right.svg?raw'
import arrowRightLeftSvg from '../../assets/lucide/arrow-right-left.svg?raw'
import triangleSvg from '../../assets/shapes/triangle.svg?raw'
import { HorizontalSlider } from '../HorizontalSlider'
import circleSvg from '../../assets/shapes/circle.svg?raw'
import { RuunSVG } from 'getruun-react'
import { useState } from 'react'
import type { SpringConfig } from 'getruun'
import './Playground.css'




  function Shape({ config }: { config: SpringConfig }) {
    const [isActive, setIsActive] = useState(false)
    const [isSettled, setIsSettled] = useState(true)
    const [fillHover, setFillHover] = useState(false)
    const [arrowActive, setArrowActive] = useState(false)

    const handleClick = () => {
      setIsActive(prev => !prev)
      setIsSettled(false)
      setArrowActive(true)
    }

    return (
      <div>
        <div
          className="relative w-full flex justify-center items-center overflow-visible"
          style={{
            height: '520px',
            backgroundColor: 'var(--color-surface-sunken)',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cpath d='M 160 0 L 0 0 0 160' fill='none' stroke='%23b0b7c3' stroke-width='1' stroke-dasharray='6 6'/%3E%3C/svg%3E")`,
            backgroundPosition: 'center center',
          }}
        >
          <RuunSVG className="w-[420px] h-[420px] overflow-visible" from={triangleSvg} to={circleSvg} config={config} active={isActive} onSettle={() => { setIsSettled(true); setArrowActive(false) }} />
        </div>
        <div className="mt-4 flex flex-col gap-snug items-start">
          <p style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-ink-secondary)', userSelect: 'none' }}>
            <span className={!isSettled ? 'blink-smooth': ''} style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: isSettled ? 'var(--color-ink-muted)' : '#22c55e', display: 'inline-block' }} />
            {isSettled ? 'Settled' : 'Animating...' }
          </p>
          <button
            data-hover
            onClick={handleClick}
            onMouseEnter={() => setFillHover(true)}
            onMouseLeave={() => setFillHover(false)}
            style={{
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: !isSettled ? '1px solid var(--color-border)' : fillHover ? '1px solid #080808' : '1px solid var(--color-border-strong)',
              borderRadius: '9999px',
              width: '80px',
              height: '26px',
              fontSize: '11px',
              backgroundColor: 'var(--color-surface)',
              cursor: !isSettled ? 'not-allowed' : 'pointer',
            }}
          >
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#080808', height: (fillHover && isSettled) || !isSettled ? '100%' : '0%', transition: 'height 0.4s ease' }} />
            <span style={{ position: 'relative', zIndex: 10, mixBlendMode: 'difference', color: 'white', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Morph
              <RuunSVG className="w-[8px] h-[8px] overflow-visible" from={arrowLeftRightSvg} to={arrowRightLeftSvg} active={arrowActive} config={{ stiffness: 400, damping: 20, mass: 0.8 }} />
            </span>
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
      <div className='flex flex-col gap-6 p-5 w-1/2 rounded-xl justify-center items-center' style={{ border: '1px dashed #9ca3af' }}>
        <div className='flex w-full justify-end'>
          <button data-hover onClick={handleClick}>
              <span style={{color: isCopied ? 'var(--color-ink-muted)' : 'var(--color-ink)', cursor: 'pointer'}} dangerouslySetInnerHTML={{ __html: copySvg }} />
          </button>
        </div>
        <pre style={{ fontSize: '13px', lineHeight: '1.7' }}>
  <span style={{ color: 'var(--color-ink-secondary)' }}>morphSvg</span>
  <span>(element, toSvg, {'{'}</span>
  {'\n  '}<span style={{ color: 'var(--color-ink-secondary)' }}>stiffness:</span> <span style={{ color: 'var(--color-ink)' }}>{stiffness}</span>
  {'\n  '}<span style={{ color: 'var(--color-ink-secondary)' }}>damping:</span> <span style={{ color: 'var(--color-ink)' }}>{damping}</span>
  {'\n  '}<span style={{ color: 'var(--color-ink-secondary)' }}>mass:</span> <span style={{ color: 'var(--color-ink)' }}>{mass}</span>
  {'\n'}{'})'}
</pre>

      </div>
    )
  }

  function SpringVisual({config} : { config: SpringConfig }) {
    const positions = []
    let velocity = 0
    let position = 10
    const svgWidth = 200
    const svgHeight = 50

    const dt = 0.016

    for(let t = 0; t < 3; t += dt) {
      const force = -(config.stiffness * position) - (config.damping * velocity)
      const acceleration = force / config.mass
      velocity = velocity + acceleration * dt
      position = position + velocity * dt
      positions.push(position)
    }

    let pathString = ''
    const maxPos = Math.max(...positions)
    for(let i = 0; i < positions.length; i++) {
      const x = (i / positions.length) * svgWidth
      const y = svgHeight - (positions[i]! / maxPos) * svgHeight
      pathString += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`
    }


    return (
       <div className='flex flex-col gap-6 p-5 w-1/2 rounded-xl justify-center items-center' style={{ border: '1px dashed #9ca3af' }}>
        <svg overflow='visible' width={svgWidth} height={svgHeight}>
          <path fill='none' stroke='var(--color-ink)' d={pathString}></path>
        </svg>
       </div>

    )
  }



export default function Playground() {
const [springConfig, setSpringConfig] = useState({stiffness: 200, damping: 20, mass: 1})

  return (
    <section className="pb-16">
      <div className="flex flex-col justify-center items-center pb-10 gap-2">
        <h3 className='text-xl font-bold'>Try it Out</h3>
        <p className='text-sm text-ink-secondary'>Lorem ipsum dolor sit amet</p>
      </div>
      <div className='flex flex-col gap-16'>
      <Shape config={springConfig} />
      <ControlPanel config={springConfig} onUpdate={setSpringConfig} />
      <div className='flex flex-row gap-4'>
      <CodeSnippet config={springConfig} />
      <SpringVisual config={springConfig} />
      </div>
      </div>
    </section>
  )
}
