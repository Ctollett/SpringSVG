import { RuunSVG } from 'getruun-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import downloadSvg from '../assets/lucide/download.svg?raw'
import checkSvg from '../assets/lucide/check.svg?raw'

export default function Showcase() {
  const [active, setActive] = useState(false)
  const [hover, setHover] = useState(false)

  return (
    <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F5F0EB' }}>
      <button
        data-hover
        onClick={() => setActive(v => !v)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: 'relative',
          overflow: 'hidden',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          border: '0.5px solid #a0a0a0',
          borderRadius: '9999px',
          padding: '10px 20px',
          fontSize: '13px',
          fontWeight: 500,
          backgroundColor: 'transparent',
          cursor: 'pointer',
        }}
      >
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: hover || active ? 1 : 0 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          style={{ position: 'absolute', inset: 0, backgroundColor: '#18181b', borderRadius: '9999px', originY: 1 }}
        />
        <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '8px', mixBlendMode: 'difference', color: 'white' }}>
          Download
          <RuunSVG
            className="w-[14px] h-[14px] overflow-visible"
            from={downloadSvg}
            to={checkSvg}
            active={active}
            config={{ stiffness: 320, damping: 18, mass: 0.9 }}
          />
        </span>
      </button>
    </main>
  )
}
