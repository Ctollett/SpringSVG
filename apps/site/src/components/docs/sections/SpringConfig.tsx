import { DocSection, DocSubsection, CodeBlock, prose } from '../DocSection'

export default function SpringConfig() {
  return (
    <DocSection id="spring-config" title="Spring Config">
      <DocSubsection title="stiffness">
        <p style={prose}>How fast the spring pulls toward its target. Higher values are snappier and more responsive. Lower values ease in more gradually. Typical range: 100–500.</p>
        <CodeBlock>{`{ stiffness: 200 }`}</CodeBlock>
        <p style={{ ...prose, marginTop: '12px' }}>200 is a solid starting point. Push above 400 for tight, snappy UI interactions. Drop below 120 for slower, more cinematic movement.</p>
      </DocSubsection>

      <DocSubsection title="damping">
        <p style={prose}>How much the spring resists oscillation. Low damping means it bounces past the target before settling. High damping means it stops cleanly with no overshoot. Typical range: 8–30.</p>
        <CodeBlock>{`{ damping: 20 }`}</CodeBlock>
        <p style={{ ...prose, marginTop: '12px' }}>Tune this alongside stiffness. High stiffness with low damping gives you a fast, springy feel. High stiffness with high damping snaps into place with no bounce.</p>
      </DocSubsection>

      <DocSubsection title="mass">
        <p style={prose}>How heavy the animation feels. Higher mass means more inertia — slower to get going and slower to stop. Typical range: 0.5–2.</p>
        <CodeBlock>{`{ mass: 1 }`}</CodeBlock>
        <p style={{ ...prose, marginTop: '12px' }}>Most morphs work well at 1. If you're animating a large or complex shape and want it to feel weightier, try bumping this up slightly.</p>
      </DocSubsection>
    </DocSection>
  )
}
