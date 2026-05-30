import { motion } from "framer-motion"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
})

const stats = [
  { num: "200+", label: "Projects Delivered" },
  { num: "98%",  label: "Client Satisfaction" },
  { num: "5+",   label: "Years of Expertise" },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-28 pb-16">

      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, #1A2E4A 0%, #0f1f35 55%, #080f1e 100%)" }}
      />

      {/* Animated glow wave — upper left to lower right */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "-20%",
          left: "-20%",
          width: "90vw",
          height: "90vw",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(29,158,117,0.15) 0%, rgba(26,46,74,0.08) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: ["0%", "55%", "0%"],
          y: ["0%", "55%", "0%"],
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary amber glow trailing the wave */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          left: "-10%",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(245,166,35,0.10) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: ["0%", "80%", "0%"],
          y: ["0%", "80%", "0%"],
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      {/* Subtle navy-blue mid glow — stays near center */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          left: "20%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(46,80,128,0.2) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Badge */}
      <motion.div {...fadeUp(0.1)} className="relative mb-8">
        <span className="inline-flex items-center gap-2 border border-amber/30 bg-amber/10 text-amber text-xs font-medium px-4 py-2 rounded-full">
          <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
          India's Creative Growth Partner
        </span>
      </motion.div>

      {/* Giant staggered heading */}
      <div className="relative overflow-hidden">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="font-heading leading-none tracking-tight"
        >
          {["We Build", "Brands.", "We Scale"].map((line, i) => (
            <motion.span
              key={i}
              className="block"
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.15 }}
            >
              <span className={`text-6xl md:text-8xl lg:text-[9rem] ${i === 1 ? "text-amber" : "text-warm"}`}>
                {line}
              </span>
            </motion.span>
          ))}
          <motion.span
            className="block text-6xl md:text-8xl lg:text-[9rem] text-teal"
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.65 }}
          >
            Businesses.
          </motion.span>
        </motion.h1>
      </div>

      {/* Subtext + CTAs */}
      <motion.div
        {...fadeUp(0.85)}
        className="relative mt-10 flex flex-col md:flex-row md:items-center gap-6 max-w-2xl"
      >
        <p className="text-warm/50 text-base md:text-lg leading-relaxed max-w-md">
          Market Mitra combines cutting-edge tech with fearless marketing to help
          startups and enterprises grow faster, smarter, and louder.
        </p>
        <div className="flex gap-3 shrink-0">
          <a
            href="/contact"
            className="bg-amber text-navy font-heading font-semibold text-sm px-6 py-3 rounded hover:bg-amber-light transition-colors duration-200"
          >
            Start a Project
          </a>
          <a
            href="/portfolio"
            className="border border-warm/20 text-warm/70 font-heading text-sm px-6 py-3 rounded hover:border-warm/50 hover:text-warm transition-colors duration-200"
          >
            View Our Work →
          </a>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div
        {...fadeUp(1.05)}
        className="relative mt-16 flex gap-10 border-t border-warm/10 pt-8"
      >
        {stats.map((s, i) => (
          <div key={i}>
            <div className="font-heading text-3xl font-bold text-amber">{s.num}</div>
            <div className="text-warm/40 text-xs mt-1 uppercase tracking-widest">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        {...fadeUp(1.2)}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-warm/30 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, rgba(244,243,239,0.3), transparent)" }}
        />
      </motion.div>
    </section>
  )
}