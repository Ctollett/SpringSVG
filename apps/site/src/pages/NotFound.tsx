import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="bg-[#f5f5f7] min-h-screen flex flex-col items-center justify-center px-4 gap-6 text-center">
      <p className="text-[11px] uppercase tracking-widest" style={{ color: '#A3A3A3' }}>404</p>
      <h1 className="text-[32px] font-semibold leading-tight">Page not found</h1>
      <p className="text-[14px] font-normal leading-relaxed" style={{ color: '#A3A3A3', maxWidth: '320px' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-3 mt-2">
        <Link to="/" className="flex items-center justify-center text-[12px] font-medium h-[40px] px-6 rounded-full bg-[#080808] text-white">
          Home
        </Link>
        <Link to="/docs" className="flex items-center justify-center text-[12px] font-medium h-[40px] px-6 rounded-full bg-white text-[#080808]" style={{ border: '1px solid #e5e7eb' }}>
          Docs
        </Link>
      </div>
    </main>
  )
}
