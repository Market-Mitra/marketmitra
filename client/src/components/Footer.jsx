
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const services = {
  marketing: [
    { label: "Branding",              path: "/services#branding"    },
    { label: "Digital Marketing",     path: "/services#digital"     },
    { label: "Performance Marketing", path: "/services#performance" },
    { label: "Meta Ads",              path: "/services#meta"        },
  ],
  technical: [
    { label: "Web Development",       path: "/services#web-dev"  },
    { label: "Database Handling",     path: "/services#database" },
    { label: "Backend Maintenance",   path: "/services#backend"  },
    { label: "AI Integration",        path: "/services#ai"       },
  ],
}

const work = [
  // { label: "Portfolio",   path: "/portfolio" },
  // { label: "Case Studies",path: "/portfolio" },
  // { label: "Blog",        path: "/blog"      },
  { label: "About Us",    path: "/about"     },
]

const socials = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/marketmitra",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/marketmitra",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:connectmarketmitra@gmail.com",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0f1f35 0%, #080f1e 100%)" }}
    >
      {/* Subtle glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #1D9E75 0%, transparent 65%)" }} />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full opacity-6 pointer-events-none"
        style={{ background: "radial-gradient(circle, #F5A623 0%, transparent 65%)" }} />

      {/* Main footer content */}
      <div className="relative px-6 md:px-16 lg:px-24 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          {/* Brand col */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5 group" data-cursor="hover">
              <img src="/logo.png" alt="Market Mitra" className="h-10 w-10 object-contain" />
              <div>
                <div className="font-heading font-bold text-lg text-warm leading-none">
                  Market<span className="text-amber">मित्र</span>
                </div>
                <div className="text-warm/25 text-[10px] italic mt-0.5">Growth feels better with a friend</div>
              </div>
            </Link>
            <p className="text-warm/40 text-sm leading-relaxed mb-6 max-w-xs">
              A full-service tech and marketing firm helping ambitious brands grow faster, smarter, and louder.
            </p>

            {/* Book a call CTA
            <motion.a
              href="https://cal.com/marketmitra"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              whileHover={{ scale: 1.03, x: 3 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-amber/10 border border-amber/25 text-amber text-sm font-heading font-semibold px-5 py-2.5 rounded-xl hover:bg-amber/15 transition-all duration-200 mb-6"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Book a Free Call
            </motion.a> */}

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl border border-warm/10 flex items-center justify-center text-warm/40 hover:text-amber hover:border-amber/30 transition-all duration-200"
                  title={s.label}
                >
                  {s.svg}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Marketing services */}
          <div>
            <h4 className="font-heading font-semibold text-xs uppercase tracking-widest text-amber mb-5">
              Marketing
            </h4>
            <ul className="flex flex-col gap-3">
              {services.marketing.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    data-cursor="hover"
                    className="text-warm/45 text-sm hover:text-warm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-amber/30 group-hover:bg-amber transition-colors duration-200 shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical services */}
          <div>
            <h4 className="font-heading font-semibold text-xs uppercase tracking-widest text-teal mb-5">
              Technical
            </h4>
            <ul className="flex flex-col gap-3">
              {services.technical.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    data-cursor="hover"
                    className="text-warm/45 text-sm hover:text-warm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-teal/30 group-hover:bg-teal transition-colors duration-200 shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Work + Contact */}
          <div>
            <h4 className="font-heading font-semibold text-xs uppercase tracking-widest text-warm/40 mb-5">
              Work & Company
            </h4>
            <ul className="flex flex-col gap-3 mb-8">
              {work.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    data-cursor="hover"
                    className="text-warm/45 text-sm hover:text-warm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-warm/20 group-hover:bg-warm/60 transition-colors duration-200 shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-heading font-semibold text-xs uppercase tracking-widest text-warm/40 mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-2.5">
              <a href="mailto:connectmarketmitra@gmail.com" data-cursor="hover"
                className="text-warm/45 text-sm hover:text-amber transition-colors duration-200 flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                connectmarketmitra@gmail.com
              </a>
              <a href="https://linkedin.com/company/marketmitra" target="_blank" rel="noopener noreferrer" data-cursor="hover"
                className="text-warm/45 text-sm hover:text-amber transition-colors duration-200 flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a href="https://cal.com/marketmitra" target="_blank" rel="noopener noreferrer" data-cursor="hover"
                className="text-warm/45 text-sm hover:text-teal transition-colors duration-200 flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Book a Meeting
              </a>
              <span className="text-warm/30 text-xs flex items-center gap-2 mt-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              Nagpur , Maharashtra , India
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-warm/[0.07] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-warm/25 text-xs">
            © {new Date().getFullYear()} Market Mitra. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-warm/25 text-xs hover:text-warm/50 transition-colors duration-200">Privacy Policy</Link>
            <Link to="/terms"   className="text-warm/25 text-xs hover:text-warm/50 transition-colors duration-200">Terms of Service</Link>
           
          </div>
        </div>
      </div>
    </footer>
  )
}

