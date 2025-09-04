"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RegistrationForm } from "@/components/registration-form"
import { motion } from "framer-motion"
import { Calendar, Users, Trophy, Sparkles, Menu, X, IndianRupee, Clock, MapPin } from "lucide-react"
import { useState } from "react"
import { config } from "@/lib/config"

const sections = [
  { id: "home", label: "Home" },
  { id: "registration", label: "Registration" },
  { id: "events", label: "Events" },
  { id: "schedule", label: "Schedule" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact Us" },
]

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top: y, behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* Mobile Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-800 md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">Civista Club</div>
              <div className="text-xs text-muted-foreground">Technovista 2025</div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
          >
            <nav className="px-4 py-3 space-y-2">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium text-foreground"
                >
                  {s.label}
                </button>
              ))}
              <div className="pt-2">
                <Button
                  onClick={() => scrollToSection("registration")}
                  className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white"
                >
                  Register Now
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:grid md:grid-cols-[280px_1fr] md:gap-8">
        {/* Sidebar */}
        <aside className="md:col-start-1">
          <SidebarNav sections={sections} />
        </aside>

        {/* Content */}
        <div className="md:col-start-2 md:space-y-32">
          {/* Home / Hero */}
          <Section
            id="home"
            title="Civista Club Presents: Technovista 2025"
            description="A celebration of creativity, innovation, and community at Technovista 2025. Join us for workshops, competitions, and unforgettable experiences."
            className="space-y-12"
          >
            {/* Hero Content */}
            <div className="flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Main Heading */}
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
                    Experience the Future at{" "}
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                      Technovista 2025
                    </span>
                  </h1>
                  <div className="h-1 w-32 rounded-full bg-gradient-to-r from-blue-600 to-emerald-600" aria-hidden />
                </div>
                
                {/* Subtitle */}
                <p className="max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
                  Our Mission: To empower students through Technovista 2025's hands-on events and a supportive community. We cultivate
                  leadership, creativity, and curiosity—creating real impact that lasts beyond the event.
                </p>
                
                {/* Powered by */}
                <div className="text-base text-blue-600 dark:text-blue-400">
                  Powered by <span className="font-semibold text-emerald-600 dark:text-emerald-400">Civista Club</span>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="flex items-center gap-4"
              >
                <Button
                  size="lg"
                  onClick={() => scrollToSection("registration")}
                  className="bg-gradient-to-r from-blue-600 to-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105"
                >
                  Register Now
                </Button>
              </motion.div>
            </div>

            {/* Feature Cards */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.1 },
                },
              }}
              className="grid gap-6 md:grid-cols-3"
            >
              {[
                { 
                  title: "Workshops", 
                  desc: "Hands-on sessions led by industry mentors and experts at Technovista 2025.",
                  icon: Sparkles,
                  color: "from-blue-500 to-blue-600"
                },
                { 
                  title: "Competitions", 
                  desc: "Showcase your talent in coding, design, and innovation at Technovista 2025.",
                  icon: Trophy,
                  color: "from-purple-500 to-purple-600"
                },
                { 
                  title: "Showcase", 
                  desc: "Explore amazing projects and innovations from your peers at Technovista 2025.",
                  icon: Users,
                  color: "from-emerald-500 to-emerald-600"
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <Card className="group h-full border-0 bg-gradient-to-br from-white to-gray-50 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:from-gray-800 dark:to-gray-900">
                    <CardHeader className="pb-4">
                      <div className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${item.color} text-white shadow-lg`}>
                        <item.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-foreground">{item.title}</CardTitle>
                      <CardDescription className="text-base text-muted-foreground">{item.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </Section>

          {/* Registration */}
          <Section
            id="registration"
            title="Registration"
            description="Save your spot now for Technovista 2025. Limited seats for select workshops and competitions."
            className="space-y-8"
          >
            <RegistrationForm />
          </Section>

          {/* Events */}
          <Section
            id="events"
            title="Events"
            description="Explore our lineup of competitions and challenges for Technovista 2025."
            className="space-y-8"
          >
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {config.events.map((e) => (
                <motion.div key={e.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                  <Card className="group h-full border-0 bg-gradient-to-br from-white to-gray-50 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:from-gray-800 dark:to-gray-900">
                    <CardHeader className="pb-4">
                      <div className={`mb-3 inline-flex rounded-lg px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500`}>
                        Competition
                      </div>
                      <CardTitle className="text-xl font-semibold text-foreground">{e.name}</CardTitle>
                      <CardDescription className="text-base text-muted-foreground">{e.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                          <IndianRupee className="w-4 h-4" />
                          <span className="font-semibold">{e.price}</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                          <Users className="w-4 h-4" />
                          <span className="font-semibold">{e.teamSize}</span>
                        </div>
                      </div>
                      <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          <span>{e.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          <span>{e.venue}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </Section>

          {/* Schedule */}
          <Section
            id="schedule"
            title="Schedule"
            description={`Plan your day at Technovista 2025. All events take place on ${config.eventDate}.`}
            className="space-y-8"
          >
            <div className="overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-white to-gray-50 shadow-xl dark:from-gray-800 dark:to-gray-900">
              <div className="grid grid-cols-4 bg-gradient-to-r from-blue-600 to-emerald-600 p-4 text-sm font-semibold text-white">
                <div>Time</div>
                <div>Event</div>
                <div>Venue</div>
                <div>Team Size</div>
              </div>
              <motion.ul
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
                className="divide-y divide-gray-200 dark:divide-gray-700"
              >
                {config.events.map((s) => (
                  <motion.li
                    key={s.name}
                    variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                    className="grid grid-cols-4 p-4 text-sm hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="font-semibold text-blue-600 dark:text-blue-400">{s.time}</div>
                    <div className="font-medium text-foreground">{s.name}</div>
                    <div className="text-muted-foreground">{s.venue}</div>
                    <div className="text-muted-foreground">{s.teamSize} {s.teamSize === 1 ? 'participant' : 'participants'}</div>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </Section>

          {/* Team */}
          <Section id="team" title="Team" description="Meet the organizers powering Civista Club and Technovista 2025." className="space-y-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {config.teamMembers.map((m) => (
                <motion.div key={m.name} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                  <Card className="h-full border-0 bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:from-gray-800 dark:to-gray-900">
                    <CardHeader className="flex flex-col items-center gap-4 pb-4 text-center">
                      <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xl">
                        {m.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-foreground">{m.name}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground whitespace-pre-line">{m.role}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        📞 {m.contact}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </Section>

          {/* Contact */}
          <Section
            id="contact"
            title="Contact Us"
            description="Have questions about Technovista 2025 or want to partner with us? Send a message."
            className="space-y-8"
          >
            <Card className="border-0 bg-gradient-to-br from-white to-gray-50 shadow-xl dark:from-gray-800 dark:to-gray-900">
              <CardContent className="pt-8">
                <form
                  className="grid gap-6 md:grid-cols-2"
                  onSubmit={(e) => {
                    e.preventDefault()
                    alert("Thanks! We'll get back to you soon.")
                  }}
                >
                  <div className="grid gap-2">
                    <label htmlFor="c-name" className="text-sm font-medium text-foreground">
                      Name
                    </label>
                    <Input id="c-name" name="name" placeholder="Your name" required className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="c-email" className="text-sm font-medium text-foreground">
                      Email
                    </label>
                    <Input id="c-email" type="email" name="email" placeholder="you@example.com" required className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                  <div className="md:col-span-2 grid gap-2">
                    <label htmlFor="c-message" className="text-sm font-medium text-foreground">
                      Message
                    </label>
                    <Textarea id="c-message" name="message" placeholder="How can we help?" rows={5} required className="border-gray-200 focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                  <div className="md:col-span-2">
                    <Button type="submit" className="h-12 bg-gradient-to-r from-blue-600 to-emerald-600 px-8 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      Send Message
                    </Button>
                  </div>
                </form>
                <div className="mt-6 text-base text-muted-foreground">Or email us at: {config.contactEmail}</div>
              </CardContent>
            </Card>
          </Section>

          {/* Footer */}
          <footer className="pb-16 pt-8 text-center text-sm text-muted-foreground border-t border-gray-200 dark:border-gray-800">
            © 2025 Civista Club — All rights reserved.
          </footer>
        </div>
      </main>
    </>
  )
}
