'use client'

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react"
import { toast } from "sonner"

const products = [
  { id: "shark-merk", name: "Shark Merk" },
  { id: "bypass-cfx", name: "Bypass CFX" },
  { id: "fivem-spoofer", name: "FiveM Global Spoofer" },
]

interface GeneratedKey {
  key: string
  productId: string
  duration: string
  createdAt: string
}

export default function KeyManager() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    productId: '',
    duration: ''
  })
  const [generatedKeys, setGeneratedKeys] = useState<GeneratedKey[]>([])

  useEffect(() => {
    fetchGeneratedKeys()
  }, [])

  const fetchGeneratedKeys = async () => {
    try {
      const res = await fetch('/api/keys')
      const data = await res.json()
      if (res.ok) {
        setGeneratedKeys(data.keys)
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast.error('Failed to fetch generated keys')
    }
  }

  const handleGenerate = async () => {
    if (!formData.productId || !formData.duration) {
      toast.error("Please select both product and duration")
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch('/api/keys/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      const data = await res.json()
      
      if (!res.ok) throw new Error(data.error)
      
      toast.success(`Key generated: ${data.key}`)
      fetchGeneratedKeys() // Refresh the list of keys
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 pl-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Generate License Keys</h1>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select
              value={formData.productId}
              onValueChange={value => setFormData(prev => ({ ...prev, productId: value }))}
            >
              <SelectTrigger className="bg-zinc-900/50 border-zinc-800 text-white">
                <SelectValue placeholder="Select Product" />
              </SelectTrigger>
              <SelectContent>
                {products.map(product => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={formData.duration}
              onValueChange={value => setFormData(prev => ({ ...prev, duration: value }))}
            >
              <SelectTrigger className="bg-zinc-900/50 border-zinc-800 text-white">
                <SelectValue placeholder="Select Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="lifetime">Lifetime</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            {isLoading ? "Generating..." : "Generate Key"}
          </Button>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-white mb-4">Generated Keys</h2>
          <div className="bg-zinc-900/50 rounded-lg overflow-hidden">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-zinc-800 text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Key</th>
                  <th scope="col" className="px-6 py-3">Product</th>
                  <th scope="col" className="px-6 py-3">Duration</th>
                  <th scope="col" className="px-6 py-3">Created At</th>
                </tr>
              </thead>
              <tbody>
                {generatedKeys.map((key, index) => (
                  <tr key={index} className="border-b border-zinc-700">
                    <td className="px-6 py-4 font-medium text-white">{key.key}</td>
                    <td className="px-6 py-4">{products.find(p => p.id === key.productId)?.name || key.productId}</td>
                    <td className="px-6 py-4">{key.duration}</td>
                    <td className="px-6 py-4">{new Date(key.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

