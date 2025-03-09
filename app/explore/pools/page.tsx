"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TokenPair } from "@/components/token-icon"
import { ChartCard } from "@/components/chart-card"
import { SortableTable } from "@/components/sortable-table"

const tvlData = Array.from({ length: 60 }, (_, i) => ({
  date: `2021-${Math.floor(i / 12) + 1}`,
  value: 1000000000 + Math.random() * 4000000000,
}))

const volumeData = Array.from({ length: 30 }, (_, i) => ({
  date: `Feb ${i + 1}`,
  value: 500000000 + Math.random() * 3000000000,
}))

const pools = [
  {
    id: 1,
    token1: "WBTC",
    token2: "USDC",
    version: "v3",
    fee: "0.3%",
    tvl: 173700000,
    apr: 22.684,
    vol1d: 36000000,
    vol30d: 1500000000,
    volTvl: 0.21,
  },
  {
    id: 2,
    token1: "USDC",
    token2: "ETH",
    version: "v3",
    fee: "0.05%",
    tvl: 150900000,
    apr: 32.423,
    vol1d: 268100000,
    vol30d: 10800000000,
    volTvl: 1.78,
  },
  {
    id: 3,
    token1: "WISE",
    token2: "ETH",
    version: "v2",
    fee: "0.3%",
    tvl: 130900000,
    apr: 0.002,
    vol1d: 2500,
    vol30d: 504000,
    volTvl: 0.01,
  },
  {
    id: 4,
    token1: "ETH",
    token2: "USDT",
    version: "v3",
    fee: "0.3%",
    tvl: 110000000,
    apr: 22.287,
    vol1d: 22400000,
    vol30d: 915300000,
    volTvl: 0.2,
  },
]

export default function PoolsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handlePoolClick = (pool: any) => {
    router.push(`/explore/pools/${pool.token1.toLowerCase()}-${pool.token2.toLowerCase()}`)
  }

  const columns = [
    {
      key: "id",
      header: "#",
      cell: (pool: any) => <span className="text-sm">{pool.id}</span>,
      sortable: true,
      sortKey: "id" as keyof (typeof pools)[0],
    },
    {
      key: "pool",
      header: "Pool",
      cell: (pool: any) => (
        <div className="flex items-center">
          <TokenPair symbols={[pool.token1, pool.token2]} className="mr-2" />
          <div>
            <div className="font-medium">
              {pool.token1}/{pool.token2}
            </div>
            <div className="text-xs text-muted-foreground">
              {pool.version} • {pool.fee}
            </div>
          </div>
        </div>
      ),
      sortable: false,
    },
    {
      key: "tvl",
      header: "TVL",
      cell: (pool: any) => <span className="font-medium">${(pool.tvl / 1000000).toFixed(1)}M</span>,
      sortable: true,
      sortKey: "tvl" as keyof (typeof pools)[0],
    },
    {
      key: "apr",
      header: "APR",
      cell: (pool: any) => <span>{pool.apr.toFixed(3)}%</span>,
      sortable: true,
      sortKey: "apr" as keyof (typeof pools)[0],
    },
    {
      key: "vol1d",
      header: "1D vol",
      cell: (pool: any) => <span>${(pool.vol1d / 1000000).toFixed(1)}M</span>,
      sortable: true,
      sortKey: "vol1d" as keyof (typeof pools)[0],
    },
    {
      key: "vol30d",
      header: "30D vol",
      cell: (pool: any) => <span>${(pool.vol30d / 1000000).toFixed(1)}M</span>,
      sortable: true,
      sortKey: "vol30d" as keyof (typeof pools)[0],
    },
    {
      key: "volTvl",
      header: "1D vol/TVL",
      cell: (pool: any) => <span>{pool.volTvl.toFixed(2)}</span>,
      sortable: true,
      sortKey: "volTvl" as keyof (typeof pools)[0],
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
        <h2 className="text-xl font-bold">Pools</h2>

        <div className="flex items-center gap-2">
          <Button className="rounded-full gap-2 bg-primary text-primary-foreground">
            <Plus className="h-4 w-4" />
            Add liquidity
          </Button>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search pools"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 h-9 bg-input border-input rounded-full text-sm w-[200px]"
            />
          </div>
        </div>
      </div>

      <SortableTable data={pools} columns={columns} onRowClick={handlePoolClick} />
    </div>
  )
}

