import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"

const categories = {
  marketing: {
    label: "Marketing",
    color: "amber",
    services: [
      {
        num: "01",
        title: "Branding",
        short: "Visual identities that stick.",
        description:
          "From logo creation to full brand identity systems, we craft visual languages that deeply resonate with your audience. We design UI systems, brand guidelines, marketing collateral, and everything your brand needs to stand out.",
        tags: ["Logo Design", "Brand Identity", "Brand Guidelines", "Collateral", "Figma"],
      },
      {
        num: "02",
        title: "Digital Marketing",
        short: "Full-funnel campaigns, real results.",
        description:
          "We plan and execute full-funnel digital marketing strategies across every major channel. From SEO-driven content to email automation and influencer partnerships — connecting your brand with the right audience at the right time.",
        tags: ["SEO", "Content Marketing", "Email Campaigns", "Influencer", "Analytics"],
      },
      {
        num: "03",
        title: "Performance Marketing",
        short: "Every rupee working harder for you.",
        description:
          "Our performance marketing practice is laser-focused on measurable outcomes. We build, test, and optimise paid campaigns to maximise ROI — whether that's leads, sales, app installs, or brand awareness at scale.",
        tags: ["Google Ads", "PPC", "A/B Testing", "Conversion Rate", "Retargeting"],
      },
      {
        num: "04",
        title: "Meta Ads",
        short: "Facebook & Instagram ads that convert.",
        description:
          "We run high-performing Meta ad campaigns across Facebook and Instagram — from creative strategy and audience building to pixel setup, funnel optimisation, and scaling to reach the right people.",
        tags: ["Facebook Ads", "Instagram Ads", "Meta Pixel", "Lookalike Audiences", "ROAS"],
      },
    ],
  },
  tech: {
    label: "Technical",
    color: "teal",
    services: [
      {
        num: "01",
        title: "Web Development",
        short: "MERN apps built for scale.",
        description:
          "We build fast, scalable, production-ready web applications using the MERN stack. From custom portals and dashboards to full e-commerce platforms — every line of code written with performance and UX at the core.",
        tags: ["React", "Node.js", "MongoDB", "Express", "REST APIs"],
      },
      {
        num: "02",
        title: "Database Handling",
        short: "Secure, optimised data infrastructure.",
        description:
          "We design, build, and maintain database systems that power your applications. From schema design and query optimisation to backups, migrations, and scaling strategies — your data is safe, fast, and always available.",
        tags: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Data Modelling"],
      },
      {
        num: "03",
        title: "Backend Maintenance",
        short: "Systems running at peak performance.",
        description:
          "Our backend maintenance service ensures your APIs, servers, and infrastructure stay healthy, secure, and performant. Monitoring, bug fixes, dependency updates, security patches and performance tuning — zero downtime.",
        tags: ["API Monitoring", "Server Management", "Security Patches", "CI/CD", "Uptime"],
      },
      {
        num: "04",
        title: "AI Integration",
        short: "Bring the power of AI to your product.",
        description:
          "We integrate cutting-edge AI capabilities into your existing products and workflows. LLM-powered features, chatbots, recommendation engines, and automation pipelines — build smarter, faster, more competitive products.",
        tags: ["LLM Integration", "OpenAI", "Chatbots", "Automation", "ML Pipelines"],
      },
    ],
  },
}

const colors = {
  amber: { line: "#F5A623", glow: "rgba(245,166,35,0.15)", text: "text-amber", bg: "bg-amber/10", border: "border-amber/30", activeBg: "bg-amber", activeText: "text-navy" },
  teal:  { line: "#1D9E75", glow: "rgba(29,158,117,0.15)",  text: "text-teal",  bg: "bg-teal/10",  border: "border-teal/30",  activeBg: "bg-teal",  activeText: "text-warm" },
}

