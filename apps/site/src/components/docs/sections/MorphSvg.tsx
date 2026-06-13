import { DocSection, DocSubsection, CodeBlock, ParamList, ParamRow, prose, inline } from '../DocSection'

export default function MorphSvg() {
  return (
    <DocSection id="morph-svg" title="morphSvg">
      <DocSubsection title="Usage">
        <p style={prose}>The main function for triggering a morph. Pass it the container, the SVG you want to animate toward, and an optional config. The animation starts right away.</p>
        <CodeBlock>{`import { morphSvg } from 'getruun'

morphSvg(container, toSvg, {
  stiffness: 200,
  damping: 20,
  mass: 1,
})`}</CodeBlock>
      </DocSubsection>

      <DocSubsection title="Parameters">
        <ParamList>
          <ParamRow name="container" type="SVGSVGElement" required>The svg element previously set up with initMorphSvg. This is where the paths live and what gets animated.</ParamRow>
          <ParamRow name="toSvg" type="string" required>The target SVG markup to animate toward.</ParamRow>
          <ParamRow name="config" type="SpringConfig | string">A SpringConfig object or one of the preset names: 'gentle', 'smooth', 'stiff', 'bouncy', or 'wobbly'. Defaults to 'smooth'.</ParamRow>
          <ParamRow name="onSettle" type="() => void">Called when the animation finishes settling.</ParamRow>
        </ParamList>
      </DocSubsection>

      <DocSubsection title="Returns">
        <p style={prose}>Returns <code style={inline}>void</code>. You can call it again while an animation is in progress and it will retarget smoothly, picking up from the current position and velocity.</p>
      </DocSubsection>
    </DocSection>
  )
}
