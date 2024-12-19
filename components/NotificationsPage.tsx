'use client'

import { useState, useEffect } from 'react'

interface Update {
  id: number
  title: string
  description: string
  date: string
}

const mockUpdates: Update[] = [
  {
    id: 1,
    title: "New Feature: Key Expiration Display",
    description: "Users can now see the remaining time on their license key in the dashboard.",
    date: "2023-06-15"
  },
  {
    id: 2,
    title: "Improved Security Measures",
    description: "We've enhanced our security protocols to better protect your account.",
    date: "2023-06-10"
  },
  {
    id: 3,
    title: "Bug Fix: Login Issues Resolved",
    description: "Fixed an issue where some users were experiencing difficulties logging in.",
    date: "2023-06-05"
  }
]

export default function NotificationsPage({ username }: { username: string }) {
  const [updates, setUpdates] = useState<Update[]>([])

  useEffect(() => {
    // In a real application, you would fetch updates from an API
    setUpdates(mockUpdates)
  }, [])

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Recent Updates</h1>
        <div className="space-y-4">
          {updates.map((update) => (
            <div key={update.id} className="bg-zinc-900/50 rounded-lg p-4">
              <h2 className="text-xl font-semibold text-red-600">{update.title}</h2>
              <p className="text-gray-300 mt-2">{update.description}</p>
              <p className="text-sm text-gray-400 mt-2">Posted on: {update.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

