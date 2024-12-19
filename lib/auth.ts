import { cookies } from 'next/headers'
import { db } from './db'
import { User } from './types'

export async function getUser(): Promise<User | null> {
  const userId = cookies().get('userId')?.value
  if (!userId) return null
  
  const user = Array.from(db.users.values()).find(u => u.id === userId)
  return user || null
}

export async function login(email: string, password: string) {
  const user = await db.getUserByEmail(email)
  if (!user || user.password !== password) {
    throw new Error('Invalid credentials')
  }
  
  cookies().set('userId', user.id)
  return user
}

export async function register(username: string, email: string, password: string) {
  const existingUser = await db.getUserByEmail(email)
  if (existingUser) {
    throw new Error('Email already exists')
  }

  const user = await db.createUser({ username, email, password })
  cookies().set('userId', user.id)
  return user
}

export async function logout() {
  cookies().delete('userId')
}

