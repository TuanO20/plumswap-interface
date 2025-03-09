"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex border-b border-border mb-6">
        <Link
          href="/explore/tokens"
          className={cn(
            "px-4 py-2 text-sm font-medium border-b-2 -mb-px",
            pathname === "/explore/tokens"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          Tokens
        </Link>
        <Link
          href="/explore/pools"
          className={cn(
            "px-4 py-2 text-sm font-medium border-b-2 -mb-px",
            pathname === "/explore/pools"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          Pools
        </Link>
        <Link
          href="/explore/transactions"
          className={cn(
            "px-4 py-2 text-sm font-medium border-b-2 -mb-px",
            pathname === "/explore/transactions"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          Transactions
        </Link>
      </div>

      {children}
    </div>
  )
}

