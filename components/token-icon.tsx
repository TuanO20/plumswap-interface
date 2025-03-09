import Image from "next/image"
import { cn } from "@/lib/utils"

interface TokenIconProps {
  symbol: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const tokenImages: Record<string, string> = {
  ETH: "/tokens/eth.png",
  WBTC: "/tokens/wbtc.png",
  USDC: "/tokens/usdc.png",
  USDT: "/tokens/usdt.png",
  WISE: "/tokens/wise.png",
  beraSTONE: "/tokens/berastone.png",
}

export function TokenIcon({ symbol, size = "md", className }: TokenIconProps) {
  const sizeMap = {
    sm: 20,
    md: 24,
    lg: 32,
  }

  const pixelSize = sizeMap[size]

  // Use placeholder if token image not found
  const src = tokenImages[symbol] || `/placeholder.svg?height=${pixelSize}&width=${pixelSize}`

  return (
    <div className={cn("relative rounded-full overflow-hidden", className)}>
      <Image
        src={src || "/placeholder.svg"}
        alt={symbol}
        width={pixelSize}
        height={pixelSize}
        className="object-cover"
      />
    </div>
  )
}

interface TokenPairProps {
  symbols: [string, string]
  size?: "sm" | "md" | "lg"
  className?: string
}

export function TokenPair({ symbols, size = "md", className }: TokenPairProps) {
  return (
    <div className={cn("token-pair-icon", className)}>
      <TokenIcon symbol={symbols[0]} size={size} />
      <TokenIcon symbol={symbols[1]} size={size} />
    </div>
  )
}

