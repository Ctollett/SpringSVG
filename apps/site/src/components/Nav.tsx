import { useState } from 'react'


export default function Nav() {
  const [isActive, setIsActive] = useState('Home')

  const handleActiveState = (activeItem: string) => {
        setIsActive(activeItem)
  }

  return (
    <div className="flex flex-row justify-between items-center h-16">
      <p className="m-0 self-center text-[18px] leading-none font-semibold">Ruun.</p>
      <ul className="flex leading-none items-center gap-8 text-[12px] font-thin p-0">
        <li onClick={(()=> handleActiveState('Home'))} className="flex items-center cursor-pointer">
          {isActive === 'Home' && <span>•</span>}
          Home
          </li>
          <li onClick={(()=> handleActiveState('Docs'))} className="flex items-center cursor-pointer">
          {isActive === 'Docs' && <span>•</span>}
          Docs
          </li>
      </ul>
    </div>
  )
}
