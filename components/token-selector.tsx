"use client"

import { useState, useEffect, useRef } from "react"
import { Check, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TokenIcon } from "@/components/token-icon"
import { cn } from "@/lib/utils"

export interface Token {
  symbol: string
  name: string
  balance?: number
  price?: number
  logo?: string
}

interface TokenSelectorProps {
  selectedToken?: Token | null
  onSelect: (token: Token) => void
  className?: string
  buttonClassName?: string
}

const popularTokens: Token[] = [
  { symbol: "ETH", name: "Ethereum", balance: 0.42, price: 2188.97 },
  { symbol: "USDC", name: "USD Coin", balance: 1250.5, price: 1.0 },
  { symbol: "USDT", name: "Tether", balance: 500.75, price: 1.0 },
  { symbol: "DAI", name: "Dai Stablecoin", balance: 750.25, price: 1.0 },
  { symbol: "WBTC", name: "Wrapped Bitcoin", balance: 0.015, price: 43250.8 },
  { symbol: "AAVE", name: "Aave", balance: 12.5, price: 92.45 },
  { symbol: "LDO", name: "Lido DAO", balance: 150, price: 2.85 },
  { symbol: "LINK", name: "Chainlink", balance: 75, price: 13.2 },
  { symbol: "UNI", name: "Uniswap", balance: 45, price: 7.85 },
  { symbol: "MKR", name: "Maker", balance: 0.8, price: 1950.75 },
  { symbol: "SNX", name: "Synthetix", balance: 120, price: 3.45 },
  { symbol: "CRV", name: "Curve DAO", balance: 350, price: 0.65 },
]

export function TokenSelector({ selectedToken, onSelect, className, buttonClassName }: TokenSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  const filteredTokens = popularTokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <Button
        variant="outline"
        className={cn("h-10 gap-2 rounded-full border border-border", buttonClassName)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedToken ? (
          <>
            <TokenIcon symbol={selectedToken.symbol} />
            <span>{selectedToken.symbol}</span>
          </>
        ) : (
          <span>Select token</span>
        )}
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </Button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 z-50 w-[320px] rounded-lg border border-border bg-background shadow-lg">
          <div className="p-4">
            <h3 className="text-lg font-medium mb-2">Select a token</h3>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by name or symbol"
                className="pl-10 pr-4 py-2 bg-input border-input rounded-full text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {popularTokens.slice(0, 4).map((token) => (
                <Button
                  key={token.symbol}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => {
                    onSelect(token)
                    setIsOpen(false)
                  }}
                >
                  <TokenIcon symbol={token.symbol} size="sm" className="mr-1" />
                  {token.symbol}
                </Button>
              ))}
            </div>
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {filteredTokens.length > 0 ? (
              filteredTokens.map((token) => (
                <button
                  key={token.symbol}
                  className={cn(
                    "flex items-center justify-between w-full px-4 py-3 hover:bg-muted/50 transition-colors",
                    selectedToken?.symbol === token.symbol && "bg-muted",
                  )}
                  onClick={() => {
                    onSelect(token)
                    setIsOpen(false)
                  }}
                >
                  <div className="flex items-center">
                    <TokenIcon symbol={token.symbol} className="mr-3" />
                    <div className="text-left">
                      <div className="font-medium">{token.symbol}</div>
                      <div className="text-xs text-muted-foreground">{token.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    {token.balance && (
                      <div className="text-sm">{token.balance.toFixed(token.balance < 0.01 ? 4 : 2)}</div>
                    )}
                    {selectedToken?.symbol === token.symbol && <Check className="h-4 w-4 text-primary" />}
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-muted-foreground">No tokens found</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

