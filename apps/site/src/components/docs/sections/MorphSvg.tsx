import { DocSection, DocSubsection, prose, code, inline } from '../DocSection'

export default function MorphSvg() {
  return (
    <DocSection id="morph-svg" title="morphSvg">
      <DocSubsection title="Usage">
        <p style={prose}>The core imperative API. Pass a container SVG element, a destination SVG string, and an optional spring config. The animation starts immediately.</p>
        <pre><code style={code}>{`import { morphSvg } from 'ruun'

morphSvg(container, toSvg, {
  stiffness: 200,
  damping: 20,
  mass: 1,
})`}</code></pre>
      </DocSubsection>

      <DocSubsection title="Parameters">
        <p style={prose}>Only <code style={inline}>container</code> and <code style={inline}>toSvg</code> are required. <code style={inline}>config</code> accepts a <code style={inline}>SpringConfig</code> object or a preset string — <code style={inline}>'gentle'</code>, <code style={inline}>'smooth'</code>, <code style={inline}>'stiff'</code>, <code style={inline}>'bouncy'</code>, or <code style={inline}>'wobbly'</code>.</p>
        <pre><code style={code}>{`container  SVGSVGElement          — the svg element to morph
toSvg      string                 — destination SVG markup
config     SpringConfig | string  — optional, defaults to 'smooth'
onSettle   () => void             — optional, called when animation settles`}</code></pre>
      </DocSubsection>

      <DocSubsection title="Returns">
        <p style={prose}><code style={inline}>morphSvg</code> returns <code style={inline}>void</code>. Calling it again mid-animation retargets smoothly — the spring inherits the current velocity so motion stays continuous.</p>
      </DocSubsection>
    </DocSection>
  )
}
