import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

// Client-only wrapper for Analytics to prevent hydration issues
function ClientOnlyAnalytics() {
  return (
    <Suspense fallback={null}>
      <Analytics />
    </Suspense>
  )
}

export const metadata: Metadata = {
  title: "Civista Club - Annual College Fest",
  description: "A celebration of creativity, innovation, and community. Join us for workshops, competitions, and unforgettable experiences.",
  generator: "v0.app",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
        <ThemeProvider>
          <Suspense fallback={null}>{children}</Suspense>
          <ClientOnlyAnalytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
