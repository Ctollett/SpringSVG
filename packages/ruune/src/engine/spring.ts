import { SpringConfig, SpringState, SpringResult } from "./types";

export function stepSpring(
    config: SpringConfig,
    state: SpringState,
    dt: number
): SpringResult {
    const displacement = state.position - state.target
    const springForce = -config.stiffness * displacement
    const dampingForce = -config.damping * state.velocity
    const totalForce = springForce + dampingForce

    const acceleration = totalForce / config.mass
    const velocity = state.velocity + acceleration * dt
    const position = state.position + velocity * dt

    const settled = Math.abs(velocity) < 0.001 && Math.abs(displacement) < 0.001

    return { value: settled ? state.target : position, velocity, settled }
}
