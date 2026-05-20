import { DocSection, DocSubsection, CodeBlock, prose, inline } from '../DocSection'

export default function QuickStart() {
  return (
    <DocSection id="quick-start" title="Quick Start">
      <DocSubsection title="Basic Usage">
        <p style={prose}>Call <code style={inline}>morphSvg</code> with a target element, a destination SVG string, and a spring config. The animation starts immediately and settles naturally — no timings to manage.</p>
        <CodeBlock>{`import { morphSvg } from 'ruun'

const el = document.querySelector('svg')

morphSvg(el, targetSvg, {
  stiffness: 200,
  damping: 20,
  mass: 1,
})`}</CodeBlock>
        <p style={{ ...prose, marginTop: '12px' }}>The function returns a <code style={inline}>cancel</code> handle — call it to stop the animation mid-flight and leave the SVG at its current position.</p>
      </DocSubsection>

      <DocSubsection title="With React">
        <p style={prose}>Use the <code style={inline}>RuunSVG</code> component to declaratively morph between two SVGs via an <code style={inline}>active</code> prop. State changes drive the spring — no imperative calls needed.</p>
        <CodeBlock>{`import { RuunSVG } from 'ruun-react'
import foxSvg from './fox.svg?raw'
import owlSvg from './owl.svg?raw'

<RuunSVG
  from={foxSvg}
  to={owlSvg}
  active={isActive}
  config={{ stiffness: 200, damping: 20, mass: 1 }}
/>`}</CodeBlock>
        <p style={{ ...prose, marginTop: '12px' }}>Import SVGs as raw strings using the <code style={inline}>?raw</code> query in Vite, or inline them as template literals.</p>
      </DocSubsection>
    </DocSection>
  )
}