// Tilt + cursor glow card
function ServiceCard({ svc, index, isActive, onClick, colorKey }) {
  const c = colors[colorKey]
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 20 })
  const sy = useSpring(y, { stiffness: 200, damping: 20 })
  const rotateX = useTransform(sy, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-8deg", "8deg"])

  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)

  const handleMouseMove = useCallback((e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top)  / rect.height - 0.5
    x.set(nx)
    y.set(ny)
    glowX.set(((e.clientX - rect.left) / rect.width) * 100)
    glowY.set(((e.clientY - rect.top)  / rect.height) * 100)
  }, [x, y, glowX, glowY])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
    glowX.set(50)
    glowY.set(50)
  }, [x, y, glowX, glowY])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      whileTap={{ scale: 0.97 }}
      className={`relative cursor-pointer rounded-2xl border p-6 transition-colors duration-300 overflow-hidden ${
        isActive
          ? `border-opacity-60 bg-navy ${c.border}`
          : "border-navy/10 bg-white hover:border-navy/25"
      }`}
    >
      {/* Cursor glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(circle 120px at ${glowX.get()}% ${glowY.get()}%, ${c.glow}, transparent)`,
          opacity: isActive ? 0.5 : 0.7,
        }}
      />

      {/* Active glow overlay */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse 100% 100% at 0% 0%, ${c.glow}, transparent)` }}
        />
      )}

      {/* Number */}
      <div className={`font-heading text-xs font-bold tracking-widest mb-4 ${isActive ? c.text : "text-navy/25"} transition-colors duration-300`}>
        {svc.num}
      </div>

      {/* Title */}
      <div className={`font-heading text-xl font-semibold mb-2 transition-colors duration-300 ${isActive ? "text-warm" : "text-navy"}`}>
        {svc.title}
      </div>

      {/* Short */}
      <div className={`text-sm leading-relaxed transition-colors duration-300 ${isActive ? "text-warm/50" : "text-navy/45"}`}>
        {svc.short}
      </div>

      {/* Arrow */}
      <motion.div
        animate={{ x: isActive ? 4 : 0, opacity: isActive ? 1 : 0.4 }}
        className={`mt-5 text-sm font-heading font-semibold ${c.text}`}
      >
        Explore →
      </motion.div>

      {/* Active indicator bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl"
        style={{ background: c.line }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  )
}

export default function Services() {
  const [activeTab, setActiveTab] = useState("marketing")
  const [activeIdx, setActiveIdx] = useState(0)

  const current = categories[activeTab]
  const c = colors[current.color]
  const activeSvc = current.services[activeIdx]

  const handleTab = (tab) => { setActiveTab(tab); setActiveIdx(0) }

  return (
    <section className="relative bg-warm py-24 px-6 md:px-16 lg:px-24 overflow-hidden">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
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
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-navy/50 text-sm leading-relaxed max-w-xs"
        >
          Every service we offer is designed to deliver measurable impact — not just activity.
        </motion.p>
      </div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="flex gap-3 mb-12"
      >
        {Object.entries(categories).map(([key, cat]) => {
          const isActive = activeTab === key
          const a = colors[cat.color]
          return (
            <motion.button
              key={key}
              onClick={() => handleTab(key)}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
              className={`relative font-heading font-semibold text-sm px-7 py-3 rounded-lg border overflow-hidden transition-colors duration-300 ${
                isActive ? `${a.activeBg} ${a.activeText} border-transparent` : "bg-transparent text-navy/50 border-navy/15 hover:text-navy hover:border-navy/30"
              }`}
            >
              {isActive && (
                <motion.div layoutId="tabBg" className="absolute inset-0 rounded-lg" style={{ background: a.line, opacity: 0.12 }} transition={{ type: "spring", stiffness: 400, damping: 35 }} />
              )}
              <span className="relative z-10">{cat.label}</span>
            </motion.button>
          )
        })}
      </motion.div>

      {/* Cards grid + detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6"
        >
          {/* Cards — 3 cols */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4 content-start">
            {current.services.map((svc, i) => (
              <ServiceCard
                key={i} svc={svc} index={i}
                isActive={activeIdx === i}
                onClick={() => setActiveIdx(i)}
                colorKey={current.color}
              />
            ))}
          </div>

          {/* Detail panel — 2 cols, slides in */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${activeIdx}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-navy rounded-2xl p-8 md:p-10 h-full min-h-[360px] flex flex-col justify-between relative overflow-hidden"
              >
                {/* Background glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 80% 60% at 0% 0%, ${c.glow}, transparent)` }}
                />

                <div className="relative">
                  {/* Number + title */}
                  <div className={`font-heading text-xs font-bold tracking-widest mb-4 ${c.text}`}>
                    {activeSvc.num}
                  </div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 }}
                    className="font-heading text-3xl md:text-4xl text-warm font-semibold mb-6 leading-tight"
                  >
                    {activeSvc.title}
                  </motion.h3>

                  {/* Divider */}
                  <motion.div
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="h-px mb-6 origin-left"
                    style={{ background: `linear-gradient(to right, ${c.line}, transparent)` }}
                  />

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="text-warm/55 text-base leading-relaxed"
                  >
                    {activeSvc.description}
                  </motion.p>
                </div>

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="relative flex flex-wrap gap-2 mt-8"
                >
                  {activeSvc.tags.map((tag, j) => (
                    <motion.span
                      key={j}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25, delay: 0.3 + j * 0.07 }}
                      whileHover={{ scale: 1.07 }}
                      className={`text-xs font-medium px-3 py-1 rounded-full ${c.bg} ${c.text} border ${c.border} cursor-default`}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="mt-16 flex items-center justify-between border-t border-navy/10 pt-10"
      >
        <p className="text-navy/40 text-sm">Not sure which service you need?</p>
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.03, x: 3 }} whileTap={{ scale: 0.97 }}
          className="bg-navy text-warm font-heading font-semibold text-sm px-8 py-3 rounded-lg hover:bg-navy-mid transition-colors duration-200"
        >
          Let's Talk →
        </motion.a>
      </motion.div>
    </section>
  )
}