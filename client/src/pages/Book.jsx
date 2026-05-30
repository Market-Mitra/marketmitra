import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import CalEmbed from "../components/CalEmbed"

const perks = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "30 Minutes",
    desc:  "Quick and focused — no fluff, no wasted time.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: "Completely Free",
    desc:  "No cost, no obligation. Just an honest conversation.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: "Real Ideas",
    desc:  "We come prepared with actual suggestions for your business.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "Clear Next Steps",
    desc:  "You'll leave with a clear picture of how we can help.",
  },
]

export default function Book() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const inView     = useInView(headingRef, { once: true })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const bgY    = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])
  const leftY  = useTransform(scrollYProgress, [0, 1], ["20px", "-20px"])
  const rightY = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"])

  return (
    <div
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #1A2E4A 0%, #0f1f35 55%, #080f1e 100%)" }}
    >
      {/* Background glows */}
      <motion.div style={{ y: bgY }} className="absolute inset-[-10%] pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-[70vw] h-[70vw] rounded-full opacity-15"
          style={{ background: "radial-gradient(ellipse, #1D9E75 0%, transparent 65%)", filter: "blur(80px)" }}
          animate={{ x: ["0%", "40%", "0%"], y: ["0%", "30%", "0%"], scale: [1, 1.2, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[60vw] h-[60vw] rounded-full opacity-10"
          style={{ background: "radial-gradient(ellipse, #F5A623 0%, transparent 65%)", filter: "blur(80px)" }}
          animate={{ x: ["0%", "-30%", "0%"], y: ["0%", "-30%", "0%"], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </motion.div>

      <div className="relative px-6 md:px-16 lg:px-24 pt-32 pb-24">

        {/* Header */}
        <div ref={headingRef} className="mb-16 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-amber text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-amber" />
            Book a Call
          </motion.p>

          <div className="overflow-hidden">
            <h1 className="font-heading text-5xl md:text-6xl text-warm font-bold leading-none mb-6">
              {["Schedule a", "Free Discovery", "Call."].map((line, i) => (
                <motion.span key={i} className="block"
                  initial={{ y: 80, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className={i === 2 ? "text-amber" : "text-warm"}>{line}</span>
                </motion.span>
              ))}
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-warm/50 text-lg leading-relaxed"
          >
            Pick a time that works for you. We'll talk about your goals, explore ideas, and figure out the best way we can help — completely free.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          {/* Left — perks */}
          <motion.div style={{ y: leftY }} className="lg:col-span-2 flex flex-col gap-4">
            {perks.map((p, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 bg-warm/5 border border-warm/10 rounded-xl p-5 hover:border-warm/20 transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-lg bg-amber/10 text-amber flex items-center justify-center shrink-0">
                  {p.icon}
                </div>
                <div>
                  <div className="font-heading font-semibold text-warm text-sm mb-1">{p.title}</div>
                  <div className="text-warm/45 text-sm leading-relaxed">{p.desc}</div>
                </div>
              </motion.div>
            ))}

            {/* Divider */}
            <div className="h-px bg-warm/10 my-2" />

            {/* Contact fallback */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="bg-teal/8 border border-teal/20 rounded-xl p-5"
            >
              <p className="text-warm/45 text-sm leading-relaxed mb-3">
                Prefer to write first? Send us a message instead.
              </p>
              <a href="/contact" data-cursor="hover"
                className="text-teal text-sm font-heading font-semibold hover:text-teal-light transition-colors duration-200 flex items-center gap-1.5"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                Go to Contact Page
              </a>
            </motion.div>

            {/* Response guarantee */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-3 bg-warm/5 border border-warm/10 rounded-xl p-4"
            >
              <div className="w-2 h-2 rounded-full bg-teal animate-pulse shrink-0" />
              <div>
                <div className="text-warm/60 text-xs">Confirmation email sent instantly</div>
                <div className="text-warm/35 text-xs mt-0.5">Powered by Cal.com</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Cal.com embed */}
          <motion.div
            style={{ y: rightY }}
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-warm/5 border border-warm/10 rounded-2xl overflow-hidden p-1">
              <CalEmbed />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}