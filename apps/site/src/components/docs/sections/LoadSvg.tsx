import { DocSection, DocSubsection, CodeBlock, ParamList, ParamRow, prose, inline } from '../DocSection'

export default function LoadSvg() {
  return (
    <DocSection id="load-svg" title="loadSvg">
      <DocSubsection title="Usage">
        <p style={prose}>Fetches an SVG file from a URL and returns the markup as a string. This is the alternative to <code style={inline}>?raw</code> imports for projects outside of Vite, or any time you need to load SVGs at runtime.</p>
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
        <p style={{ ...prose, marginTop: '12px' }}>Load your SVGs during page or component setup, not inside event handlers. That way they're already in memory when the user clicks and the morph fires immediately.</p>
      </DocSubsection>

      <DocSubsection title="Parameters">
        <ParamList>
          <ParamRow name="url" type="string" required>The URL or path to the SVG file.</ParamRow>
        </ParamList>
      </DocSubsection>

      <DocSubsection title="Returns">
        <p style={prose}>A <code style={inline}>Promise{'<string>'}</code> that resolves to the full SVG markup. If the request fails, it throws with a message that includes the URL and HTTP status.</p>
        <CodeBlock>{`// Example error message on failure:
// Failed to load SVG from "/fox.svg": 404 Not Found`}</CodeBlock>
      </DocSubsection>
    </DocSection>
  )
}
