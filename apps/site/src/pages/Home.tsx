import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Demo from '../components/Demo'
import HowItWorks from '../components/HowItWorks'
import Stats from '../components/Stats'
import Playground from '../components/Playground/Playground'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main className='bg-[#080808] min-h-screen'>
      <div className='flex flex-col justify-center items-center w-full self-stretch bg-white relative z-10 rounded-b-[48px] pb-[32px] shadow-[0_20px_60px_rgba(0,0,0,3.0)]'>
        <div className='w-full max-w-[700px] px-4 md:px-0'>
          <Nav />
          <Hero />
          <Demo />
          <div className="h-[96px] md:h-[50vh]" />
          <HowItWorks />
          <Stats />
          <div className='hidden md:block'>
            <Playground />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
