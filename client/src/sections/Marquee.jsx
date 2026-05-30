import { motion } from "framer-motion"

const services = [
  "Web Development",
  "Digital Marketing",
  "SEO & Analytics",
  "Branding & Design",
  "Social Media Management",
  "IT Consulting",
  "Content Creation",
  "Performance Marketing",
]

const MarqueeRow = ({ items, direction = 1, speed = 30 }) => {
  const doubled = [...items, ...items]
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0"
        animate={{ x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-4 px-8 py-4 shrink-0">
            <span className="w-2 h-2 rounded-full bg-amber shrink-0" />
            <span className="font-heading font-semibold text-sm uppercase tracking-widest whitespace-nowrap text-warm/80">
              {item}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="bg-navy-dark border-y border-warm/10 overflow-hidden py-1">
      {/* Row 1 — left to right */}
      <div className="border-b border-warm/5">
        <MarqueeRow items={services} direction={1} speed={25} />
      </div>
      {/* Row 2 — right to left */}
      <MarqueeRow items={services} direction={-1} speed={20} />
    </div>
  )
}