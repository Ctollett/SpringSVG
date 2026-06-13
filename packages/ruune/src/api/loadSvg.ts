/**
 * Fetches an SVG file from a URL and returns its markup as a string.
 * Use this to load SVG assets at runtime in non-Vite environments, or
 * to preload SVGs upfront so they are ready in memory before a morph is triggered.
 *
 * @param url - The URL or path to the SVG file
 * @returns The full SVG markup as a string
 *
 * @remarks
 * Load SVGs upfront during page or component initialization — not on demand
 * inside event handlers. This ensures the morph fires instantly with no
 * network delay when the user interacts.
 *
 * @example
 * ```ts
 * import { loadSvg, initMorphSvg, morphSvg } from 'getruun'
 *
 * const foxSvg = await loadSvg('/fox.svg')
 * const owlSvg = await loadSvg('/owl.svg')
 *
 * const container = document.querySelector('svg')
 * initMorphSvg(container, foxSvg)
 *
 * button.addEventListener('click', () => {
 *   morphSvg(container, owlSvg, { stiffness: 200, damping: 20, mass: 1 })
 * })
 * ```
 */
export async function loadSvg(url: string): Promise<string> {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Failed to load SVG from "${url}": ${response.status} ${response.statusText}`)
    return response.text()
}
