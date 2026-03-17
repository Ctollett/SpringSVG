import { MorphTarget, PathCommand } from "./types";

export function parse(d: string): MorphTarget {
    const matches = d.matchAll(/([MLHVCSQTAZmlhvcsqtaz])([^MLHVCSQTAZmlhvcsqtaz]*)/g)
    const commands: PathCommand[] = []

    for (const match of matches) {
        const type = match[1]!
        const values = match[2]?.trim().split(/\s+|,/).filter(Boolean).map(Number)!
        commands.push({type, values})
    }

    return {commands, raw: d}

}

export function serialize(commands: PathCommand[]): string {
   return commands.map(cmd => `${cmd.type} ${cmd.values.join(" ")}` 
    ).join(" ")
}


export function toAbsolute(commands: PathCommand[]): PathCommand[] {
    let x = 0
    let y = 0
    let startX = 0
    let startY = 0

    return commands.map(cmd => {
        switch(cmd.type) {
            case "M": 
            x = cmd.values[0]!
            y = cmd.values[1]!
            startX = x
            startY = y
            return cmd

            case "m":
            x = x + cmd.values[0]!
            y = y + cmd.values[1]!
            startX = x
            startY = y
            return ({type: 'M', values: [x,y]})

            case "L":
            x = cmd.values[0]!
            y = cmd.values[1]!
            return cmd

            case "l":
            x = x + cmd.values[0]!
            y = y + cmd.values[1]!
            return ({type: 'L', values: [x,y]})

            case "H":
            x = cmd.values[0]!
            return cmd

            case "h":
            x = x + cmd.values[0]!
            return ({type: 'H', values: [x]})

            case "V":
            y = cmd.values[0]!
            return cmd

            case "v":
            y = y + cmd.values[0]!
            return ({type: 'V', values: [y]})

            case "C":
            x = cmd.values[4]!
            y = cmd.values[5]!
            return cmd

            case "c": {
            const x1 = x + cmd.values[0]!
            const y1 = y + cmd.values[1]!
            const x2 = x + cmd.values[2]!
            const y2 = y + cmd.values[3]!
            const ex = x + cmd.values[4]!
            const ey = y + cmd.values[5]!
            x = ex
            y = ey
            return { type: 'C', values: [x1, y1, x2, y2, ex, ey] }
            }

            case "Z":
            x = startX
            y = startY
            return cmd;

            case "z":
            x = startX
            y = startY
            return { type: 'Z', values: [] }

            case "Q":
            x = cmd.values[2]!
            y = cmd.values[3]!
            return cmd;

            case "q": {
            const x1 = x + cmd.values[0]!
            const y1 = y + cmd.values[1]!
            const ex = x + cmd.values[2]!
            const ey = y + cmd.values[3]!
            x = ex
            y = ey
            return { type: 'Q', values: [x1, y1, ex, ey] }
            }


            case "S":
            x = cmd.values[2]!
            y = cmd.values[3]!
            return cmd

            case "s": {
            const x2 = x + cmd.values[0]!
            const y2 = y + cmd.values[1]!
            const ex = x + cmd.values[2]!
            const ey = y + cmd.values[3]!
            x = ex
            y = ey
            return { type: 'S', values: [x2, y2, ex, ey] }
            }

            case "T":
            x = cmd.values[0]!
            y = cmd.values[1]!
            return cmd

            case "t": {
            const ex = x + cmd.values[0]!
            const ey = y + cmd.values[1]!
            x = ex
            y = ey
            return { type: 'T', values: [ex, ey] }
            }

            default:
            return cmd
        }
    })
}

