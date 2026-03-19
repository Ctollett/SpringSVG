import {parse, serialize, toAbsolute, toAbsoluteCubic} from './path'
 

export function parseViewBox(svgString: string): [number, number, number, number] {
    const match = svgString.match(/viewBox=["']([^"']+)["']/)
    if (!match) return [0, 0, 100, 100]
    const parts = match[1]!.trim().split(/[\s,]+/).map(Number)
    return [parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 100, parts[3] ?? 100]
}


export function scaleD(
    d: string,
    from: [number, number, number, number],
    to: [number, number, number, number]
): string {
    const [fx, fy, fw, fh] = from
    const [tx, ty, tw, th] = to
    // Uniform "xMidYMid meet" — preserves aspect ratio, centers in target viewBox.
    // Converting to absolute cubics first means we only scale M and C coordinates,
    // avoiding arc-specific parameter corruption (radii, flags, rotation).
    const s = Math.min(tw / fw, th / fh)
    const ox = tx + (tw - fw * s) / 2 - fx * s
    const oy = ty + (th - fh * s) / 2 - fy * s

    const commands = toAbsoluteCubic(toAbsolute(parse(d).commands))
    const scaled = commands.map(cmd => ({
        type: cmd.type,
        values: cmd.values.map((v, i) => v * s + (i % 2 === 0 ? ox : oy))
    }))
    return serialize(scaled)
}
