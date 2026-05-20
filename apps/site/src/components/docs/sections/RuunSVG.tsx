import { DocSection, DocSubsection, prose, code, inline } from '../DocSection'

export default function RuunSVG() {
  return (
    <DocSection id="ruun-svg" title="RuunSVG">
      <DocSubsection title="Usage">
        <p style={prose}>The React component wrapper around <code style={inline}>morphSvg</code>. Toggle <code style={inline}>active</code> and the spring handles the rest — no refs, no effects.</p>
        <pre><code style={code}>{`<RuunSVG
  from={fromSvg}
  to={toSvg}
  active={isActive}
  config={{ stiffness: 200, damping: 20, mass: 1 }}
  onSettle={() => console.log('settled')}
/>`}</code></pre>
        <p style={{ ...prose, marginTop: '12px' }}>You can flip <code style={inline}>active</code> mid-animation — the spring picks up from wherever the paths currently are and retargets smoothly.</p>
      </DocSubsection>

      <DocSubsection title="Props">
        <p style={prose}>Only <code style={inline}>from</code> and <code style={inline}>to</code> are required. All other props are optional and fall back to library defaults.</p>
        <pre><code style={code}>{`from      string         — source SVG string (required)
to        string         — target SVG string (required)
active    boolean        — drives direction of morph
config    SpringConfig   — optional spring parameters
onSettle  () => void     — called when animation settles
className string         — applied to the svg element`}</code></pre>
      </DocSubsection>
    </DocSection>
  )
}
