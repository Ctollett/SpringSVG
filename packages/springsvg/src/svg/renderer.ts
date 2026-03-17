import { PathCommand } from "./types";

import { serialize } from "./path";

export function render(element: SVGPathElement, commands: PathCommand[]): void {
    const first = commands[0]
    const last  = commands[commands.length - 1]
    const sx = first?.values[0] ?? 0, sy = first?.values[1] ?? 0
    const lv = last?.values ?? []
    const ex = lv[lv.length - 2] ?? 0, ey = lv[lv.length - 1] ?? 0
    // only close the path when the last endpoint lands back on M (closed shapes)
    const shouldClose = Math.hypot(ex - sx, ey - sy) < 0.1
    element.setAttribute('d', serialize(commands) + (shouldClose ? ' Z' : ''))
}