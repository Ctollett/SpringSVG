import { describe, it, expect } from 'vitest'
import { parse, toAbsolute, toAbsoluteCubic, interpolate, normalize } from '../../src/svg/path'

describe('parse', () => {
  it('parses a simple M L Z path', () => {
    const result = parse('M 0 0 L 10 10 Z')
    expect(result.commands).toHaveLength(3)
    expect(result.commands[0]).toEqual({ type: 'M', values: [0, 0] })
    expect(result.commands[1]).toEqual({ type: 'L', values: [10, 10] })
    expect(result.commands[2]).toEqual({ type: 'Z', values: [] })
  })

  it('parses a cubic bezier', () => {
    const result = parse('M 0 0 C 1 2 3 4 5 6')
    expect(result.commands[1]).toEqual({ type: 'C', values: [1, 2, 3, 4, 5, 6] })
  })

  it('splits implicit repeated L coords after M', () => {
    const result = parse('M 0 0 10 10 20 20')
    expect(result.commands[0]).toEqual({ type: 'M', values: [0, 0] })
    expect(result.commands[1]).toEqual({ type: 'L', values: [10, 10] })
    expect(result.commands[2]).toEqual({ type: 'L', values: [20, 20] })
  })

  it('stores the raw d string', () => {
    const d = 'M 0 0 L 5 5'
    expect(parse(d).raw).toBe(d)
  })
})

describe('toAbsolute', () => {
  it('converts relative m to absolute M', () => {
    const cmds = parse('m 10 20').commands
    const abs = toAbsolute(cmds)
    expect(abs[0]).toEqual({ type: 'M', values: [10, 20] })
  })

  it('converts relative l to absolute L', () => {
    const cmds = parse('M 5 5 l 3 4').commands
    const abs = toAbsolute(cmds)
    expect(abs[1]).toEqual({ type: 'L', values: [8, 9] })
  })

  it('leaves absolute commands unchanged', () => {
    const cmds = parse('M 10 10 L 20 20').commands
    const abs = toAbsolute(cmds)
    expect(abs[0]).toEqual({ type: 'M', values: [10, 10] })
    expect(abs[1]).toEqual({ type: 'L', values: [20, 20] })
  })
})

describe('toAbsoluteCubic', () => {
  it('converts L to C', () => {
    const cmds = toAbsolute(parse('M 0 0 L 10 0').commands)
    const cubics = toAbsoluteCubic(cmds)
    expect(cubics.every(c => c.type === 'M' || c.type === 'C')).toBe(true)
  })

  it('converts H to C', () => {
    const cmds = toAbsolute(parse('M 0 0 H 10').commands)
    const cubics = toAbsoluteCubic(cmds)
    expect(cubics[1]!.type).toBe('C')
    expect(cubics[1]!.values[4]).toBe(10)
  })

  it('converts V to C', () => {
    const cmds = toAbsolute(parse('M 0 0 V 10').commands)
    const cubics = toAbsoluteCubic(cmds)
    expect(cubics[1]!.type).toBe('C')
    expect(cubics[1]!.values[5]).toBe(10)
  })

  it('preserves M commands', () => {
    const cmds = toAbsolute(parse('M 5 5 L 10 10').commands)
    const cubics = toAbsoluteCubic(cmds)
    expect(cubics[0]).toEqual({ type: 'M', values: [5, 5] })
  })
})

describe('interpolate', () => {
  it('returns a at t=0', () => {
    const a = parse('M 0 0 L 0 0')
    const b = parse('M 10 10 L 20 20')
    const [na, nb] = normalize(a, b)
    const result = interpolate(na, nb, 0)
    expect(result[0]!.values[0]).toBeCloseTo(na.commands[0]!.values[0]!, 1)
  })

  it('returns b at t=1', () => {
    const a = parse('M 0 0 L 0 0')
    const b = parse('M 10 10 L 20 20')
    const [na, nb] = normalize(a, b)
    const result = interpolate(na, nb, 1)
    const lastA = na.commands[na.commands.length - 1]!
    const lastB = nb.commands[nb.commands.length - 1]!
    const lastR = result[result.length - 1]!
    expect(lastR.values[0]).toBeCloseTo(lastB.values[0]!, 1)
    expect(lastR.values[0]).not.toBeCloseTo(lastA.values[0]!, 1)
  })

  it('returns midpoint at t=0.5', () => {
    const a = { commands: [{ type: 'M', values: [0, 0] }], raw: '' }
    const b = { commands: [{ type: 'M', values: [10, 10] }], raw: '' }
    const result = interpolate(a, b, 0.5)
    expect(result[0]!.values[0]).toBeCloseTo(5, 5)
    expect(result[0]!.values[1]).toBeCloseTo(5, 5)
  })
})

describe('normalize', () => {
  it('returns two MorphTargets with equal command counts', () => {
    const a = parse('M 0 0 L 10 0 L 10 10 Z')
    const b = parse('M 5 5 L 20 5 L 20 20 Z')
    const [na, nb] = normalize(a, b)
    expect(na.commands.length).toBe(nb.commands.length)
  })

  it('handles paths with different complexities', () => {
    const simple = parse('M 0 0 L 10 0 Z')
    const complex = parse('M 0 0 C 3 0 7 0 10 0 C 10 3 10 7 10 10 C 7 10 3 10 0 10 Z')
    const [na, nb] = normalize(simple, complex)
    expect(na.commands.length).toBe(nb.commands.length)
  })
})
