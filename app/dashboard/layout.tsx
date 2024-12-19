import { Sidebar } from '@/components/Sidebar'
import { getUser } from '@/lib/auth'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()
  
  return (
    <div className="min-h-screen bg-zinc-950">
      <Sidebar isAdmin={user?.isAdmin} />
      {children}
    </div>
  )
}

