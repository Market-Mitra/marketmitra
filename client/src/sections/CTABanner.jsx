import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function CTABanner() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])

  return (
    <section ref={ref} className="relative overflow-hidden py-28">

      {/* Base */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0f1f35 0%, #1A2E4A 50%, #0a1628 100%)" }} />

      {/* Wave glows */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{ top: "-30%", left: "-10%", width: "70vw", height: "70vw", background: "radial-gradient(ellipse, rgba(245,166,35,0.18) 0%, transparent 65%)", filter: "blur(80px)" }}
        animate={{ x: ["0%", "50%", "0%"], y: ["0%", "40%", "0%"], scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{ bottom: "-20%", right: "-10%", width: "60vw", height: "60vw", background: "radial-gradient(ellipse, rgba(29,158,117,0.15) 0%, transparent 65%)", filter: "blur(70px)" }}
        animate={{ x: ["0%", "-40%", "0%"], y: ["0%", "-30%", "0%"], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="font-heading text-[20vw] font-bold text-warm/[0.02] select-none whitespace-nowrap">
          LET'S GROW
        </span>
      </div>

      <div className="relative px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">

          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-amber text-xs font-semibold uppercase tracking-widest mb-6 flex items-center justify-center gap-3"
          >
            <span className="w-8 h-px bg-amber inline-block" />
            Ready to Start?
            <span className="w-8 h-px bg-amber inline-block" />
          </motion.p>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl lg:text-7xl text-warm font-bold leading-tight mb-8"
          >
            Let's Build Something<br />
            <span className="text-amber">Great</span> Together
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-warm/50 text-lg leading-relaxed mb-12 max-w-2xl mx-auto"
          >
            Whether you need a new website, a full marketing strategy, or just want to explore what's possible — we're here to help. Book a free 30-minute call and let's talk.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Book a call — Cal.com */}
            <motion.a
              href="/book"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 bg-amber text-navy font-heading font-bold px-8 py-4 rounded-xl hover:bg-amber-light transition-colors duration-200 shadow-lg shadow-amber/20"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Book a Free Call
            </motion.a>

            {/* Start a project */}
            <motion.a
              href="/contact"
              data-cursor="hover"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 border border-warm/20 text-warm font-heading font-semibold px-8 py-4 rounded-xl hover:border-warm/50 hover:bg-warm/5 transition-all duration-200"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
              Start a Project
            </motion.a>
          </motion.div>

          {/* Trust note */}
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}
            className="text-warm/25 text-xs mt-8 uppercase tracking-widest"
          >
            No commitment · Free consultation · Response within 24 hours
          </motion.p>
        </div>
      </div>
    </section>
  )
}