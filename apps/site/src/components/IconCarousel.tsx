import thinHappy from '../assets/thin/thin-happy.svg?raw'
import thinSad from '../assets/thin/thin-sad.svg?raw'
import thinHopeful from '../assets/thin/thin-hopeful.svg?raw'
import thinHopeless from '../assets/thin/thin-hopeless.svg?raw'
import thinExpand from '../assets/thin/thin-expand.svg?raw'
import thinStill from '../assets/thin/thin-still.svg?raw'
import { RuunSVG } from 'getruun-react'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const pairs = [
  { from: thinHappy, to: thinSad, config: { stiffness: 260, damping: 22, mass: 1 } },
  { from: thinHopeful, to: thinHopeless, config: { stiffness: 300, damping: 20, mass: 1 } },
  { from: thinExpand, to: thinStill, config: { stiffness: 240, damping: 24, mass: 1 } },
]

const ICON_SIZE = 48
const GAP = 64
const ITEM_W = ICON_SIZE + GAP
const LOOP_W = pairs.length * ITEM_W

export default function IconCarousel() {
  const [active, setActive] = useState(new Array(pairs.length).fill(false))
  const cooldowns = useRef(new Array(pairs.length).fill(false))

  useEffect(() => {
    const interval = setInterval(() => {
      const available = cooldowns.current
        .map((busy: boolean, i: number) => !busy ? i : -1)
        .filter((i: number) => i !== -1)
      if (available.length === 0) return
      const idx = available[Math.floor(Math.random() * available.length)]
      cooldowns.current[idx] = true
      setActive(prev => { const next = [...prev]; next[idx] = !prev[idx]; return next })
      setTimeout(() => { cooldowns.current[idx] = false }, 2800)
    }, 900)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="w-full overflow-hidden py-6"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 25%, black 75%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 25%, black 75%, transparent)',
      }}
    >
      <motion.div
        className="flex shrink-0"
        style={{ gap: `${GAP}px` }}
        animate={{ x: [0, -LOOP_W] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
      >
        {[...pairs, ...pairs, ...pairs, ...pairs].map((pair, i) => (
          <RuunSVG
            key={i}
            className="shrink-0 overflow-visible w-[48px] h-[48px]"
            from={pair.from}
            to={pair.to}
            active={active[i % pairs.length]}
            config={pair.config}
          />
        ))}
      </motion.div>
    </div>
  )
}
