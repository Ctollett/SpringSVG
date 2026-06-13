/**
 * Configuration for the spring physics simulation.
 * All three values work together to define the feel of the animation.
 *
 * @remarks
 * If you're just getting started, use a preset string instead of setting values manually —
 * pass `'gentle'`, `'smooth'`, `'stiff'`, `'bouncy'`, or `'wobbly'` as the config argument
 * to {@link morphSvg} and tune from there.
 */
export interface SpringConfig {
    /** How fast the spring pulls toward the target. Higher values are snappier and more responsive. Lower values are slower and more gradual. Typical range: 100–500. */
    stiffness: number
    /** How much the spring resists oscillation. Higher values settle quickly with little or no bounce. Lower values allow overshoot and bounce. Typical range: 8–30. */
    damping: number
    /** How heavy the animated object feels. Higher values create more inertia — slower to start and stop. Lower values feel lighter and more immediate. Typical range: 0.5–2. */
    mass: number
}


export interface SpringState {
    position: number
    velocity: number
    target: number

}

export interface SpringResult {
    value: number
    velocity: number
    settled: boolean

}



