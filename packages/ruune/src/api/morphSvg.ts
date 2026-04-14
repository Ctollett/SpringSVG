import { SpringConfig } from "../engine/types";
import { morph } from "./morph";
import { parseViewBox, scaleD } from "../svg/viewbox";
import { parseSvgPaths } from "./parseSvg";
import { PRESETS } from "./presets";

const ATTRS = ['fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'fill-rule']

function containerViewBox(container: SVGSVGElement): [number, number, number, number] {
    const vb = container.getAttribute('viewBox')
    if (!vb) return [0, 0, 100, 100]
    const parts = vb.trim().split(/[\s,]+/).map(Number)
    return [parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 100, parts[3] ?? 100]
}

export function initMorphSvg(
    container: SVGSVGElement,
    fromSvg: string,
): void {
    const toVB = containerViewBox(container)
    const fromVB = parseViewBox(fromSvg)
    const fromPaths = parseSvgPaths(fromSvg)
    const scaledFrom = fromPaths.map(p => scaleD(p.d, fromVB, toVB))

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
}

export function morphSvg(
    container: SVGSVGElement,
    toSvg: string,
    config: SpringConfig | string = 'smooth',
): void {
    const toVB = containerViewBox(container)
    const targetVB = parseViewBox(toSvg)
    const toPaths = parseSvgPaths(toSvg)
    const scaledTo = toPaths.map(p => scaleD(p.d, targetVB, toVB))

    const existing = Array.from(container.querySelectorAll('path')) as SVGPathElement[]
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
    const resolvedConfig = (typeof config === 'string' ? PRESETS[config] : config) ?? PRESETS.smooth!
    existing.forEach((el, i) => {
        const isExtra = i >= scaledTo.length
        const isNew = i >= existingCount
        const wasHidden = el.style.opacity === '0'

        if (isExtra) {
            el.style.transition = 'opacity 0.3s ease'
            el.style.opacity = '0'
        } else if (isNew || wasHidden) {
            requestAnimationFrame(() => {
                el.style.transition = 'opacity 0.4s ease 0.1s'
                el.style.opacity = '1'
            })
        } else {
            el.style.transition = ''
            el.style.opacity = '1'
        }
        morph(el, scaledTo[i] ?? lastTarget, resolvedConfig)
    })
}
