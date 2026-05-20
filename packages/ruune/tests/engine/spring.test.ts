import { describe, it, expect } from 'vitest'
import { stepSpring } from '../../src/engine/spring'

const config = { stiffness: 200, damping: 26, mass: 1 }

describe('stepSpring', () => {
  it('moves position toward target', () => {
    const state = { position: 0, velocity: 0, target: 1 }
    const result = stepSpring(config, state, 1 / 60)
    expect(result.value).toBeGreaterThan(0)
    expect(result.value).toBeLessThan(1)
  })

  it('reports settled when displacement and velocity are negligible', () => {
    const state = { position: 1.0000001, velocity: 0.0000001, target: 1 }
    const result = stepSpring(config, state, 1 / 60)
    expect(result.settled).toBe(true)
  })

  it('is not settled when far from target', () => {
    const state = { position: 0, velocity: 0, target: 1 }
    const result = stepSpring(config, state, 1 / 60)
    expect(result.settled).toBe(false)
  })

  it('snaps to target exactly when settled', () => {
    const state = { position: 1.0000001, velocity: 0.0000001, target: 1 }
    const result = stepSpring(config, state, 1 / 60)
    expect(result.value).toBe(1)
  })

  it('converges to target over many frames', () => {
    let state = { position: 0, velocity: 0, target: 1 }
    for (let i = 0; i < 300; i++) {
      const r = stepSpring(config, state, 1 / 60)
      state.position = r.value
      state.velocity = r.velocity
      if (r.settled) break
    }
    expect(state.position).toBeCloseTo(1, 3)
  })

  it('carries velocity across frames', () => {
    const state = { position: 0, velocity: 0, target: 1 }
    const r1 = stepSpring(config, state, 1 / 60)
    const r2 = stepSpring(config, { position: r1.value, velocity: r1.velocity, target: 1 }, 1 / 60)
    expect(r2.value).toBeGreaterThan(r1.value)
  })

  it('works with zero dt (no movement)', () => {
    const state = { position: 0.5, velocity: 2, target: 1 }
    const result = stepSpring(config, state, 0)
    expect(result.value).toBe(0.5)
    expect(result.velocity).toBe(2)
  })
})
