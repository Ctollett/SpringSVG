import logoA from '../assets/logo/logo-a.svg?raw'
import logoB from '../assets/logo/logo-b.svg?raw'
import { RuunSVG } from 'getruun-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const { pathname } = useLocation()
  const [logoActive, setLogoActive] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setLogoActive(p => !p), 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <nav className="flex flex-row justify-between items-center h-16">
      <RuunSVG
        className="w-[28px] h-[28px] overflow-visible"
        from={logoA}
        to={logoB}
        active={logoActive}
        config={{ stiffness: 100, damping: 14, mass: 1.2 }}
      />
      <ul className="flex leading-none items-center gap-4 text-[12px] font-thin p-0">
        <li data-hover className="flex items-center cursor-pointer gap-2">
          <div className={`h-[8px] w-[8px] bg-[#080808] rounded-full ${pathname === '/' ? 'visible' : 'invisible'}`}></div>
          <Link to="/">Home</Link>
        </li>
        <li data-hover className="flex items-center cursor-pointer gap-2">
          <div className={`h-[8px] w-[8px] bg-[#080808] rounded-full ${pathname === '/docs' ? 'visible' : 'invisible'}`}></div>
          <Link to="/docs">Docs</Link>
        </li>
      </ul>
    </nav>
  )
}
