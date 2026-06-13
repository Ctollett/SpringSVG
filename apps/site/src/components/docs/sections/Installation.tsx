import { DocSection, DocSubsection, CodeBlock, prose } from '../DocSection'

export default function Installation() {
  return (
    <DocSection id="installation" title="Installation">
      <DocSubsection title="React">
        <p style={prose}>Install the React package. It pulls in the core engine as a dependency, so this is the only install you need.</p>
        <CodeBlock>npm install getruun-react</CodeBlock>
        <CodeBlock>yarn add getruun-react</CodeBlock>
        <CodeBlock>pnpm add getruun-react</CodeBlock>
      </DocSubsection>

      <DocSubsection title="Vanilla JS">
        <p style={prose}>If you're working outside of React, install the core package on its own.</p>
        <CodeBlock>npm install getruun</CodeBlock>
        <CodeBlock>yarn add getruun</CodeBlock>
        <CodeBlock>pnpm add getruun</CodeBlock>
      </DocSubsection>
    </DocSection>
  )
}
