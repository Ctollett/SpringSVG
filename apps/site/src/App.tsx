import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import { CursorProvider } from './components/useCursor'
import Home from './pages/Home'
import Docs from './pages/Docs'
import Showcase from './pages/Showcase'
import Record from './pages/Record'

export default function App() {
  return (
    <BrowserRouter>
      <ReactLenis root options={{ lerp: 0.08, duration: 1.2 }}>
          <Routes>
            <Route path="/" element={<CursorProvider><Home /></CursorProvider>} />
            <Route path="/docs" element={<CursorProvider><Docs /></CursorProvider>} />
            <Route path="/showcase" element={<Showcase />} />
            <Route path="/record" element={<Record />} />
          </Routes>
      </ReactLenis>
    </BrowserRouter>
  )
}
