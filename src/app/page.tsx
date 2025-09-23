'use client'

import Navbar from "@/components/Navbar"
import Hero from "@/components/sections/Hero"
import Features from "@/components/sections/Features"
import About from "@/components/sections/About"
import Stats from "@/components/sections/Stats"
import Footer from "@/components/sections/Footer"
import CTA from "@/components/sections/CTA"
import Features2 from "@/components/sections/Features2"
import Features3 from "@/components/sections/Features3"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-legal-bg-primary via-warm-100 to-legal-bg-secondary">
      <Navbar />
      <main>
        <Hero />
        <CTA />
        <Features />
        <Features2 />
        <Features3 />
        <About />
        <Stats />
        
      </main>
      <Footer />
    </div>
  )
}