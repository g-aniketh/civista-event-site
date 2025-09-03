"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface Section {
  id: string
  label: string
}

interface SidebarNavProps {
  sections: Section[]
}

export function SidebarNav({ sections }: SidebarNavProps) {
  const [activeSection, setActiveSection] = useState<string>("home")

  useEffect(() => {
    const observerOptions = {
      rootMargin: "-20% 0px -80% 0px",
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [sections])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top: y, behavior: "smooth" })
  }

  return (
    <div className="sticky top-8 space-y-2">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-emerald-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">Civista Club</div>
            <div className="text-xs text-muted-foreground">Technovista 2025</div>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-emerald-600/20" />
      </div>

      <nav className="space-y-1">
        {sections.map((section) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start h-10 px-3 text-sm font-medium transition-all duration-200",
                activeSection === section.id
                  ? "bg-gradient-to-r from-blue-600/10 to-emerald-600/10 text-blue-600 dark:text-blue-400 border-l-2 border-blue-600 dark:border-blue-400"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
              onClick={() => scrollToSection(section.id)}
            >
              <span className="truncate">{section.label}</span>
            </Button>
          </motion.div>
        ))}
      </nav>

      <div className="pt-4">
        <Button
          onClick={() => scrollToSection("registration")}
          className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Register Now
        </Button>
      </div>
    </div>
  )
}
