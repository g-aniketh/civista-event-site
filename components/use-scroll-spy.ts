"use client"

import { useEffect, useMemo, useState } from "react"

type Options = {
  sectionIds: string[]
  rootMargin?: string
  threshold?: number | number[]
}

export function useScrollSpy({
  sectionIds,
  rootMargin = "-40% 0px -60% 0px",
  threshold = [0, 0.25, 0.5, 0.75, 1],
}: Options) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "")
  const ids = useMemo(() => sectionIds.filter(Boolean), [sectionIds])

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    if (elements.length === 0) return

    let latestActive = activeId
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          const nextId = (visible[0].target as HTMLElement).id
          if (nextId !== latestActive) {
            latestActive = nextId
            setActiveId(nextId)
          }
        }
      },
      { root: null, rootMargin, threshold },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids, rootMargin])

  return activeId
}
