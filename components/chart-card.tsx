"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Button } from "@/components/ui/button"
import { cn, formatCurrency } from "@/lib/utils"

interface ChartCardProps {
  title: string
  value: string
  subtitle?: string
  data: any[]
  type?: "area" | "bar"
  areaColor?: string
  barColor?: string
  className?: string
  dataKey?: string
  tooltipFormatter?: (value: number) => string
}

export function ChartCard({
  title,
  value,
  subtitle,
  data,
  type = "area",
  areaColor = "hsl(var(--chart-1))",
  barColor = "hsl(var(--chart-2))",
  className,
  dataKey = "value",
  tooltipFormatter = (value) => formatCurrency(value),
}: ChartCardProps) {
  const [timeframe, setTimeframe] = useState<"D" | "W" | "M">("M")
  const [activeTooltip, setActiveTooltip] = useState<{ value: number; date: string } | null>(null)
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
      if (!activeTooltip || activeTooltip.date !== label) {
        setActiveTooltip({
          value: payload[0].value,
          date: label,
        })
      }

      return (
        <div className="bg-background border border-border p-2 rounded-md shadow-md">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-sm font-medium">{tooltipFormatter(payload[0].value)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="mb-2">
        <h3 className="text-sm text-muted-foreground">{title}</h3>
        <div className="flex items-baseline">
          <p className="text-3xl font-bold">{value}</p>
          {subtitle && <span className="ml-2 text-sm text-muted-foreground">{subtitle}</span>}
        </div>
      </div>

      <div
        className="h-[180px] mt-2 relative"
        ref={chartRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
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
              {tooltipFormatter(activeTooltip.value)}
            </div>
          </div>
        )}

        <ResponsiveContainer width="100%" height="100%">
          {type === "area" ? (
            <AreaChart
              data={data}
              onMouseMove={(e) =>
                e &&
                e.activeTooltipIndex !== undefined &&
                setActiveTooltip({
                  value: data[e.activeTooltipIndex][dataKey],
                  date: data[e.activeTooltipIndex].date,
                })
              }
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={areaColor} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={areaColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke={areaColor}
                fillOpacity={1}
                fill="url(#colorGradient)"
                activeDot={{ r: 6, fill: areaColor, stroke: "hsl(var(--background))" }}
              />
            </AreaChart>
          ) : (
            <BarChart
              data={data}
              onMouseMove={(e) =>
                e &&
                e.activeTooltipIndex !== undefined &&
                setActiveTooltip({
                  value: data[e.activeTooltipIndex][dataKey],
                  date: data[e.activeTooltipIndex].date,
                })
              }
            >
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey={dataKey} fill={barColor} radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="flex justify-end mt-2">
        <div className="flex bg-muted rounded-full p-0.5">
          <Button
            variant="ghost"
            size="sm"
            className={cn("h-6 px-2 rounded-full text-xs", timeframe === "D" && "bg-background text-foreground")}
            onClick={() => setTimeframe("D")}
          >
            D
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn("h-6 px-2 rounded-full text-xs", timeframe === "W" && "bg-background text-foreground")}
            onClick={() => setTimeframe("W")}
          >
            W
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn("h-6 px-2 rounded-full text-xs", timeframe === "M" && "bg-background text-foreground")}
            onClick={() => setTimeframe("M")}
          >
            M
          </Button>
        </div>
      </div>
    </div>
  )
}

