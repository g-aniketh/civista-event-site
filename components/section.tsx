"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type SectionProps = {
  id: string
  title?: string
  description?: string
  className?: string
  children: React.ReactNode
}

export function Section({ id, title, description, className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("scroll-mt-6", className)}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-4"
      >
        {(title || description) && (
          <header className="space-y-1">
            {title && (
              <>
                <h2 id={`${id}-title`} className="text-pretty text-2xl font-semibold tracking-tight">
                  {title}
                </h2>
                <div className="h-0.5 w-12 rounded-full accent-gradient opacity-70" aria-hidden />
              </>
            )}
            {description && <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>}
          </header>
        )}
        {children}
      </motion.div>
    </section>
  )
}
