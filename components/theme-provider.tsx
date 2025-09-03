'use client'

import * as React from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Simple provider that just renders children
  // Dark theme is handled via className="dark" on the html tag in layout.tsx
  return <>{children}</>
}
