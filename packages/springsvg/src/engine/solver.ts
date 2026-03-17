import { SpringConfig, SpringState } from "./types";
import { stepSpring } from "./spring";

interface Animation {
    config: SpringConfig,
    state: SpringState,
    onUpdate: (value: number) => void,
    onComplete?: () => void
}

const animations = new Map<number, Animation>()

let nextId = 0
let rafId: number | null = null
let lastTime: number = 0

function tick(timestamp: number): void {
    const dt = lastTime === 0 ? 0 : (timestamp - lastTime) / 1000
    lastTime = timestamp

    for (const [id, animation] of animations) {
        const springResult = stepSpring(animation.config, animation.state, dt)
        animation.state.position = springResult.value
        animation.state.velocity = springResult.velocity

        animation.onUpdate(springResult.value)

        if(springResult.settled) {
            animations.delete(id)
            animation.onComplete?.()
        }

    }

    if (animations.size > 0) {
        rafId = requestAnimationFrame(tick)
    } else {
        rafId = null
    }

}

 export function addAnimation(
    config: SpringConfig,
    state: SpringState,
    onUpdate: (value: number) => void,
    onComplete?: () => void
): number {
    animations.set(nextId, { config, state, onUpdate, ...(onComplete && { onComplete })})
    nextId++

    if(rafId === null) {
    lastTime = 0
    rafId = requestAnimationFrame(tick)
    }
    return nextId - 1
}

export function removeAnimation(id: number) {
    animations.delete(id)
}
 

    
