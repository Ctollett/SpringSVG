
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
    <section id="demo-section" className="flex flex-col border-t-1 border-dashed border-gray-600 pb-16">
      <div className="flex flex-col justify-center items-center p-[16px] gap-2">
        <h3>Less Setup. More Spring</h3>
        <p className="text-center text-[8px]">Ruun slots into any framework in a single import and handles the physics so you don't have to</p>
      </div>

      {/* Mobile grid */}
      <div className="md:hidden grid grid-cols-3 w-full cursor-pointer">
        {mobileIcons.map((icon, index) => (
          <div data-hover onClick={() => handleClick(index)}
            className={`flex justify-center items-center aspect-square border-dashed border-gray-400 ${index % 3 !== 2 ? 'border-r' : ''} ${index < 6 ? 'border-b' : ''}`}
            key={index}
          ><RuunSVG className="w-[36px] h-[36px]" from={icon.from} to={icon.to} active={isActive[index]} config={icon.config}/></div>
        ))}
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid grid-cols-8 w-full cursor-pointer">
        {iconPairs.map((icon, index) => (
          <div data-hover onClick={() => handleClick(index)}
            className={`flex justify-center items-center aspect-square border-dashed border-gray-400 ${index % 8 !== 7 ? 'border-r' : ''} ${index < 32 ? 'border-b' : ''}`}
            key={index}
          ><RuunSVG className="w-[24px] h-[24px]" from={icon.from} to={icon.to} active={isActive[index]} config={icon.config}/></div>
        ))}
      </div>
    </section>
  )
}