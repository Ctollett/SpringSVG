import { useState } from 'react'
import { motion } from 'framer-motion'
import { RuunSVG } from 'getruun-react'
import chevronRightSvg from '../../assets/lucide/chevron-right.svg?raw'
import chevronsRightSvg from '../../assets/lucide/chevrons-right.svg?raw'

interface AnimatedNavLinkProps {
  id: string
  label: string
  isActive: boolean
  dimmed?: boolean
  onClick: (id: string) => void
}

export default function AnimatedNavLink({ id, label, isActive, dimmed = false, onClick }: AnimatedNavLinkProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={`#${id}`}
      className="text-[12px] font-medium"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => { e.preventDefault(); onClick(id) }}
      animate={{
        x: hovered && !isActive ? 8 : 0,
        paddingLeft: isActive ? 8 : 0,
        color: isActive ? '#ffffff' : hovered ? '#000000' : dimmed ? '#c4c4c4' : '#1c1c1c',
      }}
      transition={{ type: 'spring', stiffness: 280, damping: 28, mass: 0.9 }}
      style={{ border: '1px solid transparent', borderRadius: '32px', display: 'inline-flex', alignItems: 'center', gap: '6px', paddingLeft: '0px', paddingRight: '8px', paddingTop: '3px', paddingBottom: '3px', position: 'relative', cursor: 'pointer' }}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        transition={isActive
          ? { type: 'spring', stiffness: 280, damping: 28, mass: 0.9 }
          : { duration: 0 }
        }
        style={{ position: 'absolute', inset: 0, backgroundColor: '#1c1c1c', borderRadius: '32px', originX: 0 }}
      />
      <span style={{ position: 'relative', zIndex: 1, display: 'inherit', alignItems: 'inherit', gap: 'inherit' }}>
        {label}
        <RuunSVG className="w-[12px] h-[12px] overflow-visible" from={chevronRightSvg} to={chevronsRightSvg} active={hovered || isActive} config={{ stiffness: 400, damping: 20, mass: 0.8 }} />
      </span>
    </motion.a>
  )
}
