import { parse, toAbsolute, toAbsoluteCubic, serialize } from '../svg/path'

// ── Transform matrix ──────────────────────────────────────────────────────────
// Represented as [a, b, c, d, e, f] matching the SVG matrix(a,b,c,d,e,f) form.
// Point transform: x' = a*x + c*y + e,  y' = b*x + d*y + f
type Matrix = [number, number, number, number, number, number]

function identity(): Matrix { return [1, 0, 0, 1, 0, 0] }

function multiply(m1: Matrix, m2: Matrix): Matrix {
    const [a1, b1, c1, d1, e1, f1] = m1
    const [a2, b2, c2, d2, e2, f2] = m2
    return [
        a1*a2 + c1*b2,
        b1*a2 + d1*b2,
        a1*c2 + c1*d2,
        b1*c2 + d1*d2,
        a1*e2 + c1*f2 + e1,
        b1*e2 + d1*f2 + f1,
    ]
}

function parseTransformAttr(transform: string): Matrix {
    let m = identity()
    const re = /(\w+)\s*\(([^)]*)\)/g
    let match
    while ((match = re.exec(transform)) !== null) {
        const type = match[1]!
        const v = match[2]!.trim().split(/[\s,]+/).map(Number)
        let t: Matrix
        switch (type) {
            case 'translate': t = [1, 0, 0, 1, v[0]??0, v[1]??0]; break
            case 'scale': { const sx = v[0]??1, sy = v[1]??sx; t = [sx, 0, 0, sy, 0, 0]; break }
            case 'rotate': {
                const a = (v[0]??0) * Math.PI / 180, cos = Math.cos(a), sin = Math.sin(a)
                const cx = v[1]??0, cy = v[2]??0
                t = [cos, sin, -sin, cos, cx - cos*cx + sin*cy, cy - sin*cx - cos*cy]
                break
            }
            case 'matrix': t = [v[0]??1, v[1]??0, v[2]??0, v[3]??1, v[4]??0, v[5]??0]; break
            case 'skewX': { const a = (v[0]??0) * Math.PI / 180; t = [1, 0, Math.tan(a), 1, 0, 0]; break }
            case 'skewY': { const a = (v[0]??0) * Math.PI / 180; t = [1, Math.tan(a), 0, 1, 0, 0]; break }
            default: t = identity()
        }
        m = multiply(m, t)
    }
    return m
}

function getAccumulatedTransform(el: Element): Matrix {
    // Walk up the tree from element to <svg>, collecting transforms outermost-first
    const chain: Matrix[] = []
    let node: Element | null = el
    while (node && node.tagName.toLowerCase() !== 'svg') {
        const attr = node.getAttribute('transform')
        if (attr) chain.unshift(parseTransformAttr(attr))
        node = node.parentElement
    }
    return chain.reduce(multiply, identity())
}

function isIdentity(m: Matrix): boolean {
    return m[0]===1 && m[1]===0 && m[2]===0 && m[3]===1 && m[4]===0 && m[5]===0
}

// Apply a matrix to a path d string. Converts to absolute cubics first so
// only M and C coordinates need transforming — no arc/skew/H/V edge cases.
function applyTransformToD(d: string, m: Matrix): string {
    if (isIdentity(m)) return d
    const [a, b, c, dd, e, f] = m
    const pt = (x: number, y: number): [number, number] => [a*x + c*y + e, b*x + dd*y + f]
    const cmds = toAbsoluteCubic(toAbsolute(parse(d).commands))
    const transformed = cmds.map(cmd => {
        if (cmd.type === 'M') {
            const [nx, ny] = pt(cmd.values[0]!, cmd.values[1]!)
            return { type: 'M', values: [nx, ny] }
        }
        if (cmd.type === 'C') {
            const [x1, y1] = pt(cmd.values[0]!, cmd.values[1]!)
            const [x2, y2] = pt(cmd.values[2]!, cmd.values[3]!)
            const [x,  y ] = pt(cmd.values[4]!, cmd.values[5]!)
            return { type: 'C', values: [x1, y1, x2, y2, x, y] }
        }
        return cmd // Z
    })
    return serialize(transformed)
}

// ── Element → path d ──────────────────────────────────────────────────────────