function toAbsoluteCubic(commands: PathCommand[]): PathCommand[] {
    let x = 0
    let y = 0
    let startX = 0
    let startY = 0
    let lastCPX = 0
    let lastCPY = 0

     return commands.flatMap(cmd => {
        switch(cmd.type) {
            case "M":
            x = cmd.values[0]!
            y = cmd.values[1]!
            startX = x
            startY = y
            return [cmd]

            case "C":
            x = cmd.values[4]!
            y = cmd.values[5]!
            lastCPX = cmd.values[2]!
            lastCPY = cmd.values[3]!
            return [cmd]

            case "L": {
            const ex = cmd.values[0]!
            const ey = cmd.values[1]!
            const result = { type: 'C', values: [
                x  + (ex - x)  / 3, y  + (ey - y)  / 3,
                x  + (ex - x)  * 2/3, y  + (ey - y)  * 2/3,
                ex, ey
            ] }
            x = ex; y = ey; lastCPX = ex; lastCPY = ey
            return [result]
            }

            case "H": {
            const ex = cmd.values[0]!
            const ey = y
            const result = { type: 'C', values: [
                x  + (ex - x)  / 3, y,
                x  + (ex - x)  * 2/3, y,
                ex, ey
            ] }
            x = ex; lastCPX = ex; lastCPY = ey
            return [result]
            }

            case "V": {
            const ex = x
            const ey = cmd.values[0]!
            const result = { type: 'C', values: [
                x, y  + (ey - y)  / 3,
                x, y  + (ey - y)  * 2/3,
                ex, ey
            ] }
            y = ey; lastCPX = ex; lastCPY = ey
            return [result]
            }

            case "Q": {
            const qx1 = cmd.values[0]!
            const qy1 = cmd.values[1]!
            const ex = cmd.values[2]!
            const ey = cmd.values[3]!
            const cp1x = x + (2/3) * (qx1 - x)
            const cp1y = y + (2/3) * (qy1 - y)
            const cp2x = ex + (2/3) * (qx1 - ex)
            const cp2y = ey + (2/3) * (qy1 - ey)
            const result = { type: 'C', values: [cp1x, cp1y, cp2x, cp2y, ex, ey] }
            x = ex; y = ey; lastCPX = cp2x; lastCPY = cp2y
            return [result]
            }

            case "S": {
            const cp1x = 2 * x - lastCPX
            const cp1y = 2 * y - lastCPY
            const cp2x = cmd.values[0]!
            const cp2y = cmd.values[1]!
            const ex   = cmd.values[2]!
            const ey   = cmd.values[3]!
            const result = { type: 'C', values: [cp1x, cp1y, cp2x, cp2y, ex, ey] }
            lastCPX = cp2x; lastCPY = cp2y; x = ex; y = ey
            return [result]
            }

            case "T": {
            const cp1x = 2 * x - lastCPX
            const cp1y = 2 * y - lastCPY
            const ex   = cmd.values[0]!
            const ey   = cmd.values[1]!
            const result = { type: 'C', values: [cp1x, cp1y, ex, ey, ex, ey] }
            lastCPX = cp1x; lastCPY = cp1y; x = ex; y = ey
            return [result]
            }

            case "Z": {
            // skip degenerate close (last point already equals start)
            if (Math.hypot(x - startX, y - startY) < 0.001) {
                x = startX; y = startY
                return []
            }
            const result = { type: 'C', values: [
                x + (startX - x) / 3,     y + (startY - y) / 3,
                x + (startX - x) * 2/3,   y + (startY - y) * 2/3,
                startX, startY
            ] }
            x = startX; y = startY
            return [result]
            }

            default:
            return [cmd]
        }
        })
}

function longestCubicIndex(commands: PathCommand[]): number {
    let px = 0, py = 0
    let maxLen = -1
    let maxIdx = -1

    for (let i = 0; i < commands.length; i++) {
        const cmd = commands[i]!
        if (cmd.type === 'M') {
            px = cmd.values[0]!
            py = cmd.values[1]!
        } else if (cmd.type === 'C') {
            const x0 = cmd.values[0]!, y0 = cmd.values[1]!
            const x1 = cmd.values[2]!, y1 = cmd.values[3]!
            const ex = cmd.values[4]!, ey = cmd.values[5]!
            // control-point hull length as arc-length estimate
            const len = Math.hypot(x0 - px, y0 - py)
                      + Math.hypot(x1 - x0, y1 - y0)
                      + Math.hypot(ex - x1, ey - y1)
            if (len > maxLen) { maxLen = len; maxIdx = i }
            px = ex
            py = ey
        }
    }
    return maxIdx
}

function subdivideAt(commands: PathCommand[], i: number): PathCommand[] {
    const cmd = commands[i]!
    const [v0, v1, v2, v3, v4, v5] = cmd.values as [number,number,number,number,number,number]
    const prev = commands[i - 1]
    const sx = prev ? prev.values[prev.values.length - 2]! : 0
    const sy = prev ? prev.values[prev.values.length - 1]! : 0

    const m0x = (sx + v0) / 2,  m0y = (sy + v1) / 2
    const m1x = (v0 + v2) / 2,  m1y = (v1 + v3) / 2
    const m2x = (v2 + v4) / 2,  m2y = (v3 + v5) / 2
    const m3x = (m0x + m1x) / 2, m3y = (m0y + m1y) / 2
    const m4x = (m1x + m2x) / 2, m4y = (m1y + m2y) / 2
    const mx  = (m3x + m4x) / 2, my  = (m3y + m4y) / 2

    const left:  PathCommand = { type: 'C', values: [m0x, m0y, m3x, m3y, mx, my] }
    const right: PathCommand = { type: 'C', values: [m4x, m4y, m2x, m2y, v4, v5] }

    return [...commands.slice(0, i), left, right, ...commands.slice(i + 1)]
}

function matchPointCounts(a: PathCommand[], b: PathCommand[]): [PathCommand[], PathCommand[]] {
    while (a.length < b.length) a = subdivideAt(a, longestCubicIndex(a))
    while (b.length < a.length) b = subdivideAt(b, longestCubicIndex(b))
    return [a, b]
}

export function interpolate(a: MorphTarget, b: MorphTarget, t: number): PathCommand[] {
    return a.commands.map((cmdA, i) => {
        const cmdB = b.commands[i]!
        return {
            type: cmdA.type,
            values: cmdA.values.map((v, j) => v + (cmdB.values[j]! - v) * t)
        }
    })
}

export function normalize(a: MorphTarget, b: MorphTarget): [MorphTarget, MorphTarget] {
    let aCmds = toAbsoluteCubic(toAbsolute(a.commands))
    let bCmds = toAbsoluteCubic(toAbsolute(b.commands))
    ;[aCmds, bCmds] = matchPointCounts(aCmds, bCmds)
    return [
        { commands: aCmds, raw: a.raw },
        { commands: bCmds, raw: b.raw }
    ]
}

