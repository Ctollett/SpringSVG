import { DocSection, DocSubsection, CodeBlock, prose, inline } from '../DocSection'

export default function InitMorphSvg() {
  return (
    <DocSection id="init-morph-svg" title="initMorphSvg">
      <DocSubsection title="Usage">
        <p style={prose}>Seeds path elements into an SVG container so the first <code style={inline}>morphSvg</code> call has no startup cost. Call it at mount time — by the time the user triggers the morph, the DOM is already populated and ready.</p>
        <CodeBlock>{`import { initMorphSvg, morphSvg } from 'ruune'

const container = document.querySelector('svg')

// Seed the container with paths from the starting SVG
initMorphSvg(container, fromSvg)

// Later, morph to any target with no first-frame stutter
morphSvg(container, toSvg)`}</CodeBlock>
      </DocSubsection>

      <DocSubsection title="Parameters">
        <p style={prose}>Takes the container element and the starting SVG string. The container must be an <code style={inline}>SVGSVGElement</code> — the same element you'll later pass to <code style={inline}>morphSvg</code>.</p>
        <CodeBlock>{`container  SVGSVGElement  — the svg element to populate
fromSvg    string         — source SVG markup`}</CodeBlock>
      </DocSubsection>
    </DocSection>
  )
}
