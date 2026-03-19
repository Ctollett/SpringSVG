import { MorphTarget, PathCommand } from "./types";

const ARITY: Record<string, number> = {
    M: 2, m: 2, L: 2, l: 2, H: 1, h: 1, V: 1, v: 1,
    C: 6, c: 6, S: 4, s: 4, Q: 4, q: 4, T: 2, t: 2,
    A: 7, a: 7, Z: 0, z: 0
}

const NUM = '-?(?:\\d+\\.?\\d*|\\.\\d+)(?:e[-+]?\\d+)?'
const FLAG = '[01]'
// Arc args: rx ry x-rotation large-arc-flag sweep-flag x y
// Flags are single bits and may be written without separators (e.g. "0 00-4.88")
const ARC_RE = new RegExp(
    `(${NUM})\\s*,?\\s*(${NUM})\\s*,?\\s*(${NUM})\\s*,?\\s*(${FLAG})\\s*,?\\s*(${FLAG})\\s*,?\\s*(${NUM})\\s*,?\\s*(${NUM})`, 'g'
)

export function parse(d: string): MorphTarget {
    const matches = d.matchAll(/([MLHVCSQTAZmlhvcsqtaz])([^MLHVCSQTAZmlhvcsqtaz]*)/g)
    const commands: PathCommand[] = []

    for (const match of matches) {
        const type = match[1]!
        const rest = match[2] ?? ''
        const arity = ARITY[type] ?? 0

        let values: number[]
        if (type === 'a' || type === 'A') {
            // Use the arc-specific regex so flag bits (0/1) are never merged
            // with adjacent digits (e.g. "00" → two flags, not the number 0)
            values = []
            for (const m of rest.matchAll(ARC_RE)) {
                for (let i = 1; i <= 7; i++) values.push(Number(m[i]))
            }
        } else {
            values = Array.from(rest.matchAll(/-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/gi), m => Number(m[0]))
        }

        if (arity === 0 || values.length <= arity) {
            commands.push({ type, values })
        } else {
            // Split chained coordinates into separate commands.
            // After M/m, repeated coords are implicit L/l per SVG spec.
            for (let i = 0; i + arity <= values.length; i += arity) {
                const cmdType = (type === 'M' && i > 0) ? 'L'
                              : (type === 'm' && i > 0) ? 'l'
                              : type
                commands.push({ type: cmdType, values: values.slice(i, i + arity) })
            }
        }
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

            case "A":
            x = cmd.values[5]!
            y = cmd.values[6]!
            return cmd

            case "a": {
            const ex = x + cmd.values[5]!
            const ey = y + cmd.values[6]!
            x = ex; y = ey
            return { type: 'A', values: [
                cmd.values[0]!, cmd.values[1]!, cmd.values[2]!,
                cmd.values[3]!, cmd.values[4]!, ex, ey
            ]}
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

function angleBetween(ux: number, uy: number, vx: number, vy: number): number {
    const dot = ux * vx + uy * vy
    const len = Math.sqrt((ux * ux + uy * uy) * (vx * vx + vy * vy))
    const a = Math.acos(Math.max(-1, Math.min(1, dot / len)))
    return (ux * vy - uy * vx < 0) ? -a : a
}

function arcToCubics(
    x0: number, y0: number,
    rx: number, ry: number,
    phiDeg: number,
    largeArc: number,
    sweep: number,
    x1: number, y1: number
): PathCommand[] {
    if (x0 === x1 && y0 === y1) return []
    rx = Math.abs(rx); ry = Math.abs(ry)
    if (rx === 0 || ry === 0) {
        return [{ type: 'C', values: [
            x0 + (x1 - x0) / 3, y0 + (y1 - y0) / 3,
            x0 + (x1 - x0) * 2/3, y0 + (y1 - y0) * 2/3,
            x1, y1
        ]}]
    }
    const phi = phiDeg * Math.PI / 180
    const cosP = Math.cos(phi), sinP = Math.sin(phi)
    const dx = (x0 - x1) / 2, dy = (y0 - y1) / 2
    const x1p =  cosP * dx + sinP * dy
    const y1p = -sinP * dx + cosP * dy
    const x1p2 = x1p * x1p, y1p2 = y1p * y1p
    const lambda = x1p2 / (rx * rx) + y1p2 / (ry * ry)
    if (lambda > 1) { const s = Math.sqrt(lambda); rx *= s; ry *= s }
    const rx2 = rx * rx, ry2 = ry * ry
    const sqNum = Math.max(0, rx2 * ry2 - rx2 * y1p2 - ry2 * x1p2)
    const sqDen = rx2 * y1p2 + ry2 * x1p2
    let sq = sqDen === 0 ? 0 : Math.sqrt(sqNum / sqDen)
    if (largeArc === sweep) sq = -sq
    const cxp =  sq * rx * y1p / ry
    const cyp = -sq * ry * x1p / rx
    const cx = cosP * cxp - sinP * cyp + (x0 + x1) / 2
    const cy = sinP * cxp + cosP * cyp + (y0 + y1) / 2
    const ux = (x1p - cxp) / rx, uy = (y1p - cyp) / ry
    const vx = (-x1p - cxp) / rx, vy = (-y1p - cyp) / ry
    const theta1 = angleBetween(1, 0, ux, uy)
    let dtheta = angleBetween(ux, uy, vx, vy)
    if (sweep === 0 && dtheta > 0) dtheta -= 2 * Math.PI
    if (sweep === 1 && dtheta < 0) dtheta += 2 * Math.PI
    const n = Math.max(1, Math.ceil(Math.abs(dtheta) / (Math.PI / 2)))
    const dt = dtheta / n
    const alpha = (4 / 3) * Math.tan(dt / 4)
    const result: PathCommand[] = []
    for (let i = 0; i < n; i++) {
        const t1 = theta1 + i * dt, t2 = theta1 + (i + 1) * dt
        const cos1 = Math.cos(t1), sin1 = Math.sin(t1)
        const cos2 = Math.cos(t2), sin2 = Math.sin(t2)
        result.push({ type: 'C', values: [
            cx + cosP * rx * (cos1 - alpha * sin1) - sinP * ry * (sin1 + alpha * cos1),
            cy + sinP * rx * (cos1 - alpha * sin1) + cosP * ry * (sin1 + alpha * cos1),
            cx + cosP * rx * (cos2 + alpha * sin2) - sinP * ry * (sin2 - alpha * cos2),
            cy + sinP * rx * (cos2 + alpha * sin2) + cosP * ry * (sin2 - alpha * cos2),
            cx + cosP * rx * cos2 - sinP * ry * sin2,
            cy + sinP * rx * cos2 + cosP * ry * sin2,
        ]})
    }
    return result
}

export function toAbsoluteCubic(commands: PathCommand[]): PathCommand[] {
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

            case "A": {
            const [arx, ary, phi, la, sw, ex, ey] = cmd.values as [number,number,number,number,number,number,number]
            const cubics = arcToCubics(x, y, arx, ary, phi, la, sw, ex, ey)
            if (cubics.length > 0) {
                const last = cubics[cubics.length - 1]!
                lastCPX = last.values[2]!
                lastCPY = last.values[3]!
            }
            x = ex; y = ey
            return cubics
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

// 5-point Gauss-Legendre quadrature on [0, 1]
const GL_T = [0.046910077, 0.230765345, 0.5, 0.769234655, 0.953089923]
const GL_W = [0.118463443, 0.239314335, 0.284444444, 0.239314335, 0.118463443]

function cubicSpeedAt(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, t: number): number {
    const mt = 1 - t
    const dx = 3 * (mt*mt*(x1-x0) + 2*mt*t*(x2-x1) + t*t*(x3-x2))
    const dy = 3 * (mt*mt*(y1-y0) + 2*mt*t*(y2-y1) + t*t*(y3-y2))
    return Math.hypot(dx, dy)
}

function cubicLengthTo(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, tEnd: number): number {
    let len = 0
    for (let i = 0; i < GL_T.length; i++) {
        len += GL_W[i]! * tEnd * cubicSpeedAt(x0, y0, x1, y1, x2, y2, x3, y3, GL_T[i]! * tEnd)
    }
    return len
}

function findTForLen(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, target: number, total: number): number {
    if (target <= 0) return 0
    if (target >= total) return 1
    let lo = 0, hi = 1
    for (let i = 0; i < 25; i++) {
        const mid = (lo + hi) / 2
        if (cubicLengthTo(x0, y0, x1, y1, x2, y2, x3, y3, mid) < target) lo = mid
        else hi = mid
    }
    return (lo + hi) / 2
}

function evalCubicAt(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, t: number): [number, number] {
    const mt = 1 - t
    return [
        mt*mt*mt*x0 + 3*mt*mt*t*x1 + 3*mt*t*t*x2 + t*t*t*x3,
        mt*mt*mt*y0 + 3*mt*mt*t*y1 + 3*mt*t*t*y2 + t*t*t*y3,
    ]
}

// Resample a [M, C, C, ...] path to N equal-arc-length segments, reconstructed as a Catmull-Rom spline.
function resamplePath(commands: PathCommand[], N: number): PathCommand[] {
    type Seg = { x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, len: number }
    const segs: Seg[] = []
    let sx = 0, sy = 0

    for (const cmd of commands) {
        if (cmd.type === 'M') {
            sx = cmd.values[0]!; sy = cmd.values[1]!
        } else if (cmd.type === 'C') {
            const [x1, y1, x2, y2, x3, y3] = cmd.values as [number,number,number,number,number,number]
            segs.push({ x0: sx, y0: sy, x1, y1, x2, y2, x3, y3, len: cubicLengthTo(sx, sy, x1, y1, x2, y2, x3, y3, 1) })
            sx = x3; sy = y3
        }
    }
    if (segs.length === 0) return commands

    const cumLen: number[] = [0]
    for (const seg of segs) cumLen.push(cumLen[cumLen.length - 1]! + seg.len)
    const totalLen = cumLen[cumLen.length - 1]!

    // Sample N+1 points at equal arc-length fractions
    const pts: [number, number][] = []
    for (let i = 0; i <= N; i++) {
        const target = (i / N) * totalLen
        let si = segs.length - 1
        for (let j = 0; j < segs.length; j++) {
            if (target <= cumLen[j + 1]!) { si = j; break }
        }
        const seg = segs[si]!
        const t = findTForLen(seg.x0, seg.y0, seg.x1, seg.y1, seg.x2, seg.y2, seg.x3, seg.y3, target - cumLen[si]!, seg.len)
        pts.push(evalCubicAt(seg.x0, seg.y0, seg.x1, seg.y1, seg.x2, seg.y2, seg.x3, seg.y3, t))
    }

    // Detect closed paths (start ≈ end) to use wrap-around Catmull-Rom tangents
    const isClosed = Math.hypot(pts[0]![0] - pts[N]![0], pts[0]![1] - pts[N]![1]) < 0.5

    // Reconstruct Catmull-Rom spline through sample points
    const result: PathCommand[] = [{ type: 'M', values: [pts[0]![0], pts[0]![1]] }]
    for (let i = 0; i < N; i++) {
        const p0 = (isClosed && i === 0) ? pts[N - 1]! : pts[Math.max(0, i - 1)]!
        const p1 = pts[i]!
        const p2 = pts[i + 1]!
        const p3 = (isClosed && i === N - 1) ? pts[1]! : pts[Math.min(N, i + 2)]!
        result.push({ type: 'C', values: [
            p1[0] + (p2[0] - p0[0]) / 6,
            p1[1] + (p2[1] - p0[1]) / 6,
            p2[0] - (p3[0] - p1[0]) / 6,
            p2[1] - (p3[1] - p1[1]) / 6,
            p2[0], p2[1],
        ]})
    }
    return result
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

// Remove subpaths whose coordinate spread is less than 1% of the overall
// bounding box's smallest dimension.  Catches invisible rendering artifacts
// (e.g. a 0.3-unit degenerate arc in an FA icon) that would otherwise pair
// badly with real subpaths and create large visible transitions.
export function filterDegenerate(subs: PathCommand[][]): PathCommand[][] {
    if (subs.length <= 1) return subs
    let totalMinX = Infinity, totalMaxX = -Infinity
    let totalMinY = Infinity, totalMaxY = -Infinity
    for (const sub of subs) {
        for (const cmd of sub) {
            for (let i = 0; i + 1 < cmd.values.length; i += 2) {
                const x = cmd.values[i]!, y = cmd.values[i + 1]!
                if (x < totalMinX) totalMinX = x; if (x > totalMaxX) totalMaxX = x
                if (y < totalMinY) totalMinY = y; if (y > totalMaxY) totalMaxY = y
            }
        }
    }
    const threshold = Math.min(totalMaxX - totalMinX, totalMaxY - totalMinY) * 0.01
    return subs.filter(sub => {
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
        for (const cmd of sub) {
            for (let i = 0; i + 1 < cmd.values.length; i += 2) {
                const x = cmd.values[i]!, y = cmd.values[i + 1]!
                if (x < minX) minX = x; if (x > maxX) maxX = x
                if (y < minY) minY = y; if (y > maxY) maxY = y
            }
        }
        return (maxX - minX) >= threshold || (maxY - minY) >= threshold
    })
}

export function splitSubpaths(commands: PathCommand[]): PathCommand[][] {
    const subpaths: PathCommand[][] = []
    let current: PathCommand[] = []
    for (const cmd of commands) {
        if (cmd.type === 'M' && current.length > 0) {
            subpaths.push(current)
            current = []
        }
        current.push(cmd)
    }
    if (current.length > 0) subpaths.push(current)
    return subpaths
}

// Collapse a subpath to a zero-area point at (x, y) with enough C commands to
// match partner curve count during resampling. Avoids fill-rule artifacts when
// extra subpaths overlap with real cutout subpaths on the shorter side.
function collapseToPoint(sub: PathCommand[], x: number, y: number): PathCommand[] {
    const curveCount = Math.max(4, sub.filter(c => c.type === 'C').length)
    const result: PathCommand[] = [{ type: 'M', values: [x, y] }]
    for (let i = 0; i < curveCount; i++) {
        result.push({ type: 'C', values: [x, y, x, y, x, y] })
    }
    return result
}

// For a resampled [M, C, C, ...] path, return the endpoint (x,y) of each C command.
function curveEndpoints(cmds: PathCommand[]): [number, number][] {
    return cmds.filter(c => c.type === 'C').map(c => [c.values[4]!, c.values[5]!])
}

// Returns the rotation offset k ∈ [0, N) that minimises Σ||a[i] - b[(i+k)%N]||².
// Only meaningful for closed paths where any start point is equivalent.
function findBestAlignment(a: PathCommand[], b: PathCommand[]): number {
    const N = a.filter(c => c.type === 'C').length
    if (N < 4) return 0
    const aPts = curveEndpoints(a)
    const bPts = curveEndpoints(b)
    if (aPts.length !== N || bPts.length !== N) return 0
    let bestK = 0, bestCost = Infinity
    for (let k = 0; k < N; k++) {
        let cost = 0
        for (let i = 0; i < N; i++) {
            const ap = aPts[i]!, bp = bPts[(i + k) % N]!
            const dx = ap[0] - bp[0], dy = ap[1] - bp[1]
            cost += dx * dx + dy * dy
            if (cost >= bestCost) break
        }
        if (cost < bestCost) { bestCost = cost; bestK = k }
    }
    return bestK
}

// Rotate a resampled [M, C, C, ...] closed path by `offset` curve positions so
// that the new start point is the endpoint of the curve just before the offset.
function rotateResampledPath(cmds: PathCommand[], offset: number): PathCommand[] {
    if (offset === 0) return cmds
    const curves = cmds.filter(c => c.type === 'C')
    const N = curves.length
    if (N === 0) return cmds
    const rotated = [...curves.slice(offset), ...curves.slice(0, offset)]
    const prev = curves[(offset - 1 + N) % N]!
    return [{ type: 'M', values: [prev.values[4]!, prev.values[5]!] }, ...rotated]
}

function isClosedResampled(cmds: PathCommand[]): boolean {
    const m = cmds.find(c => c.type === 'M')
    const cs = cmds.filter(c => c.type === 'C')
    if (!m || cs.length === 0) return false
    const last = cs[cs.length - 1]!
    return Math.hypot(m.values[0]! - last.values[4]!, m.values[1]! - last.values[5]!) < 1.0
}

export function normalize(a: MorphTarget, b: MorphTarget): [MorphTarget, MorphTarget] {
    const aCmds = toAbsoluteCubic(toAbsolute(a.commands))
    const bCmds = toAbsoluteCubic(toAbsolute(b.commands))

    const aSubs = filterDegenerate(splitSubpaths(aCmds))
    const bSubs = filterDegenerate(splitSubpaths(bCmds))

    // When FROM has extra subpaths: collapse BOTH the FROM extra AND the TO padding to the
    // same zero-area point so the spring has nothing to animate for those subpaths.
    // The caller (morph.ts) is responsible for fading them out via an overlay element.
    while (bSubs.length < aSubs.length) {
        const idx = bSubs.length
        const paired = aSubs[idx]!
        const m = paired.find(c => c.type === 'M')!
        const collapsed = collapseToPoint(paired, m.values[0]!, m.values[1]!)
        aSubs[idx] = [...collapsed]   // also collapse FROM's extra — invisible in spring
        bSubs.push([...collapsed])    // TO padding matches exactly → no movement
    }
    // When TO has extra subpaths: pad FROM with collapsed points but leave TO intact,
    // so those subpaths grow from nothing to their final shape.
    while (aSubs.length < bSubs.length) {
        const paired = bSubs[aSubs.length]!
        const m = paired.find(c => c.type === 'M')!
        aSubs.push(collapseToPoint(paired, m.values[0]!, m.values[1]!))
    }

    const aNorm: PathCommand[] = []
    const bNorm: PathCommand[] = []
    for (let i = 0; i < aSubs.length; i++) {
        const aSub = aSubs[i]!
        const bSub = bSubs[i]!
        const N = Math.min(64, Math.max(32,
            aSub.filter(c => c.type === 'C').length,
            bSub.filter(c => c.type === 'C').length
        ))
        const aResampled = resamplePath(aSub, N)
        const bResampled = resamplePath(bSub, N)
        // For closed subpaths, rotate b's start point to minimise total displacement
        const bAligned = isClosedResampled(aResampled) && isClosedResampled(bResampled)
            ? rotateResampledPath(bResampled, findBestAlignment(aResampled, bResampled))
            : bResampled
        aNorm.push(...aResampled)
        bNorm.push(...bAligned)
    }

    return [
        { commands: aNorm, raw: a.raw },
        { commands: bNorm, raw: b.raw }
    ]
}

