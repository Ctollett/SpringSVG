import { SpringConfig } from "../engine/types";

export const PRESETS: Record<string, SpringConfig> = {
    // Slow, minimal bounce — professional UI transitions
    gentle:  { stiffness: 120, damping: 20, mass: 1 },
    // Medium speed, no overshoot — safe default for most use cases
    smooth:  { stiffness: 200, damping: 26, mass: 1 },
    // Fast and snappy — tight, responsive interactions
    stiff:   { stiffness: 400, damping: 28, mass: 1 },
    // Noticeable bounce — playful UIs, reactions
    bouncy:  { stiffness: 280, damping: 12, mass: 1 },
    // Slow with heavy overshoot — dramatic illustration morphs
    wobbly:  { stiffness: 120, damping: 8,  mass: 1.5 },
}