import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"

const services = [
  "Web Development",
  "Database Handling",
  "Backend Maintenance",
  "AI Integration",
  "Branding",
  "Digital Marketing",
  "Performance Marketing",
  "Meta Ads",
  "Not sure yet",
]

const initialForm = {
  name:    "",
  email:   "",
  phone:   "",
  service: "",
  subject: "",
  message: "",
}

// ── API URL ───────────────────────────────────────────────
const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "https://marketmitra-venf.vercel.app/api"

export default function Contact() {
  const sectionRef = useRef(null)
  const formRef    = useRef(null)
  const headingRef = useRef(null)

  const headingInView = useInView(headingRef, { once: true })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const bgY    = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])
  const leftY  = useTransform(scrollYProgress, [0, 1], ["30px", "-30px"])
  const rightY = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"])

  const [form,    setForm]    = useState(initialForm)
  const [errors,  setErrors]  = useState({})
  const [status,  setStatus]  = useState("idle") // idle | loading | success | error
  const [touched, setTouched] = useState({})

  const validate = (data) => {
    const e = {}
    if (!data.name.trim())    e.name    = "Name is required"
    if (!data.email.trim())   e.email   = "Email is required"
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = "Enter a valid email"
    if (!data.subject.trim()) e.subject = "Subject is required"
    if (!data.message.trim()) e.message = "Message is required"
    if (!data.service)        e.service = "Please select a service"
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (touched[name]) {
      const errs = validate({ ...form, [name]: value })
      setErrors(prev => ({ ...prev, [name]: errs[name] }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const errs = validate(form)
    setErrors(prev => ({ ...prev, [name]: errs[name] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      setTouched({ name: true, email: true, subject: true, message: true, service: true })
      return
    }

    setStatus("loading")
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      })

      if (!res.ok) {
        const text = await res.text()
        let message = "Something went wrong"
        try { message = JSON.parse(text).message } catch {}
        throw new Error(message)
      }

      await res.json()
      setStatus("success")
      setForm(initialForm)
      setTouched({})
      setErrors({})
    } catch (err) {
      console.error("Submit error:", err.message)
      setStatus("error")
    }
  }

  const inputClass = (field) => `
    w-full bg-warm/5 border rounded-xl px-4 py-3.5 text-warm text-sm
    placeholder-warm/25 outline-none transition-all duration-200
    focus:bg-warm/8 focus:border-teal/50
    ${errors[field] && touched[field] ? "border-red-400/60" : "border-warm/15 hover:border-warm/25"}
  `

  return (
    <div ref={sectionRef} className="min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #1A2E4A 0%, #0f1f35 55%, #080f1e 100%)" }}
    >
      {/* Parallax background glows */}
      <motion.div style={{ y: bgY }} className="absolute inset-[-10%] pointer-events-none">
        <motion.div className="absolute top-0 left-0 w-[70vw] h-[70vw] rounded-full opacity-15"
          style={{ background: "radial-gradient(ellipse, #1D9E75 0%, transparent 65%)", filter: "blur(80px)" }}
          animate={{ x: ["0%", "40%", "0%"], y: ["0%", "40%", "0%"], scale: [1, 1.2, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] rounded-full opacity-10"
          style={{ background: "radial-gradient(ellipse, #F5A623 0%, transparent 65%)", filter: "blur(80px)" }}
          animate={{ x: ["0%", "-40%", "0%"], y: ["0%", "-30%", "0%"], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </motion.div>

      <div className="relative px-6 md:px-16 lg:px-24 pt-32 pb-24">

        {/* Header */}
        <div ref={headingRef} className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-amber text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-amber" />
            Get In Touch
          </motion.p>
          <div className="overflow-hidden">
            <h1 className="font-heading text-5xl md:text-7xl text-warm font-bold leading-none">
              {["Let's Build", "Something", "Great."].map((line, i) => (
                <motion.span key={i} className="block"
                  initial={{ y: 100, opacity: 0 }}
                  animate={headingInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className={i === 2 ? "text-amber" : "text-warm"}>{line}</span>
                </motion.span>
              ))}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left — info + cal.com */}
          <motion.div style={{ y: leftY }} className="lg:col-span-2 flex flex-col gap-8">

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="bg-warm/5 border border-warm/10 rounded-2xl p-6"
            >
              <h3 className="font-heading font-semibold text-warm mb-6">Contact Details</h3>
              <div className="flex flex-col gap-5">
                {[
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label: "Email", value: "connectmarketmitra@gmail.com", href: "mailto:connectmarketmitra@gmail.com" },
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, label: "Location", value: "Nagpur, Maharashtra · India", href: null },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal/10 text-teal flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-warm/35 text-xs uppercase tracking-wider mb-0.5">{item.label}</div>
                      {item.href
                        ? <a href={item.href} className="text-warm/75 text-sm hover:text-amber transition-colors duration-200">{item.value}</a>
                        : <span className="text-warm/75 text-sm">{item.value}</span>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Cal.com booking */}
            <motion.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-amber/8 border border-amber/20 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-amber/10 text-amber flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-warm">Prefer a call?</h3>
              </div>
              <p className="text-warm/45 text-sm leading-relaxed mb-5">
                Book a free 30-minute discovery call directly on our calendar. Pick a time that works for you.
              </p>
              <motion.a
                href="/book"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 bg-amber text-navy font-heading font-bold text-sm px-6 py-3.5 rounded-xl hover:bg-amber-light transition-colors duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Schedule a Meeting
              </motion.a>
            </motion.div>

            {/* Response time */}
            <motion.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-warm/5 border border-warm/10 rounded-2xl p-5 flex items-center gap-4"
            >
              <div className="w-2 h-2 rounded-full bg-teal animate-pulse shrink-0" />
              <div>
                <div className="text-warm/70 text-sm font-medium">Usually responds within</div>
                <div className="text-teal font-heading font-bold text-lg">24 hours</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Contact form */}
          <motion.div style={{ y: rightY }} ref={formRef} className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="bg-warm/5 border border-warm/10 rounded-2xl p-8"
            >
              <h3 className="font-heading text-xl font-semibold text-warm mb-8">Send us a message</h3>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-16 h-16 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center mb-6"
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </motion.div>
                    <h4 className="font-heading text-2xl font-bold text-warm mb-3">Message Sent!</h4>
                    <p className="text-warm/50 text-base mb-8 max-w-sm">
                      Thanks for reaching out. We've received your message and will get back to you within 24 hours.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={() => setStatus("idle")}
                      className="border border-warm/20 text-warm/60 text-sm px-6 py-2.5 rounded-lg hover:border-warm/40 hover:text-warm transition-all duration-200"
                    >
                      Send another message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-warm/40 text-xs uppercase tracking-wider mb-1.5 block">Name *</label>
                        <input
                          name="name" type="text" value={form.name}
                          onChange={handleChange} onBlur={handleBlur}
                          placeholder="Your full name"
                          className={inputClass("name")}
                        />
                        {errors.name && touched.name && (
                          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-xs mt-1.5">{errors.name}</motion.p>
                        )}
                      </div>
                      <div>
                        <label className="text-warm/40 text-xs uppercase tracking-wider mb-1.5 block">Email *</label>
                        <input
                          name="email" type="email" value={form.email}
                          onChange={handleChange} onBlur={handleBlur}
                          placeholder="your@email.com"
                          className={inputClass("email")}
                        />
                        {errors.email && touched.email && (
                          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-xs mt-1.5">{errors.email}</motion.p>
                        )}
                      </div>
                    </div>

                    {/* Phone + Service */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-warm/40 text-xs uppercase tracking-wider mb-1.5 block">Phone</label>
                        <input
                          name="phone" type="tel" value={form.phone}
                          onChange={handleChange} onBlur={handleBlur}
                          placeholder="+91 XXXXX XXXXX"
                          className={inputClass("phone")}
                        />
                      </div>
                      <div>
                        <label className="text-warm/40 text-xs uppercase tracking-wider mb-1.5 block">Service *</label>
                        <select
                          name="service" value={form.service}
                          onChange={handleChange} onBlur={handleBlur}
                          className={`${inputClass("service")} cursor-pointer`}
                        >
                          <option value="" disabled>Select a service</option>
                          {services.map((s) => (
                            <option key={s} value={s} className="bg-navy text-warm">{s}</option>
                          ))}
                        </select>
                        {errors.service && touched.service && (
                          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-xs mt-1.5">{errors.service}</motion.p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="text-warm/40 text-xs uppercase tracking-wider mb-1.5 block">Subject *</label>
                      <input
                        name="subject" type="text" value={form.subject}
                        onChange={handleChange} onBlur={handleBlur}
                        placeholder="What's this about?"
                        className={inputClass("subject")}
                      />
                      {errors.subject && touched.subject && (
                        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-xs mt-1.5">{errors.subject}</motion.p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-warm/40 text-xs uppercase tracking-wider mb-1.5 block">Message *</label>
                      <textarea
                        name="message" value={form.message}
                        onChange={handleChange} onBlur={handleBlur}
                        placeholder="Tell us about your project, goals, and timeline..."
                        rows={5}
                        className={`${inputClass("message")} resize-none`}
                      />
                      {errors.message && touched.message && (
                        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-xs mt-1.5">{errors.message}</motion.p>
                      )}
                    </div>

                    {/* Error banner */}
                    {status === "error" && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="bg-red-400/10 border border-red-400/30 rounded-xl px-4 py-3 text-red-400 text-sm"
                      >
                        Something went wrong. Please try again or email us directly at connectmarketmitra@gmail.com
                      </motion.div>
                    )}

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileHover={status !== "loading" ? { scale: 1.02, y: -2 } : {}}
                      whileTap={status !== "loading" ? { scale: 0.98 } : {}}
                      className={`w-full flex items-center justify-center gap-3 font-heading font-bold text-sm px-8 py-4 rounded-xl transition-all duration-200 ${
                        status === "loading"
                          ? "bg-warm/20 text-warm/40 cursor-not-allowed"
                          : "bg-teal text-warm hover:bg-teal-light shadow-lg shadow-teal/20"
                      }`}
                    >
                      {status === "loading" ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-warm/30 border-t-warm rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"/>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                          </svg>
                        </>
                      )}
                    </motion.button>

                    <p className="text-warm/25 text-xs text-center">
                      We'll never share your information. Response within 24 hours.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}