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
    <section id={id} aria-labelledby={`${id}-title`} className={cn("scroll-mt-20", className)}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-6"
      >
        {(title || description) && (
          <header className="space-y-4 text-center">
            {title && (
              <>
                <h2 id={`${id}-title`} className="text-pretty text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                  {title}
                </h2>
                <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-blue-600 to-emerald-600" aria-hidden />
              </>
            )}
            {description && (
              <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </motion.div>
    </section>
  )
}
