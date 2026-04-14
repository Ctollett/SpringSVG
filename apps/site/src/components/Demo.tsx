
import { iconPairs } from "../data/iconPairs"
import {useState} from 'react'
import { RuunSVG } from 'ruun-react'


export default function Demo() {
  const [isActive, setIsActive] = useState(new Array(iconPairs.length).fill(false))
  return (
    <div className="flex flex-col border-t-1 border-dashed border-gray-600">
      <div className="flex flex-col justify-center items-center p-[16px]">
        <h3>Less Setup. More Spring</h3>
        <p className="text-center text-[8px]">Ruun slots into any framework in a single import and handles the physics so you don't have to</p>
      </div>
      <div className="grid grid-cols-8 w-full">
        {iconPairs.map((icon, index) => (
          <div
            className={`flex justify-center items-center aspect-square border-dashed border-gray-400 ${index % 8 !== 7 ? 'border-r' : ''} ${index < 32 ? 'border-b' : ''}`}
            key={index}
          ><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"></svg></div>
        ))}
      </div>
    </div>
  )
}
