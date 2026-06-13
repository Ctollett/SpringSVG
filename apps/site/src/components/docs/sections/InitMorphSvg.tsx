import { DocSection, DocSubsection, CodeBlock, ParamList, ParamRow, prose, inline } from '../DocSection'

export default function InitMorphSvg() {
  return (
    <DocSection id="init-morph-svg" title="initMorphSvg">
      <DocSubsection title="Usage">
        <p style={prose}>Sets up the container SVG with path elements from the starting SVG. You need to call this once before the first <code style={inline}>morphSvg</code> call. After that, the container is ready and any subsequent morphs can fire without any first-frame delay.</p>
        <CodeBlock>{`import { initMorphSvg, morphSvg } from 'getruun'

const container = document.querySelector('svg') as SVGSVGElement

initMorphSvg(container, fromSvg)

button.addEventListener('click', () => {
  morphSvg(container, toSvg)
})`}</CodeBlock>
        <p style={{ ...prose, marginTop: '12px' }}>Call it during page load or when the component mounts. By the time the user interacts, the paths are already in the DOM and the first morph will be instant.</p>
      </DocSubsection>

      <DocSubsection title="Parameters">
        <ParamList>
          <ParamRow name="container" type="SVGSVGElement" required>An empty svg element in the DOM. You'll pass this same element to morphSvg later.</ParamRow>
          <ParamRow name="fromSvg" type="string" required>The starting SVG markup.</ParamRow>
        </ParamList>
      </DocSubsection>
    </DocSection>
  )
}
