import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const { pathname } = useLocation()

  return (
    <nav className="flex flex-row justify-between items-center h-16">
      <Link to="/" className="text-[14px] font-semibold leading-none">Ruun</Link>
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
