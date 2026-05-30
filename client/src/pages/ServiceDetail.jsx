import { useParams, Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const servicesData = {
  "web-development": {
    category: "technical",
    title: "Web Development",
    tagline: "Full-stack MERN applications built for scale.",
    description: `We build fast, scalable, and production-ready web applications using the MERN stack (MongoDB, Express, React, Node.js). From custom portals and dashboards to full e-commerce platforms — every line of code is written with performance, maintainability, and user experience at the core.\n\nWe don't just build websites. We build digital products that drive business outcomes — fast loading, mobile-first, SEO-optimised, and built to scale as your business grows.`,
    techStack: [
      { name: "React",      desc: "Frontend UI library",             color: "#61DAFB" },
      { name: "Node.js",    desc: "Server-side runtime",             color: "#339933" },
      { name: "Express",    desc: "Backend framework",               color: "#ffffff" },
      { name: "MongoDB",    desc: "NoSQL database",                  color: "#47A248" },
      { name: "Tailwind",   desc: "Utility-first CSS",               color: "#06B6D4" },
      { name: "Vite",       desc: "Build tool",                      color: "#646CFF" },
      { name: "Framer",     desc: "Animations",                      color: "#0055FF" },
      { name: "Cloudinary", desc: "Media storage",                   color: "#3448C5" },
    ],
    requirements: [
      "Project brief or rough idea of what you need",
      "Target audience and purpose of the website/app",
      "Reference websites you like (design inspiration)",
      "List of features and pages needed",
      "Brand assets — logo, colors, fonts (if available)",
      "Hosting preference or we can recommend",
      "Expected timeline and budget range",
    ],
    deliverables: ["Fully responsive website/app", "Source code handover", "Admin dashboard (if needed)", "Deployment & hosting setup", "Post-launch support (30 days)"],
    timeline: "4–8 weeks",
    color: "teal",
  },
  "database-handling": {
    category: "technical",
    title: "Database Handling",
    tagline: "Reliable, optimised, and secure data infrastructure.",
    description: `We design, build, and maintain database systems that power your applications. From schema design and query optimisation to backups, migrations, and scaling strategies — we make sure your data is safe, fast, and always available.\n\nWhether you're starting fresh or need to optimise an existing database that's become a bottleneck, we bring the expertise to handle it right.`,
    techStack: [
      { name: "MongoDB",    desc: "Document database",    color: "#47A248" },
      { name: "PostgreSQL", desc: "Relational database",  color: "#336791" },
      { name: "MySQL",      desc: "SQL database",         color: "#4479A1" },
      { name: "Redis",      desc: "Caching layer",        color: "#DC382D" },
      { name: "Mongoose",   desc: "MongoDB ODM",          color: "#880000" },
      { name: "Prisma",     desc: "ORM for SQL",          color: "#2D3748" },
    ],
    requirements: [
      "Current database setup (if migrating)",
      "Expected data volume and growth rate",
      "Read/write patterns of your application",
      "Performance issues you're currently facing",
      "Backup and recovery requirements",
      "Compliance or security requirements",
    ],
    deliverables: ["Optimised schema design", "Query performance tuning", "Backup strategy", "Migration scripts", "Documentation"],
    timeline: "1–3 weeks",
    color: "teal",
  },
  "backend-maintenance": {
    category: "technical",
    title: "Backend Maintenance",
    tagline: "Keep your systems running at peak performance.",
    description: `Our backend maintenance service ensures your APIs, servers, and infrastructure stay healthy, secure, and performant. We handle monitoring, bug fixes, dependency updates, security patches, and performance tuning so you never have to worry about downtime.\n\nWe offer monthly retainer packages that cover everything from routine maintenance to emergency response — so your team can focus on building, not firefighting.`,
    techStack: [
      { name: "Node.js",  desc: "Runtime environment",    color: "#339933" },
      { name: "Express",  desc: "API framework",          color: "#ffffff" },
      { name: "PM2",      desc: "Process management",     color: "#2B037A" },
      { name: "Nginx",    desc: "Reverse proxy",          color: "#009639" },
      { name: "AWS",      desc: "Cloud infrastructure",   color: "#FF9900" },
      { name: "Docker",   desc: "Containerisation",       color: "#2496ED" },
    ],
    requirements: [
      "Access to current server/hosting environment",
      "Existing codebase and repository access",
      "Current issues or pain points",
      "SLA requirements (uptime expectations)",
      "Tech stack details",
      "Preferred communication channel",
    ],
    deliverables: ["Monthly maintenance report", "Bug fixes & patches", "Performance monitoring", "Security updates", "24hr emergency response"],
    timeline: "Ongoing retainer",
    color: "teal",
  },
  "ai-integration": {
    category: "technical",
    title: "AI Integration",
    tagline: "Bring the power of AI into your product.",
    description: `We integrate cutting-edge AI capabilities into your existing products and workflows. From LLM-powered features and chatbots to recommendation engines and automation pipelines — we help you harness AI to build smarter, faster, and more competitive products.\n\nWe work with OpenAI, Anthropic, and open-source models to find the best fit for your use case, budget, and performance requirements.`,
    techStack: [
      { name: "OpenAI",     desc: "GPT models & APIs",     color: "#ffffff" },
      { name: "Anthropic",   desc: "Claude models & APIs", color: "#FF6600" },
      { name:"Groq",       desc: "High-performance AI",   color: "#000000" },
      { name: "LangChain",  desc: "LLM orchestration",     color: "#1C3C3C" },
      { name: "Node.js",    desc: "Backend integration",   color: "#339933" },
      { name: "Python",     desc: "ML pipelines",          color: "#3776AB" },
      { name: "Pinecone",   desc: "Vector database",       color: "#000000" },
      { name: "React",      desc: "Chat UI components",    color: "#61DAFB" },
    ],
    requirements: [
      "Use case description (chatbot, automation, recommendations, etc.)",
      "Existing product or system to integrate with",
      "Data sources and types available",
      "Expected volume of AI interactions",
      "Budget for API usage (monthly estimate)",
      "Privacy and data handling requirements",
    ],
    deliverables: ["AI feature integration", "Custom prompt engineering", "API cost optimisation", "Testing & QA", "Documentation & handover"],
    timeline: "3–6 weeks",
    color: "teal",
  },
  "branding": {
    category: "marketing",
    title: "Branding & Identity",
    tagline: "Visual identities that make your brand impossible to ignore.",
    description: `From logo creation to full brand identity systems, we craft visual languages that deeply resonate with your audience. We design UI systems, brand guidelines, marketing collateral, and everything your brand needs to stand out in a crowded market.\n\nA strong brand is more than a logo — it's how your business feels, sounds, and looks across every touchpoint. We make sure yours is consistent, memorable, and built for scale.`,
    techStack: [
      { name: "Figma",       desc: "Design & prototyping",  color: "#F24E1E" },
      { name: "Illustrator", desc: "Vector graphics",       color: "#FF9A00" },
      { name: "Photoshop",   desc: "Image editing",         color: "#31A8FF" },
      { name: "After Effects",desc: "Motion graphics",      color: "#9999FF" },
    ],
    requirements: [
      "Business name and what you do",
      "Target audience and competitors",
      "Brand personality (words that describe your brand)",
      "Color preferences or brands you admire",
      "Where the brand will be used (web, print, social)",
      "Any existing assets to keep or replace",
    ],
    deliverables: ["Logo suite (primary + variations)", "Brand guidelines document", "Color & typography system", "Business card & letterhead", "Social media templates"],
    timeline: "2–4 weeks",
    color: "amber",
  },
  "digital-marketing": {
    category: "marketing",
    title: "Digital Marketing",
    tagline: "Full-funnel campaigns that turn attention into revenue.",
    description: `We plan and execute full-funnel digital marketing strategies across every major channel. From SEO-driven content to email automation and influencer partnerships — we connect your brand with the right audience at the right time.\n\nOur approach is channel-agnostic. We start with your goals and work backwards to find the highest-leverage activities, then execute with precision and measure everything.`,
    techStack: [
      { name: "Google Analytics", desc: "Web analytics",         color: "#F9AB00" },
      { name: "Semrush",          desc: "SEO & content",         color: "#FF642D" },
      { name: "Mailchimp",        desc: "Email marketing",       color: "#FFE01B" },
      { name: "HubSpot",          desc: "CRM & automation",      color: "#FF7A59" },
      { name: "Google Search",    desc: "Search console",        color: "#4285F4" },
    ],
    requirements: [
      "Business goals and KPIs (leads, sales, awareness)",
      "Current website and analytics access",
      "Target audience demographics",
      "Existing content and marketing assets",
      "Monthly budget range",
      "Past marketing efforts and results",
    ],
    deliverables: ["Marketing strategy document", "Monthly content calendar", "Campaign execution", "Weekly performance reports", "Monthly strategy review"],
    timeline: "Ongoing (min 3 months)",
    color: "amber",
  },
  "performance-marketing": {
    category: "marketing",
    title: "Performance Marketing",
    tagline: "Every rupee of ad spend working harder for you.",
    description: `Our performance marketing practice is laser-focused on measurable outcomes. We build, test, and optimise paid campaigns to maximise your ROI — whether that's leads, sales, app installs, or brand awareness at scale.\n\nWe use a data-first approach: every creative, audience, and bid strategy is tested rigorously, and we scale only what works.`,
    techStack: [
      { name: "Google Ads",   desc: "Search & display ads",  color: "#4285F4" },
      { name: "Meta Ads",     desc: "FB & Instagram ads",    color: "#0082FB" },
      { name: "Google Analytics", desc: "Conversion tracking", color: "#F9AB00" },
      { name: "Hotjar",       desc: "User behaviour",        color: "#FD3A5C" },
      { name: "Semrush",      desc: "Competitor analysis",   color: "#FF642D" },
    ],
    requirements: [
      "Campaign goals (leads, sales, installs, awareness)",
      "Monthly ad budget",
      "Landing page or website URL",
      "Target audience (demographics, interests, location)",
      "Past ad account access (if available)",
      "Competitor brands to analyse",
    ],
    deliverables: ["Campaign strategy & setup", "Ad creatives (copy + design)", "A/B testing framework", "Weekly optimization", "Monthly ROAS report"],
    timeline: "Ongoing (min 2 months)",
    color: "amber",
  },
  "meta-ads": {
    category: "marketing",
    title: "Meta Ads",
    tagline: "Facebook & Instagram ads that actually convert.",
    description: `We run high-performing Meta ad campaigns across Facebook and Instagram — from creative strategy and audience building to pixel setup, funnel optimisation, and scaling. We help you reach the right people and turn them into paying customers.\n\nOur Meta Ads service covers the full funnel: awareness campaigns to cold audiences, retargeting warm traffic, and retention campaigns for existing customers.`,
    techStack: [
      { name: "Meta Ads Manager", desc: "Campaign management",  color: "#0082FB" },
      { name: "Meta Pixel",       desc: "Conversion tracking",  color: "#0082FB" },
      { name: "Canva / Adobe",    desc: "Creative production",  color: "#F24E1E" },
      { name: "Google Analytics", desc: "Cross-channel data",   color: "#F9AB00" },
    ],
    requirements: [
      "Facebook Business Manager access",
      "Meta Pixel installed on website (or we set it up)",
      "Monthly ad budget (minimum ₹15,000/month recommended)",
      "Product/service details and pricing",
      "Target audience and geographic focus",
      "Landing page for ads to send traffic to",
    ],
    deliverables: ["Full account setup & pixel configuration", "Audience research & segmentation", "Ad creative (images + copy)", "Campaign launch & monitoring", "Weekly performance reports"],
    timeline: "Ongoing (min 2 months)",
    color: "amber",
  },
}

const slugMap = {
  "web-dev":      "web-development",
  "database":     "database-handling",
  "backend":      "backend-maintenance",
  "ai":           "ai-integration",
  "branding":     "branding",
  "digital":      "digital-marketing",
  "performance":  "performance-marketing",
  "meta":         "meta-ads",
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const navigate  = useNavigate()

  const resolvedSlug = slugMap[slug] || slug
  const svc = servicesData[resolvedSlug]

  if (!svc) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center">
          <p className="text-warm/40 text-lg mb-4">Service not found</p>
          <Link to="/services" className="text-amber hover:underline">← Back to Services</Link>
        </div>
      </div>
    )
  }

  const accent = svc.color === "teal"
    ? { text: "text-teal", bg: "bg-teal/10", border: "border-teal/20", solid: "bg-teal", hex: "#1D9E75" }
    : { text: "text-amber", bg: "bg-amber/10", border: "border-amber/20", solid: "bg-amber", hex: "#F5A623" }

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #1A2E4A 0%, #0f1f35 55%, #080f1e 100%)" }}>

      {/* Wave glows */}
      <motion.div className="fixed pointer-events-none rounded-full z-0"
        style={{ top: "-20%", left: "-10%", width: "70vw", height: "70vw", background: `radial-gradient(ellipse, ${accent.hex}22 0%, transparent 70%)`, filter: "blur(80px)" }}
        animate={{ x: ["0%", "40%", "0%"], y: ["0%", "30%", "0%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 px-6 md:px-16 lg:px-24 pt-32 pb-24">

        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/services" data-cursor="hover"
            className="inline-flex items-center gap-2 text-warm/40 hover:text-warm text-sm transition-colors duration-200 mb-10 group"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              className="group-hover:-translate-x-1 transition-transform duration-200">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            All Services
          </Link>
        </motion.div>

        {/* Hero */}
        <div className="max-w-4xl mb-20">
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className={`inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6 ${accent.bg} ${accent.text}`}
          >
            {svc.category === "technical" ? "Technical" : "Marketing"}
          </motion.span>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-5xl md:text-7xl text-warm font-bold leading-none mb-6"
          >
            {svc.title}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-xl mb-8 ${accent.text}`}
          >
            {svc.tagline}
          </motion.p>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="h-px mb-8 origin-left" style={{ background: `linear-gradient(to right, ${accent.hex}, transparent)` }}
          />

          {/* Description */}
          {svc.description.split("\n\n").map((para, i) => (
            <motion.p key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="text-warm/60 text-lg leading-relaxed mb-4"
            >
              {para}
            </motion.p>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left — Tech Stack + Requirements */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Tech Stack */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="bg-warm/5 border border-warm/10 rounded-2xl p-8"
            >
              <h3 className="font-heading text-xl font-semibold text-warm mb-6">Tech Stack We Use</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {svc.techStack.map((t, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.07 }}
                    whileHover={{ y: -3 }}
                    className="bg-warm/5 border border-warm/10 rounded-xl p-4 hover:border-warm/20 transition-all duration-200"
                  >
                    <div className="font-heading font-semibold text-sm mb-1" style={{ color: t.color }}>{t.name}</div>
                    <div className="text-warm/35 text-xs">{t.desc}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Requirements */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="bg-warm/5 border border-warm/10 rounded-2xl p-8"
            >
              <h3 className="font-heading text-xl font-semibold text-warm mb-2">What We Need From You</h3>
              <p className="text-warm/40 text-sm mb-6">To get started, we'll need the following from your side:</p>
              <ul className="flex flex-col gap-3">
                {svc.requirements.map((req, i) => (
                  <motion.li key={i}
                    initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="flex items-start gap-3"
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${accent.bg}`}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={accent.hex} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </span>
                    <span className="text-warm/65 text-sm leading-relaxed">{req}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right — Summary card + CTA */}
          <div className="flex flex-col gap-6">

            {/* Summary */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="bg-warm/5 border border-warm/10 rounded-2xl p-6"
            >
              <h4 className="font-heading font-semibold text-warm text-sm mb-4">What You Get</h4>
              <ul className="flex flex-col gap-2.5 mb-6">
                {svc.deliverables.map((d, i) => (
                  <li key={i} className="flex items-center gap-2 text-warm/60 text-sm">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${accent.solid}`} />
                    {d}
                  </li>
                ))}
              </ul>
              <div className={`h-px ${accent.border} mb-5`} style={{ background: `${accent.hex}33` }} />
              <div className="flex items-center justify-between">
                <span className="text-warm/35 text-xs uppercase tracking-widest">Timeline</span>
                <span className={`font-heading font-semibold text-sm ${accent.text}`}>{svc.timeline}</span>
              </div>
            </motion.div>

            {/* Schedule call CTA */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className={`rounded-2xl p-6 border ${accent.border}`}
              style={{ background: `${accent.hex}10` }}
            >
              <h4 className="font-heading font-semibold text-warm text-base mb-2">Ready to get started?</h4>
              <p className="text-warm/45 text-sm leading-relaxed mb-5">
                Book a free 30-minute discovery call. We'll understand your needs and tell you exactly how we can help.
              </p>
              <motion.a
                href="https://cal.com/marketmitra"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full flex items-center justify-center gap-2 font-heading font-bold text-sm px-6 py-3.5 rounded-xl transition-colors duration-200 ${
                  svc.color === "teal" ? "bg-teal text-warm hover:bg-teal-light" : "bg-amber text-navy hover:bg-amber-light"
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Schedule a Meeting
              </motion.a>
              <motion.a href="/contact" data-cursor="hover"
                whileHover={{ x: 3 }}
                className="w-full flex items-center justify-center gap-2 text-warm/40 hover:text-warm text-sm mt-3 transition-colors duration-200"
              >
                Or send us a message →
              </motion.a>
            </motion.div>

            {/* Other services */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-warm/5 border border-warm/10 rounded-2xl p-6"
            >
              <h4 className="font-heading font-semibold text-warm/50 text-xs uppercase tracking-widest mb-4">Other Services</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(servicesData)
                  .filter(([key]) => key !== resolvedSlug)
                  .slice(0, 5)
                  .map(([key, s]) => (
                    <Link key={key} to={`/services/${key}`} data-cursor="hover"
                      className="text-xs text-warm/50 border border-warm/10 px-3 py-1.5 rounded-lg hover:text-warm hover:border-warm/30 transition-all duration-200"
                    >
                      {s.title}
                    </Link>
                  ))
                }
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}