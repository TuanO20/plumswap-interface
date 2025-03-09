"use client"
import { ChevronDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TokenPair } from "@/components/token-icon"

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
  },
  {
    id: 5,
    token1: "WBTC",
    token2: "ETH",
    version: "v3",
    fee: "0.3%",
    tvl: 78400000,
    apr: 2.837,
    vol1d: 2000000,
  },
]

export default function PoolPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Your positions</h1>

        <div className="flex items-center gap-2 mb-6">
          <Button className="gap-2 bg-primary text-primary-foreground rounded-full">
            <Plus className="h-4 w-4" />
            New
          </Button>
          <Button variant="outline" className="gap-2 rounded-full">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        <div className="bg-background border border-border rounded-xl p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary/10 p-3 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M7 10h2v4" />
                <path d="M11 10h2v4" />
                <path d="M15 10h2v4" />
              </svg>
            </div>
            <div>
              <h2 className="font-medium">Welcome to your positions</h2>
              <p className="text-sm text-muted-foreground">Connect your wallet to view your current positions.</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Top pools by TVL</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">#</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Pool</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">TVL</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">APR</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">1D vol</th>
              </tr>
            </thead>
            <tbody>
              {pools.map((pool) => (
                <tr key={pool.id} className="border-b border-border hover:bg-muted/20">
                  <td className="px-4 py-4 text-sm">{pool.id}</td>
                  <td className="px-4 py-4">
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
                  </td>
                  <td className="px-4 py-4 text-right font-medium">${(pool.tvl / 1000000).toFixed(1)}M</td>
                  <td className="px-4 py-4 text-right">{pool.apr.toFixed(3)}%</td>
                  <td className="px-4 py-4 text-right">${(pool.vol1d / 1000000).toFixed(1)}M</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="bg-background border border-border rounded-xl p-6">
            <h3 className="text-lg font-medium mb-4">Learn about liquidity provision</h3>

            <div className="flex items-start gap-4 mb-4 p-4 bg-primary/5 rounded-xl">
              <div className="bg-primary/10 p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                  <path d="M13 2v7h7" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Providing liquidity on different protocols</h4>
                <p className="text-sm text-muted-foreground">Learn how to provide liquidity and earn fees</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl">
              <div className="bg-primary/10 p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
                  <path d="M7 7h.01" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Hooks on v4</h4>
                <p className="text-sm text-muted-foreground">Customize pool behavior with hooks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

