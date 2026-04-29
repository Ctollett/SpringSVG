
import { iconPairs } from "../data/iconPairs"
import {useState} from 'react'
import { RuunSVG } from 'ruun-react'


export default function Demo() {
  const [isActive, setIsActive] = useState(new Array(iconPairs.length).fill(false))

  const handleClick = (index) => {
    setIsActive(prev => (
     prev.map((item, i) => i === index ? !item : item)
    ))
  }


  return (
    <section id="demo-section" className="flex flex-col border-t-1 border-dashed border-gray-600">
      <div className="flex flex-col justify-center items-center p-[16px] gap-2">
        <h3>Less Setup. More Spring</h3>
        <p className="text-center text-[8px]">Ruun slots into any framework in a single import and handles the physics so you don't have to</p>
      </div>
      <div className="grid grid-cols-8 w-full cursor-pointer">
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