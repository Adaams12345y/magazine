'use client'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API calls with sequential notifications
    toast.success("Connection established")
    await new Promise(resolve => setTimeout(resolve, 500))
    
    toast.success("Welcome, ghxmods24")
    await new Promise(resolve => setTimeout(resolve, 500))
    
    router.push("/dashboard")
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex bg-zinc-950">
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24">
        <div className="w-full max-w-md mx-auto space-y-8">
          <div className="text-3xl font-bold">
            <span className="text-red-600">Shark</span>
            <span className="text-white">Services</span>
          </div>

          <div className="flex gap-6 text-sm">
            <button className="text-red-600 font-medium">
              Login
            </button>
            <button 
              onClick={() => router.push("/register")}
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="ghxmods24"
                className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-gray-500"
              />
              <Input
                type="password"
                placeholder="••••••••••"
                className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                className="border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium text-gray-400"
              >
                Remember Me
              </label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </form>
        </div>
      </div>

      <div className="hidden lg:block lg:flex-1">
        <div 
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: 'url("/placeholder.svg?height=900&width=800")',
            filter: 'brightness(0.7)'
          }}
        />
      </div>
    </div>
  )
}

