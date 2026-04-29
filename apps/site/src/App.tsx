
import Nav from './components/Nav'
import Hero from './components/Hero'
import Demo from './components/Demo'
import HowItWorks from './components/HowItWorks'
import Playground from './components/Playground/Playground'
import Footer from './components/Footer'
import { ReactLenis } from 'lenis/react'
import { CursorProvider } from './components/useCursor'

export default function App() {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2 }}>
      <CursorProvider>
      <main className='bg-black min-h-screen'>
        <div className='flex flex-col justify-center items-center w-full self-stretch bg-white relative z-10 rounded-b-[48px] pb-[32px] shadow-[0_20px_60px_rgba(0,0,0,3.0)]'>
        <div className='max-w-[636px]'>
        <Nav />
        <Hero />
        <Demo />
        <HowItWorks />
        <Playground />
        </div>
        </div>
        <Footer />
      </main>
      </CursorProvider>
    </ReactLenis>
  )
}
