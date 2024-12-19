import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import KeyManager from '@/components/KeyManager'

export default async function KeysPage() {
  const user = await getUser()
  if (!user || !user.isAdmin) redirect('/dashboard')
  
  return <KeyManager />
}

