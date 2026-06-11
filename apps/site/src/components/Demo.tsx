
import { iconPairs } from "../data/iconPairs"
import {useState} from 'react'
import { RuunSVG } from 'getruun-react'


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
        <h3 className="text-[20px] font-semibold leading-none">Less Setup. More Spring</h3>
        <p className="text-center text-[12px]" style={{ color: '#A3A3A3' }}>Ruun slots into any framework in a single import<br className="block md:hidden" /> and handles the physics so you don't have to</p>
      </div>

      {/* Mobile grid */}
      <div className="md:hidden grid grid-cols-3 w-full cursor-pointer gap-1 pt-1 px-1" style={{ strokeWidth: 1 }}>
        {mobileIcons.map((icon, index) => (
          <div data-hover onClick={() => handleClick(index)}
            className="flex justify-center items-center aspect-square bg-[#DCDCDC] rounded-xl"
            key={index}
          ><RuunSVG className="w-[28px] h-[28px]" from={icon.from} to={icon.to} active={isActive[index]} config={icon.config}/></div>
        ))}
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid grid-cols-8 w-full cursor-pointer gap-1 pt-1 px-1" style={{ strokeWidth: 1 }}>
        {iconPairs.map((icon, index) => (
          <div data-hover onClick={() => handleClick(index)}
            className="flex justify-center items-center aspect-square bg-[#DCDCDC] rounded-xl"
            key={index}
          ><RuunSVG className="w-[24px] h-[24px]" from={icon.from} to={icon.to} active={isActive[index]} config={icon.config}/></div>
        ))}
      </div>
    </section>
  )
}