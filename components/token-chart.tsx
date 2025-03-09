"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TokenChartProps {
  data: any[]
  className?: string
}

export function TokenChart({ data, className }: TokenChartProps) {
  const [timeframe, setTimeframe] = useState<"1H" | "1D" | "1W" | "1M" | "1Y">("1D")
  const [activeTooltip, setActiveTooltip] = useState<{ price: number; time: string } | null>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (chartRef.current) {
      const rect = chartRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setCursorPosition({ x, y })
    }
  }

  const handleMouseLeave = () => {
    setCursorPosition(null)
    setActiveTooltip(null)
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      // Update the active tooltip data for the cursor line
      if (!activeTooltip || activeTooltip.time !== label) {
        setActiveTooltip({
          price: payload[0].value,
          time: label,
        })
      }

      return (
        <div className="bg-background border border-border p-2 rounded-md shadow-md">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-sm font-medium">${payload[0].value.toFixed(2)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="h-[240px] relative" ref={chartRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        {cursorPosition && activeTooltip && (
          <div className="absolute inset-0 pointer-events-none z-10">
            {/* Vertical cursor line */}
            <div className="absolute top-0 bottom-0 w-px bg-primary/50" style={{ left: `${cursorPosition.x}px` }} />
            {/* Horizontal cursor line at data point */}
            <div className="absolute left-0 right-0 h-px bg-primary/50" style={{ top: `${cursorPosition.y}px` }} />
            {/* Value indicator */}
            <div
              className="absolute px-2 py-1 bg-background border border-primary rounded text-xs"
              style={{
                left: `${cursorPosition.x + 10}px`,
                top: `${cursorPosition.y - 30}px`,
                transform: cursorPosition.x > chartRef.current?.clientWidth! * 0.7 ? "translateX(-100%)" : "none",
              }}
            >
              ${activeTooltip.price.toFixed(2)}
              <div className="text-xs text-muted-foreground">{activeTooltip.time}</div>
            </div>
          </div>
        )}

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            onMouseMove={(e) =>
              e &&
              e.activeTooltipIndex !== undefined &&
              setActiveTooltip({
                price: data[e.activeTooltipIndex].price,
                time: data[e.activeTooltipIndex].time,
              })
            }
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              domain={["dataMin - 10", "dataMax + 10"]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              orientation="right"
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="hsl(var(--chart-1))"
              fillOpacity={1}
              fill="url(#colorPrice)"
              activeDot={{ r: 6, fill: "hsl(var(--chart-1))", stroke: "hsl(var(--background))" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex mt-4 bg-muted rounded-md p-1">
        <Button
          variant="ghost"
          size="sm"
          className={cn("flex-1 rounded-sm text-xs", timeframe === "1H" && "bg-background text-foreground")}
          onClick={() => setTimeframe("1H")}
        >
          1H
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn("flex-1 rounded-sm text-xs", timeframe === "1D" && "bg-background text-foreground")}
          onClick={() => setTimeframe("1D")}
        >
          1D
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn("flex-1 rounded-sm text-xs", timeframe === "1W" && "bg-background text-foreground")}
          onClick={() => setTimeframe("1W")}
        >
          1W
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn("flex-1 rounded-sm text-xs", timeframe === "1M" && "bg-background text-foreground")}
          onClick={() => setTimeframe("1M")}
        >
          1M
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn("flex-1 rounded-sm text-xs", timeframe === "1Y" && "bg-background text-foreground")}
          onClick={() => setTimeframe("1Y")}
        >
          1Y
        </Button>
      </div>
    </div>
  )
}

