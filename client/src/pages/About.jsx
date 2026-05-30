import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

const values = [
  { num: "01", title: "Creative First",    desc: "Ideas before tools. We lead with thinking, not templates.",       color: "amber" },
  { num: "02", title: "Data Driven",       desc: "Every decision is backed by real numbers and real outcomes.",     color: "teal"  },
  { num: "03", title: "Radical Honesty",   desc: "We tell you what you need to hear, not what you want to hear.",   color: "amber" },
  { num: "04", title: "Speed + Quality",   desc: "We move fast without cutting corners. Always.",                   color: "teal"  },
  { num: "05", title: "Long-term Partner", desc: "We grow with you. Not just for a project but for the journey.",   color: "amber" },
  { num: "06", title: "Result Oriented",   desc: "We celebrate outcomes, not activity. Your win is our win.",       color: "teal"  },
]

const milestones = [
  {
    year: "2024",
    month: "Q3",
    title: "Market Mitra Founded",
    desc: "Born in Nagpur, Maharashtra with a mission — make world-class tech and marketing accessible to every ambitious brand in India.",
    color: "amber",
  },
  {
    year: "2024",
    month: "Q4",
    title: "First Clients Onboarded",
    desc: "Delivered our first web development and branding projects for local businesses across Maharashtra. Early results exceeded expectations.",
    color: "teal",
  },
  {
    year: "2025",
    month: "Q1",
    title: "Marketing Division Launched",
    desc: "Officially launched Performance Marketing, Meta Ads, and Digital Marketing services. First campaigns went live with strong ROAS.",
    color: "amber",
  },
  {
    year: "2025",
    month: "Q2",
    title: "AI Integration Service",
    desc: "Added AI integration to our technical offering. Started helping businesses automate workflows and build smarter products.",
    color: "teal",
  },
  {
    year: "2025",
    month: "Now",
    title: "Growing & Scaling",
    desc: "Actively serving clients across India. Building a reputation for honest work, real outcomes, and long-term partnerships.",
    color: "amber",
  },
]

