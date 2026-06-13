import { DocSection, DocSubsection, CodeBlock, ParamList, ParamRow, prose, inline } from '../DocSection'

export default function RuunSVG() {
  return (
    <DocSection id="ruun-svg" title="RuunSVG">
      <DocSubsection title="Usage">
        <p style={prose}>The React component for declarative morphing. Give it two SVG strings and flip <code style={inline}>active</code> to trigger the animation. You can toggle it mid-morph and the spring will pick up from wherever the paths are.</p>
        <CodeBlock>{`import { RuunSVG } from 'getruun-react'

<RuunSVG
  from={fromSvg}
  to={toSvg}
  active={isActive}
  config="smooth"
  onSettle={() => console.log('settled')}
/>`}</CodeBlock>
      </DocSubsection>

      <DocSubsection title="Props">
        <ParamList>
          <ParamRow name="from" type="string" required>The source SVG string.</ParamRow>
          <ParamRow name="to" type="string" required>The target SVG string.</ParamRow>
          <ParamRow name="active" type="boolean" required>Controls which direction to morph.</ParamRow>
          <ParamRow name="config" type="SpringConfig | string">A SpringConfig object or preset name. Defaults to 'smooth'.</ParamRow>
          <ParamRow name="onSettle" type="() => void">Called when the animation finishes settling.</ParamRow>
          <ParamRow name="className" type="string">Passed through to the underlying svg element.</ParamRow>
          <ParamRow name="viewBox" type="string">Overrides the viewBox parsed from the source SVG.</ParamRow>
        </ParamList>
        <p style={{ ...prose, marginTop: '12px' }}>Preset names for <code style={inline}>config</code>: <code style={inline}>'gentle'</code>, <code style={inline}>'smooth'</code>, <code style={inline}>'stiff'</code>, <code style={inline}>'bouncy'</code>, <code style={inline}>'wobbly'</code>. Leave it out to use <code style={inline}>'smooth'</code> by default.</p>
      </DocSubsection>
    </DocSection>
  )
}
