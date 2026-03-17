export function parseSvgPath(svgString: string, selector?: string): string | null {
    const parser = new DOMParser()
    const doc = parser.parseFromString(svgString, 'image/svg+xml')
    const path = selector
        ? doc.querySelector(selector)
        : doc.querySelector('path')
    if (!(path instanceof SVGPathElement || path instanceof Element)) return null
    return path.getAttribute('d') ?? null
}


export function parseSvgPaths(svgString: string): { d: string, attrs: Record<string, string> }[] {
    const parser = new DOMParser()
    const doc = parser.parseFromString(svgString, 'image/svg+xml')

   
    const paths = doc.querySelectorAll('path')

    return Array.from(paths).map(el => {
        const d = el.getAttribute('d') ?? ''
        const attrs: Record<string, string> = {}
        for (const attr of ['fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin']) {
            const val = el.getAttribute(attr)
            if (val) attrs[attr] = val
        }
        return { d, attrs }
    }).filter(p => p.d)
}

