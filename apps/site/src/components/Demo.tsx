
import { iconPairs } from "../data/iconPairs"
import { useState } from 'react'
import { RuunSVG } from 'getruun-react'
import { motion, type Variants } from 'framer-motion'

const grid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
}

const card: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Demo() {
  const [isActive, setIsActive] = useState(new Array(iconPairs.length).fill(false))

  const handleClick = (index: number) => {
    setIsActive(prev => (
     prev.map((item, i) => i === index ? !item : item)
    ))
  }

  const mobileIcons = iconPairs.slice(0, 9)

  return (
    <section id="demo-section" className="flex flex-col">
      <div className="flex flex-col justify-center items-center pt-10 pb-6 gap-3">
        <h3 id="demo-heading" className="text-[20px] font-semibold leading-none">Less Setup. More Spring</h3>
        <p className="text-center text-[12px]" style={{ color: '#A3A3A3' }}>Ruun slots into any framework in a single import<br className="block md:hidden" /> and handles the physics so you don't have to</p>
      </div>

      {/* Mobile grid */}
      <motion.div variants={grid} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="md:hidden grid grid-cols-3 w-full cursor-pointer gap-1 pt-1 px-1" style={{ strokeWidth: 1 }}>
        {mobileIcons.map((icon, index) => (
          <motion.div variants={card} data-hover onClick={() => handleClick(index)}
            className="flex justify-center items-center aspect-square bg-[#DCDCDC] rounded-xl"
            key={index}
          ><RuunSVG className="w-[28px] h-[28px]" from={icon.from} to={icon.to} active={isActive[index]} config={icon.config}/></motion.div>
        ))}
      </motion.div>

      {/* Desktop grid */}
      <motion.div variants={grid} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="hidden md:grid grid-cols-8 w-full cursor-pointer gap-1 pt-1 px-1" style={{ strokeWidth: 1 }}>
        {iconPairs.map((icon, index) => (
          <motion.div variants={card} data-hover onClick={() => handleClick(index)}
            className="flex justify-center items-center aspect-square bg-[#DCDCDC] rounded-xl"
            key={index}
          ><RuunSVG className="w-[24px] h-[24px]" from={icon.from} to={icon.to} active={isActive[index]} config={icon.config}/></motion.div>
        ))}
      </motion.div>
      <p className="text-[12px] pt-3 px-1" style={{ color: '#A3A3A3' }}>Click an icon to morph</p>
    </section>
  )
}