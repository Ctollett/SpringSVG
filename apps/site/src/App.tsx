import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import { CursorProvider } from './components/useCursor'
import Home from './pages/Home'
import Docs from './pages/Docs'
import PullUpFooter from './pages/lab/PullUpFooter'
import Record from './pages/Record'
import MorphDemo from './pages/MorphDemo'

export default function App() {
  return (
    <BrowserRouter>
      <ReactLenis root options={{ lerp: 0.1, duration: 1.0 }}>
          <Routes>
            <Route path="/" element={<CursorProvider><Home /></CursorProvider>} />
            <Route path="/docs" element={<CursorProvider><Docs /></CursorProvider>} />
            <Route path="/lab/pull-up-footer" element={<PullUpFooter />} />
            <Route path="/record" element={<Record />} />
            <Route path="/morph" element={<MorphDemo />} />
          </Routes>
      </ReactLenis>
    </BrowserRouter>
  )
}
