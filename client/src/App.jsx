import { lazy, Suspense } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"

import Cursor from "./components/Cursor"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

// Lazy load all pages
const Home          = lazy(() => import("./pages/Home"))
const About         = lazy(() => import("./pages/About"))
const Services      = lazy(() => import("./pages/Services"))
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"))
const Portfolio     = lazy(() => import("./pages/Portfolio"))
const Blog          = lazy(() => import("./pages/Blog"))
const Contact       = lazy(() => import("./pages/Contact"))
const Book          = lazy(() => import("./pages/Book"))

function PageLoader() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(160deg, #1A2E4A 0%, #0f1f35 55%, #080f1e 100%)" }}
    >
      <div className="flex flex-col items-center gap-5">
        <img src="/logo.png" alt="Loading" className="w-12 h-12 object-contain animate-pulse" />
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-amber"
              style={{ animation: `mm-bounce 0.8s ease-in-out ${i * 0.15}s infinite alternate` }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes mm-bounce {
          from { transform: translateY(0);   opacity: 0.4; }
          to   { transform: translateY(-6px); opacity: 1;   }
        }
      `}</style>
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <Cursor />
      <ScrollToTop />
      <Navbar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"               element={<Home />}          />
            <Route path="/about"          element={<About />}         />
            <Route path="/services"       element={<Services />}      />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/contact"        element={<Contact />}       />
            
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}