import { addAnimation, removeAnimation } from "../engine/solver";
import { SpringConfig, SpringState } from "../engine/types";
import { interpolate, normalize, parse } from "../svg/path";
import { render } from "../svg/renderer";

const activeAnimations = new Map<SVGPathElement, number>()

export function morph (
    element: SVGPathElement,
    targetPath: string,
    config: SpringConfig
): number {
    const existing = activeAnimations.get(element)
    if (existing !== undefined) removeAnimation(existing)

    const d = element.getAttribute('d')
    if(!d) return 0

    const parsedElement = parse(d)
    const parsedTarget = parse(targetPath)
    const [normalizedA, normalizedB] = normalize(parsedElement, parsedTarget)

    const initialState: SpringState = { position: 0, velocity: 0, target: 1 }

    const id = addAnimation(config, initialState, (t) => {
        const commands = interpolate(normalizedA, normalizedB, t)
        render(element, commands)
    }, () => {
        activeAnimations.delete(element)
    })

    activeAnimations.set(element, id)
    return id
}

