import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

const marketing = [
  { label: "Branding & Identity",     pct: 92 },
  { label: "Digital Marketing",       pct: 95 },
  { label: "Performance Marketing",   pct: 93 },
  { label: "Meta Ads",                pct: 90 },
  { label: "SEO & Analytics",         pct: 88 },
  { label: "Social Media Management", pct: 91 },
]

const technical = [
  { label: "Web Development (MERN)",  pct: 96 },
  { label: "Database Architecture",   pct: 88 },
  { label: "Backend Maintenance",     pct: 90 },
  { label: "AI Integration",          pct: 85 },
  { label: "Cloud & DevOps",          pct: 82 },
  { label: "API Design & REST",       pct: 93 },
]

const tools = [
  {
    name: "React",
    color: "#61DAFB",
    svg: `<svg viewBox="0 0 24 24" fill="#61DAFB" xmlns="http://www.w3.org/2000/svg"><path d="M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0-12C6.925 1.5 3 5.925 3 12s3.925 10.5 9 10.5S21 18.075 21 12 17.075 1.5 12 1.5zm0 1.5c1.282 0 2.884.84 4.29 3.045A18.01 18.01 0 0 0 12 5.5a18.01 18.01 0 0 0-4.29.545C9.116 3.84 10.718 3 12 3zM4.5 12c0-.96.15-1.89.42-2.775A16.51 16.51 0 0 1 8.5 10.5a16.51 16.51 0 0 1-3.58 1.275A9.03 9.03 0 0 1 4.5 12zm.42 2.775A16.51 16.51 0 0 1 8.5 13.5a16.51 16.51 0 0 1-3.58 1.275A9.03 9.03 0 0 1 4.5 12c0 .96.15 1.89.42 2.775zM12 21c-1.282 0-2.884-.84-4.29-3.045A18.01 18.01 0 0 0 12 18.5a18.01 18.01 0 0 0 4.29-.545C14.884 20.16 13.282 21 12 21zm4.29-3.045C14.884 20.16 13.282 21 12 21s-2.884-.84-4.29-3.045A18.01 18.01 0 0 0 12 18.5a18.01 18.01 0 0 0 4.29-.545zM19.5 12c0 .96-.15 1.89-.42 2.775A16.51 16.51 0 0 1 15.5 13.5a16.51 16.51 0 0 1 3.58-1.275A9.03 9.03 0 0 1 19.5 12zm-.42-2.775A16.51 16.51 0 0 1 15.5 10.5a16.51 16.51 0 0 1 3.58-1.275A9.03 9.03 0 0 1 19.5 12c0-.96-.15-1.89-.42-2.775z"/></svg>`,
  },
  {
    name: "Node.js",
    color: "#339933",
    svg: `<svg viewBox="0 0 24 24" fill="#339933" xmlns="http://www.w3.org/2000/svg"><path d="M12 1.85c-.27 0-.55.07-.78.2L3.78 6.35c-.48.28-.78.79-.78 1.35v8.6c0 .56.3 1.07.78 1.35l7.44 4.3c.23.13.5.2.78.2s.55-.07.78-.2l7.44-4.3c.48-.28.78-.79.78-1.35v-8.6c0-.56-.3-1.07-.78-1.35L12.78 2.05c-.23-.13-.5-.2-.78-.2zm0 2.15l6.5 3.75v7.5L12 19l-6.5-3.75v-7.5L12 4z"/></svg>`,
  },
  {
    name: "MongoDB",
    color: "#47A248",
    svg: `<svg viewBox="0 0 24 24" fill="#47A248" xmlns="http://www.w3.org/2000/svg"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.3 6.337 4.55 9.617 5.338 10.148l.316.243c.064.293.148.695.168 1.029l.006.013c2.353-1.569 4.475-4.02 5.006-7.084.248-1.518.048-3.032-.263-4.958z"/></svg>`,
  },
  {
    name: "Figma",
    color: "#F24E1E",
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" fill="#0ACF83"/><path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" fill="#A259FF"/><path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" fill="#F24E1E"/><path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" fill="#FF7262"/><path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" fill="#1ABCFE"/></svg>`,
  },
  {
    name: "Meta Ads",
    color: "#0082FB",
    svg: `<svg viewBox="0 0 24 24" fill="#0082FB" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  },
  {
    name: "Google Ads",
    color: "#4285F4",
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z" fill="#4285F4"/></svg>`,
  },
  {
    name: "OpenAI",
    color: "#ffffff",
    svg: `<svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.843-3.369 2.02-1.168a.076.076 0 0 1 .071 0l4.83 2.782a4.5 4.5 0 0 1-.676 8.105v-5.678a.795.795 0 0 0-.402-.672zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>`,
  },
  {
    name: "AWS",
    color: "#FF9900",
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.064.056.128.056.184 0 .08-.048.16-.152.24l-.504.336c-.072.048-.144.072-.208.072-.08 0-.16-.04-.24-.112a2.47 2.47 0 0 1-.288-.376 6.18 6.18 0 0 1-.248-.472c-.624.736-1.408 1.104-2.352 1.104-.672 0-1.208-.192-1.6-.576-.392-.384-.592-.896-.592-1.536 0-.68.24-1.232.728-1.648.488-.416 1.136-.624 1.96-.624.272 0 .552.024.848.064.296.04.6.104.92.176v-.584c0-.608-.128-1.032-.376-1.28-.256-.248-.688-.368-1.304-.368-.28 0-.568.032-.864.104-.296.072-.584.16-.864.272-.128.056-.224.088-.28.1a.493.493 0 0 1-.128.016c-.112 0-.168-.08-.168-.248v-.392c0-.128.016-.224.056-.28a.59.59 0 0 1 .224-.168c.28-.144.616-.264 1.008-.36A4.84 4.84 0 0 1 4.6 5.98c.96 0 1.656.216 2.104.656.44.44.664 1.104.664 2v2.4zm-3.24 1.212c.264 0 .536-.048.824-.144.288-.096.544-.272.76-.512.128-.152.224-.32.272-.512.048-.192.08-.424.08-.696v-.336a6.8 6.8 0 0 0-.736-.136 6.03 6.03 0 0 0-.752-.048c-.536 0-.928.104-1.192.32-.264.216-.392.52-.392.92 0 .376.096.656.296.848.192.2.472.296.84.296zm6.44.88c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.312L7.684 6.38a1.4 1.4 0 0 1-.072-.32c0-.128.064-.2.192-.2h.784c.152 0 .256.024.312.08.064.048.112.16.16.312l1.convince 4.216 1.568-4.216c.04-.16.096-.264.16-.312.064-.056.176-.08.32-.08h.64c.152 0 .256.024.32.08.064.048.128.16.168.312l1.588 4.268 1.deal-4.268c.048-.16.104-.264.16-.312.064-.056.168-.08.312-.08h.744c.128 0 .2.064.2.2 0 .04-.008.08-.016.128-.008.048-.032.112-.064.2l-2.056 5.356c-.048.16-.104.264-.168.312-.064.056-.168.08-.304.08h-.688c-.152 0-.256-.024-.32-.08-.064-.056-.128-.16-.168-.32L11.7 8.372 10.172 11.74c-.04.16-.096.264-.168.32-.064.056-.176.08-.32.08zm10.944.248c-.416 0-.832-.048-1.232-.144-.4-.096-.712-.2-.92-.32-.128-.072-.216-.152-.248-.224a.56.56 0 0 1-.048-.224v-.408c0-.168.064-.248.184-.248.048 0 .096.008.144.024.048.016.12.048.2.08.272.12.568.216.888.28.328.064.648.096.976.096.52 0 .92-.088 1.2-.272.28-.184.424-.44.424-.784 0-.232-.072-.424-.216-.576-.144-.152-.416-.288-.808-.416l-1.16-.36c-.584-.184-1.016-.456-1.288-.816-.272-.352-.408-.744-.408-1.168 0-.336.072-.632.216-.888.144-.256.336-.48.576-.664.24-.184.512-.32.832-.416.32-.096.656-.136 1.008-.136.176 0 .36.008.536.032.184.024.352.056.512.096.152.032.296.072.432.12.136.048.24.096.312.144.104.064.176.128.216.2.04.064.064.152.064.264v.376c0 .168-.064.256-.184.256a.836.836 0 0 1-.304-.096 3.652 3.652 0 0 0-1.528-.312c-.472 0-.84.072-1.096.224-.256.152-.384.384-.384.704 0 .232.08.432.24.584.16.152.456.304.88.44l1.136.36c.576.184.992.44 1.24.776.248.336.368.72.368 1.144 0 .344-.072.656-.208.928-.144.272-.336.512-.592.704-.256.2-.56.344-.912.448-.368.112-.76.168-1.184.168z" fill="#FF9900"/><path d="M20.16 17.08c-2.46 1.82-6.032 2.784-9.1 2.784-4.304 0-8.18-1.592-11.112-4.232-.232-.208-.024-.496.256-.336 3.16 1.84 7.072 2.944 11.108 2.944 2.728 0 5.728-.568 8.484-1.74.416-.176.768.272.364.58z" fill="#FF9900"/><path d="M21.168 15.924c-.312-.4-2.08-.192-2.872-.096-.24.032-.28-.184-.064-.336 1.408-.992 3.712-.704 3.984-.376.272.336-.072 2.64-1.392 3.744-.2.168-.4.08-.312-.144.296-.744.96-2.392.656-2.792z" fill="#FF9900"/></svg>`,
  },
  {
    name: "Tailwind",
    color: "#06B6D4",
    svg: `<svg viewBox="0 0 24 24" fill="#06B6D4" xmlns="http://www.w3.org/2000/svg"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>`,
  },
  {
    name: "Framer",
    color: "#0055FF",
    svg: `<svg viewBox="0 0 24 24" fill="#0055FF" xmlns="http://www.w3.org/2000/svg"><path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/></svg>`,
  },
  {
    name: "Google Analytics",
    color: "#F9AB00",
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.84 2.998C21.466 1.07 19.34 0 17 0c-3.866 0-7 3.134-7 7v3H3v8h7v6h4v-6h3c3.866 0 7-3.134 7-7 0-2.04-.834-3.988-2.16-5.002zM17 18h-3v-8h3c2.757 0 5 2.243 5 5s-2.243 5-5 5z" fill="#F9AB00"/></svg>`,
  },
  {
    name: "Express",
    color: "#ffffff",
    svg: `<svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M24 18.588a1.529 1.529 0 0 1-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 0 1-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 0 1 1.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 0 1 1.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 0 0 0 .994l4.814 6.411zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 0 0 2.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 0 1-2.589 3.957 6.272 6.272 0 0 1-7.306-.933 6.575 6.575 0 0 1-1.64-3.858c0-.235-.08-.455-.138-.82zm1.134-.228h9.22c-.063-3.993-2.738-6.535-5.544-6.317-3.203.246-5.812 3.068-3.676 6.317z"/></svg>`,
  },
]

