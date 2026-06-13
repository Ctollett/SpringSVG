import { DocSection, DocSubsection, CodeBlock, prose, inline } from '../DocSection'

export default function QuickStart() {
  return (
    <DocSection id="quick-start" title="Quick Start">
      <DocSubsection title="React">
        <p style={prose}>Import <code style={inline}>RuunSVG</code>, pass it two SVG strings, and toggle <code style={inline}>active</code> to fire the animation. The component handles initialization and keeps the paths in sync with the active state.</p>
        <CodeBlock>{`import { RuunSVG } from 'getruun-react'
import foxSvg from './fox.svg?raw'
import owlSvg from './owl.svg?raw'

<RuunSVG
  from={foxSvg}
  to={owlSvg}
  active={isActive}
  config="smooth"
/>`}</CodeBlock>
        <p style={{ ...prose, marginTop: '12px' }}>The <code style={inline}>?raw</code> suffix is a Vite feature that loads the SVG file as a string at build time. If you're working outside of Vite, use <code style={inline}>loadSvg</code> to load it at runtime. See the Vanilla JS section below.</p>
      </DocSubsection>

      <DocSubsection title="Vanilla JS">
        <p style={prose}>Call <code style={inline}>initMorphSvg</code> once when your page or component mounts to set up the container, then call <code style={inline}>morphSvg</code> each time you want to trigger the animation.</p>
        <CodeBlock>{`import { initMorphSvg, morphSvg } from 'getruun'
import foxSvg from './fox.svg?raw'
import owlSvg from './owl.svg?raw'

const container = document.querySelector('svg') as SVGSVGElement
initMorphSvg(container, foxSvg)

button.addEventListener('click', () => {
  morphSvg(container, owlSvg, 'smooth')
})`}</CodeBlock>
        <p style={{ ...prose, marginTop: '12px' }}>If you're not using Vite, use <code style={inline}>loadSvg</code> to fetch your SVG files at runtime. Load them during setup so they're already in memory when the user clicks.</p>
        <CodeBlock>{`import { loadSvg, initMorphSvg, morphSvg } from 'getruun'

const [foxSvg, owlSvg] = await Promise.all([
  loadSvg('/fox.svg'),
  loadSvg('/owl.svg'),
])

const container = document.querySelector('svg') as SVGSVGElement
initMorphSvg(container, foxSvg)

button.addEventListener('click', () => {
  morphSvg(container, owlSvg, 'smooth')
})`}</CodeBlock>
      </DocSubsection>

      <DocSubsection title="Spring presets">
        <p style={prose}>You can pass a preset name instead of writing the config out manually. There are five built in:</p>
        <CodeBlock>{`morphSvg(container, targetSvg, 'gentle')   // slow, minimal bounce
morphSvg(container, targetSvg, 'smooth')   // medium speed, no overshoot
morphSvg(container, targetSvg, 'stiff')    // fast and snappy
morphSvg(container, targetSvg, 'bouncy')   // noticeable bounce
morphSvg(container, targetSvg, 'wobbly')   // slow with heavy overshoot`}</CodeBlock>
        <p style={{ ...prose, marginTop: '12px' }}>If none of those feel right, you can pass a <code style={inline}>SpringConfig</code> object and tune the numbers yourself.</p>
        <CodeBlock>{`morphSvg(container, targetSvg, {
  stiffness: 200,  // 100–500: how fast it pulls toward the target
  damping: 20,     // 8–30: how quickly oscillation dies out
  mass: 1,         // 0.5–2: how heavy the motion feels
})`}</CodeBlock>
      </DocSubsection>
    </DocSection>
  )
}
