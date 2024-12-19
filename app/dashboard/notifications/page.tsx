import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import NotificationsPage from '@/components/NotificationsPage'

export default async function Notifications() {
  const user = await getUser()
  if (!user) redirect('/')
  
  return <NotificationsPage username={user.username} />
}

