# ruun

Spring physics-based SVG morphing for the web.

Animate any SVG shape into any other shape — icons, illustrations, logos — with a single function call. The spring engine handles path normalization, multi-subpath diffing, and velocity inheritance so mid-animation retargeting feels continuous.

## Packages

| Package | Description |
|---|---|
| [`ruun`](./packages/ruune) | Core vanilla JS library |
| [`ruun-react`](./packages/ruune-react) | React component wrapper |

## Quick start

```bash
npm install ruun
# or for React
npm install ruun-react
```

```tsx
// React
import { RuunSVG } from 'ruun-react'

<RuunSVG from={starSvg} to={heartSvg} active={liked} />
```

```js
// Vanilla JS
import { initMorphSvg, morphSvg } from 'ruun'

initMorphSvg(container, fromSvg)
morphSvg(container, toSvg, 'bouncy')
```

## Documentation

Full docs at [getruun.com/docs](https://getruun.com/docs)

## License

MIT
