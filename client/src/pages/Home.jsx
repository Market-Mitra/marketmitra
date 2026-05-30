import Hero from "../sections/Hero"
import Marquee from "../sections/Marquee"
import Services from "../sections/Services"
import About from "../sections/About"
import WhyUs from "../sections/WhyUs"
import Testimonials from "../sections/Testimonials"
import CTABanner from "../sections/CTABanner"

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee/>
      <About/>
      <Services/>
      <WhyUs/>
      <Testimonials/>
      <CTABanner/>
    </>
  )
}