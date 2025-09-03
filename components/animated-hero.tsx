"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function AnimatedHeroVisual() {
  return (
    <div
      className="relative isolate w-full overflow-hidden rounded-2xl bg-[#0b0f1a] md:h-[52vh] min-h-[360px]"
      aria-hidden="true"
    >
      {/* Decorative background from provided reference */}
      <Image
        src="/images/hero-reference.png"
        alt=""
        fill
        priority
        className="pointer-events-none select-none object-cover opacity-25 mix-blend-screen"
      />

      {/* Soft radial glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.35),transparent_70%)] blur-2xl" />
        <div className="absolute left-1/2 top-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.25),transparent_70%)] blur-3xl" />
      </div>

      {/* Concentric rings */}
      <motion.div
        className="absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/30"
        animate={{ rotate: 360 }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 60, ease: "linear" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 size-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/25"
        animate={{ rotate: -360 }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 90, ease: "linear" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 size-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/20"
        animate={{ rotate: 360 }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 45, ease: "linear" }}
      />

      {/* Orbiting dots */}
      <OrbitalDot radius={260} size={10} className="bg-blue-400 shadow-[0_0_24px_rgba(96,165,250,0.6)]" duration={12} />
      <OrbitalDot
        radius={380}
        size={8}
        className="bg-emerald-400 shadow-[0_0_24px_rgba(52,211,153,0.5)]"
        duration={18}
        reverse
      />
      <OrbitalDot
        radius={520}
        size={12}
        className="bg-blue-300 shadow-[0_0_24px_rgba(147,197,253,0.5)]"
        duration={24}
      />

      {/* Center badge placeholder */}
      <div className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 ring-1 ring-white/10 backdrop-blur-md flex items-center justify-center">
        <span className="text-xs font-medium text-gray-200">Civista Club</span>
      </div>
    </div>
  )
}

function OrbitalDot({
  radius,
  size,
  className,
  duration,
  reverse,
}: {
  radius: number
  size: number
  className?: string
  duration: number
  reverse?: boolean
}) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ repeat: Number.POSITIVE_INFINITY, duration, ease: "linear" }}
    >
      <div
        className={`absolute -right-1 top-1/2 -translate-y-1/2 rounded-full ${className || ""}`}
        style={{ width: size, height: size }}
      />
    </motion.div>
  )
}
