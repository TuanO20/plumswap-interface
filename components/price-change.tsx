import { ArrowDown, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface PriceChangeProps {
  value: number
  showIcon?: boolean
  className?: string
}

export function PriceChange({ value, showIcon = true, className }: PriceChangeProps) {
  const isPositive = value >= 0
  const isZero = value === 0

  return (
    <div
      className={cn(
        "flex items-center",
        isPositive ? "text-positive" : isZero ? "text-muted-foreground" : "text-negative",
        className,
      )}
    >
      {showIcon &&
        !isZero &&
        (isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />)}
      {value.toFixed(2)}%
    </div>
  )
}

