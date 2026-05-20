import { DocSection, DocSubsection, prose, code } from '../DocSection'

export default function SpringConfig() {
  return (
    <DocSection id="spring-config" title="Spring Config">
      <DocSubsection title="stiffness">
        <p style={prose}>Controls how quickly the spring moves toward its target. Higher values snap faster; lower values ease in slowly. Typical range: 80–500.</p>
        <pre><code style={code}>{`{ stiffness: 200 }  // default`}</code></pre>
        <p style={{ ...prose, marginTop: '12px' }}>A good starting point is 200. Push it above 400 for snappy UI feedback; drop it below 100 for slow, cinematic movement.</p>
      </DocSubsection>

      <DocSubsection title="damping">
        <p style={prose}>Controls how much the spring resists oscillation. Low damping produces a bouncy overshoot; high damping settles without bouncing. Typical range: 10–60.</p>
        <pre><code style={code}>{`{ damping: 20 }  // default`}</code></pre>
        <p style={{ ...prose, marginTop: '12px' }}>Pair with stiffness — high stiffness with low damping gives a fast, springy feel. High stiffness with high damping snaps cleanly with no overshoot.</p>
      </DocSubsection>

      <DocSubsection title="mass">
        <p style={prose}>Controls the inertia of the animation. Higher mass makes the spring feel heavier and slower to respond. Typical range: 0.5–2.0.</p>
        <pre><code style={code}>{`{ mass: 1 }  // default`}</code></pre>
        <p style={{ ...prose, marginTop: '12px' }}>Most morphs work well at the default of 1. Increase it slightly to add weight to large, complex shapes.</p>
      </DocSubsection>
    </DocSection>
  )
}
