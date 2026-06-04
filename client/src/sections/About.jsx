import { useRef, lazy, Suspense } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

// Three.js only loads when this section is visible
const ServiceGlobe = lazy(() => import("../components/ServiceGlobe"))

// const stats = [
//   { num: "200+", label: "Projects Delivered" },
//   { num: "50+",  label: "Happy Clients"      },
//   { num: "5+",   label: "Years in Business"  },
//   { num: "98%",  label: "Client Retention"   },
// ]

function GlobeFallback() {
  return (
    <div style={{ width: 480, height: 480 }} className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-20 h-20 rounded-full border border-teal/20 flex items-center justify-center">
          <motion.div
            className="w-10 h-10 rounded-full bg-teal/20"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span className="text-warm/20 text-xs uppercase tracking-widest">Loading...</span>
      </div>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const inView = useInView(headingRef, { once: true, margin: "-80px" })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const bgY    = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"])
  const rightY = useTransform(scrollYProgress, [0, 1], ["30px", "-30px"])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-screen flex items-center"
      style={{ background: "linear-gradient(160deg, #1A2E4A 0%, #0f1f35 55%, #080f1e 100%)" }}
    >
      {/* Background glows */}
      <motion.div style={{ y: bgY }} className="absolute inset-[-10%] pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #1D9E75 0%, transparent 65%)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, #F5A623 0%, transparent 65%)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.14, 0.06] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </motion.div>

      <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 min-h-screen">

        {/* LEFT — Globe */}
        <div
          className="relative flex flex-col items-center justify-center py-16"
          style={{ borderRight: "1px solid rgba(244,243,239,0.06)" }}
        >
          <Suspense fallback={<GlobeFallback />}>
            <ServiceGlobe />
          </Suspense>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 1 }}
            className="text-warm/25 text-xs uppercase tracking-widest mt-2"
          >
            Drag to explore
          </motion.p>

          {/* Stats strip */}
          {/* <div className="absolute bottom-0 left-0 right-0 grid grid-cols-4 border-t border-warm/[0.06]">
            {stats.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="py-5 px-4 text-center border-r border-warm/[0.06] last:border-r-0"
              >
                <div className={`font-heading text-2xl font-bold ${i % 2 === 0 ? "text-teal" : "text-amber"}`}>{s.num}</div>
                <div className="text-warm/35 text-[10px] uppercase tracking-wider mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div> */}
        </div>

        {/* RIGHT — Content */}
        <motion.div
          style={{ y: rightY }}
          className="relative flex flex-col justify-center py-24 px-10 md:px-16"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-amber text-xs font-semibold uppercase tracking-[0.2em] mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-amber inline-block" />
            Who We Are
          </motion.p>

          <div ref={headingRef} className="mb-10 overflow-hidden">
            <h2 className="font-heading text-4xl md:text-5xl xl:text-6xl text-warm font-bold leading-[1.1] uppercase">
              {["We Are", "Leading", "Tech &", "Marketing", "Agency."].map((line, i) => (
                <motion.span key={i} className="block"
                  initial={{ y: 80, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.75, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className={i === 1 ? "text-amber" : i === 3 ? "text-teal" : "text-warm"}>{line}</span>
                </motion.span>
              ))}
            </h2>
          </div>

          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="h-px mb-10 origin-left"
            style={{ background: "linear-gradient(to right, rgba(29,158,117,0.6), transparent)" }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-warm/50 text-base md:text-lg leading-relaxed mb-12 max-w-md"
          >
            We're a team of strategic thinkers, designers, and engineers working
            together to build brands that grow. We believe progress only happens
            when you refuse to play it safe — combining creativity, technology,
            and data to produce experiences that customers love.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-6"
          >
            <motion.a
              href="/about" data-cursor="hover"
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
              className="w-28 h-28 rounded-full border border-warm/20 flex items-center justify-center text-warm/70 font-heading text-sm font-semibold hover:border-amber/50 hover:text-amber transition-colors duration-300"
            >
              <span className="text-center leading-tight">Explore<br />Us ↗</span>
            </motion.a>
            <motion.a
              href="/contact" data-cursor="hover"
              whileHover={{ x: 6 }} whileTap={{ scale: 0.97 }}
              className="bg-teal text-warm font-heading font-semibold px-8 py-4 rounded-lg hover:bg-teal-light transition-colors duration-200"
            >
              Work With Us →
            </motion.a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 text-warm/20 text-xs uppercase tracking-[0.2em]"
          >
            Nagpur, Maharashtra · Est. 2024 · Tech & Marketing
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}