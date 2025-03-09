"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { ChartCard } from "@/components/chart-card"
import { PriceChange } from "@/components/price-change"
import { Input } from "@/components/ui/input"
import { TokenIcon } from "@/components/token-icon"
import { SortableTable } from "@/components/sortable-table"

const tvlData = Array.from({ length: 60 }, (_, i) => ({
  date: `2021-${Math.floor(i / 12) + 1}`,
  value: 1000000000 + Math.random() * 4000000000,
}))

const volumeData = Array.from({ length: 30 }, (_, i) => ({
  date: `Feb ${i + 1}`,
  value: 500000000 + Math.random() * 3000000000,
}))

const tokens = [
  {
    id: 1,
    name: "Ethereum",
    symbol: "ETH",
    price: 2188.97,
    priceChange1h: -0.41,
    priceChange1d: -3.46,
    fdv: 6400000000,
    volume: 1000000000,
    sparkline: Array.from({ length: 20 }, () => Math.random() * 100),
  },
  {
    id: 2,
    name: "USD Coin",
    symbol: "USDC",
    price: 1.0,
    priceChange1h: 0.0,
    priceChange1d: 0.0,
    fdv: 57400000000,
    volume: 701500000,
    sparkline: Array.from({ length: 20 }, () => Math.random() * 100),
  },
  {
    id: 3,
    name: "Tether USD",
    symbol: "USDT",
    price: 1.0,
    priceChange1h: 0.0,
    priceChange1d: 0.0,
    fdv: 142800000000,
    volume: 501900000,
    sparkline: Array.from({ length: 20 }, () => Math.random() * 100),
  },
  {
    id: 4,
    name: "USD Coin",
    symbol: "USDC",
    price: 1.0,
    priceChange1h: 0.14,
    priceChange1d: 0.37,
    fdv: 57400000000,
    volume: 355700000,
    sparkline: Array.from({ length: 20 }, () => Math.random() * 100),
  },
]

export default function TokensPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleTokenClick = (token: any) => {
    router.push(`/explore/tokens/${token.symbol.toLowerCase()}`)
  }

  const columns = [
    {
      key: "id",
      header: "#",
      cell: (token: any) => <span className="text-sm">{token.id}</span>,
      sortable: true,
      sortKey: "id" as keyof (typeof tokens)[0],
    },
    {
      key: "name",
      header: "Token name",
      cell: (token: any) => (
        <div className="flex items-center">
          <TokenIcon symbol={token.symbol} className="mr-2" />
          <div>
            <div className="font-medium">{token.name}</div>
            <div className="text-xs text-muted-foreground">{token.symbol}</div>
          </div>
        </div>
      ),
      sortable: true,
      sortKey: "name" as keyof (typeof tokens)[0],
    },
    {
      key: "price",
      header: "Price",
      cell: (token: any) => <span className="font-medium">${token.price.toFixed(2)}</span>,
      sortable: true,
      sortKey: "price" as keyof (typeof tokens)[0],
    },
    {
      key: "priceChange1h",
      header: "1 hour",
      cell: (token: any) => <PriceChange value={token.priceChange1h} />,
      sortable: true,
      sortKey: "priceChange1h" as keyof (typeof tokens)[0],
    },
    {
      key: "priceChange1d",
      header: "1 day",
      cell: (token: any) => <PriceChange value={token.priceChange1d} />,
      sortable: true,
      sortKey: "priceChange1d" as keyof (typeof tokens)[0],
    },
    {
      key: "fdv",
      header: "FDV",
      cell: (token: any) => <span>${(token.fdv / 1000000000).toFixed(1)}B</span>,
      sortable: true,
      sortKey: "fdv" as keyof (typeof tokens)[0],
    },
    {
      key: "volume",
      header: "Volume",
      cell: (token: any) => <span>${(token.volume / 1000000).toFixed(1)}M</span>,
      sortable: true,
      sortKey: "volume" as keyof (typeof tokens)[0],
    },
  ]

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <ChartCard title="UniDEX TVL" value="$3.05B" data={tvlData} type="area" areaColor="hsl(var(--chart-1))" />

        <ChartCard
          title="UniDEX volume"
          value="$71.38B"
          subtitle="Past month"
          data={volumeData}
          type="bar"
          barColor="hsl(var(--chart-2))"
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Tokens</h2>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search tokens"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 h-9 bg-input border-input rounded-full text-sm w-[200px]"
          />
        </div>
      </div>

      <SortableTable data={tokens} columns={columns} onRowClick={handleTokenClick} />
    </div>
  )
}

