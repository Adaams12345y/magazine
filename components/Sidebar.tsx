'use client'

import { Bell, Home, Key, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isAdmin?: boolean
}

export function Sidebar({ isAdmin }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className="fixed left-0 top-0 h-full w-16 bg-zinc-900 flex flex-col items-center py-4 gap-6">
      <Link 
        href="/dashboard" 
        className={cn(
          "p-3 rounded-lg transition-colors",
          pathname === '/dashboard' 
            ? "bg-red-600 text-white" 
            : "text-gray-400 hover:text-white hover:bg-zinc-800"
        )}
      >
        <Home className="w-6 h-6" />
      </Link>
      
      <Link 
        href="/dashboard/notifications" 
        className={cn(
          "p-3 rounded-lg transition-colors",
          pathname === '/dashboard/notifications' 
            ? "bg-red-600 text-white" 
            : "text-gray-400 hover:text-white hover:bg-zinc-800"
        )}
      >
        <Bell className="w-6 h-6" />
      </Link>

      {isAdmin && (
        <Link 
          href="/dashboard/keys" 
          className={cn(
            "p-3 rounded-lg transition-colors",
            pathname === '/dashboard/keys' 
              ? "bg-red-600 text-white" 
              : "text-gray-400 hover:text-white hover:bg-zinc-800"
          )}
        >
          <Key className="w-6 h-6" />
        </Link>
      )}

      <div className="mt-auto">
        <Link 
          href="/api/auth/logout"
          className="p-3 rounded-lg text-gray-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <LogOut className="w-6 h-6" />
        </Link>
      </div>
    </div>
  )
}

