'use client'

import { Download } from 'lucide-react'
import { Button } from "@/components/ui/button"

const products = [
  {
    name: "Shark Merk",
    expiration: "Never Expires",
    status: "Working",
  },
  {
    name: "Bypass CFX",
    expiration: "Never Expires",
    status: "Working",
  },
  {
    name: "FiveM Global Spoofer",
    expiration: "Never Expires",
    status: "Working",
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-red-600 font-bold">Shark</span>
          <span className="text-gray-400">&gt; Products</span>
        </div>

        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.name}
              className="bg-zinc-900/50 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-800 rounded flex items-center justify-center">
                  λ
                </div>
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="text-sm">
                    <span className="text-gray-400">Expiration: </span>
                    <span className="text-red-600">{product.expiration}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-400">Status: </span>
                    <span className="text-green-500">{product.status}</span>
                  </div>
                </div>
              </div>
              <Button size="icon" variant="ghost" className="text-red-600 hover:text-red-500 hover:bg-red-600/10">
                <Download className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

