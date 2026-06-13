import { DocSection, DocSubsection, CodeBlock, prose, inline } from '../DocSection'

export default function ForDesigners() {
  return (
    <DocSection id="for-designers" title="Vibe Coding Guide">
      <DocSubsection title="Exporting from Figma">
        <p style={prose}>Select any shape or icon in Figma, right-click, and choose <code style={inline}>Copy as SVG</code>. Paste it into your code as a template literal. That's all you need to get started.</p>
        <CodeBlock>{`// Paste your Figma SVG as a string
const starSvg = \`<svg viewBox="0 0 24 24">
  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87..." />
</svg>\``}</CodeBlock>
        <p style={{ ...prose, marginTop: '12px' }}>For cleaner morphs, try to keep both shapes at the same canvas size, like <code style={inline}>24×24</code> or <code style={inline}>100×100</code>. Ruun normalizes the paths automatically, but starting from the same grid gives you better results.</p>
      </DocSubsection>

      <DocSubsection title="Using Presets">
        <p style={prose}>You can skip the numbers entirely. Pass one of these preset names as the config and adjust from there if needed.</p>
        <CodeBlock>{`config="gentle"   // slow and floaty, good for illustrations
config="smooth"   // the default, works for most things
config="stiff"    // fast and precise, good for UI icons
config="bouncy"   // overshoots and settles back
config="wobbly"   // exaggerated bounce, use it carefully`}</CodeBlock>
        <p style={{ ...prose, marginTop: '12px' }}>Start with <code style={inline}>"smooth"</code> and switch to <code style={inline}>"bouncy"</code> if you want more energy.</p>
      </DocSubsection>

      <DocSubsection title="Drop-in Snippet">
        <p style={prose}>Paste your SVG strings into this component and hook up <code style={inline}>isActive</code> to whatever triggers the animation. A click, a hover, a scroll position or anything that gives you a boolean works.</p>
        <CodeBlock>{`import { useState } from 'react'
import { RuunSVG } from 'getruun-react'

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
        <p style={{ ...prose, marginTop: '12px' }}>You can also hand this to an AI assistant along with your SVGs. Just describe what you want to trigger the morph and it should be able to wire it up from here.</p>
      </DocSubsection>

      <DocSubsection title="What Morphs Well">
        <p style={prose}>Some pairs of shapes morph better than others. Here's a rough guide.</p>
        <CodeBlock>{`✓  Similar shapes — a circle to a rounded square reads cleanly
✓  Same path count — one path to one path is always smooth
✓  Icon sets — Lucide, Phosphor, and Heroicons work great
   together since they share the same grid and drawing style

✗  Photos or complex illustrations — too many paths to track
✗  Text converted to outlines — compound paths get messy
✗  Very different shapes — a star to a line will look glitchy`}</CodeBlock>
        <p style={{ ...prose, marginTop: '12px' }}>If a morph looks off, try simplifying the shapes in Figma first. Flatten layers, merge paths where you can, and reduce anchor points before copying.</p>
      </DocSubsection>
    </DocSection>
  )
}
