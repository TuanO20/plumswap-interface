"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronDown, ExternalLink, Plus, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TokenPair } from "@/components/token-icon"
import { TokenChart } from "@/components/token-chart"
import { PriceChange } from "@/components/price-change"

// Mock data for the pool
const poolData = {
  token1: "WBTC",
  token2: "USDC",
  version: "v3",
  fee: "0.3%",
  volume: 63870000,
  volumeChange: -11.07,
  tvl: 174100000,
  tvlChange: 8.57,
  fees24h: 117700,
  balances: {
    token1Amount: 1.6,
    token2Amount: 28.6,
  },
  chartData: Array.from({ length: 100 }, (_, i) => ({
    time: `${Math.floor(i / 4)}:${(i % 4) * 15}`,
    price: 35000 + Math.random() * 2000,
  })),
  transactions: [
    {
      time: "34s ago",
      type: "Sell",
      token1Amount: 0.89961,
      token2Amount: 80087.23,
      usdValue: 80263.54,
      address: "0x88d...",
    },
    {
      time: "46s ago",
      type: "Sell",
      token1Amount: 0.55139,
      token2Amount: 49106.77,
      usdValue: 49205.23,
      address: "0x72e...",
    },
    { time: "1m ago", type: "Buy", token1Amount: 0.25, token2Amount: 22000.5, usdValue: 22100.08, address: "0x91f..." },
    {
      time: "2m ago",
      type: "Buy",
      token1Amount: 1.2,
      token2Amount: 105000.75,
      usdValue: 105500.7,
      address: "0x45a...",
    },
  ],
}

export default function PoolDetailPage({ params }: { params: { pair: string } }) {
  const [sellAmount, setSellAmount] = useState("")
  const [buyAmount, setBuyAmount] = useState("")
  const [activeTab, setActiveTab] = useState("transactions")

  // Parse the pair from the URL
  const [token1, token2] = params.pair.split("-").map((t) => t.toUpperCase())

  return (
    <div>
      <div className="mb-6">
        <Link href="/explore/pools" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to pools
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <TokenPair symbols={[token1, token2]} size="lg" />
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                {token1} / {token2}{" "}
                <span className="ml-2 text-muted-foreground">
                  {poolData.version} {poolData.fee}
                </span>
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">${(poolData.volume / 1000000).toFixed(2)}M</span>
                <span className="text-sm text-muted-foreground">Past day</span>
                <PriceChange value={poolData.volumeChange} className="text-sm" />
              </div>
            </div>
            <div className="ml-auto flex gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TokenChart data={poolData.chartData} className="mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-muted/20 p-4 rounded-lg">
              <h3 className="text-sm text-muted-foreground mb-1">TVL</h3>
              <div className="flex items-center">
                <p className="text-xl font-bold">${(poolData.tvl / 1000000).toFixed(1)}M</p>
                <PriceChange value={poolData.tvlChange} className="text-xs ml-2" />
              </div>
            </div>
            <div className="bg-muted/20 p-4 rounded-lg">
              <h3 className="text-sm text-muted-foreground mb-1">24H volume</h3>
              <div className="flex items-center">
                <p className="text-xl font-bold">${(poolData.volume / 1000000).toFixed(1)}M</p>
                <PriceChange value={poolData.volumeChange} className="text-xs ml-2" />
              </div>
            </div>
            <div className="bg-muted/20 p-4 rounded-lg">
              <h3 className="text-sm text-muted-foreground mb-1">24H fees</h3>
              <p className="text-xl font-bold">${(poolData.fees24h / 1000).toFixed(1)}K</p>
            </div>
          </div>

          <div className="bg-muted/20 p-4 rounded-lg mb-8">
            <h3 className="text-sm text-muted-foreground mb-2">Pool balances</h3>
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-lg font-bold">
                  {poolData.balances.token1Amount}K {token1}
                </p>
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold">
                  {poolData.balances.token2Amount}M {token2}
                </p>
              </div>
            </div>
            <div className="w-full bg-muted h-2 rounded-full mt-2 overflow-hidden">
              <div className="bg-primary h-full" style={{ width: "40%" }}></div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Transactions</h2>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-muted/20 mb-4">
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="positions">Positions</TabsTrigger>
              </TabsList>
              <TabsContent value="transactions">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Time</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Type</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">{token1}</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">{token2}</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">USD</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {poolData.transactions.map((tx, index) => (
                        <tr key={index} className="border-b border-border hover:bg-muted/20">
                          <td className="px-4 py-3 text-sm">{tx.time}</td>
                          <td className={`px-4 py-3 text-sm ${tx.type === "Buy" ? "text-positive" : "text-negative"}`}>
                            {tx.type} {token1}
                          </td>
                          <td className="px-4 py-3 text-right">{tx.token1Amount}</td>
                          <td className="px-4 py-3 text-right">{tx.token2Amount.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right">${tx.usdValue.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right text-primary">{tx.address}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              <TabsContent value="positions">
                <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                  <p>Position data coming soon</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="lg:w-[350px]">
          <div className="flex gap-2 mb-4">
            <Button className="flex-1 gap-2 bg-primary text-primary-foreground rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m17 4 3 3-3 3" />
                <path d="M12 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h7" />
                <path d="m15 19-3 3-3-3" />
                <path d="M19 15v2a2 2 0 0 1-2 2h-7" />
              </svg>
              Swap
            </Button>
            <Button variant="outline" className="flex-1 gap-2 rounded-xl">
              <Plus className="h-4 w-4" />
              Add liquidity
            </Button>
          </div>

          <div className="bg-background border border-border rounded-2xl p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Sell</span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Input
                type="text"
                value={sellAmount}
                onChange={(e) => setSellAmount(e.target.value)}
                placeholder="0"
                className="text-2xl bg-transparent border-none h-12 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />

              <Button variant="outline" className="h-10 gap-2 rounded-full border border-border bg-muted">
                <TokenPair symbols={[token1, token2]} />
                <span>{token1}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>

            <div className="flex justify-center -my-2 relative z-10">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-background border border-border">
                <ArrowLeft className="h-4 w-4 rotate-90" />
              </Button>
            </div>

            <div className="flex justify-between items-center mb-2 mt-4">
              <span className="text-sm text-muted-foreground">Buy</span>
              <span className="text-sm text-muted-foreground">$0</span>
            </div>

            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
                placeholder="0"
                className="text-2xl bg-transparent border-none h-12 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />

              <Button variant="outline" className="h-10 gap-2 rounded-full border border-border bg-muted">
                <TokenPair symbols={[token1, token2]} />
                <span>{token2}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>

          <Button className="w-full h-14 rounded-2xl bg-primary text-primary-foreground text-lg font-medium mb-6">
            Connect wallet
          </Button>

          <div className="bg-background border border-border rounded-2xl p-4">
            <h2 className="text-lg font-bold mb-4">Links</h2>

            <div className="flex items-center justify-between py-2 border-b border-border">
              <div className="flex items-center gap-2">
                <TokenPair symbols={[token1, token2]} size="sm" />
                <span className="text-sm">
                  {token1}/{token2}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">0x99...35</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-border">
              <div className="flex items-center gap-2">
                <TokenPair symbols={[token1, ""]} size="sm" />
                <span className="text-sm">{token1}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">0x22...99</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <TokenPair symbols={[token2, ""]} size="sm" />
                <span className="text-sm">{token2}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">0x40...48</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

