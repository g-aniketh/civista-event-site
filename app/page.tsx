"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { AnimatedHeroVisual } from "@/components/animated-hero"

const sections = [
  { id: "home", label: "Home" },
  { id: "registration", label: "Registration" },
  { id: "events", label: "Events" },
  { id: "schedule", label: "Schedule" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact Us" },
]

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:grid md:grid-cols-[14rem_1fr] md:gap-6">
      {/* Sidebar */}
      <aside className="md:col-start-1">
        <SidebarNav sections={sections} />
      </aside>

      {/* Content */}
      <div className="md:col-start-2 md:space-y-24">
        {/* Home / Hero */}
        <Section
          id="home"
          title="Civista Club Presents: Annual College Fest"
          description="A celebration of creativity, innovation, and community. Join us for workshops, competitions, and unforgettable experiences."
          className="space-y-8"
        >
          {/* Animated visual inspired by the reference */}
          <div className="orbit-overlay">
            <AnimatedHeroVisual />
          </div>

          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-xl border bg-card/60 p-6 shadow-sm backdrop-blur"
            >
              <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  {/* Heading with tiny accent gradient + soft glow */}
                  <h1 className="text-balance text-3xl font-bold leading-tight md:text-5xl text-gradient glow">
                    Experience the Future on Campus
                  </h1>
                  {/* small accent bar underline */}
                  <div className="h-1 w-24 rounded-full accent-gradient opacity-70" aria-hidden />
                  <p className="max-w-2xl text-muted-foreground">
                    Our Mission: To empower students through hands-on events and a supportive community. We cultivate
                    leadership, creativity, and curiosity—creating real impact that lasts beyond the event.
                  </p>
                  <div className="text-sm text-blue-300/80">
                    Powered by <span className="font-semibold text-emerald-400">Civista Club</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    size="lg"
                    onClick={() => {
                      const el = document.getElementById("registration")
                      if (!el) return
                      const y = el.getBoundingClientRect().top + window.scrollY - 16
                      window.scrollTo({ top: y, behavior: "smooth" })
                    }}
                    className="btn-accent shadow-lg shadow-blue-500/20 hover:brightness-110"
                  >
                    Register Now
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.08 },
                },
              }}
              className="grid gap-4 md:grid-cols-3"
            >
              {[
                { title: "Workshops", desc: "Hands-on sessions led by industry mentors." },
                { title: "Competitions", desc: "Showcase talent in coding, design, and more." },
                { title: "Showcase", desc: "Explore projects and innovations from peers." },
              ].map((i) => (
                <motion.div
                  key={i.title}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <Card className="group h-full border-blue-100 transition hover:border-blue-300 hover:shadow-md dark:border-blue-900/30 dark:hover:border-blue-700/50">
                    <CardHeader>
                      <CardTitle className="text-lg">{i.title}</CardTitle>
                      <CardDescription>{i.desc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-24 rounded-md bg-muted/40" aria-hidden />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Section>

        {/* Registration */}
        <Section
          id="registration"
          title="Registration"
          description="Save your spot now. Limited seats for select workshops and competitions."
          className="space-y-6"
        >
          <Card className="border-emerald-100 dark:border-emerald-900/30">
            <CardHeader>
              <CardTitle>Register for Civista Club Fest</CardTitle>
              <CardDescription>Fill in your details and we’ll confirm via email.</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="grid gap-4 md:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  // In a real app, submit to an API or integration
                  console.log("[v0] Registration submitted")
                  alert("Thanks for registering! We’ll email you the details shortly.")
                }}
              >
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <Input id="name" name="name" placeholder="Jane Doe" required />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" name="email" placeholder="you@example.com" required />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="year" className="text-sm font-medium">
                    Year
                  </label>
                  <Input id="year" name="year" placeholder="2nd Year" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="department" className="text-sm font-medium">
                    Department
                  </label>
                  <Input id="department" name="department" placeholder="Computer Science" />
                </div>
                <div className="md:col-span-2 grid gap-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message (optional)
                  </label>
                  <Textarea id="message" name="message" placeholder="Tell us what you’re excited about!" rows={4} />
                </div>
                <div className="md:col-span-2">
                  <Button type="submit" className="w-full md:w-auto">
                    Submit Registration
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </Section>

        {/* Events */}
        <Section
          id="events"
          title="Events"
          description="Explore our lineup of sessions, competitions, and showcases."
          className="space-y-6"
        >
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              { title: "Hack Sprint", desc: "Rapid 6-hour build challenge.", tag: "Competition" },
              { title: "UI/UX Jam", desc: "Design sprint with mentor feedback.", tag: "Workshop" },
              { title: "ML Starter", desc: "Intro to ML with hands-on labs.", tag: "Workshop" },
              { title: "Pitch Deck", desc: "Present your idea to judges.", tag: "Competition" },
              { title: "Web3 101", desc: "Demystifying blockchain & dApps.", tag: "Talk" },
              { title: "Project Expo", desc: "Showcase your best work.", tag: "Showcase" },
            ].map((e) => (
              <motion.div key={e.title} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
                <Card className="group h-full transition hover:-translate-y-0.5 hover:shadow-md">
                  <CardHeader>
                    <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{e.tag}</div>
                    <CardTitle className="text-lg">{e.title}</CardTitle>
                    <CardDescription>{e.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-20 rounded-md bg-muted/40" aria-hidden />
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
          description="Plan your day. Timings may be subject to minor adjustments."
          className="space-y-6"
        >
          <div className="overflow-hidden rounded-xl border">
            <div className="grid grid-cols-3 bg-muted/50 p-3 text-sm font-medium">
              <div>Time</div>
              <div>Session</div>
              <div>Venue</div>
            </div>
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
              className="divide-y"
            >
              {[
                { time: "09:00", name: "Opening Ceremony", place: "Auditorium" },
                { time: "10:00", name: "Keynote: Future of Tech", place: "Auditorium" },
                { time: "11:30", name: "Workshops Begin", place: "Labs" },
                { time: "14:00", name: "Hack Sprint", place: "Innovation Hall" },
                { time: "17:30", name: "Project Expo", place: "Main Hall" },
                { time: "19:00", name: "Awards & Closing", place: "Auditorium" },
              ].map((s) => (
                <motion.li
                  key={s.name}
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                  className="grid grid-cols-3 p-3 text-sm"
                >
                  <div className="font-medium text-blue-700 dark:text-blue-300">{s.time}</div>
                  <div>{s.name}</div>
                  <div className="text-muted-foreground">{s.place}</div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </Section>

        {/* Team */}
        <Section id="team" title="Team" description="Meet the organizers powering Civista Club." className="space-y-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              { name: "Aarav Sharma", role: "President" },
              { name: "Isha Patel", role: "Vice President" },
              { name: "Rahul Mehta", role: "Events Lead" },
              { name: "Neha Gupta", role: "Design Lead" },
              { name: "Karan Singh", role: "Tech Lead" },
              { name: "Ananya Rao", role: "Operations" },
            ].map((m) => (
              <motion.div key={m.name} variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
                <Card className="h-full">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <img
                      src={`/placeholder.svg?height=64&width=64&query=profile%20avatar`}
                      alt=""
                      className="h-16 w-16 rounded-full border object-cover"
                    />
                    <div>
                      <CardTitle className="text-base">{m.name}</CardTitle>
                      <CardDescription>{m.role}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* Contact */}
        <Section
          id="contact"
          title="Contact Us"
          description="Have questions or want to partner with us? Send a message."
          className="space-y-6"
        >
          <Card>
            <CardContent className="pt-6">
              <form
                className="grid gap-4 md:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  console.log("[v0] Contact form submitted")
                  alert("Thanks! We’ll get back to you soon.")
                }}
              >
                <div className="grid gap-2">
                  <label htmlFor="c-name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="c-name" name="name" placeholder="Your name" required />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="c-email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="c-email" type="email" name="email" placeholder="you@example.com" required />
                </div>
                <div className="md:col-span-2 grid gap-2">
                  <label htmlFor="c-message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea id="c-message" name="message" placeholder="How can we help?" rows={5} required />
                </div>
                <div className="md:col-span-2">
                  <Button type="submit" className="w-full md:w-auto">
                    Send Message
                  </Button>
                </div>
              </form>
              <div className="mt-4 text-sm text-muted-foreground">Or email us at: civista.club@example.edu</div>
            </CardContent>
          </Card>
        </Section>

        {/* Footer */}
        <footer className="pb-10 pt-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Civista Club — All rights reserved.
        </footer>
      </div>
    </main>
  )
}
