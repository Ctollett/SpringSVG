import { addAnimation, removeAnimation } from "../engine/solver";
import { SpringConfig, SpringState } from "../engine/types";
import { filterDegenerate, interpolate, normalize, parse, serialize, splitSubpaths, toAbsolute, toAbsoluteCubic } from "../svg/path";
import { render } from "../svg/renderer";

const activeAnimations = new Map<SVGPathElement, { id: number; state: SpringState }>()

const EXTRA_FADE_MS = 250

function cloneStrokeAttrs(src: SVGPathElement): SVGPathElement {
    const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'path') as SVGPathElement
    for (const attr of ['fill', 'stroke', 'stroke-width', 'fill-rule', 'stroke-linecap', 'stroke-linejoin']) {
        const val = src.getAttribute(attr)
        if (val) overlay.setAttribute(attr, val)
    }
    overlay.setAttribute('data-morph-temp', '')
    return overlay
}

function fadeOutExtraSubpaths(element: SVGPathElement, extraD: string): void {
    const parent = element.parentElement
    if (!parent) return
    const overlay = cloneStrokeAttrs(element)
    overlay.setAttribute('d', extraD)
    overlay.style.opacity = element.style.opacity || '1'
    parent.insertBefore(overlay, element)
    requestAnimationFrame(() => {
        overlay.style.transition = `opacity ${EXTRA_FADE_MS}ms ease`
        overlay.style.opacity = '0'
    })
    setTimeout(() => overlay.remove(), EXTRA_FADE_MS + 50)
}

function fadeInExtraSubpaths(element: SVGPathElement, extraD: string): SVGPathElement | null {
    const parent = element.parentElement
    if (!parent) return null
    const overlay = cloneStrokeAttrs(element)
    overlay.setAttribute('d', extraD)
    overlay.style.opacity = '0'
    parent.insertBefore(overlay, element)
    requestAnimationFrame(() => {
        overlay.style.transition = `opacity ${EXTRA_FADE_MS}ms ease`
        overlay.style.opacity = element.style.opacity || '1'
    })
    // Fallback removal if onComplete is never reached (interrupted animation)
    setTimeout(() => overlay.remove(), 1500)
    return overlay
}

export function morph (
    element: SVGPathElement,
    targetPath: string,
    config: SpringConfig,
    onSettle?: () => void
): number {
    const existing = activeAnimations.get(element)
    const inheritedVelocity = existing ? existing.state.velocity : 0
    if (existing !== undefined) removeAnimation(existing.id)

    // Remove any lingering temp overlays from a previous morph on this element
    // so successive rapid transitions don't stack multiple overlay layers.
    element.parentElement?.querySelectorAll('[data-morph-temp]').forEach(el => el.remove())

    const d = element.getAttribute('d')
    if(!d) return 0

    const fromSubs = filterDegenerate(splitSubpaths(toAbsoluteCubic(toAbsolute(parse(d).commands))))
    const toSubs   = filterDegenerate(splitSubpaths(toAbsoluteCubic(toAbsolute(parse(targetPath).commands))))

    if (fromSubs.length > toSubs.length) {
        const extraD = serialize(fromSubs.slice(toSubs.length).flat())
        fadeOutExtraSubpaths(element, extraD)
    }

    let fadeInOverlay: SVGPathElement | null = null
    if (toSubs.length > fromSubs.length) {
        const extraD = serialize(toSubs.slice(fromSubs.length).flat())
        fadeInOverlay = fadeInExtraSubpaths(element, extraD)
    }

    const parsedElement = parse(d)
    const parsedTarget = parse(targetPath)
    const [normalizedA, normalizedB] = normalize(parsedElement, parsedTarget)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if(reduced) {
        element.setAttribute('d', targetPath)
        fadeInOverlay?.remove()
        return 0
    } else {
        const initialState: SpringState = { position: 0, velocity: inheritedVelocity, target: 1 }
        const id = addAnimation(config, initialState, (t) => {
            const commands = interpolate(normalizedA, normalizedB, t)
            render(element, commands)
        }, () => {
            activeAnimations.delete(element)
            // Restore the original target path so no resampled/normalized residue
            // (including any collapsed-dot subpaths from prior logic) remains.
            element.setAttribute('d', targetPath)
            fadeInOverlay?.remove()
            onSettle?.()
        })

        activeAnimations.set(element, { id, state: initialState })
        return id
    }
}
