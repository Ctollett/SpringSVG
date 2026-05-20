import { DocSection, DocSubsection, prose, code, inline } from '../DocSection'

export default function InitMorphSvg() {
  return (
    <DocSection id="init-morph-svg" title="initMorphSvg">
      <DocSubsection title="Usage">
        <p style={prose}>Seeds path elements into an SVG container so the first <code style={inline}>morphSvg</code> call has no startup cost. Call it at mount time — by the time the user triggers the morph, the DOM is already populated and ready.</p>
        <pre><code style={code}>{`import { initMorphSvg, morphSvg } from 'ruun'

const container = document.querySelector('svg')

// Seed the container with paths from the starting SVG
initMorphSvg(container, fromSvg)

// Later, morph to any target with no first-frame stutter
morphSvg(container, toSvg)`}</code></pre>
      </DocSubsection>

      <DocSubsection title="Parameters">
        <p style={prose}>Takes the container element and the starting SVG string. The container must be an <code style={inline}>SVGSVGElement</code> — the same element you'll later pass to <code style={inline}>morphSvg</code>.</p>
        <pre><code style={code}>{`container  SVGSVGElement  — the svg element to populate
fromSvg    string         — source SVG markup`}</code></pre>
      </DocSubsection>
    </DocSection>
  )
}
