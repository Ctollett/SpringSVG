import { addAnimation, removeAnimation } from "../engine/solver";
import { SpringConfig, SpringState } from "../engine/types";
import { filterDegenerate, interpolate, normalize, parse, serialize, splitSubpaths, toAbsolute, toAbsoluteCubic } from "../svg/path";
import { render } from "../svg/renderer";

const activeAnimations = new Map<SVGPathElement, number>()

const EXTRA_FADE_MS = 250

function fadeOutExtraSubpaths(element: SVGPathElement, extraD: string): void {
    const parent = element.parentElement
    if (!parent) return
    const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'path') as SVGPathElement
    for (const attr of ['fill', 'stroke', 'stroke-width', 'fill-rule', 'stroke-linecap', 'stroke-linejoin']) {
        const val = element.getAttribute(attr)
        if (val) overlay.setAttribute(attr, val)
    }
    overlay.setAttribute('d', extraD)
    overlay.style.opacity = element.style.opacity || '1'
    parent.insertBefore(overlay, element)
    requestAnimationFrame(() => {
        overlay.style.transition = `opacity ${EXTRA_FADE_MS}ms ease`
        overlay.style.opacity = '0'
    })
    setTimeout(() => overlay.remove(), EXTRA_FADE_MS + 50)
}

export function morph (
    element: SVGPathElement,
    targetPath: string,
    config: SpringConfig
): number {
    const existing = activeAnimations.get(element)
    if (existing !== undefined) removeAnimation(existing)

    const d = element.getAttribute('d')
    if(!d) return 0

    // Detect extra FROM subpaths before normalization collapses them, so we can
    // fade them out via an overlay instead of letting them visibly shrink.
    const fromSubs = filterDegenerate(splitSubpaths(toAbsoluteCubic(toAbsolute(parse(d).commands))))
    const toSubs   = filterDegenerate(splitSubpaths(toAbsoluteCubic(toAbsolute(parse(targetPath).commands))))
    if (fromSubs.length > toSubs.length) {
        const extraD = serialize(fromSubs.slice(toSubs.length).flat())
        fadeOutExtraSubpaths(element, extraD)
    }

    const parsedElement = parse(d)
    const parsedTarget = parse(targetPath)
    const [normalizedA, normalizedB] = normalize(parsedElement, parsedTarget)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches


    if(reduced) {
        render(element, interpolate(normalizedA, normalizedB, 1))
        return 0
    } else {
        const initialState: SpringState = { position: 0, velocity: 0, target: 1 }
          const id = addAnimation(config, initialState, (t) => {
        const commands = interpolate(normalizedA, normalizedB, t)
        render(element, commands)
    }, () => {
        activeAnimations.delete(element)
        render(element, interpolate(normalizedA, normalizedB, 1))
    })

    activeAnimations.set(element, id)
    return id

    }
}

