import { SpringConfig } from "../engine/types";
import { morph } from "./morph";
import { parseViewBox, scaleD } from "../svg/viewbox";
import { parseSvgPaths } from "./parseSvg";

const ATTRS = ['fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'fill-rule']

function containerViewBox(container: SVGSVGElement): [number, number, number, number] {
    const vb = container.getAttribute('viewBox')
    if (!vb) return [0, 0, 100, 100]
    const parts = vb.trim().split(/[\s,]+/).map(Number)
    return [parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 100, parts[3] ?? 100]
}

export function morphSvg(
    container: SVGSVGElement,
    fromSvg: string,
    toSvg: string,
    config: SpringConfig
): void {
    const toVB = containerViewBox(container)
    const fromVB = parseViewBox(fromSvg)
    const targetVB = parseViewBox(toSvg)

    const fromPaths = parseSvgPaths(fromSvg)
    const toPaths = parseSvgPaths(toSvg)

    const scaledFrom = fromPaths.map(p => scaleD(p.d, fromVB, toVB))
    const scaledTo   = toPaths.map(p => scaleD(p.d, targetVB, toVB))

    // If container is empty, initialise it with the from paths
    const existing = Array.from(container.querySelectorAll('path')) as SVGPathElement[]
    if (existing.length === 0) {
        for (const { attrs } of fromPaths) {
            const el = document.createElementNS('http://www.w3.org/2000/svg', 'path') as SVGPathElement
            for (const attr of ATTRS) {
                const val = attrs[attr]
                if (val) el.setAttribute(attr, val)
            }
            container.appendChild(el)
        }
        const els = Array.from(container.querySelectorAll('path')) as SVGPathElement[]
        els.forEach((el, i) => el.setAttribute('d', scaledFrom[i] ?? ''))
        return
    }

    const existingCount = existing.length

    // Add new elements if target has more paths than source
    while (existing.length < scaledTo.length) {
        const template = existing[existing.length - 1]!
        const newEl = document.createElementNS('http://www.w3.org/2000/svg', 'path') as SVGPathElement
        for (const attr of ATTRS) {
            const val = template.getAttribute(attr)
            if (val) newEl.setAttribute(attr, val)
        }
        newEl.setAttribute('d', template.getAttribute('d') ?? '')
        newEl.style.opacity = '0'
        container.appendChild(newEl)
        existing.push(newEl)
    }

    // Morph each element — extras collapse into the last target path
    const lastTarget = scaledTo[scaledTo.length - 1]!
    existing.forEach((el, i) => {
        const isExtra = i >= scaledTo.length
        const isNew = i >= existingCount
        const wasHidden = el.style.opacity === '0'

        if (isExtra) {
            // Fade out redundant elements — instant hide causes a visible pop
            el.style.transition = 'opacity 0.3s ease'
            el.style.opacity = '0'
        } else if (isNew || wasHidden) {
            // Fade in elements that are starting from a collapsed/hidden position
            requestAnimationFrame(() => {
                el.style.transition = 'opacity 0.4s ease 0.1s'
                el.style.opacity = '1'
            })
        } else {
            el.style.transition = ''
            el.style.opacity = '1'
        }

        morph(el, scaledTo[i] ?? lastTarget, config)
    })
}
