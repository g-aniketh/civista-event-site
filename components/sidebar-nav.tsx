"use client"

import { cn } from "@/lib/utils"
import { useScrollSpy } from "./use-scroll-spy"
import { useCallback } from "react"
import { Button } from "@/components/ui/button"

type Section = {
  id: string
  label: string
}

export function SidebarNav({ sections }: { sections: Section[] }) {
  const activeId = useScrollSpy({ sectionIds: sections.map((s) => s.id) })

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 16
    window.scrollTo({ top: y, behavior: "smooth" })
  }, [])

  return (
    <nav
      aria-label="Section navigation"
      className="sticky top-4 z-30 hidden h-[calc(100vh-2rem)] w-56 flex-col justify-between rounded-xl border bg-background/60 p-3 shadow-sm backdrop-blur md:flex"
    >
      <div className="flex flex-col gap-1">
        <div className="px-2 pb-2 pt-1">
          <div className="text-sm font-medium text-muted-foreground">Civista Club</div>
          <div className="text-sm text-foreground">Event Portal</div>
        </div>

        {sections.map((s) => {
          const isActive = s.id === activeId
          return (
            <button
              key={s.id}
              onClick={() => handleClick(s.id)}
              className={cn(
                "group relative flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition",
                isActive
                  ? "bg-white/5 text-blue-300 ring-1 ring-blue-500/20"
                  : "hover:bg-white/5 hover:text-foreground/90",
              )}
              aria-current={isActive ? "true" : undefined}
            >
              <span
                className={cn(
                  "absolute left-0 top-1/2 h-5 -translate-y-1/2 rounded-r-full transition-all",
                  isActive ? "w-1.5 accent-gradient" : "w-0 bg-transparent",
                )}
              />
              <span className="text-sm">{s.label}</span>
            </button>
          )
        })}
      </div>

      <div className="p-2">
        <Button
          className="w-full btn-accent shadow-lg shadow-blue-500/20 hover:brightness-110"
          onClick={() => {
            const el = document.getElementById("registration")
            if (!el) return
            const y = el.getBoundingClientRect().top + window.scrollY - 16
            window.scrollTo({ top: y, behavior: "smooth" })
          }}
        >
          Register Now
        </Button>
      </div>
    </nav>
  )
}
