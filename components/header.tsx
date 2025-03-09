"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Search, MoreHorizontal, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function Header() {
  const pathname = usePathname()
  const [searchFocused, setSearchFocused] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchVisible, setSearchVisible] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center h-16 px-4 border-b border-border bg-background">
      <div className="flex items-center gap-8 max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2 text-primary font-bold">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Plum_-5-removebg-preview-9BERbDDbWVqCCNCPLl3KmyEpoMbXpA.png"
            alt="PlumSwap Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          PlumSwap
        </Link>

        <div className="flex items-center md:hidden">
          <Button variant="ghost" size="icon" className="ml-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            )}
          </Button>
        </div>

        <nav className="hidden md:flex items-center space-x-1">
          <Link
            href="/trade"
            className={cn(
              "px-3 py-2 rounded-md text-sm font-medium",
              pathname === "/trade" ? "text-white" : "text-muted-foreground hover:text-white hover:bg-muted",
            )}
          >
            Trade
          </Link>
          <Link
            href="/explore"
            className={cn(
              "px-3 py-2 rounded-md text-sm font-medium",
              pathname.startsWith("/explore") ? "text-white" : "text-muted-foreground hover:text-white hover:bg-muted",
            )}
          >
            Explore
          </Link>
          <Link
            href="/pool"
            className={cn(
              "px-3 py-2 rounded-md text-sm font-medium",
              pathname === "/pool" ? "text-white" : "text-muted-foreground hover:text-white hover:bg-muted",
            )}
          >
            Pool
          </Link>
        </nav>

        <div
          className={cn(
            "relative flex-1 max-w-md transition-all duration-200 ease-in-out",
            searchFocused ? "max-w-xl" : "",
          )}
        >
          <div className="relative flex items-center justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="max-sm:flex hidden p-0 h-10 w-10 rounded-full mr-2"
              onClick={() => setSearchVisible(!searchVisible)}
            >
              <Search className="h-5 w-5 text-muted-foreground" />
            </Button>

            <div
              className={cn(
                "flex items-center w-full",
                "max-sm:absolute max-sm:right-0 max-sm:top-0",
                !searchVisible && "max-sm:hidden",
              )}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="search-input"
                type="text"
                placeholder="Search tokens"
                className="pl-10 pr-4 py-2 bg-input border-input rounded-full text-sm w-full"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => {
                  setSearchFocused(false)
                  if (window.innerWidth < 640) {
                    setTimeout(() => setSearchVisible(false), 200)
                  }
                }}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">/</div>

              {searchVisible && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="max-sm:flex hidden ml-2 h-10 w-10 rounded-full"
                  onClick={() => setSearchVisible(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex rounded-full">
            Get the app
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
          <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Wallet className="h-4 w-4 mr-2" />
            Connect
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b border-border p-4 md:hidden">
          <nav className="flex flex-col space-y-2">
            <Link
              href="/trade"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium",
                pathname === "/trade" ? "bg-muted text-white" : "text-muted-foreground hover:text-white hover:bg-muted",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Trade
            </Link>
            <Link
              href="/explore"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium",
                pathname.startsWith("/explore")
                  ? "bg-muted text-white"
                  : "text-muted-foreground hover:text-white hover:bg-muted",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              href="/pool"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium",
                pathname === "/pool" ? "bg-muted text-white" : "text-muted-foreground hover:text-white hover:bg-muted",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Pool
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

