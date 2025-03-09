"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronDown, ExternalLink, Globe, Share2, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TokenIcon } from "@/components/token-icon"
import { TokenChart } from "@/components/token-chart"
import { PriceChange } from "@/components/price-change"

// Mock data for the token
const tokenData = {
  name: "Ethereum",
  symbol: "ETH",
  price: 2191.81,
  priceChange: -1.43,
  description:
    "Ethereum is a smart contract platform that enables developers to build tokens and decentralized applications (dapps). ETH is the native currency for the Ethereum platform and also works as the transaction fees to miners on the Ethereum network.",
  marketCap: 264800000000,
  fdv: 264800000000,
  tvl: 1200000000,
  volume: 1000000000,
  chartData: Array.from({ length: 100 }, (_, i) => ({
    time: `${Math.floor(i / 4)}:${(i % 4) * 15}`,
    price: 2150 + Math.random() * 100,
  })),
  transactions: [
    { time: "1m ago", type: "Sell", amount: 0.001, price: 2191.81, total: 2.19, address: "0x88d..." },
    { time: "5m ago", type: "Buy", amount: 0.5, price: 2190.5, total: 1095.25, address: "0x72e..." },
    { time: "10m ago", type: "Sell", amount: 0.25, price: 2192.3, total: 548.08, address: "0x91f..." },
    { time: "15m ago", type: "Buy", amount: 1.2, price: 2189.75, total: 2627.7, address: "0x45a..." },
  ],
}

export default function TokenDetailPage({ params }: { params: { symbol: string } }) {
  const [sellAmount, setSellAmount] = useState("")
  const [buyAmount, setBuyAmount] = useState("")
  const [activeTab, setActiveTab] = useState("transactions")

  // Capitalize the symbol for display
  const symbol = params.symbol.toUpperCase()

  return (
    <div>
      <div className="mb-6">
        <Link href="/explore/tokens" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to tokens
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <TokenIcon symbol={symbol} size="lg" />
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                {tokenData.name} <span className="ml-2 text-muted-foreground">{symbol}</span>
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">${tokenData.price.toFixed(2)}</span>
                <PriceChange value={tokenData.priceChange} className="text-sm" />
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

          <TokenChart data={tokenData.chartData} className="mb-8" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-muted/20 p-4 rounded-lg">
              <h3 className="text-sm text-muted-foreground mb-1">TVL</h3>
              <p className="text-xl font-bold">${(tokenData.tvl / 1000000000).toFixed(1)}B</p>
            </div>
            <div className="bg-muted/20 p-4 rounded-lg">
              <h3 className="text-sm text-muted-foreground mb-1">Market cap</h3>
              <p className="text-xl font-bold">${(tokenData.marketCap / 1000000000).toFixed(1)}B</p>
            </div>
            <div className="bg-muted/20 p-4 rounded-lg">
              <h3 className="text-sm text-muted-foreground mb-1">FDV</h3>
              <p className="text-xl font-bold">${(tokenData.fdv / 1000000000).toFixed(1)}B</p>
            </div>
            <div className="bg-muted/20 p-4 rounded-lg">
              <h3 className="text-sm text-muted-foreground mb-1">1 day volume</h3>
              <p className="text-xl font-bold">${(tokenData.volume / 1000000000).toFixed(1)}B</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Stats</h2>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-muted/20 mb-4">
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="pools">Pools</TabsTrigger>
              </TabsList>
              <TabsContent value="transactions">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Time</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Type</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">{symbol}</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Price</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Total</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tokenData.transactions.map((tx, index) => (
                        <tr key={index} className="border-b border-border hover:bg-muted/20">
                          <td className="px-4 py-3 text-sm">{tx.time}</td>
                          <td className={`px-4 py-3 text-sm ${tx.type === "Buy" ? "text-positive" : "text-negative"}`}>
                            {tx.type}
                          </td>
                          <td className="px-4 py-3 text-right">{tx.amount}</td>
                          <td className="px-4 py-3 text-right">${tx.price.toFixed(2)}</td>
                          <td className="px-4 py-3 text-right">${tx.total.toFixed(2)}</td>
                          <td className="px-4 py-3 text-right text-primary">{tx.address}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              <TabsContent value="pools">
                <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                  <p>Pool data coming soon</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="lg:w-[350px]">
          <div className="bg-background border border-border rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-md ${activeTab === "swap" ? "bg-muted" : ""}`}
                onClick={() => setActiveTab("swap")}
              >
                Swap
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-md ${activeTab === "limit" ? "bg-muted" : ""}`}
                onClick={() => setActiveTab("limit")}
              >
                Limit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-md ${activeTab === "send" ? "bg-muted" : ""}`}
                onClick={() => setActiveTab("send")}
              >
                Send
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-md ${activeTab === "buy" ? "bg-muted" : ""}`}
                onClick={() => setActiveTab("buy")}
              >
                Buy
              </Button>
            </div>

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
                <TokenIcon symbol={symbol} />
                <span>{symbol}</span>
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

              <Button
                variant="outline"
                className="h-10 gap-2 rounded-full border border-border bg-primary text-primary-foreground"
              >
                <span>Select token</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button className="w-full h-14 rounded-2xl bg-primary text-primary-foreground text-lg font-medium mb-6">
            Connect wallet
          </Button>

          <div className="bg-background border border-border rounded-2xl p-4">
            <h2 className="text-lg font-bold mb-4">Info</h2>

            <div className="flex items-center gap-2 mb-3">
              <Button variant="outline" size="sm" className="h-8 rounded-full gap-1">
                <Globe className="h-4 w-4" />
                Website
              </Button>
              <Button variant="outline" size="sm" className="h-8 rounded-full gap-1">
                <Twitter className="h-4 w-4" />
                Twitter
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{tokenData.description}</p>

            <Button variant="link" size="sm" className="h-auto p-0 text-primary">
              Show more
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