function elementToD(el: Element): string | null {
    const tag = el.tagName.toLowerCase()

    if (tag === 'path') {
        return el.getAttribute('d') ?? null
    }

    if (tag === 'rect') {
        const x  = parseFloat(el.getAttribute('x')  ?? '0')
        const y  = parseFloat(el.getAttribute('y')  ?? '0')
        const w  = parseFloat(el.getAttribute('width')  ?? '0')
        const h  = parseFloat(el.getAttribute('height') ?? '0')
        const rx = Math.min(parseFloat(el.getAttribute('rx') ?? el.getAttribute('ry') ?? '0'), w / 2)
        const ry = Math.min(parseFloat(el.getAttribute('ry') ?? el.getAttribute('rx') ?? '0'), h / 2)
        if (w === 0 || h === 0) return null
        if (rx === 0 && ry === 0) {
            return `M ${x} ${y} L ${x+w} ${y} L ${x+w} ${y+h} L ${x} ${y+h} Z`
        }
        return `M ${x+rx} ${y} L ${x+w-rx} ${y} A ${rx} ${ry} 0 0 1 ${x+w} ${y+ry} L ${x+w} ${y+h-ry} A ${rx} ${ry} 0 0 1 ${x+w-rx} ${y+h} L ${x+rx} ${y+h} A ${rx} ${ry} 0 0 1 ${x} ${y+h-ry} L ${x} ${y+ry} A ${rx} ${ry} 0 0 1 ${x+rx} ${y} Z`
    }

    if (tag === 'circle') {
        const cx = parseFloat(el.getAttribute('cx') ?? '0')
        const cy = parseFloat(el.getAttribute('cy') ?? '0')
        const r  = parseFloat(el.getAttribute('r')  ?? '0')
        if (r === 0) return null
        return `M ${cx-r} ${cy} A ${r} ${r} 0 0 1 ${cx+r} ${cy} A ${r} ${r} 0 0 1 ${cx-r} ${cy} Z`
    }

    if (tag === 'ellipse') {
        const cx = parseFloat(el.getAttribute('cx') ?? '0')
        const cy = parseFloat(el.getAttribute('cy') ?? '0')
        const rx = parseFloat(el.getAttribute('rx') ?? '0')
        const ry = parseFloat(el.getAttribute('ry') ?? '0')
        if (rx === 0 || ry === 0) return null
        return `M ${cx-rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx+rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx-rx} ${cy} Z`
    }

    if (tag === 'line') {
        const x1 = el.getAttribute('x1') ?? '0'
        const y1 = el.getAttribute('y1') ?? '0'
        const x2 = el.getAttribute('x2') ?? '0'
        const y2 = el.getAttribute('y2') ?? '0'
        return `M ${x1} ${y1} L ${x2} ${y2}`
    }

    if (tag === 'polygon' || tag === 'polyline') {
        const pts = (el.getAttribute('points') ?? '').trim()
        if (!pts) return null
        const coords = pts.split(/[\s,]+/)
        const pairs: string[] = []
        for (let i = 0; i + 1 < coords.length; i += 2) {
            pairs.push(`${coords[i]} ${coords[i+1]}`)
        }
        if (pairs.length === 0) return null
        const close = tag === 'polygon' ? ' Z' : ''
        return `M ${pairs[0]} L ${pairs.slice(1).join(' L ')}${close}`
    }

    return null
}

// ── Public API ────────────────────────────────────────────────────────────────

export function parseSvgPath(svgString: string, selector?: string): string | null {
    const parser = new DOMParser()
    const doc = parser.parseFromString(svgString, 'image/svg+xml')
    const path = selector
        ? doc.querySelector(selector)
        : doc.querySelector('path')
    if (!(path instanceof SVGPathElement || path instanceof Element)) return null
    return path.getAttribute('d') ?? null
}

export function parseSvgPaths(svgString: string): { d: string, attrs: Record<string, string> }[] {
    const parser = new DOMParser()
    const doc = parser.parseFromString(svgString, 'image/svg+xml')
    const result: { d: string, attrs: Record<string, string> }[] = []

    // Inherit presentation attrs from root <svg> as defaults
    const rootSvg = doc.querySelector('svg')
    const rootDefaults: Record<string, string> = {}
    for (const attr of ['stroke-width', 'stroke-linecap', 'stroke-linejoin', 'fill-rule']) {
        const val = rootSvg?.getAttribute(attr)
        if (val) rootDefaults[attr] = val
    }

    const selector = 'path, rect, circle, ellipse, line, polygon, polyline'
    for (const el of Array.from(doc.querySelectorAll(selector))) {
        let d = elementToD(el)
        if (!d) continue

        // Apply accumulated transforms from parent <g> elements and the element itself
        const matrix = getAccumulatedTransform(el)
        if (!isIdentity(matrix)) d = applyTransformToD(d, matrix)

        const attrs: Record<string, string> = { ...rootDefaults }

        // Resolve CSS class styles from the SVG's <style> block
        const className = el.getAttribute('class')
        if (className) {
            const css = doc.querySelector('style')?.textContent ?? ''
            const match = css.match(new RegExp(`\\.${className}\\s*\\{([^}]*)\\}`))
            if (match) {
                for (const decl of match[1]!.split(';')) {
                    const [k, v] = decl.split(':').map(s => s.trim())
                    if (k && v) attrs[k] = v
                }
            }
        }

        for (const attr of ['fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'fill-rule']) {
            const val = el.getAttribute(attr)
            if (!val) continue
            // Skip explicit color values on fill/stroke — let the container SVG control color.
            // Only pass through 'none' (structural) and 'currentColor' (pass-through).
            if ((attr === 'fill' || attr === 'stroke') && val !== 'none' && val !== 'currentColor') continue
            attrs[attr] = val
        }

        result.push({ d, attrs })
    }

    return result
}
