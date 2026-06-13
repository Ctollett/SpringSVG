import { SpringConfig } from "../engine/types";
import { morph } from "./morph";
import { parseViewBox, scaleD } from "../svg/viewbox";
import { parseSvgPaths } from "./parseSvg";
import { PRESETS } from "./presets";

const ATTRS = ['fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'fill-rule', 'opacity']

function containerViewBox(container: SVGSVGElement): [number, number, number, number] {
    const vb = container.getAttribute('viewBox')
    if (!vb) return [0, 0, 100, 100]
    const parts = vb.trim().split(/[\s,]+/).map(Number)
    return [parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 100, parts[3] ?? 100]
}

/**
 * Initializes a container `<svg>` element with path elements parsed from a source SVG string.
 * Must be called once before {@link morphSvg} — it sets up the path elements that the
 * spring animation will drive.
 *
 * @param container - An empty `<svg>` element in the DOM
 * @param fromSvg - The starting SVG markup string, typically imported with `?raw` in Vite
 *
 * @remarks
 * Safe to call multiple times — if the container already has path elements, this is a no-op.
 *
 * @example
 * ```ts
 * import { initMorphSvg } from 'getruun'
 * import foxSvg from './fox.svg?raw'
 *
 * const container = document.querySelector('svg')
 * initMorphSvg(container, foxSvg)
 * ```
 */
export function initMorphSvg(
    container: SVGSVGElement,
    fromSvg: string,
): void {
    if (container.querySelectorAll('path').length > 0) return
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

/**
 * Morphs the paths inside a container `<svg>` element toward a target SVG using spring physics.
 * The container must first be initialized with {@link initMorphSvg}.
 *
 * @param container - The `<svg>` element previously initialized with `initMorphSvg`
 * @param toSvg - The target SVG markup string to morph toward
 * @param config - Spring configuration object or a preset name. Defaults to `'smooth'`.
 *                 Available presets: `'gentle'`, `'smooth'`, `'stiff'`, `'bouncy'`, `'wobbly'`
 * @param onSettle - Optional callback fired once the spring animation comes to rest
 *
 * @remarks
 * - Calling `morphSvg` mid-animation retargets smoothly — the spring inherits the current
 *   velocity so motion stays continuous with no jarring jump
 * - Automatically respects `prefers-reduced-motion` — jumps instantly to the target shape
 *   if the user has reduced motion enabled
 * - Handles multi-path SVGs — if the target has more or fewer paths than the source,
 *   extra paths are faded in or out automatically
 *
 * @example
 * ```ts
 * import { initMorphSvg, morphSvg } from 'getruun'
 * import foxSvg from './fox.svg?raw'
 * import owlSvg from './owl.svg?raw'
 *
 * const container = document.querySelector('svg')
 * initMorphSvg(container, foxSvg)
 *
 * button.addEventListener('click', () => {
 *   morphSvg(container, owlSvg, { stiffness: 200, damping: 20, mass: 1 })
 * })
 * ```
 */
export function morphSvg(
    container: SVGSVGElement,
    toSvg: string,
    config: SpringConfig | string = 'smooth',
    onSettle?: () => void
): void {
    const toVB = containerViewBox(container)
    const targetVB = parseViewBox(toSvg)
    const toPaths = parseSvgPaths(toSvg)
    const scaledTo = toPaths.map(p => scaleD(p.d, targetVB, toVB))

    const existing = Array.from(container.querySelectorAll('path:not([data-morph-temp])')) as SVGPathElement[]
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

        const targetAttrs = !isExtra
            ? (toPaths[i]?.attrs ?? toPaths[toPaths.length - 1]?.attrs ?? {})
            : {}

        const attrsChanged = ATTRS.some(attr => {
            const current = el.getAttribute(attr) ?? ''
            const target = targetAttrs[attr] ?? ''
            return current !== target
        })

        const applyTargetAttrs = () => {
            for (const attr of ATTRS) {
                const val = targetAttrs[attr]
                if (val) el.setAttribute(attr, val)
                else el.removeAttribute(attr)
            }
        }

        const isLast = i === existing.length - 1

        // If style differs, morph first then crossfade style at settle so the
        // fill/stroke switch doesn't interrupt the shape animation mid-flight.
        if (!isExtra && attrsChanged) {
            morph(el, scaledTo[i] ?? lastTarget, resolvedConfig, isLast ? onSettle : undefined)
            // Swap style on the next frame so the shape is already in motion
            // when attrs change — the blink lasts ~16ms and is imperceptible
            setTimeout(() => {
                el.style.opacity = '0'
                requestAnimationFrame(() => {
                    applyTargetAttrs()
                    el.style.opacity = '1'
                })
            }, 80)
        } else {
            if (!isExtra) applyTargetAttrs()
            morph(el, scaledTo[i] ?? lastTarget, resolvedConfig, isLast ? onSettle : undefined)
        }

    })
}
