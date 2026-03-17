import {parse, serialize, toAbsolute} from './path'
 

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
    const sx = tw / fw
    const sy = th / fh
    const ox = tx - fx * sx
    const oy = ty - fy * sy

    const commands = toAbsolute(parse(d).commands)
    const scaled = commands.map(cmd => {
        switch (cmd.type) {
            case 'H': return { type: 'H', values: [cmd.values[0]! * sx + ox] }
            case 'V': return { type: 'V', values: [cmd.values[0]! * sy + oy] }
            case 'Z': return cmd
            default:  return {
                type: cmd.type,
                values: cmd.values.map((v, i) => i % 2 === 0 ? v * sx + ox : v * sy + oy)
            }
        }
    })
    return serialize(scaled)
}
