'use client'

import { Download, Key } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'

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

interface DashboardProps {
  username: string
  isAdmin: boolean
  keyExpiresAt?: string
}

export default function Dashboard({ username, isAdmin, keyExpiresAt }: DashboardProps) {
  const router = useRouter()
  const [timeRemaining, setTimeRemaining] = useState<string>('')

  useEffect(() => {
    if (keyExpiresAt) {
      const updateTimeRemaining = () => {
        const now = new Date()
        const expirationDate = new Date(keyExpiresAt)
        const diff = expirationDate.getTime() - now.getTime()

        if (diff <= 0) {
          setTimeRemaining('Expired')
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24))
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
          setTimeRemaining(`${days}d ${hours}h ${minutes}m`)
        }
      }

      updateTimeRemaining()
      const interval = setInterval(updateTimeRemaining, 60000) // Update every minute

      return () => clearInterval(interval)
    }
  }, [keyExpiresAt])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-bold">Shark</span>
            <span className="text-gray-400">&gt; Products</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Welcome, {username}</span>
            {timeRemaining && (
              <span className="text-yellow-400">Key expires in: {timeRemaining}</span>
            )}
            <Button 
              variant="ghost" 
              className="text-gray-400 hover:text-white"
              onClick={handleLogout}
            >
              Logout
            </Button>
            {isAdmin && (
              <Button 
                variant="ghost" 
                className="text-gray-400 hover:text-white"
                onClick={() => router.push('/dashboard/keys')}
              >
                <Key className="mr-2 h-4 w-4" />
                Manage Keys
              </Button>
            )}
          </div>
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
              <Button 
                size="icon" 
                variant="ghost" 
                className="text-red-600 hover:text-red-500 hover:bg-red-600/10"
                onClick={() => toast.success(`Downloading ${product.name}...`)}
              >
                <Download className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

