import { describe, it, expect } from 'vitest'
import { addAnimation, removeAnimation } from '../../src/engine/solver'

const config = { stiffness: 200, damping: 26, mass: 1 }
const state = () => ({ position: 0, velocity: 0, target: 1 })

describe('addAnimation', () => {
  it('returns a numeric id', () => {
    const id = addAnimation(config, state(), () => {})
    expect(typeof id).toBe('number')
  })

  it('returns incrementing ids', () => {
    const id1 = addAnimation(config, state(), () => {})
    const id2 = addAnimation(config, state(), () => {})
    expect(id2).toBeGreaterThan(id1)
  })

  it('does not throw with valid arguments', () => {
    expect(() => addAnimation(config, state(), () => {})).not.toThrow()
  })

  it('accepts an optional onComplete callback', () => {
    expect(() => addAnimation(config, state(), () => {}, () => {})).not.toThrow()
  })
})

describe('removeAnimation', () => {
  it('does not throw when removing a known id', () => {
    const id = addAnimation(config, state(), () => {})
    expect(() => removeAnimation(id)).not.toThrow()
  })

  it('does not throw when removing an unknown id', () => {
    expect(() => removeAnimation(99999)).not.toThrow()
  })
})
