import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function Cursor() {
  const cursorX  = useMotionValue(-100)
  const cursorY  = useMotionValue(-100)
  const trailX   = useMotionValue(-100)
  const trailY   = useMotionValue(-100)
  const trail2X  = useMotionValue(-100)
  const trail2Y  = useMotionValue(-100)

  const springConfig  = { stiffness: 600, damping: 40 }
  const trailConfig   = { stiffness: 150, damping: 22 }
  const trail2Config  = { stiffness: 80,  damping: 18 }

  const dotX  = useSpring(cursorX, springConfig)
  const dotY  = useSpring(cursorY, springConfig)
  const tx    = useSpring(trailX,  trailConfig)
  const ty    = useSpring(trailY,  trailConfig)
  const t2x   = useSpring(trail2X, trail2Config)
  const t2y   = useSpring(trail2Y, trail2Config)

  const [state, setState] = useState("default") // default | hover | click
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      trailX.set(e.clientX)
      trailY.set(e.clientY)
      trail2X.set(e.clientX)
      trail2Y.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const enter = () => setVisible(true)
    const leave = () => setVisible(false)

    const overLink = (e) => {
      const el = e.target.closest("a, button, [data-cursor='hover']")
      setState(el ? "hover" : "default")
    }

    const down = () => setState("click")
    const up   = () => setState((s) => s === "click" ? "default" : s)

    window.addEventListener("mousemove", move)
    window.addEventListener("mousemove", overLink)
    window.addEventListener("mouseenter", enter)
    window.addEventListener("mouseleave", leave)
    window.addEventListener("mousedown", down)
    window.addEventListener("mouseup", up)

    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mousemove", overLink)
      window.removeEventListener("mouseenter", enter)
      window.removeEventListener("mouseleave", leave)
      window.removeEventListener("mousedown", down)
      window.removeEventListener("mouseup", up)
    }
  }, [visible, cursorX, cursorY, trailX, trailY, trail2X, trail2Y])

  const dotSize   = state === "hover" ? 10 : state === "click" ? 6 : 8
  const ringSize  = state === "hover" ? 48 : state === "click" ? 20 : 32
  const ringColor = state === "hover" ? "#F5A623" : "#1D9E75"
  const dotColor  = state === "hover" ? "#F5A623" : "#F4F3EF"

  return (
    <>
      {/* Hide default cursor globally */}
      <style>{`* { cursor: none !important; }`}</style>

      {/* Trail 2 — slowest, largest, most transparent */}
      <motion.div
        style={{
          x: t2x, y: t2y,
          translateX: "-50%", translateY: "-50%",
          opacity: visible ? 0.25 : 0,
        }}
        animate={{ width: ringSize * 1.6, height: ringSize * 1.6 }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[9996]"
        style2={{ borderColor: ringColor }}
        // inline override
        {...{style: { x: t2x, y: t2y, translateX: "-50%", translateY: "-50%", borderColor: ringColor, opacity: visible ? 0.18 : 0 }}}
      />

      {/* Trail 1 — medium speed ring */}
      <motion.div
        style={{ x: tx, y: ty, translateX: "-50%", translateY: "-50%", borderColor: ringColor, opacity: visible ? 0.55 : 0 }}
        animate={{ width: ringSize, height: ringSize }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[9997]"
      />

      {/* Dot — snappy, follows cursor closely */}
      <motion.div
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%", backgroundColor: dotColor, opacity: visible ? 1 : 0 }}
        animate={{ width: dotSize, height: dotSize }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
      />
    </>
  )
}