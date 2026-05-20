# ruun

Spring physics-based SVG morphing. Animate any SVG shape into any other with a single function call.

## Installation

```bash
npm install ruun
```

## Quick start

```js
import { initMorphSvg, morphSvg } from 'ruun'

const container = document.querySelector('svg')

// Seed the container with the starting paths
initMorphSvg(container, fromSvg)

// Morph to a new shape on click
button.addEventListener('click', () => {
  morphSvg(container, toSvg)
})
```

## API

### `initMorphSvg(container, fromSvg)`

Seeds an SVG container element with path elements from the starting SVG. Call this at mount time so the first `morphSvg` call has no startup cost.

```ts
initMorphSvg(container: SVGSVGElement, fromSvg: string): void
```

### `morphSvg(container, toSvg, config?, onSettle?)`

Morphs all paths in a container toward a destination SVG using spring physics. Calling it mid-animation retargets smoothly — velocity is inherited so motion stays continuous.

```ts
morphSvg(
  container: SVGSVGElement,
  toSvg: string,
  config?: SpringConfig | 'gentle' | 'smooth' | 'stiff' | 'bouncy' | 'wobbly',
  onSettle?: () => void
): void
```

### `SpringConfig`

```ts
interface SpringConfig {
  stiffness: number  // force toward target — higher = faster (default: 200)
  damping: number    // resistance — higher = less bounce (default: 26)
  mass: number       // inertia — higher = slower start and stop (default: 1)
}
```

**Presets:** `'gentle'`, `'smooth'` (default), `'stiff'`, `'bouncy'`, `'wobbly'`

## React

For the React component wrapper, see [ruun-react](https://www.npmjs.com/package/ruun-react).

## License

MIT
