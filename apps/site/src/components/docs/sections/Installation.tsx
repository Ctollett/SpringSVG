import { DocSection, DocSubsection, prose, code, inline } from '../DocSection'

export default function Installation() {
  return (
    <DocSection id="installation" title="Installation">
      <DocSubsection title="npm">
        <p style={prose}>Install Ruun and the React bindings via npm. <code style={inline}>ruun</code> provides the core engine and <code style={inline}>ruun-react</code> exposes the declarative component layer.</p>
        <pre><code style={code}>npm install ruun ruun-react</code></pre>
        <p style={{ ...prose, marginTop: '12px' }}>Both packages are tree-shakeable and have no peer dependencies beyond React.</p>
      </DocSubsection>

      <DocSubsection title="CDN">
        <p style={prose}>Include Ruun directly via a script tag — no build step required. The global <code style={inline}>Ruun</code> object is available immediately after the script loads.</p>
        <pre><code style={code}>{`<script src="https://cdn.ruun.dev/ruun.min.js"></script>`}</code></pre>
        <p style={{ ...prose, marginTop: '12px' }}>Once loaded, use <code style={inline}>Ruun.morphSvg()</code> directly from the global scope — no imports needed.</p>
      </DocSubsection>
    </DocSection>
  )
}
