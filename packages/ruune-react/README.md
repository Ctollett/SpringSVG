# getruun-react

React component for spring physics-based SVG morphing. Toggle a boolean and the shape animates itself.

## Installation

```bash
npm install getruun-react
```

## Usage

```tsx
import { RuunSVG } from 'getruun-react'

import fromSvg from './icons/star.svg?raw'
import toSvg from './icons/heart.svg?raw'

function App() {
  const [active, setActive] = useState(false)

  return (
    <button onClick={() => setActive(v => !v)}>
      <RuunSVG
        from={fromSvg}
        to={toSvg}
        active={active}
        config={{ stiffness: 280, damping: 20, mass: 1 }}
        className="w-6 h-6"
      />
    </button>
  )
}
```

Flip `active` mid-animation and the spring retargets smoothly — no janky restarts.

## Props

```ts
from      string         — source SVG string (required)
to        string         — target SVG string (required)
active    boolean        — false morphs toward `from`, true morphs toward `to`
config    SpringConfig   — optional spring parameters (or a preset string)
onSettle  () => void     — called when the animation comes to rest
className string         — applied directly to the svg element
viewBox   string         — override the viewBox (defaults to the one in `from`)
```

## SpringConfig

```ts
interface SpringConfig {
  stiffness: number  // force toward target — higher = faster (default: 200)
  damping: number    // resistance — higher = less bounce (default: 26)
  mass: number       // inertia — higher = slower start and stop (default: 1)
}
```

**Presets:** pass a string instead of an object — `'gentle'`, `'smooth'` (default), `'stiff'`, `'bouncy'`, `'wobbly'`

## Requirements

- React 18+

## License

MIT
