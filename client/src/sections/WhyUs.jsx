import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion"

const stats = [
  { num: "0+", label: "Projects Delivered", color: "teal"  },
  { num: "0",  label: "Client Satisfaction", color: "amber" },
  { num: "0",  label: "Happy Clients",        color: "teal"  },
  { num: "0",   label: "Years of Expertise",   color: "amber" },
]

const reasons = [
  {
    num: "01",
    title: "End-to-End Execution",
    desc: "From strategy to deployment, we own the entire process so you never have to juggle multiple vendors. One team, full accountability.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "ROI-Focused Approach",
    desc: "Every decision is tied to metrics that matter — leads, revenue, and retention. We don't celebrate activity; we celebrate outcomes.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Transparent Reporting",
    desc: "Weekly dashboards, honest updates, and no fluff. You always know exactly where your project stands and what's coming next.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
      </svg>
    ),
  },
  {
    num: "04",
    title: "Startup to Enterprise",
    desc: "Our solutions scale with you — whether you're a bootstrapped startup or expanding to new markets. We grow as you grow.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      </svg>
    ),
  },
  {
    num: "05",
    title: "Creative + Technical",
    desc: "We're rare — a firm that's equally strong in design, marketing, and engineering. No handoffs, no lost context, no compromise.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
  },
  {
    num: "06",
    title: "Speed Without Chaos",
    desc: "We move fast but never cut corners. Agile sprints, clear milestones, and proactive communication keep projects on track every time.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
]

const skills = [
  { label: "Web Development",      pct: 100, color: "#1D9E75" },
  { label: "Digital Marketing",    pct: 92, color: "#F5A623" },
  { label: "Branding & Design",    pct: 88, color: "#1D9E75" },
//   { label: "SEO & Analytics",      pct: 90, color: "#F5A623" },
  { label: "AI Integration",       pct: 82, color: "#1D9E75" },
  { label: "Performance Marketing",pct: 93, color: "#F5A623" },
]

// Tilt card
function WhyCard({ reason, i }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-0.5, 0.5], ["6deg", "-6deg"]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(x, [-0.5, 0.5], ["-6deg", "6deg"]), { stiffness: 200, damping: 20 })

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleLeave = () => { x.set(0); y.set(0) }

  const isAmber = i % 2 !== 0

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: i * 0.08 }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      whileHover={{ y: -6 }}
      data-cursor="hover"
      className="bg-warm rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden group cursor-pointer"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: isAmber ? "radial-gradient(ellipse at top left, rgba(245,166,35,0.08), transparent)" : "radial-gradient(ellipse at top left, rgba(29,158,117,0.08), transparent)" }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isAmber ? "bg-amber/10 text-amber" : "bg-teal/10 text-teal"}`}>
          {reason.icon}
        </div>
        <span className={`font-heading text-xs font-bold tracking-widest ${isAmber ? "text-amber/30" : "text-teal/30"}`}>
          {reason.num}
        </span>
      </div>

      {/* Title */}
      <h4 className="font-heading text-lg font-semibold text-navy leading-snug">
        {reason.title}
      </h4>

      {/* Desc */}
      <p className="text-navy/55 text-sm leading-relaxed flex-1">
        {reason.desc}
      </p>

      {/* Bottom accent line */}
      <motion.div
        className="h-[2px] rounded-full origin-left"
        style={{ background: isAmber ? "#F5A623" : "#1D9E75" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
      />
    </motion.div>
  )
}

// Skill bar
function SkillBar({ skill, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className="flex flex-col gap-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-warm/70 text-sm font-medium">{skill.label}</span>
        <span className="font-heading text-sm font-bold" style={{ color: skill.color }}>{skill.pct}%</span>
      </div>
      <div className="h-1.5 bg-warm/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: skill.color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.pct}%` } : {}}
          transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  )
}

export default function WhyUs() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-28"
      style={{ background: "linear-gradient(160deg, #1A2E4A 0%, #0f1f35 55%, #080f1e 100%)" }}
    >
      {/* Background glows */}
      <motion.div style={{ y: bgY }} className="absolute inset-[-10%] pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #F5A623 0%, transparent 65%)" }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-12"
          style={{ background: "radial-gradient(circle, #1D9E75 0%, transparent 65%)" }} />
      </motion.div>

      <div className="relative px-6 md:px-16 lg:px-24">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="text-teal text-xs font-semibold uppercase tracking-widest mb-3"
            >
              Why Choose Us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl text-warm leading-tight"
            >
              The Market Mitra<br />
              <span className="text-amber">Difference</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-warm/40 text-sm leading-relaxed max-w-xs"
          >
            We don't just deliver work — we deliver outcomes that move your business forward.
          </motion.p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-warm/5 border border-warm/10 rounded-2xl p-6 text-center hover:border-warm/20 transition-colors duration-300"
            >
              <div className={`font-heading text-4xl md:text-5xl font-bold mb-2 ${s.color === "teal" ? "text-teal" : "text-amber"}`}>
                {s.num}
              </div>
              <div className="text-warm/40 text-xs uppercase tracking-widest">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Two col — cards + skills */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Reasons grid — 2 cols spanning 2/3 */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <WhyCard key={i} reason={r} i={i} />
            ))}
          </div>

          {/* Skill bars — 1/3 */}
          <div className="flex flex-col justify-center gap-6 bg-warm/5 border border-warm/10 rounded-2xl p-8">
            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="text-warm text-xs font-semibold uppercase tracking-widest mb-2"
            >
              Our Expertise
            </motion.p>
            {skills.map((sk, i) => (
              <SkillBar key={i} skill={sk} i={i} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mt-20 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-warm/10 pt-12"
        >
          <p className="font-heading text-2xl md:text-3xl text-warm/70">
            Ready to see the difference?
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.04, x: 4 }} whileTap={{ scale: 0.96 }}
            data-cursor="hover"
            className="bg-amber text-navy font-heading font-semibold px-10 py-4 rounded-lg hover:bg-amber-light transition-colors duration-200"
          >
            Start a Project →
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}