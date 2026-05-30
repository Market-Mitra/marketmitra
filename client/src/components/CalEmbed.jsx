import { useEffect, useRef } from "react"

export default function CalEmbed() {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // Cal.com official embed snippet
    ;(function (C, A, L) {
      let p = function (a, ar) { a.q.push(ar) }
      let d = C.document
      C.Cal =
        C.Cal ||
        function () {
          let cal = C.Cal
          let ar = arguments
          if (!cal.loaded) {
            cal.ns = {}
            cal.q = cal.q || []
            d.head.appendChild(d.createElement("script")).src = A
            cal.loaded = true
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments) }
            const namespace = ar[1]
            api.q = api.q || []
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api
              p(cal.ns[namespace], ar)
              return
            }
            p(cal, ar)
            return
          }
          p(cal, ar)
        }
    })(window, "https://app.cal.com/embed/embed.js", "init")

    window.Cal("init", "30min", { origin: "https://cal.com" })

    window.Cal.ns["30min"]("inline", {
      elementOrSelector: "#cal-booking-embed",
      calLink: "marketmitra/30min",
      layout: "month_view",
    })

    window.Cal.ns["30min"]("ui", {
      theme: "dark",
      styles: { branding: { brandColor: "#F5A623" } },
      hideEventTypeDetails: false,
      layout: "month_view",
    })
  }, [])

  return (
    <div
      id="cal-booking-embed"
      style={{ width: "100%", height: "100%", minHeight: "650px", overflow: "scroll" }}
    />
  )
}