function SkillBar({ label, pct, color, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-warm/70 text-sm font-medium group-hover:text-warm transition-colors duration-200">
          {label}
        </span>
        <motion.span
          className="font-heading text-sm font-bold"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
        >
          {pct}%
        </motion.span>
      </div>
      <div className="h-1.5 bg-warm/8 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full relative"
          style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.2, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)" }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.5, delay: 0.8 + i * 0.08, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Expertise() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const inView = useInView(headingRef, { once: true, margin: "-80px" })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-28">

      {/* Base gradient */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #1A2E4A 0%, #0f1f35 55%, #080f1e 100%)" }} />

      {/* Wave animation */}
      <motion.div className="absolute pointer-events-none rounded-full"
        style={{ top: "-20%", left: "-20%", width: "80vw", height: "80vw", background: "radial-gradient(ellipse, rgba(29,158,117,0.15) 0%, transparent 70%)", filter: "blur(60px)" }}
        animate={{ x: ["0%", "60%", "0%"], y: ["0%", "60%", "0%"], scale: [1, 1.2, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute pointer-events-none rounded-full"
        style={{ top: "-10%", left: "-10%", width: "55vw", height: "55vw", background: "radial-gradient(ellipse, rgba(245,166,35,0.10) 0%, transparent 65%)", filter: "blur(80px)" }}
        animate={{ x: ["0%", "85%", "0%"], y: ["0%", "85%", "0%"], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      <motion.div className="absolute pointer-events-none rounded-full"
        style={{ top: "20%", left: "20%", width: "50vw", height: "50vw", background: "radial-gradient(ellipse, rgba(46,80,128,0.2) 0%, transparent 70%)", filter: "blur(60px)" }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <div className="relative px-6 md:px-16 lg:px-24">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="text-teal text-xs font-semibold uppercase tracking-widest mb-3"
            >
              Our Expertise
            </motion.p>
            <div ref={headingRef} className="overflow-hidden">
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-warm leading-tight">
                {["Skills That", "Drive Results"].map((line, i) => (
                  <motion.span key={i} className="block"
                    initial={{ y: 70, opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.75, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {i === 1
                      ? <><span className="text-amber">Drive </span><span className="text-teal">Results</span></>
                      : line
                    }
                  </motion.span>
                ))}
              </h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-warm/40 text-sm leading-relaxed max-w-xs"
          >
            A rare blend of creative and technical mastery — built to deliver on every front.
          </motion.p>
        </div>

        {/* Skill bars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="bg-warm/5 border border-warm/10 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-amber/10 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <span className="font-heading font-semibold text-warm text-sm uppercase tracking-widest">Marketing</span>
            </div>
            <div className="flex flex-col gap-5">
              {marketing.map((s, i) => <SkillBar key={i} label={s.label} pct={s.pct} color="#F5A623" i={i} />)}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-warm/5 border border-warm/10 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                </svg>
              </div>
              <span className="font-heading font-semibold text-warm text-sm uppercase tracking-widest">Technical</span>
            </div>
            <div className="flex flex-col gap-5">
              {technical.map((s, i) => <SkillBar key={i} label={s.label} pct={s.pct} color="#1D9E75" i={i} />)}
            </div>
          </motion.div>
        </div>

        {/* Tools grid with real SVGs */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="border-t border-warm/10 pt-12"
        >
          <p className="text-warm/30 text-xs uppercase tracking-widest mb-8 text-center">
            Tools & Technologies We Work With
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ y: -4, scale: 1.06 }}
                data-cursor="hover"
                className="flex items-center gap-2.5 bg-warm/5 border border-warm/10 rounded-xl px-4 py-2.5 hover:border-warm/25 hover:bg-warm/8 transition-all duration-200 cursor-default"
              >
                <div
                  className="w-5 h-5 shrink-0"
                  dangerouslySetInnerHTML={{ __html: tool.svg }}
                />
                <span className="text-warm/60 text-sm font-medium">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}