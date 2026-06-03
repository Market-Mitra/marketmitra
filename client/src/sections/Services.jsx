import { useState, useRef, useCallback, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Link } from "react-router-dom"

const categories = [
  {
    key: "marketing",
    label: "Marketing",
    color: "amber",
    services: [
      {
        num: "01", title: "Branding", slug: "branding",
        short: "Visual identities that stick.",
        description: "From logo creation to full brand identity systems — we craft visual languages that resonate with your audience and make your brand impossible to ignore.",
        tags: ["Logo Design", "Brand Identity", "Guidelines", "Figma"],
        icon: (
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2"/>
            <path d="M24 8C24 8 32 14 32 24C32 34 24 40 24 40C24 40 16 34 16 24C16 14 24 8 24 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M8 24H40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.5"/>
          </svg>
        ),
      },
      {
        num: "02", title: "Digital Marketing", slug: "digital-marketing",
        short: "Full-funnel campaigns that convert.",
        description: "We plan and execute full-funnel digital marketing strategies across every major channel — connecting your brand with the right audience at the right time.",
        tags: ["SEO", "Content", "Email", "Analytics"],
        icon: (
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M8 36L18 22L26 30L34 18L42 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="18" cy="22" r="2" fill="currentColor"/>
            <circle cx="26" cy="30" r="2" fill="currentColor"/>
            <circle cx="34" cy="18" r="2" fill="currentColor"/>
            <path d="M38 10L42 14M42 10L38 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <rect x="6" y="10" width="10" height="6" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M6 40H42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
          </svg>
        ),
      },
      {
        num: "03", title: "Performance Marketing", slug: "performance-marketing",
        short: "Every rupee working harder.",
        description: "Laser-focused on measurable outcomes. We build, test, and optimise paid campaigns to maximise your ROI — leads, sales, or brand awareness at scale.",
        tags: ["Google Ads", "PPC", "A/B Testing", "ROAS"],
        icon: (
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M24 6L28 16H40L30 22L34 34L24 26L14 34L18 22L8 16H20L24 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.3"/>
          </svg>
        ),
      },
      {
        num: "04", title: "Meta Ads", slug: "meta-ads",
        short: "Facebook & Instagram ads that convert.",
        description: "High-performing Meta ad campaigns from creative strategy and audience building to pixel setup, funnel optimisation, and scaling to reach paying customers.",
        tags: ["Facebook", "Instagram", "Pixel", "ROAS"],
        icon: (
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect x="8" y="8" width="32" height="32" rx="8" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M20 32V22C20 19.8 21.8 18 24 18C26.2 18 28 19.8 28 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M16 26H32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="16" cy="18" r="2" fill="currentColor" opacity="0.5"/>
          </svg>
        ),
      },
    ],
  },
  {
    key: "tech",
    label: "Technical",
    color: "teal",
    services: [
      {
        num: "01", title: "Web Development", slug: "web-development",
        short: "MERN apps built for scale.",
        description: "Fast, scalable, production-ready web applications using the MERN stack. From custom portals to full e-commerce platforms — every line built with performance at its core.",
        tags: ["React", "Node.js", "MongoDB", "REST APIs"],
        icon: (
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect x="6" y="10" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M6 18H42" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="12" cy="14" r="1.5" fill="currentColor" opacity="0.5"/>
            <circle cx="17" cy="14" r="1.5" fill="currentColor" opacity="0.5"/>
            <circle cx="22" cy="14" r="1.5" fill="currentColor" opacity="0.5"/>
            <path d="M16 26L20 30L16 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M24 34H32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        ),
      },
      {
        num: "02", title: "Database Handling", slug: "database-handling",
        short: "Secure, optimised data infrastructure.",
        description: "We design, build, and maintain database systems that power your applications. Schema design, query optimisation, backups, migrations, and scaling strategies.",
        tags: ["MongoDB", "PostgreSQL", "Redis", "Prisma"],
        icon: (
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <ellipse cx="24" cy="13" rx="14" ry="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M10 13V24C10 26.8 16.3 29 24 29C31.7 29 38 26.8 38 24V13" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M10 24V35C10 37.8 16.3 40 24 40C31.7 40 38 37.8 38 35V24" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        ),
      },
      {
        num: "03", title: "Backend Maintenance", slug: "backend-maintenance",
        short: "Systems running at peak performance.",
        description: "APIs, servers, and infrastructure staying healthy, secure, and performant. Monitoring, bug fixes, security patches, and performance tuning — zero downtime.",
        tags: ["Node.js", "AWS", "CI/CD", "Docker"],
        icon: (
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect x="8" y="8" width="32" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="8" y="20" width="32" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="8" y="32" width="32" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="34" cy="12" r="2" fill="currentColor" opacity="0.5"/>
            <circle cx="34" cy="24" r="2" fill="currentColor" opacity="0.8"/>
            <circle cx="34" cy="36" r="2" fill="currentColor" opacity="0.3"/>
          </svg>
        ),
      },
      {
        num: "04", title: "AI Integration", slug: "ai-integration",
        short: "Bring AI power to your product.",
        description: "LLM-powered features, chatbots, recommendation engines, and automation pipelines — we integrate cutting-edge AI to build smarter, faster, more competitive products.",
        tags: ["OpenAI", "LangChain", "Chatbots", "Automation"],
        icon: (
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M24 8V12M24 36V40M8 24H12M36 24H40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M13.4 13.4L16.2 16.2M31.8 31.8L34.6 34.6M13.4 34.6L16.2 31.8M31.8 16.2L34.6 13.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.4"/>
          </svg>
        ),
      },
    ],
  },
]

const colors = {
  amber: { text: "text-amber", border: "border-amber/40", bg: "bg-amber/10", solid: "#F5A623", glow: "rgba(245,166,35,0.15)", activeBg: "bg-amber", activeText: "text-navy" },
  teal:  { text: "text-teal",  border: "border-teal/40",  bg: "bg-teal/10",  solid: "#1D9E75", glow: "rgba(29,158,117,0.15)", activeBg: "bg-teal",  activeText: "text-warm" },
}

function ServiceCard({ svc, colorKey, index }) {
  const c = colors[colorKey]
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const ready = useRef(false) // prevents hover firing before card animates in

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ["6deg", "-6deg"]), { stiffness: 200, damping: 25 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-6deg", "6deg"]), { stiffness: 200, damping: 25 })

  // Mark ready after entry animation would have completed
  useEffect(() => {
    const t = setTimeout(() => { ready.current = true }, 600 + index * 120)
    return () => clearTimeout(t)
  }, [index])

  const handleMouseMove = useCallback((e) => {
    if (!ready.current) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }, [mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
    setGlowPos({ x: 50, y: 50 })
    setHovered(false)
    ready.current = true // ensure it's ready after first leave
  }, [mouseX, mouseY])

  return (
    <motion.div
  ref={ref}
  onMouseMove={handleMouseMove}
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={handleMouseLeave}
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.55,
    delay: index * 0.1,
    ease: [0.22, 1, 0.36, 1],
  }}
  style={{
    rotateX,
    rotateY,
    transformStyle: "preserve-3d",
    perspective: 800,
  }}
  className="relative flex-shrink-0 w-72 md:w-80"
  data-cursor="hover"
>
      <Link to={`/services/${svc.slug}`}>
        <div
          className={`relative h-72 border rounded-2xl overflow-hidden transition-colors duration-300 ${
            hovered ? c.border : "border-warm/10"
          }`}
          style={{
  background: hovered
    ? "#0c1a2e"
    : "rgba(26,46,74,0.05)"
}}
        >
          {/* Cursor glow — uses React state so it actually re-renders */}
          {hovered && (
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle 160px at ${glowPos.x}% ${glowPos.y}%, ${c.glow}, transparent)`,
              }}
            />
          )}

          {/* Default card content — always visible when not hovered */}
          <div className="relative z-10 h-full p-6 flex flex-col">
            {/* Top row */}
            <div className="flex items-start justify-between mb-auto">
              <motion.span
                animate={{ color: hovered ? c.solid : "rgba(244,243,239,0.2)" }}
                transition={{ duration: 0.3 }}
                className="font-heading text-xs font-bold tracking-widest"
              >
                {svc.num}
              </motion.span>
              <motion.div
                animate={{ color: hovered ? c.solid : "rgba(244,243,239,0.25)", scale: hovered ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10"
              >
                {svc.icon}
              </motion.div>
            </div>

            {/* Title + short — always visible, fades out on hover */}
            <div className="mt-auto">
              <h4 className="font-heading text-xl font-semibold text-navy mb-2 leading-tight">
                {svc.title}
              </h4>
              <motion.p
                animate={{ opacity: hovered ? 0 : 1 }}
                transition={{ duration: 0.15 }}
               className="text-navy/60 text-sm leading-relaxed"
              >
                {svc.short}
              </motion.p>
            </div>
          </div>

          {/* Hover overlay — slides up from bottom */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 z-20 rounded-2xl p-6 flex flex-col justify-between"
                style={{ background: `linear-gradient(160deg, #0c1a2e 0%, #0f2a1e 100%)` }}
              >
                <motion.div style={{ color: c.solid }} className="w-10 h-10">
                  {svc.icon}
                </motion.div>

                <div>
                  <h4 className={`font-heading text-lg font-semibold mb-3 ${c.text}`}>
                    {svc.title}
                  </h4>
                  <p className="text-warm/65 text-xs leading-relaxed mb-4">
                    {svc.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {svc.tags.map((tag, j) => (
                      <motion.span
                        key={j}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: 0.1 + j * 0.05 }}
                        className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${c.bg} ${c.text}`}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  <motion.div
                    initial={{ x: -8, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className={`flex items-center gap-2 text-xs font-heading font-bold ${c.text}`}
                  >
                    Learn More
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{ background: c.solid, transformOrigin: "left" }}
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </Link>
    </motion.div>
  )
}

export default function Services() {
  const scrollRef  = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [canLeft,  setCanLeft]  = useState(false)
  const [canRight, setCanRight] = useState(true)

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const mid      = el.scrollWidth / 2
    const isInTech = el.scrollLeft > mid * 0.6
    setActiveIdx(isInTech ? 1 : 0)
    setCanLeft(el.scrollLeft > 10)
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  const scrollToCategory = (idx) => {
    const el = scrollRef.current
    if (!el) return
    const targetX = idx === 0 ? 0 : el.scrollWidth / 2
    el.scrollTo({ left: targetX, behavior: "smooth" })
    setActiveIdx(idx)
  }

  const scrollBy = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * 320, behavior: "smooth" })
  }

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.addEventListener("scroll", handleScroll, { passive: true })
    return () => el?.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative bg-warm py-24 overflow-hidden">

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#1A2E4A 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      {/* Header */}
      <div className="relative px-6 md:px-16 lg:px-24 flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-teal text-xs font-semibold uppercase tracking-widest mb-3"
          >
            What We Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-navy leading-tight"
          >
            Services Built to<br />Move the Needle
          </motion.h2>
        </div>

        {/* Tabs + arrows */}
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {categories.map((cat, i) => {
              const a = colors[cat.color]
              const isActive = activeIdx === i
              return (
                <motion.button
                  key={cat.key}
                  onClick={() => scrollToCategory(i)}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  data-cursor="hover"
                  className={`relative font-heading font-semibold text-sm px-6 py-2.5 rounded-xl border overflow-hidden transition-colors duration-300 ${
                    isActive
                      ? `${a.activeBg} ${a.activeText} border-transparent`
                      : "bg-transparent text-navy/50 border-navy/15 hover:text-navy hover:border-navy/30"
                  }`}
                >
                  {isActive && (
                    <motion.div layoutId="tabBg" className="absolute inset-0 rounded-xl"
                      style={{ background: a.solid, opacity: 0.12 }}
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </motion.button>
              )
            })}
          </div>

          <div className="flex gap-2">
            <motion.button
              onClick={() => scrollBy(-1)}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              data-cursor="hover"
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors duration-200 ${
                canLeft ? "border-navy/30 text-navy/60 hover:border-navy/60 hover:text-navy" : "border-navy/10 text-navy/20 cursor-not-allowed"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
            </motion.button>
            <motion.button
              onClick={() => scrollBy(1)}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              data-cursor="hover"
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors duration-200 ${
                canRight ? "border-navy/30 text-navy/60 hover:border-navy/60 hover:text-navy" : "border-navy/10 text-navy/20 cursor-not-allowed"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="relative flex gap-4 overflow-x-auto scrollbar-hide px-6 md:px-16 lg:px-24 pb-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {categories.map((cat) => (
          <div key={cat.key} className="flex gap-4 flex-shrink-0" style={{ scrollSnapAlign: "start" }}>
            {/* Category label */}
            <div className="flex-shrink-0 flex items-center">
              <div className="flex flex-col items-center gap-2">
                <span className={`font-heading text-[10px] font-bold uppercase tracking-[0.2em] ${colors[cat.color].text} whitespace-nowrap`}
                  style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
                >
                  {cat.label}
                </span>
                <div className={`w-px h-16 ${cat.color === "amber" ? "bg-amber/30" : "bg-teal/30"}`} />
              </div>
            </div>

            {/* Cards */}
            {cat.services.map((svc, i) => (
              <ServiceCard key={svc.slug} svc={svc} colorKey={cat.color} index={i} />
            ))}
          </div>
        ))}

        <div className="flex-shrink-0 w-6 md:w-16" />
      </div>

      {/* Scroll progress indicator */}
      <div className="relative px-6 md:px-16 lg:px-24 mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          {categories.map((_, i) => (
            <motion.div
              key={i}
              animate={{ width: activeIdx === i ? 24 : 6, opacity: activeIdx === i ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
              className={`h-1.5 rounded-full cursor-pointer ${i === 0 ? "bg-amber" : "bg-teal"}`}
              onClick={() => scrollToCategory(i)}
            />
          ))}
        </div>
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.03, x: 4 }} whileTap={{ scale: 0.97 }}
          data-cursor="hover"
          className="bg-navy text-warm font-heading font-semibold text-sm px-8 py-3 rounded-xl hover:bg-navy-mid transition-colors duration-200"
        >
          Let's Talk →
        </motion.a>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  )
}