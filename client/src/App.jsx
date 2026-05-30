import { Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

import Cursor        from "./components/Cursor"
import Navbar        from "./components/Navbar"
import Footer        from "./components/Footer"

import Home          from "./pages/Home"
import About         from "./pages/About"
import Services      from "./pages/Services"
import ServiceDetail from "./pages/ServiceDetail"
import Portfolio     from "./pages/Portfolio"
import Blog          from "./pages/Blog"
import Contact       from "./pages/Contact"
import Book          from "./pages/Book"

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
        <Routes>
          <Route path="/"                  element={<Home />}          />
          <Route path="/about"             element={<About />}         />
          <Route path="/services"          element={<Services />}      />
          <Route path="/services/:slug"    element={<ServiceDetail />} />
          <Route path="/portfolio"         element={<Portfolio />}     />
          <Route path="/blog"              element={<Blog />}          />
          <Route path="/contact"           element={<Contact />}       />
          <Route path="/book"              element={<Book />}          />
        </Routes>
      </main>
      <Footer />
    </>
  )
}