export default function About() {
  const heroRef = useRef(null)
  const inView  = useInView(heroRef, { once: true })

  return (
    <div className="bg-warm min-h-screen">

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden min-h-[70vh] flex items-end pb-20"
        style={{ background: "linear-gradient(160deg, #1A2E4A 0%, #0f1f35 55%, #080f1e 100%)" }}
      >
        {/* Wave glows */}
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{ top: "-20%", left: "-10%", width: "70vw", height: "70vw", background: "radial-gradient(ellipse, rgba(29,158,117,0.15) 0%, transparent 70%)", filter: "blur(60px)" }}
          animate={{ x: ["0%", "50%", "0%"], y: ["0%", "40%", "0%"], scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{ bottom: "-10%", right: "-10%", width: "60vw", height: "60vw", background: "radial-gradient(ellipse, rgba(245,166,35,0.12) 0%, transparent 65%)", filter: "blur(80px)" }}
          animate={{ x: ["0%", "-40%", "0%"], y: ["0%", "-30%", "0%"], scale: [1, 1.15, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <div className="relative px-6 md:px-16 lg:px-24 w-full">
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-amber text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-amber" />
            About Us
          </motion.p>

          <div ref={heroRef} className="overflow-hidden">
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-warm font-bold leading-none mb-6">
              {["We Are", "Market", "Mitra."].map((word, i) => (
                <motion.span key={i} className="block"
                  initial={{ y: 100, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className={i === 2 ? "text-amber" : "text-warm"}>{word}</span>
                </motion.span>
              ))}
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-warm/50 text-lg md:text-xl leading-relaxed max-w-2xl"
          >
            A freshly launched, full-service tech and marketing firm from Nagpur, Maharashtra. Built for ambitious brands that want real growth — not just activity.
          </motion.p>

          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center gap-2 mt-6 text-warm/35 text-sm"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Nagpur, Maharashtra · India
          </motion.div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-24 px-6 md:px-16 lg:px-24 bg-warm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <p className="text-teal text-xs font-semibold uppercase tracking-widest mb-4">Our Mission</p>
            <h2 className="font-heading text-4xl md:text-5xl text-navy font-bold leading-tight mb-6">
              Growth Feels Better<br /><span className="text-amber">With a Friend</span>
            </h2>
            <p className="text-navy/55 text-lg leading-relaxed mb-6">
              Market Mitra was founded on a simple belief — that great businesses deserve great partners. Not just vendors who deliver work, but real collaborators who care about your outcomes as much as you do.
            </p>
            <p className="text-navy/55 text-base leading-relaxed">
              We're a young, hungry team from Nagpur combining cutting-edge technology with bold marketing thinking. We launched because we saw too many businesses being underserved by agencies that overpromise and underdeliver. We're here to change that.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { num: "New",   label: "Freshly Launched",    color: "bg-navy text-amber"   },
              { num: "100%",  label: "Client Focused",       color: "bg-teal text-warm"    },
              { num: "8",     label: "Services Offered",     color: "bg-amber text-navy"   },
              { num: "∞",     label: "Growth Potential",     color: "bg-warm-dark text-navy border border-navy/10" },
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.04, y: -4 }}
                className={`rounded-2xl p-8 ${s.color}`}
              >
                <div className="font-heading text-5xl font-bold mb-2">{s.num}</div>
                <div className="text-xs uppercase tracking-widest opacity-70">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Values ── */}
      <section
        className="py-24 px-6 md:px-16 lg:px-24"
        style={{ background: "linear-gradient(160deg, #1A2E4A 0%, #0f1f35 55%, #080f1e 100%)" }}
      >
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-amber text-xs font-semibold uppercase tracking-widest mb-4"
        >
          Our Values
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading text-4xl md:text-5xl text-warm font-bold mb-16"
        >
          What We Stand For
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map((v, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-warm/5 border border-warm/10 rounded-2xl p-6 hover:border-warm/20 transition-all duration-300"
            >
              <div className={`font-heading text-xs font-bold tracking-widest mb-4 ${v.color === "amber" ? "text-amber" : "text-teal"}`}>{v.num}</div>
              <h4 className="font-heading text-lg font-semibold text-warm mb-3">{v.title}</h4>
              <p className="text-warm/45 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-24 px-6 md:px-16 lg:px-24 bg-warm">
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-teal text-xs font-semibold uppercase tracking-widest mb-4"
        >
          Our Journey
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading text-4xl md:text-5xl text-navy font-bold mb-4"
        >
          Just Getting <span className="text-teal">Started</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-navy/45 text-base mb-16 max-w-xl"
        >
          We're a newly launched firm and proud of it. Every great agency started somewhere — this is ours.
        </motion.p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[88px] top-0 bottom-0 w-px bg-navy/10 hidden md:block" />

          <div className="flex flex-col gap-10">
            {milestones.map((m, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-8 items-start"
              >
                {/* Year + month */}
                <div className="shrink-0 w-[80px] text-right hidden md:block">
                  <span className={`font-heading font-bold text-sm block ${m.color === "amber" ? "text-amber" : "text-teal"}`}>{m.year}</span>
                  <span className="text-navy/35 text-xs">{m.month}</span>
                </div>

                <div className="relative flex-1">
                  {/* Timeline dot */}
                  <div className={`absolute -left-[34px] top-2 w-3 h-3 rounded-full border-2 border-warm hidden md:block ${m.color === "amber" ? "bg-amber" : "bg-teal"}`} />

                  {/* Mobile year */}
                  <div className="md:hidden mb-1">
                    <span className={`font-heading font-bold text-xs ${m.color === "amber" ? "text-amber" : "text-teal"}`}>{m.year} · {m.month}</span>
                  </div>

                  <div className="bg-warm-dark rounded-2xl p-6 border border-navy/8">
                    {m.month === "Now" && (
                      <span className="inline-flex items-center gap-1.5 bg-teal/10 text-teal text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                        Live Now
                      </span>
                    )}
                    <h4 className="font-heading font-semibold text-lg text-navy mb-2">{m.title}</h4>
                    <p className="text-navy/55 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 md:px-16 lg:px-24 bg-navy text-center">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-amber text-xs font-semibold uppercase tracking-widest mb-4"
        >
          Be an early client
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="font-heading text-3xl md:text-5xl text-warm font-bold mb-6"
        >
          Get in early. Grow with us.
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-warm/50 text-lg mb-10 max-w-xl mx-auto"
        >
          We're offering early-client pricing for brands who join us in our first year. Book a free call and let's see what we can build together.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a href="https://cal.com/marketmitra" target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} data-cursor="hover"
            className="flex items-center gap-2 bg-amber text-navy font-heading font-bold px-8 py-4 rounded-xl hover:bg-amber-light transition-colors duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Schedule a Meeting
          </motion.a>
          <motion.a href="/contact" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} data-cursor="hover"
            className="border border-warm/20 text-warm font-heading font-semibold px-8 py-4 rounded-xl hover:border-warm/50 transition-colors duration-200"
          >
            Send a Message →
          </motion.a>
        </motion.div>
      </section>
    </div>
  )
} 