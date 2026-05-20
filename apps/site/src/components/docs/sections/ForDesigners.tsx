import { DocSection, DocSubsection, CodeBlock, prose, inline } from '../DocSection'

export default function ForDesigners() {
  return (
    <DocSection id="for-designers" title="Vibe Coding Guide">
      <DocSubsection title="Exporting from Figma">
        <p style={prose}>Select any shape or icon in Figma, right-click, and choose <code style={inline}>Copy as SVG</code>. Paste it directly into your code as a string. That's your SVG — no plugins, no export dialog.</p>
        <CodeBlock>{`// Paste your Figma SVG as a raw string
const starSvg = \`<svg viewBox="0 0 24 24">
  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87..." />
</svg>\``}</CodeBlock>
        <p style={{ ...prose, marginTop: '12px' }}>For the cleanest morphs, keep both shapes at the same canvas size (e.g. both <code style={inline}>24×24</code> or both <code style={inline}>100×100</code>). Ruun handles the rest automatically.</p>
      </DocSubsection>

      <DocSubsection title="Using Presets">
        <p style={prose}>Skip the numbers. Ruun ships five presets that cover most animation feels — just pass the string as your config.</p>
        <CodeBlock>{`// Pick the one that feels right
config="gentle"   // slow, floaty — great for illustrations
config="smooth"   // the default, works for almost everything
config="stiff"    // fast and precise — good for UI icons
config="bouncy"   // overshoots and settles — playful
config="wobbly"   // exaggerated bounce — use sparingly`}</CodeBlock>
        <p style={{ ...prose, marginTop: '12px' }}>When in doubt, start with <code style={inline}>"smooth"</code> and switch to <code style={inline}>"bouncy"</code> if you want more personality.</p>
      </DocSubsection>

      <DocSubsection title="Drop-in Snippet">
        <p style={prose}>Copy this into your AI prompt or drop it straight into a React component. Replace the SVG strings and wire <code style={inline}>isActive</code> to whatever triggers your animation — a click, a hover, a scroll event.</p>
        <CodeBlock>{`import { useState } from 'react'
import { RuunSVG } from 'ruune-react'

// Paste your Figma SVGs here
const fromSvg = \`<svg viewBox="0 0 24 24"><path d="..." /></svg>\`
const toSvg   = \`<svg viewBox="0 0 24 24"><path d="..." /></svg>\`

export default function MyIcon() {
  const [isActive, setIsActive] = useState(false)

  return (
    <button onClick={() => setIsActive(v => !v)}>
      <RuunSVG
        from={fromSvg}
        to={toSvg}
        active={isActive}
        config="bouncy"
      />
    </button>
  )
}`}</CodeBlock>
        <p style={{ ...prose, marginTop: '12px' }}>Give this snippet to an AI assistant along with your SVGs and it will wire everything up. You only need to swap out the path data.</p>
      </DocSubsection>

      <DocSubsection title="What Morphs Well">
        <p style={prose}>Not every pair of SVGs morphs cleanly. Here's what to look for:</p>
        <CodeBlock>{`✓  Similar shapes — a circle to a rounded square looks great
✓  Same path count — one path to one path is always smooth
✓  Icon sets — Lucide, Phosphor, and Heroicons morph perfectly
   between each other since they share the same grid and style

✗  Photos or complex illustrations — too many paths
✗  Text converted to outlines — compound paths get messy
✗  Wildly different shapes — a star to a line will look glitchy`}</CodeBlock>
        <p style={{ ...prose, marginTop: '12px' }}>If a morph looks off, try simplifying the shapes in Figma — flatten layers, merge paths, and reduce anchor points before exporting.</p>
      </DocSubsection>
    </DocSection>
  )
}
