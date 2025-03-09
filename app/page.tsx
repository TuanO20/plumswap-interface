"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

const features = [
  {
    title: "Swap",
    description: "Trade any ERC-20 tokens instantly on Ethereum",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M17 4v6m-2-2h4m-4-4h4" />
        <path d="M7 20v-6m-2 2h4m-4 4h4" />
        <path d="M17 10c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z" />
        <path d="M7 14c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6z" />
      </svg>
    ),
    link: "/trade",
  },
  {
    title: "Liquidity",
    description: "Provide liquidity and earn trading fees",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M12 2v20" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    link: "/pool",
  },
  {
    title: "Analytics",
    description: "Track your portfolio and market trends",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
    link: "/analytics",
  },
]

export default function Home() {
  const [confettiTriggered, setConfettiTriggered] = useState(false)
  const [visibleSections, setVisibleSections] = useState({
    hero: false,
    stats: false,
    features: false,
  })

  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const featuresRef = useRef(null)

  useEffect(() => {
    if (!confettiTriggered) {
      const duration = 3 * 1000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min
      }

      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)

        // since particles fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ["#9333EA", "#A855F7", "#C084FC"],
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ["#9333EA", "#A855F7", "#C084FC"],
        })
      }, 250)

      setConfettiTriggered(true)
    }
  }, [confettiTriggered])

  // Scroll reveal animation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === heroRef.current) {
            setVisibleSections((prev) => ({ ...prev, hero: true }))
          } else if (entry.target === statsRef.current) {
            setVisibleSections((prev) => ({ ...prev, stats: true }))
          } else if (entry.target === featuresRef.current) {
            setVisibleSections((prev) => ({ ...prev, features: true }))
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    if (heroRef.current) observer.observe(heroRef.current)
    if (statsRef.current) observer.observe(statsRef.current)
    if (featuresRef.current) observer.observe(featuresRef.current)

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current)
      if (statsRef.current) observer.unobserve(statsRef.current)
      if (featuresRef.current) observer.unobserve(featuresRef.current)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <main>
        {/* Hero Section */}
        <section
          ref={heroRef}
          className={`relative pt-20 pb-16 overflow-hidden transition-all duration-1000 ease-out
            ${visibleSections.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="container px-4 mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Trade on <br />
                  <span className="text-primary">Ethereum</span> with Ease
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
                  The most efficient decentralized exchange for ERC-20 tokens on Ethereum
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="text-lg h-12 px-8">
                    Connect Wallet
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg h-12 px-8" href="/trade">
                    Trade Now
                  </Button>
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="relative w-[400px] h-[400px] mx-auto">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Plum_-5-removebg-preview-9BERbDDbWVqCCNCPLl3KmyEpoMbXpA.png"
                    alt="PlumSwap"
                    width={400}
                    height={400}
                    className="mx-auto object-contain"
                    style={{
                      filter: "drop-shadow(0 0 20px rgba(128, 0, 128, 0.3))",
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-900/20 to-purple-600/20 backdrop-blur-sm -z-10"
                    style={{ transform: "scale(0.9)" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section
          ref={statsRef}
          className={`py-16 bg-muted/20 transition-all duration-1000 ease-out delay-300
            ${visibleSections.stats ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Leading DEX on Ethereum</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div
                className="text-center transform transition-all duration-700 ease-out delay-[0ms]"
                style={{
                  opacity: visibleSections.stats ? 1 : 0,
                  transform: visibleSections.stats ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4,425,459</div>
                <div className="text-sm text-muted-foreground">Total Users</div>
              </div>
              <div
                className="text-center transform transition-all duration-700 ease-out delay-[200ms]"
                style={{
                  opacity: visibleSections.stats ? 1 : 0,
                  transform: visibleSections.stats ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">49,713,624</div>
                <div className="text-sm text-muted-foreground">Total Trades</div>
              </div>
              <div
                className="text-center transform transition-all duration-700 ease-out delay-[400ms]"
                style={{
                  opacity: visibleSections.stats ? 1 : 0,
                  transform: visibleSections.stats ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">$1.73B</div>
                <div className="text-sm text-muted-foreground">Total Value Locked</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          ref={featuresRef}
          className={`py-16 transition-all duration-1000 ease-out delay-500
            ${visibleSections.features ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Trading Now</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Link
                  key={feature.title}
                  href={feature.link}
                  className="group relative overflow-hidden rounded-xl bg-muted/20 p-6 hover:bg-muted/30 transition-colors transform transition-all duration-700 ease-out"
                  style={{
                    opacity: visibleSections.features ? 1 : 0,
                    transform: visibleSections.features ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: `${index * 200}ms`,
                  }}
                >
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <div className="flex items-center text-primary">
                    <span className="text-sm font-medium">Get Started</span>
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

