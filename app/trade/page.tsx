"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowDown, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TokenSelector, type Token } from "@/components/token-selector"
import { TokenIcon } from "@/components/token-icon"

const popularTokens = [
  { symbol: "ETH", name: "Ethereum", balance: 0.42, price: 2188.97 },
  { symbol: "USDC", name: "USD Coin", balance: 1000, price: 1 },
  { symbol: "USDT", name: "Tether", balance: 1000, price: 1 },
  { symbol: "DAI", name: "Dai", balance: 1000, price: 1 },
  { symbol: "WBTC", name: "Wrapped Bitcoin", balance: 0.01, price: 60000 },
  { symbol: "AAVE", name: "Aave", balance: 5, price: 90 },
  { symbol: "LDO", name: "Lido DAO", balance: 20, price: 2.5 },
  { symbol: "LINK", name: "Chainlink", balance: 15, price: 15 },
]

export default function TradePage() {
  const [sellAmount, setSellAmount] = useState("")
  const [buyAmount, setBuyAmount] = useState("")
  const [sellToken, setSellToken] = useState<Token | null>({
    symbol: "ETH",
    name: "Ethereum",
    balance: 0.42,
    price: 2188.97,
  })
  const [buyToken, setBuyToken] = useState<Token | null>(null)
  const [exchangeRate, setExchangeRate] = useState<string | null>(null)
  const [isSwapping, setIsSwapping] = useState(false)
  const [swapSuccess, setSwapSuccess] = useState(false)

  // Cursor follower state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseMoving, setIsMouseMoving] = useState(false)
  const [lastMoveTime, setLastMoveTime] = useState(0)
  const followerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const trailElements = useRef<HTMLDivElement[]>([])
  const trailCount = 5

  // Calculate exchange rate when tokens change
  useEffect(() => {
    if (sellToken && buyToken && sellToken.price && buyToken.price) {
      const rate = sellToken.price / buyToken.price
      setExchangeRate(`1 ${sellToken.symbol} = ${rate.toFixed(6)} ${buyToken.symbol}`)
    } else {
      setExchangeRate(null)
    }
  }, [sellToken, buyToken])

  // Update buy amount when sell amount changes
  useEffect(() => {
    if (sellToken && buyToken && sellToken.price && buyToken.price && sellAmount) {
      const sellValue = Number.parseFloat(sellAmount) * sellToken.price
      const buyValue = sellValue / buyToken.price
      setBuyAmount(buyValue.toFixed(6))
    }
  }, [sellAmount, sellToken, buyToken])

  // Initialize trail elements
  useEffect(() => {
    trailElements.current = Array.from({ length: trailCount }).map((_, i) => {
      const div = document.createElement("div")
      div.className = "absolute w-2 h-2 rounded-full bg-primary/30 pointer-events-none"
      div.style.opacity = `${1 - i * 0.2}`
      div.style.transform = "translate(-50%, -50%)"
      div.style.transition = `transform 0.15s ease ${i * 0.05}s, opacity 0.3s ease`
      document.body.appendChild(div)
      return div
    })

    return () => {
      trailElements.current.forEach((el) => {
        if (document.body.contains(el)) {
          document.body.removeChild(el)
        }
      })
    }
  }, [])

  // Mouse movement handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()

        // Only track mouse inside the container
        if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
          setMousePosition({ x: e.clientX, y: e.clientY })
          setIsMouseMoving(true)
          setLastMoveTime(Date.now())

          // Update trail positions
          trailElements.current.forEach((el, i) => {
            setTimeout(() => {
              if (el) {
                el.style.left = `${e.clientX}px`
                el.style.top = `${e.clientY}px`
                el.style.opacity = "1"
              }
            }, i * 50)
          })
        }
      }
    }

    // Hide trail when mouse stops moving
    const interval = setInterval(() => {
      if (isMouseMoving && Date.now() - lastMoveTime > 300) {
        setIsMouseMoving(false)
        trailElements.current.forEach((el) => {
          if (el) el.style.opacity = "0"
        })
      }
    }, 300)

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(interval)
    }
  }, [isMouseMoving, lastMoveTime])

  const handleSwap = () => {
    if (!sellToken || !buyToken || !sellAmount || !buyAmount) return

    setIsSwapping(true)

    // Simulate transaction
    setTimeout(() => {
      setIsSwapping(false)
      setSwapSuccess(true)

      // Reset after showing success
      setTimeout(() => {
        setSellAmount("")
        setBuyAmount("")
        setSwapSuccess(false)
      }, 3000)
    }, 2000)
  }

  const handleSwitchTokens = () => {
    const tempToken = sellToken
    setSellToken(buyToken)
    setBuyToken(tempToken)
    const tempAmount = sellAmount
    setSellAmount(buyAmount)
    setBuyAmount(tempAmount)
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8" ref={containerRef}>
      {/* Cursor follower */}
      <div
        ref={followerRef}
        className="fixed w-8 h-8 rounded-full border-2 border-primary pointer-events-none z-50 mix-blend-difference"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) translate(-50%, -50%)`,
          opacity: isMouseMoving ? 1 : 0,
          transition: "opacity 0.3s ease, transform 0.1s ease-out",
        }}
      />

      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Swap Fast,</h1>
          <h1 className="text-4xl font-bold">Trade Smart</h1>
        </div>

        <div className="bg-background border border-border rounded-2xl p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Sell</span>
            {sellToken && sellToken.balance !== undefined && (
              <span className="text-sm text-muted-foreground">
                Balance: {sellToken.balance.toFixed(4)} {sellToken.symbol}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Input
              type="text"
              value={sellAmount}
              onChange={(e) => {
                const value = e.target.value
                if (value === "" || /^\d*\.?\d*$/.test(value)) {
                  setSellAmount(value)
                }
              }}
              placeholder="0"
              className="text-2xl bg-transparent border-none h-12 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />

            <TokenSelector
              selectedToken={sellToken}
              onSelect={setSellToken}
              buttonClassName={sellToken ? "bg-muted" : "bg-primary text-primary-foreground"}
            />
          </div>

          <div className="flex justify-center -my-2 relative z-10">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-background border border-border"
              onClick={handleSwitchTokens}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex justify-between items-center mb-2 mt-4">
            <span className="text-sm text-muted-foreground">Buy</span>
            {buyToken && buyToken.balance !== undefined && (
              <span className="text-sm text-muted-foreground">
                Balance: {buyToken.balance.toFixed(4)} {buyToken.symbol}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={buyAmount}
              onChange={(e) => {
                const value = e.target.value
                if (value === "" || /^\d*\.?\d*$/.test(value)) {
                  setBuyAmount(value)

                  // Update sell amount based on buy amount
                  if (sellToken && buyToken && sellToken.price && buyToken.price && value) {
                    const buyValue = Number.parseFloat(value) * buyToken.price
                    const sellValue = buyValue / sellToken.price
                    setSellAmount(sellValue.toFixed(6))
                  }
                }
              }}
              placeholder="0"
              className="text-2xl bg-transparent border-none h-12 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />

            <TokenSelector
              selectedToken={buyToken}
              onSelect={setBuyToken}
              buttonClassName={buyToken ? "bg-muted" : "bg-primary text-primary-foreground"}
            />
          </div>

          {exchangeRate && (
            <div className="mt-4 p-2 bg-muted/20 rounded-lg flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{exchangeRate}</span>
              <Info className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </div>

        <Button
          className="w-full h-14 rounded-2xl bg-primary text-primary-foreground text-lg font-medium relative overflow-hidden"
          disabled={!sellAmount || !buyToken || isSwapping}
          onClick={handleSwap}
        >
          {isSwapping ? (
            <div className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Swapping...
            </div>
          ) : swapSuccess ? (
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Swap Successful!
            </div>
          ) : (
            <>{!buyToken ? "Select a token" : !sellAmount ? "Enter an amount" : "Swap"}</>
          )}
        </Button>

        <div className="mt-8 p-4 bg-muted/20 rounded-xl">
          <h3 className="text-lg font-medium mb-2">Popular tokens</h3>
          <div className="grid grid-cols-4 gap-2">
            {["ETH", "USDC", "USDT", "DAI", "WBTC", "AAVE", "LDO", "LINK"].map((symbol) => (
              <div
                key={symbol}
                className="flex flex-col items-center p-2 hover:bg-muted/30 rounded-lg cursor-pointer transition-colors"
                onClick={() => {
                  const token = popularTokens.find((t) => t.symbol === symbol)
                  if (token) {
                    if (!sellToken) setSellToken(token)
                    else if (!buyToken) setBuyToken(token)
                  }
                }}
              >
                <TokenIcon symbol={symbol} size="md" className="mb-1" />
                <span className="text-xs">{symbol}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

