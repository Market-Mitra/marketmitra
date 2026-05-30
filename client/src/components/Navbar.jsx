import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { label: "Home",      path: "/"          },
  { label: "About",     path: "/about"     },
  {
    label: "Services",
    path: "/services",
    children: [
      {
        group: "Marketing",
        color: "amber",
        items: [
          { label: "Branding",              path: "/services/branding"            },
          { label: "Digital Marketing",     path: "/services/digital-marketing"   },
          { label: "Performance Marketing", path: "/services/performance-marketing"},
          { label: "Meta Ads",              path: "/services/meta-ads"            },
        ],
      },
      {
        group: "Technical",
        color: "teal",
        items: [
          { label: "Web Development",      path: "/services/web-development"    },
          { label: "Database Handling",    path: "/services/database-handling"  },
          { label: "Backend Maintenance",  path: "/services/backend-maintenance"},
          { label: "AI Integration",       path: "/services/ai-integration"     },
        ],
      },
    ],
  },
  
  
  { label: "Contact",   path: "/contact"   },
]

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setDropdownOpen(false)
    setMobileServicesOpen(false)
  }, [location])

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path)

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-navy/95 backdrop-blur-md border-b border-warm/10 py-2 shadow-xl shadow-navy-dark/40"
            : "bg-transparent py-4"
        }`}
      >
        <div className="px-6 md:px-16 lg:px-24 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" data-cursor="hover">
            <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-3">
              <img src="/logo.png" alt="Market Mitra" className={`object-contain transition-all duration-500 ${scrolled ? "h-10 w-10" : "h-12 w-12"}`} />
              <div className="flex flex-col leading-none">
                <span className="font-heading font-bold text-base text-warm leading-none">
                  Market<span className="text-amber">मित्र</span>
                </span>
                <span className="text-warm/30 text-[9px] italic tracking-wide leading-none mt-0.5">
                  Growth feels better with a friend
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    data-cursor="hover"
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                      isActive(link.path) ? "text-amber" : "text-warm/60 hover:text-warm"
                    }`}
                  >
                    {link.label}
                    <motion.svg
                      animate={{ rotate: dropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      width="12" height="12" viewBox="0 0 12 12" fill="none"
                    >
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-full left-0 mt-2 w-64 rounded-xl overflow-hidden shadow-2xl border border-warm/10"
                        style={{ background: "linear-gradient(160deg, #1A2E4A, #0f1f35)" }}
                      >
                        {link.children.map((group, gi) => (
                          <div key={gi} className={gi > 0 ? "border-t border-warm/10" : ""}>
                            <div className="px-3 pt-3 pb-1">
                              <span className={`text-[10px] font-semibold uppercase tracking-widest ${group.color === "amber" ? "text-amber" : "text-teal"}`}>
                                {group.group}
                              </span>
                            </div>
                            <div className="p-2">
                              {group.items.map((item) => (
                                <Link
                                  key={item.path}
                                  to={item.path}
                                  data-cursor="hover"
                                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-warm/60 hover:text-warm hover:bg-warm/5 text-sm transition-all duration-150 group"
                                >
                                  <span className={`w-1 h-1 rounded-full transition-colors duration-150 ${
                                    group.color === "amber"
                                      ? "bg-amber/40 group-hover:bg-amber"
                                      : "bg-teal/40 group-hover:bg-teal"
                                  }`} />
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.label} to={link.path} data-cursor="hover"
                  className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                    isActive(link.path) ? "text-amber" : "text-warm/60 hover:text-warm"
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-1 left-4 right-4 h-px bg-amber rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            
            <motion.a href="/contact" data-cursor="hover" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="bg-amber text-navy font-heading font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-amber-light transition-colors duration-200"
            >
              Get Started
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <motion.button data-cursor="hover" whileTap={{ scale: 0.92 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <motion.span animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} className="block w-6 h-px bg-warm rounded-full origin-center" />
            <motion.span animate={mobileOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="block w-6 h-px bg-warm rounded-full" />
            <motion.span animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} className="block w-6 h-px bg-warm rounded-full origin-center" />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col pt-24 px-6 pb-10 overflow-y-auto"
            style={{ background: "linear-gradient(160deg, #1A2E4A 0%, #080f1e 100%)" }}
          >
            {/* Mobile logo */}
            <div className="absolute top-5 left-6 flex items-center gap-3">
              <img src="/logo.png" alt="Market Mitra" className="h-10 w-10 object-contain" />
              <span className="font-heading font-bold text-base text-warm">
                Market<span className="text-amber">मित्र</span>
              </span>
            </div>

            <div className="flex flex-col gap-1 flex-1">
              {navLinks.map((link, i) => (
                <motion.div key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                >
                  {link.children ? (
                    <div>
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="w-full flex items-center justify-between py-4 border-b border-warm/10 text-warm/70 font-heading font-semibold text-xl"
                      >
                        {link.label}
                        <motion.svg animate={{ rotate: mobileServicesOpen ? 180 : 0 }} width="16" height="16" viewBox="0 0 12 12" fill="none">
                          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </motion.svg>
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden pl-4"
                          >
                            {link.children.map((group, gi) => (
                              <div key={gi} className="mb-3">
                                <div className={`py-2 text-[10px] font-semibold uppercase tracking-widest ${group.color === "amber" ? "text-amber" : "text-teal"}`}>
                                  {group.group}
                                </div>
                                {group.items.map((item) => (
                                  <Link key={item.path} to={item.path}
                                    className="flex items-center gap-2 py-2 text-warm/50 hover:text-warm text-base transition-colors duration-150"
                                  >
                                    <span className={`w-1 h-1 rounded-full ${group.color === "amber" ? "bg-amber/40" : "bg-teal/40"}`} />
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link to={link.path}
                      className={`block py-4 border-b border-warm/10 font-heading font-semibold text-xl transition-colors duration-200 ${
                        isActive(link.path) ? "text-amber" : "text-warm/70 hover:text-warm"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-8 flex flex-col gap-3"
            >
              {/* <a href="tel:+919876543210" className="flex items-center gap-2 text-warm/40 text-sm justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2.68h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.18a16 16 0 0 0 6 6l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17.5z"/>
                </svg>
                +91 98765 43210
              </a> */}
              <Link to="/contact" className="bg-amber text-navy font-heading font-bold text-base px-6 py-4 rounded-xl text-center hover:bg-amber-light transition-colors duration-200">
                Get Started →
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}