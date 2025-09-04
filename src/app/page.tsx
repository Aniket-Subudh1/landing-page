'use client'

import Navbar from "@/components/Navbar"
import Hero from "@/components/sections/Hero"
import Features from "@/components/sections/Features"
import About from "@/components/sections/About"
import Stats from "@/components/sections/Stats"
import Footer from "@/components/sections/Footer"
import CTA from "@/components/sections/CTA"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-legal-bg-primary via-warm-100 to-legal-bg-secondary">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <About />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}