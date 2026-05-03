import { useEffect, useRef, useState } from 'react'
import { motion, useAnimate } from 'framer-motion'
import { RuunSVG } from 'ruun-react'
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
  const [scope, animate] = useAnimate()
  const textRef = useRef<HTMLSpanElement>(null)
  const wasActiveRef = useRef(false)

  useEffect(() => {
    const isNowActive = hovered || isActive
    if (!isNowActive && wasActiveRef.current) {
      animate(textRef.current, { x: -4 }, { duration: 0.06 }).then(() => {
        animate(textRef.current, { x: 0 }, { type: 'spring', stiffness: 400, damping: 30, mass: 0.4 })
      })
    }
    wasActiveRef.current = isNowActive
  }, [hovered, isActive])

  return (
    <motion.a
      ref={scope}
      href={`#${id}`}
      className="text-[16px] font-medium"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(id)}
      animate={{
        paddingLeft: isActive || hovered ? 12 : 0,
        borderColor: 'rgba(0,0,0,0)',
        color: isActive ? '#ffffff' : hovered ? '#000000' : dimmed ? '#c4c4c4' : '#1c1c1c',
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 20, mass: 0.8 }}
      style={{ border: '1px solid transparent', borderRadius: '32px', display: 'inline-flex', alignItems: 'center', gap: '6px', paddingRight: '8px', paddingTop: '3px', paddingBottom: '3px', position: 'relative', cursor: 'pointer' }}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        transition={isActive
          ? { type: 'spring', stiffness: 380, damping: 20, mass: 0.7 }
          : { duration: 0 }
        }
        style={{ position: 'absolute', inset: 0, backgroundColor: '#1c1c1c', borderRadius: '32px', originX: 0 }}
      />
      <span ref={textRef} style={{ position: 'relative', zIndex: 1, display: 'inherit', alignItems: 'inherit', gap: 'inherit' }}>
        {label}
        <RuunSVG className="w-[12px] h-[12px] overflow-visible" from={chevronRightSvg} to={chevronsRightSvg} active={hovered || isActive} config={{ stiffness: 400, damping: 20, mass: 0.8 }} />
      </span>
    </motion.a>
  )
}
