import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    
    const user = await db.getUserByEmail(email)
    if (!user || user.password !== password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Set the cookie
    cookies().set('userId', user.id)

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    )
  }
}

