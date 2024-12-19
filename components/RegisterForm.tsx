'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"
import { generateHWID } from "@/lib/hwid"

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    licenseKey: ''
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match")
      return
    }
    
    setIsLoading(true)
    
    try {
      const hwid = await generateHWID()
      
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          licenseKey: formData.licenseKey,
          hwid
        })
      })
      
      const data = await res.json()
      
      if (!res.ok) throw new Error(data.error)
      
      toast.success("Registration successful")
      router.push("/dashboard")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
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
            <Link 
              href="/"
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              Login
            </Link>
            <button className="text-red-600 font-medium">
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={e => setFormData(prev => ({ ...prev, username: e.target.value }))}
                className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-gray-500"
              />
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-gray-500"
              />
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-gray-500"
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={e => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-gray-500"
              />
              <Input
                type="text"
                placeholder="License Key"
                value={formData.licenseKey}
                onChange={e => setFormData(prev => ({ ...prev, licenseKey: e.target.value }))}
                className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-gray-500"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              {isLoading ? "Creating Account..." : "Register"}
            </Button>
          </form>
        </div>
      </div>

      <div className="hidden lg:block lg:flex-1">
        <div 
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: 'url("/gta.jpg")',
            filter: 'brightness(0.7) grayscale(100%)'
          }}
        />
      </div>
    </div>
  )
}

